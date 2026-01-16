import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Back Button */}
        <Link to="/">
          <Button
            variant="ghost"
            className="mb-8 flex items-center gap-2 hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.privacy.back}
          </Button>
        </Link>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t.privacy.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.privacy.lastUpdated}
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t.privacy.sections.introduction.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.privacy.sections.introduction.content}
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t.privacy.sections.information.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.privacy.sections.information.intro}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                {t.privacy.sections.information.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t.privacy.sections.usage.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.privacy.sections.usage.intro}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                {t.privacy.sections.usage.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t.privacy.sections.security.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.privacy.sections.security.content}
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t.privacy.sections.cookies.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.privacy.sections.cookies.content}
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t.privacy.sections.rights.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.privacy.sections.rights.intro}
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                {t.privacy.sections.rights.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                {t.privacy.sections.contact.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.privacy.sections.contact.content}{" "}
                <a
                  href={`mailto:${t.privacy.sections.contact.email}`}
                  className="text-primary hover:text-primary/80 underline"
                >
                  {t.privacy.sections.contact.email}
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

