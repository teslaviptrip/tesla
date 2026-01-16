import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useBooking } from "@/contexts/BookingContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { openBookingDialog } = useBooking();

  const languageNames: Record<Language, string> = {
    en: "EN",
    de: "DE",
    sk: "SK",
    ru: "RU",
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center electric-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Tesla VIP Trip</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-fast"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-fast"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-fast"
            >
              Contact
            </button>
            
            {/* Language Switcher */}
            <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger className="w-[90px] bg-secondary/50 border-border">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="EN">
                  {languageNames[language]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="sk">SK</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              className="electric-glow hover-glow"
              onClick={() => openBookingDialog()}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-foreground hover:text-primary transition-fast py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-foreground hover:text-primary transition-fast py-2"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-foreground hover:text-primary transition-fast py-2"
            >
              Contact
            </button>
            
            {/* Language Switcher */}
            <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
              <SelectTrigger className="w-full bg-secondary/50 border-border">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder="EN">
                  {languageNames[language]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="sk">SK</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              className="w-full electric-glow"
              onClick={() => openBookingDialog()}
            >
              Book Now
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;