import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  ArrowLeft,
  Check,
  Zap,
  Plane,
  Building2,
  Route,
  Leaf,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultService?: string;
}

const BookingDialog = ({ open, onOpenChange, defaultService }: BookingDialogProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || '',
    serviceOption: '',
    pickupLocation: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    message: ''
  });

  const { toast } = useToast();

  // If defaultService is provided, start on step 2 with service pre-selected
  useEffect(() => {
    if (open && defaultService) {
      setFormData(prev => ({
        ...prev,
        service: defaultService
      }));
      setCurrentStep(2);
    } else if (open && !defaultService) {
      // Reset to step 1 if no default service
      setCurrentStep(1);
    } else if (!open) {
      // Reset state when dialog closes
      setCurrentStep(1);
      setSelectedDate(undefined);
      setCalendarOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        serviceOption: '',
        pickupLocation: '',
        destination: '',
        date: '',
        time: '',
        passengers: '1',
        message: ''
      });
    }
  }, [open, defaultService]);

  const handleDialogClose = (open: boolean) => {
    onOpenChange(open);
  };

  // Generate time slots every 30 minutes (00:00 to 23:30)
  const timeSlots = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = (i % 2) * 30;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const displayTime = format(new Date(2000, 0, 1, hours, minutes), 'h:mm a');
    return { value: timeString, label: displayTime };
  });

  const services = [
    {
      id: 'airport',
      name: 'Airport Transfer',
      icon: Plane,
      description: 'Professional airport transfers',
      color: 'from-blue-500 to-cyan-500',
      options: [
        { label: 'Vienna Airport → Bratislava Airport', price: 'from €120' },
        { label: 'Vienna City → Bratislava City', price: 'from €140' },
        { label: 'Budapest Airport → Bratislava Airport', price: 'from €250' },
        { label: 'Budapest Airport → Vienna Airport', price: 'from €280' }
      ]
    },
    {
      id: 'vienna-bratislava',
      name: 'Vienna-Bratislava Day',
      icon: Route,
      description: 'Two capitals in one day',
      color: 'from-purple-500 to-pink-500',
      options: [
        { label: 'Half day experience (5 hours)', price: 'from €150' },
        { label: 'Full day service (up to 10 hours)', price: 'from €250' }
      ]
    },
    {
      id: 'day-tours',
      name: 'Private Day Tours',
      icon: Sparkles,
      description: 'Explore Central Europe',
      color: 'from-amber-500 to-orange-500',
      options: [
        { label: 'Half day tour (up to 6 hours)', price: 'from €250' },
        { label: 'Full day tour (8-10 hours)', price: 'from €400' }
      ]
    },
    {
      id: 'business',
      name: 'Business Transfer',
      icon: Building2,
      description: 'Executive corporate service',
      color: 'from-indigo-500 to-blue-500',
      options: [
        { label: 'Hourly business transfer', price: 'from €80/hour' },
        { label: 'Corporate packages', price: 'Custom quotes' }
      ]
    },
    {
      id: 'eco-luxury',
      name: 'Eco-Luxury',
      icon: Leaf,
      description: 'Sustainable luxury travel',
      color: 'from-green-500 to-emerald-500',
      options: [
        { label: 'Custom packages', price: 'Contact for pricing' }
      ]
    }
  ];

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;
  const selectedService = services.find(s => s.id === formData.service);

  const stepTitles = [
    'Select Service',
    'Select Option',
    'Trip Details',
    'Your Information',
    'Review & Confirm'
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!formData.service;
      case 2:
        // If service has options, one must be selected. If no options, can proceed.
        if (selectedService && selectedService.options.length > 0) {
          return !!formData.serviceOption;
        }
        return true;
      case 3:
        return !!(formData.pickupLocation && formData.destination && selectedDate && formData.time);
      case 4:
        return !!(formData.name && formData.email && formData.phone);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps) {
      // If on step 1 and selected service has no options, skip step 2
      if (currentStep === 1 && selectedService && selectedService.options.length === 0) {
        setCurrentStep(3); // Skip to Trip Details
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      // If on step 3 and service has no options, go back to step 1
      if (currentStep === 3 && selectedService && selectedService.options.length === 0) {
        setCurrentStep(1);
      } else {
        setCurrentStep(prev => prev - 1);
      }
    }
  };

  const handleServiceSelect = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setFormData(prev => ({
      ...prev,
      service: serviceId,
      serviceOption: ''
    }));
    
    // Auto-advance to next step
    if (service) {
      if (service.options.length === 0) {
        // Skip to step 3 if no options
        setTimeout(() => setCurrentStep(3), 300);
      } else {
        // Go to step 2 if has options
        setTimeout(() => setCurrentStep(2), 300);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailSubject = `New Booking Request - ${selectedService?.name || formData.service}`;
    const emailBody = `
New Booking Request

Customer Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Service Details:
- Service: ${selectedService?.name || formData.service}
- Option: ${formData.serviceOption || 'Not specified'}

Trip Details:
- Pickup: ${formData.pickupLocation}
- Destination: ${formData.destination}
- Date: ${formData.date}
- Time: ${formData.time}
- Passengers: ${formData.passengers}

Additional Message:
${formData.message || 'None'}

Submitted: ${new Date().toLocaleString()}
    `.trim();

    const mailtoLink = `mailto:teslaservis149@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    toast({
      title: "Booking Request Sent!",
      description: "Your booking request has been prepared. Please send the email that opened to complete your booking.",
      duration: 10000
    });

    setTimeout(() => {
      onOpenChange(false);
      setCurrentStep(1);
      setSelectedDate(undefined);
      setCalendarOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: defaultService || '',
        serviceOption: '',
        pickupLocation: '',
        destination: '',
        date: '',
        time: '',
        passengers: '1',
        message: ''
      });
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-3 md:space-y-6 h-full flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = formData.service === service.id;
                return (
                  <Card
                    key={service.id}
                    className={cn(
                      "p-2 md:p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg",
                      isSelected 
                        ? "ring-2 ring-primary bg-primary/10" 
                        : "hover:border-primary/50"
                    )}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className={cn(
                        "p-2 md:p-3 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0",
                        isSelected ? "ring-2 ring-primary bg-primary/20" : ""
                      )}>
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground mb-1 text-sm md:text-base">{service.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2 md:mb-3">{service.description}</p>
                        {isSelected && (
                          <div className="flex items-center gap-1 md:gap-2 text-primary text-xs md:text-sm">
                            <Check className="w-3 h-3 md:w-4 md:h-4" />
                            <span>Selected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 2:
        if (!selectedService) {
          return null;
        }

        // If service has no options, skip to next step
        if (selectedService.options.length === 0) {
          return (
            <div className="space-y-6 h-full flex flex-col justify-center">
              <Card className="p-6 bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    {(() => {
                      const Icon = selectedService.icon;
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{selectedService.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          );
        }

        return (
          <div className="space-y-6 h-full flex flex-col justify-center">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">{selectedService.name}</h3>
              <div className="grid grid-cols-1 gap-3">
                {selectedService.options.map((option, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
                      formData.serviceOption === option.label 
                        ? "ring-2 ring-primary bg-primary/10 border-primary" 
                        : "hover:border-primary/50"
                    )}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, serviceOption: option.label }));
                      // Auto-advance to next step
                      setTimeout(() => setCurrentStep(3), 300);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {formData.serviceOption === option.label && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                          <span className={cn(
                            "text-sm font-medium",
                            formData.serviceOption === option.label ? "text-primary" : "text-foreground"
                          )}>
                            {option.label}
                          </span>
                        </div>
                      </div>
                      <span className={cn(
                        "text-sm font-semibold px-3 py-1 rounded-full",
                        formData.serviceOption === option.label 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-primary"
                      )}>
                        {option.price}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 h-full flex flex-col justify-center">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupLocation" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Pickup Location <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickupLocation: e.target.value }))}
                    placeholder="Airport, address, or landmark"
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Destination <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    placeholder="Destination address or landmark"
                    required
                    className="h-12"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    Date <span className="text-destructive">*</span>
                  </Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          if (date) {
                            setFormData(prev => ({ 
                              ...prev, 
                              date: format(date, 'yyyy-MM-dd') 
                            }));
                            setCalendarOpen(false); // Close popover after date selection
                          }
                        }}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Time <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}
                    required
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select time">
                        {formData.time 
                          ? timeSlots.find(slot => slot.value === formData.time)?.label 
                          : "Select time"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers" className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Passengers
                  </Label>
                  <Select
                    value={formData.passengers}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, passengers: value }))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select passengers">
                        {formData.passengers ? `${formData.passengers} ${formData.passengers === '1' ? 'passenger' : 'passengers'}` : "Select passengers"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'passenger' : 'passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 h-full flex flex-col justify-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+421 940 631 268"
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Additional Requirements (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Special requirements, luggage details, accessibility needs..."
                  rows={4}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 h-full flex flex-col justify-center">
            <div className="space-y-4">
              <Card className="p-4 bg-muted/50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Service
                </h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Type:</span> {selectedService?.name}</p>
                  {formData.serviceOption && (
                    <p><span className="text-muted-foreground">Option:</span> {formData.serviceOption}</p>
                  )}
                </div>
              </Card>
              <Card className="p-4 bg-muted/50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Route className="w-4 h-4 text-primary" />
                  Trip Details
                </h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">From:</span> {formData.pickupLocation}</p>
                  <p><span className="text-muted-foreground">To:</span> {formData.destination}</p>
                  <p><span className="text-muted-foreground">Date:</span> {selectedDate ? format(selectedDate, 'PPP') : formData.date}</p>
                  <p><span className="text-muted-foreground">Time:</span> {formData.time ? timeSlots.find(slot => slot.value === formData.time)?.label : formData.time}</p>
                  <p><span className="text-muted-foreground">Passengers:</span> {formData.passengers}</p>
                </div>
              </Card>
              <Card className="p-4 bg-muted/50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Contact Information
                </h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {formData.name}</p>
                  <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                  <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
                </div>
              </Card>
              {formData.message && (
                <Card className="p-4 bg-muted/50">
                  <h4 className="font-semibold mb-2">Additional Notes</h4>
                  <p className="text-sm text-muted-foreground">{formData.message}</p>
                </Card>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        {/* Header with Progress */}
        <div className="px-6 pt-6 pb-4 border-b">
          <DialogHeader>
            <DialogTitle className="sr-only">Book Your Tesla Transfer</DialogTitle>
            <DialogDescription>
              Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 h-[450px]">
          <form onSubmit={handleSubmit} id="booking-form" className="h-full">
            <div className="h-full flex flex-col">
              {renderStepContent()}
            </div>
          </form>
        </div>

        {/* Footer with Navigation */}
        <div className="px-6 py-4 border-t bg-muted/30 flex items-center justify-between">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <div className="flex gap-3">
            {currentStep < totalSteps ? (
              // Hide Continue button on steps 1 and 2 (auto-advance)
              (currentStep === 1 || currentStep === 2) ? null : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="electric-glow hover-glow flex items-center gap-2"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )
            ) : (
              <Button
                type="submit"
                form="booking-form"
                className="electric-glow hover-glow flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
