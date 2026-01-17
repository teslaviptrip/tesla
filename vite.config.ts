import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import type { Plugin } from "vite";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Plugin to handle API routes in dev mode
function apiPlugin(): Plugin {
  return {
    name: "api-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith("/api/")) {
          try {
            const urlPath = req.url.replace("/api/", "").split("?")[0];
            
            // Use Vite's ssrLoadModule - path should be relative to project root
            // Try different path formats
            let handlerModule;
            try {
              handlerModule = await server.ssrLoadModule(`./api/${urlPath}.ts`);
            } catch (e1) {
              try {
                handlerModule = await server.ssrLoadModule(`/api/${urlPath}.ts`);
              } catch (e2) {
                const apiPath = path.resolve(__dirname, `./api/${urlPath}.ts`);
                handlerModule = await server.ssrLoadModule(apiPath);
              }
            }
            const handler = handlerModule.default;
            
            if (!handler) {
              throw new Error("Handler not found in module");
            }
            
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
                    socket: {
                      remoteAddress: req.socket?.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0] || req.headers['x-real-ip'] || 'unknown',
                    },
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
                  console.error("Error stack:", error.stack);
                  res.statusCode = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ 
                    error: error.message || "Internal server error",
                    details: process.env.NODE_ENV === 'development' ? error.stack : undefined
                  }));
                }
              });
            } else {
              next();
            }
          } catch (error: any) {
            const urlPath = req.url?.replace("/api/", "").split("?")[0] || "unknown";
            console.error("API Import Error:", error);
            console.error("URL Path:", urlPath);
            console.error("Error details:", error.message, error.stack);
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "API endpoint not found", details: error.message }));
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
  ssr: {
    noExternal: ["resend"],
  },
});
