import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from "vite";

// Plugin to handle API routes in dev mode
function apiPlugin(): Plugin {
  return {
    name: "api-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/")) {
          try {
            const urlPath = req.url.replace("/api/", "").split("?")[0];
            
            // Import the API handler
            const handlerModule = await import(`./api/${urlPath}.ts`);
            const handler = handlerModule.default;
            
            if (handler) {
              // Read request body
              let body = "";
              req.on("data", (chunk) => {
                body += chunk.toString();
              });
              
              req.on("end", async () => {
                try {
                  const parsedBody = body ? JSON.parse(body) : {};
                  
                  // Create mock req/res objects compatible with Vercel format
                  const mockReq = {
                    method: req.method || "GET",
                    headers: req.headers,
                    body: parsedBody,
                    query: new URL(req.url || "", `http://${req.headers.host}`).searchParams,
                  };
                  
                  const mockRes: any = {
                    statusCode: 200,
                    headers: {} as Record<string, string>,
                    status: (code: number) => {
                      mockRes.statusCode = code;
                      return mockRes;
                    },
                    json: (data: any) => {
                      res.statusCode = mockRes.statusCode;
                      Object.keys(mockRes.headers).forEach((key) => {
                        res.setHeader(key, mockRes.headers[key]);
                      });
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(data));
                    },
                    setHeader: (key: string, value: string) => {
                      mockRes.headers[key] = value;
                      res.setHeader(key, value);
                    },
                  };
                  
                  await handler(mockReq, mockRes);
                } catch (error: any) {
                  console.error("API Error:", error);
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: error.message || "Internal server error" }));
                }
              });
            } else {
              next();
            }
          } catch (error: any) {
            console.error("API Import Error:", error);
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "API endpoint not found" }));
          }
        } else {
          next();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 3001,
  },
  plugins: [react(), apiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
