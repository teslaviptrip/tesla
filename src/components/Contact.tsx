import { Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      title: t.contact.emailUs,
      details: t.contact.email,
      description: t.contact.emailDesc
    },
    {
      icon: MapPin,
      title: t.contact.serviceArea,
      details: t.contact.serviceAreaDetails,
      description: t.contact.serviceAreaDesc
    },
    {
      icon: Clock,
      title: t.contact.operatingHours,
      details: t.contact.hours,
      description: t.contact.hoursDesc
    },
    {
      icon: Clock,
      title: t.contact.response15min,
      details: "Guaranteed",
      description: t.contact.responseDesc
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.contact.title}
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.contact.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="luxury-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{t.contact.getInTouch}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-primary text-sm font-medium mb-1">{item.details}</p>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="luxury-card p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-xs text-muted-foreground">{t.contact.available247}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-xs text-muted-foreground">{t.contact.insured}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">5★</div>
                  <div className="text-xs text-muted-foreground">{t.contact.rating}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;