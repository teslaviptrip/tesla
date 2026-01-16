import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Zap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import model3Image from "@/assets/model-3.jpg";
import modelXImage from "@/assets/model-x.jpg";
import modelYImage from "@/assets/model-y.jpg";

const Fleet = () => {
  const vehicles = [
    {
      name: "Tesla Model S",
      image: model3Image,
      tagline: "Flagship Performance & Luxury",
      capacity: "5",
      range: "405",
      category: "Luxury Sedan"
    },
    {
      name: "Tesla Model X",
      image: modelXImage,
      tagline: "Ultimate Luxury SUV",
      capacity: "7",
      range: "348",
      category: "Luxury SUV"
    },
    {
      name: "Tesla Model Y",
      image: modelYImage,
      tagline: "Versatile Performance Crossover",
      capacity: "5",
      range: "330",
      category: "Performance Crossover"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="fleet" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Tesla
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Fleet
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our premium collection of Tesla vehicles, each offering unmatched comfort and performance
          </p>
        </div>

        {/* Fleet Slider */}
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full mb-12"
        >
          <CarouselContent>
            {vehicles.map((vehicle, index) => (
              <CarouselItem key={index} className="md:basis-full">
                <Card className="overflow-hidden border-0 bg-transparent">
                  <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-2xl group">
                    {/* Vehicle Image */}
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Dark Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary-foreground border border-primary">
                        {vehicle.category}
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="max-w-2xl">
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-3">
                          {vehicle.name}
                        </h3>
                        <p className="text-lg md:text-xl text-white/90 mb-6">
                          {vehicle.tagline}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-6 mb-8 text-white/90">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            <span className="font-medium">{vehicle.capacity} passengers</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            <span className="font-medium">{vehicle.range} miles</span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button 
                          size="lg"
                          className="electric-glow hover-glow px-8 py-6 text-lg"
                          onClick={scrollToContact}
                        >
                          Book This Vehicle
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Controls */}
          <CarouselPrevious className="left-4 md:left-8 w-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
          <CarouselNext className="right-4 md:right-8 w-12 h-12 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
        </Carousel>

        {/* Call to Action */}
        <div className="text-center luxury-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Experience Luxury?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Book your premium Tesla transfer today and discover the future of sustainable luxury transportation.
          </p>
          <Button 
            size="lg" 
            className="px-8 py-4 electric-glow hover-glow"
            onClick={scrollToContact}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Fleet;