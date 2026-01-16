import React, { createContext, useContext, useState } from "react";

interface BookingContextType {
  openBookingDialog: (serviceId?: string) => void;
  closeBookingDialog: () => void;
  isOpen: boolean;
  selectedService: string | undefined;
  setIsOpen: (open: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openBookingDialog = (serviceId?: string) => {
    setSelectedService(serviceId);
    setIsOpen(true);
  };

  const closeBookingDialog = () => {
    setIsOpen(false);
    setSelectedService(undefined);
  };

  return (
    <BookingContext.Provider value={{ openBookingDialog, closeBookingDialog, isOpen, selectedService, setIsOpen }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

