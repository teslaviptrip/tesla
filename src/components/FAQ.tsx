import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
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
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our premium Tesla chauffeur service.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50"
            >
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
