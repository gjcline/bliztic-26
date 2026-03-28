import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "What is the Conversion Diagnostic Review?",
    answer: "The CDR is a focused diagnostic session where we analyze your campaign's structure, messaging, and flow to identify conversion leaks. You'll receive a clear breakdown of what's holding your campaigns back and actionable solutions to fix it."
  },
  {
    question: "Who is the CDR for?",
    answer: "The CDR is designed for businesses running active campaigns who want to optimize their conversion performance. It's ideal for teams that have traffic but aren't seeing the conversion results they expected."
  },
  {
    question: "How do I get invited to a CDR session?",
    answer: "The CDR is invitation-only for select businesses. We carefully review each request to ensure it's a good fit. Book a consultation call, and if your situation aligns with what we specialize in, we'll extend an invitation to a CDR session."
  },
  {
    question: "What happens during the session?",
    answer: "During the CDR, we conduct a live diagnostic of your campaign—examining messaging, structure, flow, and key conversion points. You'll receive real-time insights and a clear breakdown of what's leaking conversions and how to fix it."
  },
  {
    question: "What happens after the CDR?",
    answer: "After the session, you'll have actionable recommendations you can implement immediately. If you need help with implementation or want ongoing optimization support, we can discuss partnership options tailored to your needs."
  },
  {
    question: "Do you work with agencies?",
    answer: "Yes. We actively partner with agencies looking to enhance their client offerings and scale their capabilities. Our collaborative partnerships include access to our design, development, and growth services, allowing agencies to deliver stronger results for their clients."
  }
];

function FAQ() {
  return (
    <div className="w-full py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                  Common Questions
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-white/40 text-left">
                  Find answers to frequently asked questions about our services, process, and how we can help your business grow through automation and strategic solutions.
                </p>
              </div>
              <div className="">
                <a
                  href="/about"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/about';
                    window.scrollTo(0, 0);
                  }}
                >
                  About Us <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQ };