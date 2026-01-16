import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Show cookie banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  const handleNecessaryOnly = () => {
    localStorage.setItem("cookieConsent", "necessary");
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-card border border-border rounded-lg shadow-xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              {t.cookie.title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.cookie.description}{" "}
          <Link
            to="/privacy-policy"
            className="text-primary underline hover:text-primary/80 transition-colors"
          >
            {t.cookie.privacyLink}
          </Link>
          .
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleNecessaryOnly}
            className="flex-1 border-primary/20 hover:border-primary hover:bg-primary/10"
          >
            {t.cookie.necessary}
          </Button>
          <Button
            onClick={handleAcceptAll}
            className="flex-1 electric-glow hover-glow"
          >
            {t.cookie.acceptAll}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

