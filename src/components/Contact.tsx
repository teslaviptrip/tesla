import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Request Sent!",
      description: "We'll contact you within 15 minutes to confirm your Tesla transfer.",
    });
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "teslaservice149@gmail.com",
      description: "Quick response guaranteed"
    },
    {
      icon: MapPin,
      title: "Service Area",
      details: "Vienna - Bratislava - Budapest",
      description: "Austria, Slovakia & beyond"
    },
    {
      icon: Clock,
      title: "Operating Hours",
      details: "24/7 Available",
      description: "Round-the-clock service"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Book Your
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Tesla Transfer
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready for a premium experience? Contact us now and let's arrange your luxury Tesla transfer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Request Your Ride</CardTitle>
              <p className="text-muted-foreground">Fill out the form and we'll contact you within 15 minutes</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="bg-input/50 border-white/10 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                      className="bg-input/50 border-white/10 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-input/50 border-white/10 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Service Type
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-input/50 border border-white/10 rounded-md text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="airport">Airport Transfer</option>
                    <option value="two-cities">Vienna-Bratislava Day Trip</option>
                    <option value="day-tours">Private Day Tours</option>
                    <option value="business">Executive Business Transfer</option>
                    <option value="eco-luxury">Eco-Luxury Travel</option>
                    <option value="vip-events">VIP Events & Celebrations</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Trip Details
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Pickup location, destination, date & time, number of passengers, special requirements..."
                    rows={4}
                    className="bg-input/50 border-white/10 focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-4 text-lg electric-glow hover-glow"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Booking Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="luxury-card p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
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

            {/* Quick Booking Promise */}
            <div className="luxury-card p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">15-Minute Response</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We guarantee to respond to your booking request within 15 minutes, 24/7. 
                Your premium Tesla transfer is just moments away.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="luxury-card p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-xs text-muted-foreground">Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-xs text-muted-foreground">Insured</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">5★</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
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