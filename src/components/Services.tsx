import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { useLanguage } from "@/contexts/LanguageContext";
import serviceAirport from "@/assets/service-airport.jpg";
import serviceTwoCities from "@/assets/service-two-cities.jpg";
import serviceTours from "@/assets/service-tours.jpg";
import serviceBusiness from "@/assets/service-business.jpg";
import serviceEco from "@/assets/service-eco.jpg";

const Services = () => {
  const { openBookingDialog } = useBooking();
  const { t } = useLanguage();

  // Map service titles to booking service IDs
  const getServiceId = (title: string): string => {
    const mapping: Record<string, string> = {
      [t.services.airport.title]: "airport",
      [t.services.viennaBratislava.title]: "vienna-bratislava",
      [t.services.dayTours.title]: "day-tours",
      [t.services.business.title]: "business",
      [t.services.ecoLuxury.title]: "eco-luxury"
    };
    return mapping[title] || "";
  };
  
  const services = [
    {
      image: serviceAirport,
      title: t.services.airport.title,
      headline: t.services.airport.headline,
      description: t.services.airport.description,
      features: t.services.airport.features,
      pricing: t.services.airport.pricing,
      cta: t.services.airport.cta
    },
    {
      image: serviceTwoCities,
      title: t.services.viennaBratislava.title,
      headline: t.services.viennaBratislava.headline,
      description: t.services.viennaBratislava.description,
      features: t.services.viennaBratislava.features,
      pricing: t.services.viennaBratislava.pricing,
      cta: t.services.viennaBratislava.cta
    },
    {
      image: serviceTours,
      title: t.services.dayTours.title,
      headline: t.services.dayTours.headline,
      description: t.services.dayTours.description,
      features: t.services.dayTours.features,
      pricing: t.services.dayTours.pricing,
      cta: t.services.dayTours.cta
    },
    {
      image: serviceBusiness,
      title: t.services.business.title,
      headline: t.services.business.headline,
      description: t.services.business.description,
      features: t.services.business.features,
      pricing: t.services.business.pricing,
      cta: t.services.business.cta
    },
    {
      image: serviceEco,
      title: t.services.ecoLuxury.title,
      headline: t.services.ecoLuxury.headline,
      description: t.services.ecoLuxury.description,
      features: t.services.ecoLuxury.features,
      pricing: t.services.ecoLuxury.pricing,
      cta: t.services.ecoLuxury.cta
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.services.title}
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t.services.titleHighlight}
            </span>
          </h2>
          <p className="hidden md:block text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.services.description}
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const serviceId = getServiceId(service.title);
            return (
            <Card 
              key={index} 
              className="luxury-card hover-lift group flex flex-col overflow-hidden cursor-pointer"
              onClick={() => serviceId && openBookingDialog(serviceId)}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                {/* Title */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {service.headline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mb-4 flex-1">
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-foreground">
                        <Check className="w-3 h-3 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-4 p-3 bg-background/50 rounded-lg border border-primary/20">
                  {service.pricing.map((price, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{price.route}</span>
                      <span className="text-sm font-bold text-primary">{price.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;