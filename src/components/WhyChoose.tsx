import { Car, UserCheck, Leaf, Wifi, Clock, Route } from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      icon: Car,
      title: "Premium Tesla Fleet",
      description: "Our fleet consists exclusively of the latest Tesla models, offering unparalleled comfort and cutting-edge technology."
    },
    {
      icon: UserCheck,
      title: "Professional Drivers",
      description: "Our chauffeurs undergo rigorous training and background checks to ensure your safety and comfort."
    },
    {
      icon: Leaf,
      title: "Zero Emissions",
      description: "Travel sustainably without compromising on luxury. Our all-electric fleet produces zero emissions."
    },
    {
      icon: Wifi,
      title: "Premium Amenities",
      description: "Enjoy complimentary Wi-Fi, bottled water, phone charging, and other premium amenities during your ride."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "We're available around the clock to meet your transportation needs, whenever and wherever you need us."
    },
    {
      icon: Route,
      title: "Flexible Routes",
      description: "Customize your journey with flexible routes and stops tailored to your preferences and schedule."
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">Our Service</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We redefine luxury transportation with cutting-edge technology and impeccable service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
