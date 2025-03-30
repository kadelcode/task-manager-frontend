import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
    { question: "Is there a free plan?", answer: "Yes! We offer a free plan with basic features." },
    { question: "Can I cancel anytime?", answer: "Absolutely. You can cancel your subscription anytime." },
    { question: "Do you have a mobile app?", answer: "Yes, available on iOS & Android." },
    { question: "How do I reset my password?", answer: "You can reset your password by clicking 'Forgot Password' on the login page." },
    { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and bank transfers." },
    { question: "Is my data secure?", answer: "Yes, we use industry-standard encryption to protect your data." },
    { question: "Do you offer customer support?", answer: "Yes, our support team is available 24/7 to assist you." },
  ];

export default function FAQ() {
    return (
        <section id="faq" className="px-6 py-16 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto mt-6">
                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={String(index)} >
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem >
                    ))}
                </Accordion>
            </div>
        </section>
    )
}