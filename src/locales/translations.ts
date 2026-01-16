export type Language = "en" | "de" | "sk" | "ru";

export interface Translations {
  // Navigation
  nav: {
    home: string;
    services: string;
    contact: string;
    bookNow: string;
  };
  
  // Hero Section
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    fullyInsured: string;
    available247: string;
    fiveStarService: string;
    bookYourRide: string;
  };
  
  // Services Section
  services: {
    title: string;
    titleHighlight: string;
    description: string;
    airport: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    viennaBratislava: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    dayTours: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    business: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
    ecoLuxury: {
      title: string;
      headline: string;
      description: string;
      features: string[];
      pricing: Array<{ route: string; price: string }>;
      cta: string;
    };
  };
  
  // Contact Section
  contact: {
    title: string;
    titleHighlight: string;
    description: string;
    getInTouch: string;
    emailUs: string;
    email: string;
    emailDesc: string;
    serviceArea: string;
    serviceAreaDetails: string;
    serviceAreaDesc: string;
    operatingHours: string;
    hours: string;
    hoursDesc: string;
    response15min: string;
    responseDesc: string;
    available247: string;
    insured: string;
    rating: string;
  };
  
  // FAQ Section
  faq: {
    title: string;
    titleHighlight: string;
    description: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  
  // Booking Dialog
  booking: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    selectService: string;
    selectOption: string;
    tripDetails: string;
    yourInformation: string;
    reviewConfirm: string;
    back: string;
    continue: string;
    confirm: string;
    selected: string;
    services: {
      airport: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      viennaBratislava: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      dayTours: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      business: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
      ecoLuxury: {
        name: string;
        description: string;
        options: Array<{ label: string; price: string }>;
      };
    };
    fields: {
      pickupLocation: string;
      destination: string;
      date: string;
      time: string;
      passengers: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      required: string;
      optional: string;
    };
    placeholders: {
      pickupLocation: string;
      destination: string;
      selectDate: string;
      selectTime: string;
      selectPassengers: string;
      enterName: string;
      enterEmail: string;
      enterPhone: string;
      additionalNotes: string;
    };
    review: {
      service: string;
      option: string;
      tripDetails: string;
      contactInfo: string;
      additionalNotes: string;
    };
    messages: {
      success: string;
      successDesc: string;
      error: string;
      errorDesc: string;
    };
    email: {
      subject: string;
      greeting: string;
      bookingDetails: string;
      service: string;
      option: string;
      pickup: string;
      destination: string;
      date: string;
      time: string;
      passengers: string;
      contact: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      footer: string;
    };
    confirmation: {
      subject: string;
      greeting: string;
      thankYou: string;
      message: string;
      nextSteps: string;
      footer: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      contact: "Contact",
      bookNow: "Book Now",
    },
    hero: {
      badge: "Premium Tesla Transfer Service",
      title: "Luxury Tesla",
      titleHighlight: "Transfer Service",
      subtitle: "Experience the future of premium transportation with our fleet of luxury Tesla vehicles. Sustainable, silent, and sophisticated.",
      fullyInsured: "Fully Insured",
      available247: "24/7 Available",
      fiveStarService: "5-Star Service",
      bookYourRide: "Book Your Ride",
    },
    services: {
      title: "Premium Tesla",
      titleHighlight: "Services",
      description: "Experience luxury transportation with our comprehensive Tesla transfer services",
      airport: {
        title: "Airport Transfer Service",
        headline: "Arrive in Style, Leave the Stress Behind",
        description: "Flying into Vienna or Bratislava? Skip the taxi queues. A professional driver in a Tesla will meet you at arrivals and transport you to your hotel in comfort.",
        features: ["Meet & Greet with nameplate"],
        pricing: [
          { route: "Vienna Airport → Bratislava Airport", price: "from €120" },
          { route: "Vienna City → Bratislava City", price: "from €140" },
          { route: "Budapest Airport → Bratislava Airport", price: "from €250" },
          { route: "Budapest Airport → Vienna Airport", price: "from €280" },
        ],
        cta: "Book Your Transfer",
      },
      viennaBratislava: {
        title: "Vienna-Bratislava Day",
        headline: "TWO EUROPEAN CAPITALS IN 1 UNFORGETTABLE DAY",
        description: "Morning stroll through Vienna's imperial streets, evening dinner in Bratislava's Old Town. With your personal Tesla chauffeur, it's effortless.",
        features: [
          "Personal driver for the entire day",
          "Flexible stops at your request",
          "Local recommendations included",
        ],
        pricing: [
          { route: "Half day experience (5 hours)", price: "from €150" },
          { route: "Full day service (up to 10 hours)", price: "from €250" },
        ],
        cta: "Plan Your Day Trip",
      },
      dayTours: {
        title: "Private Day Tours by Tesla",
        headline: "EXPLORE WITHOUT THE TOUR BUS CROWDS",
        description: "Experience Central Europe your way—in the comfort and silence of a Tesla, with a knowledgeable driver as your guide.",
        features: [
          "🍷 Lower Austria Wine Region",
          "🏰 Slovak Castles & Palaces",
          "🌇 Prague or Budapest (1-2 days)",
        ],
        pricing: [
          { route: "Half day tour (up to 6 hours)", price: "from €250" },
          { route: "Full day tour (8-10 hours)", price: "from €400" },
        ],
        cta: "Design Your Tour",
      },
      business: {
        title: "Executive Business Transfer",
        headline: "SUCCESS STARTS WITH THE DETAILS",
        description: "For business meetings, conferences, and corporate events in Vienna and Bratislava. Professional, discreet, always on time.",
        features: [
          "Punctuality guaranteed",
          "Discreet, professional drivers",
          "Premium comfort & quiet cabin for calls",
        ],
        pricing: [
          { route: "Hourly business transfer", price: "from €80/hour" },
          { route: "Corporate packages", price: "Custom quotes" },
        ],
        cta: "Request Business Quote",
      },
      ecoLuxury: {
        title: "Sustainable Luxury Mobility",
        headline: "Travel in Comfort. Zero Emissions. Pure Style.",
        description: "Experience premium transportation that doesn't compromise the planet. Tesla chauffeur service combines luxury with environmental responsibility.",
        features: [
          "🌍 100% electric, zero CO₂ emissions",
          "🔇 Whisper-quiet cabin",
          "⚡ Cutting-edge technology",
        ],
        pricing: [
          { route: "Custom packages", price: "Contact for pricing" },
        ],
        cta: "Go Green in Style",
      },
    },
    contact: {
      title: "Book Your",
      titleHighlight: "Tesla Transfer",
      description: "Ready for a premium experience? Contact us now and let's arrange your luxury Tesla transfer.",
      getInTouch: "Get in Touch",
      emailUs: "Email Us",
      email: "teslaservis149@gmail.com",
      emailDesc: "Quick response guaranteed",
      serviceArea: "Service Area",
      serviceAreaDetails: "Vienna - Bratislava - Budapest",
      serviceAreaDesc: "Austria, Slovakia & beyond",
      operatingHours: "Operating Hours",
      hours: "24/7 Available",
      hoursDesc: "Round-the-clock service",
      response15min: "15-Minute Response",
      responseDesc: "Your Tesla transfer is just moments away.",
      available247: "Available",
      insured: "Insured",
      rating: "Rating",
    },
    faq: {
      title: "Frequently Asked",
      titleHighlight: "Questions",
      description: "Find answers to common questions about our premium Tesla chauffeur service.",
      items: [
        {
          question: "What areas do you serve?",
          answer: "We provide premium Tesla chauffeur services throughout major metropolitan areas and surrounding regions. Our service area includes airport transfers, city-to-city travel, and local transportation. Contact us to confirm service availability in your specific location."
        },
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking at least 24-48 hours in advance to ensure availability, especially for airport transfers or special events. However, we also accept last-minute bookings based on availability. For guaranteed service during peak times, advance booking is highly recommended."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers. Corporate accounts with invoicing options are also available for business clients. Payment is processed securely through our encrypted system."
        },
        {
          question: "Can I cancel or modify my booking?",
          answer: "Yes, you can cancel or modify your booking up to 24 hours before your scheduled pickup time without any charges. Cancellations made less than 24 hours in advance may incur a cancellation fee. Please contact us as soon as possible if you need to make changes."
        },
        {
          question: "What amenities are included?",
          answer: "All our Tesla vehicles come equipped with complimentary Wi-Fi, bottled water, phone charging cables (USB-C and Lightning), climate control, premium sound system, and spacious luggage capacity. Additional amenities can be arranged upon request for special occasions."
        }
      ]
    },
    booking: {
      step1: "Select Service",
      step2: "Select Option",
      step3: "Trip Details",
      step4: "Your Information",
      step5: "Review & Confirm",
      selectService: "Select Service",
      selectOption: "Select Option",
      tripDetails: "Trip Details",
      yourInformation: "Your Information",
      reviewConfirm: "Review & Confirm",
      back: "Back",
      continue: "Continue",
      confirm: "Confirm Booking",
      selected: "Selected",
      services: {
        airport: {
          name: "Airport Transfer",
          description: "Professional airport transfers",
          options: [
            { label: "Vienna Airport → Bratislava Airport", price: "from €120" },
            { label: "Vienna City → Bratislava City", price: "from €140" },
            { label: "Budapest Airport → Bratislava Airport", price: "from €250" },
            { label: "Budapest Airport → Vienna Airport", price: "from €280" },
          ],
        },
        viennaBratislava: {
          name: "Vienna-Bratislava Day",
          description: "Two capitals in one day",
          options: [
            { label: "Half day experience (5 hours)", price: "from €150" },
            { label: "Full day service (up to 10 hours)", price: "from €250" },
          ],
        },
        dayTours: {
          name: "Private Day Tours",
          description: "Explore Central Europe",
          options: [
            { label: "Half day tour (up to 6 hours)", price: "from €250" },
            { label: "Full day tour (8-10 hours)", price: "from €400" },
          ],
        },
        business: {
          name: "Business Transfer",
          description: "Executive corporate service",
          options: [
            { label: "Hourly business transfer", price: "from €80/hour" },
            { label: "Corporate packages", price: "Custom quotes" },
          ],
        },
        ecoLuxury: {
          name: "Eco-Luxury",
          description: "Sustainable luxury travel",
          options: [
            { label: "Custom packages", price: "Contact for pricing" },
          ],
        },
      },
      fields: {
        pickupLocation: "Pickup Location",
        destination: "Destination",
        date: "Date",
        time: "Time",
        passengers: "Passengers",
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Additional Requirements",
        required: "*",
        optional: "(Optional)",
      },
      placeholders: {
        pickupLocation: "Airport, address, or landmark",
        destination: "Destination address or landmark",
        selectDate: "Pick a date",
        selectTime: "Select time",
        selectPassengers: "Select passengers",
        enterName: "Enter your name",
        enterEmail: "your@email.com",
        enterPhone: "+421 940 631 268",
        additionalNotes: "Special requirements, luggage details, accessibility needs...",
      },
      review: {
        service: "Service",
        option: "Option",
        tripDetails: "Trip Details",
        contactInfo: "Contact Information",
        additionalNotes: "Additional Notes",
      },
      messages: {
        success: "Booking Request Sent!",
        successDesc: "We'll contact you within 15 minutes to confirm your Tesla transfer.",
        error: "Error",
        errorDesc: "Please fill in all required fields.",
      },
      email: {
        subject: "New Booking Request",
        greeting: "New booking request received:",
        bookingDetails: "Booking Details:",
        service: "Service",
        option: "Option",
        pickup: "Pickup Location",
        destination: "Destination",
        date: "Date",
        time: "Time",
        passengers: "Passengers",
        contact: "Contact Information",
        name: "Name",
        email: "Email",
        phone: "Phone",
        message: "Additional Requirements",
        footer: "Please contact the customer to confirm the booking.",
      },
      confirmation: {
        subject: "Your booking request has been received",
        greeting: "Dear",
        thankYou: "Thank you for choosing Tesla VIP Trip!",
        message: "Your booking request has been successfully received. Our representative will contact you shortly to discuss the details and confirm your reservation.",
        nextSteps: "What happens next?",
        footer: "We look forward to providing you with an exceptional travel experience. If you have any questions, feel free to contact us.",
      },
    },
  },
  de: {
    nav: {
      home: "Startseite",
      services: "Dienstleistungen",
      contact: "Kontakt",
      bookNow: "Jetzt buchen",
    },
    hero: {
      badge: "Premium Tesla Transfer Service",
      title: "Luxus Tesla",
      titleHighlight: "Transfer Service",
      subtitle: "Erleben Sie die Zukunft des Premium-Transports mit unserer Flotte von Luxus-Tesla-Fahrzeugen. Nachhaltig, leise und anspruchsvoll.",
      fullyInsured: "Voll versichert",
      available247: "24/7 verfügbar",
      fiveStarService: "5-Sterne-Service",
      bookYourRide: "Fahrt buchen",
    },
    services: {
      title: "Premium Tesla",
      titleHighlight: "Dienstleistungen",
      description: "Erleben Sie luxuriösen Transport mit unseren umfassenden Tesla-Transfer-Services",
      airport: {
        title: "Flughafentransfer",
        headline: "Stilvoll ankommen, Stress hinterlassen",
        description: "Fliegen Sie nach Wien oder Bratislava? Überspringen Sie die Taxischlangen. Ein professioneller Fahrer in einem Tesla holt Sie am Ankunftsterminal ab und bringt Sie bequem zu Ihrem Hotel.",
        features: ["Meet & Greet mit Namensschild"],
        pricing: [
          { route: "Flughafen Wien → Flughafen Bratislava", price: "ab €120" },
          { route: "Wien Stadt → Bratislava Stadt", price: "ab €140" },
          { route: "Flughafen Budapest → Flughafen Bratislava", price: "ab €250" },
          { route: "Flughafen Budapest → Flughafen Wien", price: "ab €280" },
        ],
        cta: "Transfer buchen",
      },
      viennaBratislava: {
        title: "Wien-Bratislava Tag",
        headline: "ZWEI EUROPÄISCHE HAUPTSTÄDTE AN 1 UNVERGESSLICHEM TAG",
        description: "Morgens Spaziergang durch Wiens kaiserliche Straßen, abends Dinner in Bratislavas Altstadt. Mit Ihrem persönlichen Tesla-Chauffeur ist es mühelos.",
        features: [
          "Persönlicher Fahrer für den ganzen Tag",
          "Flexible Stopps auf Anfrage",
          "Lokale Empfehlungen inklusive",
        ],
        pricing: [
          { route: "Halbtagserlebnis (5 Stunden)", price: "ab €150" },
          { route: "Ganztagesservice (bis zu 10 Stunden)", price: "ab €250" },
        ],
        cta: "Tagesausflug planen",
      },
      dayTours: {
        title: "Private Tagestouren mit Tesla",
        headline: "ERKUNDEN SIE OHNE TOURBUS-GEDRÄNGE",
        description: "Erleben Sie Mitteleuropa auf Ihre Weise - im Komfort und in der Stille eines Tesla, mit einem kundigen Fahrer als Ihrem Führer.",
        features: [
          "🍷 Niederösterreich Weinregion",
          "🏰 Slowakische Schlösser & Paläste",
          "🌇 Prag oder Budapest (1-2 Tage)",
        ],
        pricing: [
          { route: "Halbtagestour (bis zu 6 Stunden)", price: "ab €250" },
          { route: "Ganztagestour (8-10 Stunden)", price: "ab €400" },
        ],
        cta: "Tour gestalten",
      },
      business: {
        title: "Business Transfer",
        headline: "ERFOLG BEGINNT MIT DEN DETAILS",
        description: "Für Geschäftstreffen, Konferenzen und Firmenveranstaltungen in Wien und Bratislava. Professionell, diskret, immer pünktlich.",
        features: [
          "Pünktlichkeit garantiert",
          "Diskrete, professionelle Fahrer",
          "Premium-Komfort & ruhige Kabine für Anrufe",
        ],
        pricing: [
          { route: "Stündlicher Business-Transfer", price: "ab €80/Stunde" },
          { route: "Firmenpakete", price: "Individuelle Angebote" },
        ],
        cta: "Angebot anfordern",
      },
      ecoLuxury: {
        title: "Nachhaltige Luxus-Mobilität",
        headline: "Reisen Sie komfortabel. Null Emissionen. Reiner Stil.",
        description: "Erleben Sie Premium-Transport, der den Planeten nicht kompromittiert. Tesla-Chauffeur-Service verbindet Luxus mit Umweltverantwortung.",
        features: [
          "🌍 100% elektrisch, null CO₂-Emissionen",
          "🔇 Flüsterleise Kabine",
          "⚡ Modernste Technologie",
        ],
        pricing: [
          { route: "Individuelle Pakete", price: "Preis auf Anfrage" },
        ],
        cta: "Grün reisen",
      },
    },
    contact: {
      title: "Buchen Sie Ihren",
      titleHighlight: "Tesla Transfer",
      description: "Bereit für ein Premium-Erlebnis? Kontaktieren Sie uns jetzt und lassen Sie uns Ihren Luxus-Tesla-Transfer arrangieren.",
      getInTouch: "Kontakt aufnehmen",
      emailUs: "E-Mail",
      email: "teslaservis149@gmail.com",
      emailDesc: "Schnelle Antwort garantiert",
      serviceArea: "Servicegebiet",
      serviceAreaDetails: "Wien - Bratislava - Budapest",
      serviceAreaDesc: "Österreich, Slowakei & darüber hinaus",
      operatingHours: "Öffnungszeiten",
      hours: "24/7 verfügbar",
      hoursDesc: "Rund um die Uhr Service",
      response15min: "15-Minuten-Antwort",
      responseDesc: "Ihr Tesla-Transfer ist nur Momente entfernt.",
      available247: "Verfügbar",
      insured: "Versichert",
      rating: "Bewertung",
    },
    faq: {
      title: "Häufig gestellte",
      titleHighlight: "Fragen",
      description: "Finden Sie Antworten auf häufige Fragen zu unserem Premium-Tesla-Chauffeur-Service.",
      items: [
        {
          question: "Welche Gebiete bedienen Sie?",
          answer: "Wir bieten Premium-Tesla-Chauffeur-Services in großen Ballungsräumen und umliegenden Regionen an. Unser Servicegebiet umfasst Flughafentransfers, Stadt-zu-Stadt-Reisen und lokale Transporte. Kontaktieren Sie uns, um die Serviceverfügbarkeit an Ihrem Standort zu bestätigen."
        },
        {
          question: "Wie weit im Voraus sollte ich buchen?",
          answer: "Wir empfehlen, mindestens 24-48 Stunden im Voraus zu buchen, um die Verfügbarkeit sicherzustellen, insbesondere bei Flughafentransfers oder besonderen Anlässen. Wir akzeptieren jedoch auch Last-Minute-Buchungen je nach Verfügbarkeit. Für garantierte Leistungen während der Hauptzeiten wird eine Vorausbuchung dringend empfohlen."
        },
        {
          question: "Welche Zahlungsmethoden akzeptieren Sie?",
          answer: "Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, American Express), Debitkarten und Banküberweisungen. Firmenkonten mit Rechnungsoptionen sind auch für Geschäftskunden verfügbar. Die Zahlung wird sicher über unser verschlüsseltes System abgewickelt."
        },
        {
          question: "Kann ich meine Buchung stornieren oder ändern?",
          answer: "Ja, Sie können Ihre Buchung bis zu 24 Stunden vor der geplanten Abholzeit ohne Gebühren stornieren oder ändern. Stornierungen, die weniger als 24 Stunden im Voraus vorgenommen werden, können eine Stornogebühr nach sich ziehen. Bitte kontaktieren Sie uns so schnell wie möglich, wenn Sie Änderungen vornehmen möchten."
        },
        {
          question: "Welche Annehmlichkeiten sind enthalten?",
          answer: "Alle unsere Tesla-Fahrzeuge sind ausgestattet mit kostenlosem Wi-Fi, Mineralwasser, Ladekabeln für Handys (USB-C und Lightning), Klimaanlage, Premium-Soundsystem und geräumigem Gepäckraum. Zusätzliche Annehmlichkeiten können auf Anfrage für besondere Anlässe arrangiert werden."
        }
      ]
    },
    booking: {
      step1: "Service wählen",
      step2: "Option wählen",
      step3: "Reisedetails",
      step4: "Ihre Daten",
      step5: "Überprüfen & Bestätigen",
      selectService: "Service wählen",
      selectOption: "Option wählen",
      tripDetails: "Reisedetails",
      yourInformation: "Ihre Daten",
      reviewConfirm: "Überprüfen & Bestätigen",
      back: "Zurück",
      continue: "Weiter",
      confirm: "Buchung bestätigen",
      selected: "Ausgewählt",
      services: {
        airport: {
          name: "Flughafentransfer",
          description: "Professionelle Flughafentransfers",
          options: [
            { label: "Flughafen Wien → Flughafen Bratislava", price: "ab €120" },
            { label: "Wien Stadt → Bratislava Stadt", price: "ab €140" },
            { label: "Flughafen Budapest → Flughafen Bratislava", price: "ab €250" },
            { label: "Flughafen Budapest → Flughafen Wien", price: "ab €280" },
          ],
        },
        viennaBratislava: {
          name: "Wien-Bratislava Tag",
          description: "Zwei Hauptstädte an einem Tag",
          options: [
            { label: "Halbtagserlebnis (5 Stunden)", price: "ab €150" },
            { label: "Ganztagesservice (bis zu 10 Stunden)", price: "ab €250" },
          ],
        },
        dayTours: {
          name: "Private Tagestouren",
          description: "Mitteleuropa erkunden",
          options: [
            { label: "Halbtagestour (bis zu 6 Stunden)", price: "ab €250" },
            { label: "Ganztagestour (8-10 Stunden)", price: "ab €400" },
          ],
        },
        business: {
          name: "Business Transfer",
          description: "Executive Firmenservice",
          options: [
            { label: "Stündlicher Business-Transfer", price: "ab €80/Stunde" },
            { label: "Firmenpakete", price: "Individuelle Angebote" },
          ],
        },
        ecoLuxury: {
          name: "Eco-Luxus",
          description: "Nachhaltiger Luxus-Reisen",
          options: [
            { label: "Individuelle Pakete", price: "Preis auf Anfrage" },
          ],
        },
      },
      fields: {
        pickupLocation: "Abholort",
        destination: "Zielort",
        date: "Datum",
        time: "Uhrzeit",
        passengers: "Passagiere",
        name: "Vollständiger Name",
        email: "E-Mail-Adresse",
        phone: "Telefonnummer",
        message: "Zusätzliche Anforderungen",
        required: "*",
        optional: "(Optional)",
      },
      placeholders: {
        pickupLocation: "Flughafen, Adresse oder Wahrzeichen",
        destination: "Zieladresse oder Wahrzeichen",
        selectDate: "Datum wählen",
        selectTime: "Uhrzeit wählen",
        selectPassengers: "Passagiere wählen",
        enterName: "Ihren Namen eingeben",
        enterEmail: "ihre@email.com",
        enterPhone: "+421 940 631 268",
        additionalNotes: "Besondere Anforderungen, Gepäckdetails, Barrierefreiheit...",
      },
      review: {
        service: "Service",
        option: "Option",
        tripDetails: "Reisedetails",
        contactInfo: "Kontaktinformationen",
        additionalNotes: "Zusätzliche Notizen",
      },
      messages: {
        success: "Buchungsanfrage gesendet!",
        successDesc: "Wir werden Sie innerhalb von 15 Minuten kontaktieren, um Ihren Tesla-Transfer zu bestätigen.",
        error: "Fehler",
        errorDesc: "Bitte füllen Sie alle Pflichtfelder aus.",
      },
      email: {
        subject: "Neue Buchungsanfrage",
        greeting: "Neue Buchungsanfrage erhalten:",
        bookingDetails: "Buchungsdetails:",
        service: "Service",
        option: "Option",
        pickup: "Abholort",
        destination: "Zielort",
        date: "Datum",
        time: "Uhrzeit",
        passengers: "Passagiere",
        contact: "Kontaktinformationen",
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
        message: "Zusätzliche Anforderungen",
        footer: "Bitte kontaktieren Sie den Kunden, um die Buchung zu bestätigen.",
      },
      confirmation: {
        subject: "Ihre Buchungsanfrage wurde erhalten",
        greeting: "Sehr geehrte/r",
        thankYou: "Vielen Dank, dass Sie Tesla VIP Trip gewählt haben!",
        message: "Ihre Buchungsanfrage wurde erfolgreich erhalten. Unser Vertreter wird sich in Kürze mit Ihnen in Verbindung setzen, um die Details zu besprechen und Ihre Reservierung zu bestätigen.",
        nextSteps: "Was passiert als Nächstes?",
        footer: "Wir freuen uns darauf, Ihnen ein außergewöhnliches Reiseerlebnis zu bieten. Bei Fragen können Sie uns gerne kontaktieren.",
      },
    },
  },
  sk: {
    nav: {
      home: "Domov",
      services: "Služby",
      contact: "Kontakt",
      bookNow: "Rezervovať",
    },
    hero: {
      badge: "Prémiový Tesla Transfer Service",
      title: "Luxusný Tesla",
      titleHighlight: "Transfer Service",
      subtitle: "Zažite budúcnosť prémiovej dopravy s našou flotilou luxusných vozidiel Tesla. Udržateľné, tiché a sofistikované.",
      fullyInsured: "Plné poistenie",
      available247: "Dostupné 24/7",
      fiveStarService: "5-hviezdičková služba",
      bookYourRide: "Rezervovať jazdu",
    },
    services: {
      title: "Prémiové Tesla",
      titleHighlight: "Služby",
      description: "Zažite luxusnú dopravu s našimi komplexnými službami Tesla transfer",
      airport: {
        title: "Letecký transfer",
        headline: "Príďte v štýle, nechajte stres za sebou",
        description: "Letíte do Viedne alebo Bratislavy? Preskočte fronty taxíkov. Profesionálny vodič v Tesle vás vyzdvihne na prílete a pohodlne vás odvezie do vášho hotela.",
        features: ["Meet & Greet s menovkou"],
        pricing: [
          { route: "Letisko Viedeň → Letisko Bratislava", price: "od €120" },
          { route: "Viedeň Mesto → Bratislava Mesto", price: "od €140" },
          { route: "Letisko Budapešť → Letisko Bratislava", price: "od €250" },
          { route: "Letisko Budapešť → Letisko Viedeň", price: "od €280" },
        ],
        cta: "Rezervovať transfer",
      },
      viennaBratislava: {
        title: "Viedeň-Bratislava Deň",
        headline: "DVE EURÓPSKE HLAVNÉ MESTÁ V 1 NEZABUDNUTEĽNOM DNI",
        description: "Ranná prechádzka po cisárskych uliciach Viedne, večerná večera v starej časti Bratislavy. S vaším osobným vodičom Tesly je to bez námahy.",
        features: [
          "Osobný vodič na celý deň",
          "Flexibilné zastávky na požiadanie",
          "Lokálne odporúčania zahrnuté",
        ],
        pricing: [
          { route: "Polodenný zážitok (5 hodín)", price: "od €150" },
          { route: "Celodenná služba (až 10 hodín)", price: "od €250" },
        ],
        cta: "Naplánovať výlet",
      },
      dayTours: {
        title: "Súkromné dňové výlety Tesla",
        headline: "OBJAVUJTE BEZ DAVOV AUTOBUSOV",
        description: "Zažite strednú Európu po svojom - v pohodlí a tichu Tesly, s znalým vodičom ako vaším sprievodcom.",
        features: [
          "🍷 Dolnorakúska vínna oblasť",
          "🏰 Slovenské hrady a paláce",
          "🌇 Praha alebo Budapešť (1-2 dni)",
        ],
        pricing: [
          { route: "Polodenný výlet (až 6 hodín)", price: "od €250" },
          { route: "Celodenný výlet (8-10 hodín)", price: "od €400" },
        ],
        cta: "Navrhnúť výlet",
      },
      business: {
        title: "Firemný transfer",
        headline: "ÚSPECH ZAČÍNA DETAILMI",
        description: "Pre obchodné stretnutia, konferencie a firemné akcie vo Viedni a Bratislave. Profesionálne, diskrétne, vždy načas.",
        features: [
          "Pravidelnosť zaručená",
          "Diskrétni, profesionálni vodiči",
          "Prémiový komfort a tichá kabína na hovory",
        ],
        pricing: [
          { route: "Hodinový firemný transfer", price: "od €80/hodina" },
          { route: "Firemné balíčky", price: "Individuálne cenové ponuky" },
        ],
        cta: "Požiadať o ponuku",
      },
      ecoLuxury: {
        title: "Udržateľná luxusná mobilita",
        headline: "Cestujte pohodlne. Nulové emisie. Čistý štýl.",
        description: "Zažite prémiovú dopravu, ktorá nekompromituje planétu. Služba vodiča Tesly spája luxus s environmentálnou zodpovednosťou.",
        features: [
          "🌍 100% elektrické, nulové emisie CO₂",
          "🔇 Tichá kabína",
          "⚡ Najmodernejšia technológia",
        ],
        pricing: [
          { route: "Individuálne balíčky", price: "Cena na požiadanie" },
        ],
        cta: "Ísť zeleno",
      },
    },
    contact: {
      title: "Rezervujte si",
      titleHighlight: "Tesla Transfer",
      description: "Pripravení na prémiový zážitok? Kontaktujte nás teraz a dohodnime si váš luxusný Tesla transfer.",
      getInTouch: "Kontaktovať",
      emailUs: "E-mail",
      email: "teslaservis149@gmail.com",
      emailDesc: "Rýchla odpoveď zaručená",
      serviceArea: "Oblasť služby",
      serviceAreaDetails: "Viedeň - Bratislava - Budapešť",
      serviceAreaDesc: "Rakúsko, Slovensko a ďalej",
      operatingHours: "Prevádzkové hodiny",
      hours: "Dostupné 24/7",
      hoursDesc: "Služba nonstop",
      response15min: "15-minútová odpoveď",
      responseDesc: "Váš Tesla transfer je len okamihy ďaleko.",
      available247: "Dostupné",
      insured: "Poistené",
      rating: "Hodnotenie",
    },
    faq: {
      title: "Často kladené",
      titleHighlight: "otázky",
      description: "Nájdite odpovede na bežné otázky o našej prémiovej službe vodiča Tesly.",
      items: [
        {
          question: "Aké oblasti obsluhujete?",
          answer: "Poskytujeme prémiové služby vodiča Tesly v hlavných mestských oblastiach a okolitých regiónoch. Naša servisná oblasť zahŕňa letecké transfery, cesty medzi mestami a lokálnu dopravu. Kontaktujte nás, aby sme potvrdili dostupnosť služby na vašej konkrétnej lokalite."
        },
        {
          question: "Ako ďaleko dopredu by som mal rezervovať?",
          answer: "Odporúčame rezervovať aspoň 24-48 hodín dopredu, aby sme zabezpečili dostupnosť, najmä pri leteckých transferoch alebo špeciálnych udalostiach. Akceptujeme však aj rezervácie na poslednú chvíľu v závislosti od dostupnosti. Pre garantovanú službu počas špičkových čias sa dôrazne odporúča predrezervácia."
        },
        {
          question: "Aké platobné metódy akceptujete?",
          answer: "Akceptujeme všetky hlavné kreditné karty (Visa, Mastercard, American Express), debetné karty a bankové prevody. Firemné účty s možnosťou fakturácie sú k dispozícii aj pre firemných klientov. Platba je spracovaná bezpečne prostredníctvom nášho šifrovaného systému."
        },
        {
          question: "Môžem zrušiť alebo upraviť svoju rezerváciu?",
          answer: "Áno, môžete zrušiť alebo upraviť svoju rezerváciu až do 24 hodín pred plánovaným časom vyzdvihnutia bez akýchkoľvek poplatkov. Zrušenia uskutočnené menej ako 24 hodín dopredu môžu znamenať poplatok za zrušenie. Prosím, kontaktujte nás čo najskôr, ak potrebujete vykonať zmeny."
        },
        {
          question: "Aké vymoženosti sú zahrnuté?",
          answer: "Všetky naše vozidlá Tesla sú vybavené bezplatným Wi-Fi, fľaškovou vodou, káblami na nabíjanie telefónov (USB-C a Lightning), klimatizáciou, prémiovým zvukovým systémom a priestrannou kapacitou batožiny. Dodatočné vymoženosti môžu byť na požiadanie zariadené pre špeciálne príležitosti."
        }
      ]
    },
    booking: {
      step1: "Vybrať službu",
      step2: "Vybrať možnosť",
      step3: "Detaily cesty",
      step4: "Vaše údaje",
      step5: "Kontrola a potvrdenie",
      selectService: "Vybrať službu",
      selectOption: "Vybrať možnosť",
      tripDetails: "Detaily cesty",
      yourInformation: "Vaše údaje",
      reviewConfirm: "Kontrola a potvrdenie",
      back: "Späť",
      continue: "Pokračovať",
      confirm: "Potvrdiť rezerváciu",
      selected: "Vybrané",
      services: {
        airport: {
          name: "Letecký transfer",
          description: "Profesionálne letecké transfery",
          options: [
            { label: "Letisko Viedeň → Letisko Bratislava", price: "od €120" },
            { label: "Viedeň Mesto → Bratislava Mesto", price: "od €140" },
            { label: "Letisko Budapešť → Letisko Bratislava", price: "od €250" },
            { label: "Letisko Budapešť → Letisko Viedeň", price: "od €280" },
          ],
        },
        viennaBratislava: {
          name: "Viedeň-Bratislava Deň",
          description: "Dve hlavné mestá za jeden deň",
          options: [
            { label: "Polodenný zážitok (5 hodín)", price: "od €150" },
            { label: "Celodenná služba (až 10 hodín)", price: "od €250" },
          ],
        },
        dayTours: {
          name: "Súkromné dňové výlety",
          description: "Objavovať strednú Európu",
          options: [
            { label: "Polodenný výlet (až 6 hodín)", price: "od €250" },
            { label: "Celodenný výlet (8-10 hodín)", price: "od €400" },
          ],
        },
        business: {
          name: "Firemný transfer",
          description: "Executive firemná služba",
          options: [
            { label: "Hodinový firemný transfer", price: "od €80/hodina" },
            { label: "Firemné balíčky", price: "Individuálne cenové ponuky" },
          ],
        },
        ecoLuxury: {
          name: "Eko-Luxus",
          description: "Udržateľné luxusné cestovanie",
          options: [
            { label: "Individuálne balíčky", price: "Cena na požiadanie" },
          ],
        },
      },
      fields: {
        pickupLocation: "Miesto vyzdvihnutia",
        destination: "Cieľ",
        date: "Dátum",
        time: "Čas",
        passengers: "Cestujúci",
        name: "Celé meno",
        email: "E-mailová adresa",
        phone: "Telefónne číslo",
        message: "Ďalšie požiadavky",
        required: "*",
        optional: "(Voliteľné)",
      },
      placeholders: {
        pickupLocation: "Letisko, adresa alebo orientačný bod",
        destination: "Cieľová adresa alebo orientačný bod",
        selectDate: "Vybrať dátum",
        selectTime: "Vybrať čas",
        selectPassengers: "Vybrať cestujúcich",
        enterName: "Zadajte svoje meno",
        enterEmail: "vas@email.com",
        enterPhone: "+421 940 631 268",
        additionalNotes: "Špeciálne požiadavky, detaily batožiny, potreby prístupnosti...",
      },
      review: {
        service: "Služba",
        option: "Možnosť",
        tripDetails: "Detaily cesty",
        contactInfo: "Kontaktné informácie",
        additionalNotes: "Ďalšie poznámky",
      },
      messages: {
        success: "Rezervačná požiadavka odoslaná!",
        successDesc: "Kontaktujeme vás do 15 minút, aby sme potvrdili váš Tesla transfer.",
        error: "Chyba",
        errorDesc: "Prosím, vyplňte všetky povinné polia.",
      },
      email: {
        subject: "Nová rezervačná požiadavka",
        greeting: "Prijatá nová rezervačná požiadavka:",
        bookingDetails: "Detaily rezervácie:",
        service: "Služba",
        option: "Možnosť",
        pickup: "Miesto vyzdvihnutia",
        destination: "Cieľ",
        date: "Dátum",
        time: "Čas",
        passengers: "Cestujúci",
        contact: "Kontaktné informácie",
        name: "Meno",
        email: "E-mail",
        phone: "Telefón",
        message: "Ďalšie požiadavky",
        footer: "Prosím, kontaktujte zákazníka, aby ste potvrdili rezerváciu.",
      },
      confirmation: {
        subject: "Vaša rezervačná požiadavka bola prijatá",
        greeting: "Vážený/á",
        thankYou: "Ďakujeme, že ste si vybrali Tesla VIP Trip!",
        message: "Vaša rezervačná požiadavka bola úspešne prijatá. Náš zástupca vás čoskoro kontaktuje, aby prediskutoval detaily a potvrdil vašu rezerváciu.",
        nextSteps: "Čo sa stane ďalej?",
        footer: "Tešíme sa, že vám poskytneme výnimočný zážitok z cestovania. Ak máte nejaké otázky, neváhajte nás kontaktovať.",
      },
    },
  },
  ru: {
    nav: {
      home: "Главная",
      services: "Услуги",
      contact: "Контакты",
      bookNow: "Заказать",
    },
    hero: {
      badge: "Премиальный сервис трансфера Tesla",
      title: "Роскошный Tesla",
      titleHighlight: "Трансфер",
      subtitle: "Окунитесь в будущее премиального транспорта с нашим парком роскошных автомобилей Tesla. Экологично, бесшумно и изысканно.",
      fullyInsured: "Полная страховка",
      available247: "Доступно 24/7",
      fiveStarService: "Сервис 5 звезд",
      bookYourRide: "Забронировать поездку",
    },
    services: {
      title: "Премиальные услуги",
      titleHighlight: "Tesla",
      description: "Насладитесь роскошным транспортом с нашими комплексными услугами трансфера Tesla",
      airport: {
        title: "Трансфер из аэропорта",
        headline: "Прибывайте в стиле, оставьте стресс позади",
        description: "Летите в Вену или Братиславу? Пропустите очереди такси. Профессиональный водитель на Tesla встретит вас в аэропорту и комфортно доставит в отель.",
        features: ["Встреча с табличкой"],
        pricing: [
          { route: "Аэропорт Вены → Аэропорт Братиславы", price: "от €120" },
          { route: "Вена Город → Братислава Город", price: "от €140" },
          { route: "Аэропорт Будапешта → Аэропорт Братиславы", price: "от €250" },
          { route: "Аэропорт Будапешта → Аэропорт Вены", price: "от €280" },
        ],
        cta: "Забронировать трансфер",
      },
      viennaBratislava: {
        title: "Вена-Братислава День",
        headline: "ДВЕ ЕВРОПЕЙСКИЕ СТОЛИЦЫ ЗА 1 НЕЗАБЫВАЕМЫЙ ДЕНЬ",
        description: "Утренняя прогулка по императорским улицам Вены, вечерний ужин в старом городе Братиславы. С вашим личным водителем Tesla это легко.",
        features: [
          "Личный водитель на весь день",
          "Гибкие остановки по запросу",
          "Местные рекомендации включены",
        ],
        pricing: [
          { route: "Полудневный опыт (5 часов)", price: "от €150" },
          { route: "Полный день (до 10 часов)", price: "от €250" },
        ],
        cta: "Спланировать поездку",
      },
      dayTours: {
        title: "Частные дневные туры на Tesla",
        headline: "ИССЛЕДУЙТЕ БЕЗ ТОЛПЫ ТУРИСТИЧЕСКИХ АВТОБУСОВ",
        description: "Испытайте Центральную Европу по-своему - в комфорте и тишине Tesla, с опытным водителем в качестве вашего гида.",
        features: [
          "🍷 Винный регион Нижней Австрии",
          "🏰 Словацкие замки и дворцы",
          "🌇 Прага или Будапешт (1-2 дня)",
        ],
        pricing: [
          { route: "Полудневный тур (до 6 часов)", price: "от €250" },
          { route: "Полный день (8-10 часов)", price: "от €400" },
        ],
        cta: "Создать тур",
      },
      business: {
        title: "Деловой трансфер",
        headline: "УСПЕХ НАЧИНАЕТСЯ С ДЕТАЛЕЙ",
        description: "Для деловых встреч, конференций и корпоративных мероприятий в Вене и Братиславе. Профессионально, конфиденциально, всегда вовремя.",
        features: [
          "Пунктуальность гарантирована",
          "Деликатные, профессиональные водители",
          "Премиальный комфорт и тихая кабина для звонков",
        ],
        pricing: [
          { route: "Почасовой деловой трансфер", price: "от €80/час" },
          { route: "Корпоративные пакеты", price: "Индивидуальные предложения" },
        ],
        cta: "Запросить предложение",
      },
      ecoLuxury: {
        title: "Устойчивая роскошная мобильность",
        headline: "Путешествуйте с комфортом. Нулевые выбросы. Чистый стиль.",
        description: "Испытайте премиальный транспорт, который не вредит планете. Сервис водителя Tesla сочетает роскошь с экологической ответственностью.",
        features: [
          "🌍 100% электрический, нулевые выбросы CO₂",
          "🔇 Тихую кабину",
          "⚡ Передовые технологии",
        ],
        pricing: [
          { route: "Индивидуальные пакеты", price: "Цена по запросу" },
        ],
        cta: "Путешествовать экологично",
      },
    },
    contact: {
      title: "Забронируйте",
      titleHighlight: "Трансфер Tesla",
      description: "Готовы к премиальному опыту? Свяжитесь с нами сейчас, и мы организуем ваш роскошный трансфер Tesla.",
      getInTouch: "Связаться",
      emailUs: "Email",
      email: "teslaservis149@gmail.com",
      emailDesc: "Быстрый ответ гарантирован",
      serviceArea: "Зона обслуживания",
      serviceAreaDetails: "Вена - Братислава - Будапешт",
      serviceAreaDesc: "Австрия, Словакия и далее",
      operatingHours: "Часы работы",
      hours: "Доступно 24/7",
      hoursDesc: "Круглосуточный сервис",
      response15min: "Ответ за 15 минут",
      responseDesc: "Ваш трансфер Tesla всего в нескольких минутах.",
      available247: "Доступно",
      insured: "Застраховано",
      rating: "Рейтинг",
    },
    faq: {
      title: "Часто задаваемые",
      titleHighlight: "вопросы",
      description: "Найдите ответы на распространенные вопросы о нашем премиальном сервисе водителя Tesla.",
      items: [
        {
          question: "Какие районы вы обслуживаете?",
          answer: "Мы предоставляем премиальные услуги водителя Tesla в крупных городских районах и прилегающих регионах. Наша зона обслуживания включает трансферы из аэропорта, поездки между городами и местный транспорт. Свяжитесь с нами, чтобы подтвердить доступность услуги в вашем конкретном месте."
        },
        {
          question: "Как далеко заранее мне следует забронировать?",
          answer: "Мы рекомендуем бронировать как минимум за 24-48 часов, чтобы обеспечить доступность, особенно для трансферов из аэропорта или особых мероприятий. Однако мы также принимаем бронирования в последнюю минуту в зависимости от наличия. Для гарантированного сервиса в пиковые времена настоятельно рекомендуется предварительное бронирование."
        },
        {
          question: "Какие способы оплаты вы принимаете?",
          answer: "Мы принимаем все основные кредитные карты (Visa, Mastercard, American Express), дебетовые карты и банковские переводы. Корпоративные счета с вариантами выставления счетов также доступны для бизнес-клиентов. Оплата обрабатывается безопасно через нашу зашифрованную систему."
        },
        {
          question: "Могу ли я отменить или изменить бронирование?",
          answer: "Да, вы можете отменить или изменить бронирование до 24 часов до запланированного времени отправления без каких-либо сборов. Отмены, сделанные менее чем за 24 часа, могут повлечь плату за отмену. Пожалуйста, свяжитесь с нами как можно скорее, если вам нужно внести изменения."
        },
        {
          question: "Какие удобства включены?",
          answer: "Все наши автомобили Tesla оснащены бесплатным Wi-Fi, бутилированной водой, кабелями для зарядки телефонов (USB-C и Lightning), климат-контролем, премиальной звуковой системой и просторным багажным отсеком. Дополнительные удобства могут быть организованы по запросу для особых случаев."
        }
      ]
    },
    booking: {
      step1: "Выбрать услугу",
      step2: "Выбрать опцию",
      step3: "Детали поездки",
      step4: "Ваша информация",
      step5: "Проверка и подтверждение",
      selectService: "Выбрать услугу",
      selectOption: "Выбрать опцию",
      tripDetails: "Детали поездки",
      yourInformation: "Ваша информация",
      reviewConfirm: "Проверка и подтверждение",
      back: "Назад",
      continue: "Продолжить",
      confirm: "Подтвердить бронирование",
      selected: "Выбрано",
      services: {
        airport: {
          name: "Трансфер из аэропорта",
          description: "Профессиональные трансферы из аэропорта",
          options: [
            { label: "Аэропорт Вены → Аэропорт Братиславы", price: "от €120" },
            { label: "Вена Город → Братислава Город", price: "от €140" },
            { label: "Аэропорт Будапешта → Аэропорт Братиславы", price: "от €250" },
            { label: "Аэропорт Будапешта → Аэропорт Вены", price: "от €280" },
          ],
        },
        viennaBratislava: {
          name: "Вена-Братислава День",
          description: "Две столицы за один день",
          options: [
            { label: "Полудневный опыт (5 часов)", price: "от €150" },
            { label: "Полный день (до 10 часов)", price: "от €250" },
          ],
        },
        dayTours: {
          name: "Частные дневные туры",
          description: "Исследовать Центральную Европу",
          options: [
            { label: "Полудневный тур (до 6 часов)", price: "от €250" },
            { label: "Полный день (8-10 часов)", price: "от €400" },
          ],
        },
        business: {
          name: "Деловой трансфер",
          description: "Корпоративный сервис",
          options: [
            { label: "Почасовой деловой трансфер", price: "от €80/час" },
            { label: "Корпоративные пакеты", price: "Индивидуальные предложения" },
          ],
        },
        ecoLuxury: {
          name: "Эко-Люкс",
          description: "Устойчивое роскошное путешествие",
          options: [
            { label: "Индивидуальные пакеты", price: "Цена по запросу" },
          ],
        },
      },
      fields: {
        pickupLocation: "Место отправления",
        destination: "Место назначения",
        date: "Дата",
        time: "Время",
        passengers: "Пассажиры",
        name: "Полное имя",
        email: "Email адрес",
        phone: "Номер телефона",
        message: "Дополнительные требования",
        required: "*",
        optional: "(Необязательно)",
      },
      placeholders: {
        pickupLocation: "Аэропорт, адрес или ориентир",
        destination: "Адрес назначения или ориентир",
        selectDate: "Выберите дату",
        selectTime: "Выберите время",
        selectPassengers: "Выберите пассажиров",
        enterName: "Введите ваше имя",
        enterEmail: "ваш@email.com",
        enterPhone: "+421 940 631 268",
        additionalNotes: "Особые требования, детали багажа, потребности доступности...",
      },
      review: {
        service: "Услуга",
        option: "Опция",
        tripDetails: "Детали поездки",
        contactInfo: "Контактная информация",
        additionalNotes: "Дополнительные заметки",
      },
      messages: {
        success: "Запрос на бронирование отправлен!",
        successDesc: "Мы свяжемся с вами в течение 15 минут, чтобы подтвердить ваш трансфер Tesla.",
        error: "Ошибка",
        errorDesc: "Пожалуйста, заполните все обязательные поля.",
      },
      email: {
        subject: "Новый запрос на бронирование",
        greeting: "Получен новый запрос на бронирование:",
        bookingDetails: "Детали бронирования:",
        service: "Услуга",
        option: "Опция",
        pickup: "Место отправления",
        destination: "Место назначения",
        date: "Дата",
        time: "Время",
        passengers: "Пассажиры",
        contact: "Контактная информация",
        name: "Имя",
        email: "Email",
        phone: "Телефон",
        message: "Дополнительные требования",
        footer: "Пожалуйста, свяжитесь с клиентом, чтобы подтвердить бронирование.",
      },
      confirmation: {
        subject: "Ваш запрос на бронирование получен",
        greeting: "Уважаемый/ая",
        thankYou: "Спасибо за выбор Tesla VIP Trip!",
        message: "Ваш запрос на бронирование успешно получен. Наш представитель свяжется с вами в ближайшее время, чтобы обсудить детали и подтвердить вашу бронь.",
        nextSteps: "Что происходит дальше?",
        footer: "Мы с нетерпением ждем возможности предоставить вам незабываемые впечатления от путешествия. Если у вас есть вопросы, не стесняйтесь обращаться к нам.",
      },
    },
  },
};

