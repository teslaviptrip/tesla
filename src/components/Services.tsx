import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import serviceAirport from "@/assets/service-airport.jpg";
import serviceTwoCities from "@/assets/service-two-cities.jpg";
import serviceTours from "@/assets/service-tours.jpg";
import serviceBusiness from "@/assets/service-business.jpg";
import serviceEco from "@/assets/service-eco.jpg";

const Services = () => {
  const { openBookingDialog } = useBooking();

  // Map service titles to booking service IDs
  const getServiceId = (title: string): string => {
    const mapping: Record<string, string> = {
      "Airport Transfer Service": "airport",
      "Vienna-Bratislava Day": "vienna-bratislava",
      "Private Day Tours by Tesla": "day-tours",
      "Executive Business Transfer": "business",
      "Sustainable Luxury Mobility": "eco-luxury"
    };
    return mapping[title] || "";
  };
  const services = [
    {
      image: serviceAirport,
      title: "Airport Transfer Service",
      headline: "Arrive in Style, Leave the Stress Behind",
      description: "Flying into Vienna or Bratislava? Skip the taxi queues. A professional driver in a Tesla will meet you at arrivals and transport you to your hotel in comfort.",
      features: [
        "Meet & Greet with nameplate"
      ],
      pricing: [
        { route: "Vienna Airport → Bratislava Airport", price: "from €120" },
        { route: "Vienna City → Bratislava City", price: "from €140" },
        { route: "Budapest Airport → Bratislava Airport", price: "from €250" },
        { route: "Budapest Airport → Vienna Airport", price: "from €280" }
      ],
      cta: "Book Your Transfer"
    },
    {
      image: serviceTwoCities,
      title: "Vienna-Bratislava Day",
      headline: "TWO EUROPEAN CAPITALS IN 1 UNFORGETTABLE DAY",
      description: "Morning stroll through Vienna's imperial streets, evening dinner in Bratislava's Old Town. With your personal Tesla chauffeur, it's effortless.",
      features: [
        "Personal driver for the entire day",
        "Flexible stops at your request",
        "Local recommendations included"
      ],
      pricing: [
        { route: "Half day experience (5 hours)", price: "from €150" },
        { route: "Full day service (up to 10 hours)", price: "from €250" }
      ],
      cta: "Plan Your Day Trip"
    },
    {
      image: serviceTours,
      title: "Private Day Tours by Tesla",
      headline: "EXPLORE WITHOUT THE TOUR BUS CROWDS",
      description: "Experience Central Europe your way—in the comfort and silence of a Tesla, with a knowledgeable driver as your guide.",
      features: [
        "🍷 Lower Austria Wine Region",
        "🏰 Slovak Castles & Palaces",
        "🌇 Prague or Budapest (1-2 days)"
      ],
      pricing: [
        { route: "Half day tour (up to 6 hours)", price: "from €250" },
        { route: "Full day tour (8-10 hours)", price: "from €400" }
      ],
      cta: "Design Your Tour"
    },
    {
      image: serviceBusiness,
      title: "Executive Business Transfer",
      headline: "SUCCESS STARTS WITH THE DETAILS",
      description: "For business meetings, conferences, and corporate events in Vienna and Bratislava. Professional, discreet, always on time.",
      features: [
        "Punctuality guaranteed",
        "Discreet, professional drivers",
        "Premium comfort & quiet cabin for calls"
      ],
      pricing: [
        { route: "Hourly business transfer", price: "from €80/hour" },
        { route: "Corporate packages", price: "Custom quotes" }
      ],
      cta: "Request Business Quote"
    },
    {
      image: serviceEco,
      title: "Sustainable Luxury Mobility",
      headline: "Travel in Comfort. Zero Emissions. Pure Style.",
      description: "Experience premium transportation that doesn't compromise the planet. Tesla chauffeur service combines luxury with environmental responsibility.",
      features: [
        "🌍 100% electric, zero CO₂ emissions",
        "🔇 Whisper-quiet cabin",
        "⚡ Cutting-edge technology"
      ],
      pricing: [
        { route: "Custom packages", price: "Contact for pricing" }
      ],
      cta: "Go Green in Style"
    }
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Premium Tesla
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="hidden md:block text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience luxury transportation with our comprehensive Tesla transfer services
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