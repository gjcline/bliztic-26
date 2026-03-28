import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import { BookCallWidget } from '../components/ui/book-call-widget';
import { cn } from '@/lib/utils';

const Partner: React.FC = () => {
  const steps = [
    {
      title: "Qualification & Discovery",
      description: "We'll assess if we're a good fit for each other, diving into your agency's goals, needs, and current capabilities. Through this process, we qualify your agency to ensure alignment with our services, setting the stage for a productive and sustainable partnership."
    },
    {
      title: "Initial Consultation",
      description: "The initial consultation is about aligning expectations and ensuring both parties understand each other's goals, objectives, and vision for the partnership ahead."
    },
    {
      title: "Solution Mapping & Service Exploration",
      description: "We'll review all the services we offer and identify the ones that best fit your agency's needs. Together, we'll pinpoint the most relevant solutions that will drive the greatest impact for your clients."
    },
    {
      title: "Customization of Services & Tailored Proposal",
      description: "The service(s) you've selected will then be tailored to fit seamlessly into your agency's operations. A detailed proposal will be created, outlining the specific services, delivery timelines, and pricing structure, ensuring everything aligns with the agency's goals and expectations."
    },
    {
      title: "Establishing Partnership Expectations & Alignment",
      description: "With tailored service plans now in place, we'll align our core values and establish the framework that will guide our partnership moving forward to ensure we agree on goals, expectations, communication, and the processes that will drive mutual success."
    },
    {
      title: "Partnership Agreement",
      description: "With expectations and framework clearly defined, we'll formalize our partnership through a comprehensive agreement. This outlines the terms, pricing, and scope of services, ensuring both parties are aligned and committed to the shared goals and structure we've set."
    },
    {
      title: "Seamless Integration",
      description: "With our partnership agreement in place, we'll integrate our services into your agency's workflow by providing all the necessary training, resources, and ongoing support to ensure a smooth transition and set the foundation for a successful, long-term collaboration."
    }
  ];

  const supportItems = [
    'Marketing & Sales Support',
    'Client Engagement',
    'Expedited Service Delivery & Fulfillment',
    'Performance Reviews & Optimization',
    'Dedicated Agency Support & Growth Resources'
  ];

  const getItemDescription = (item: string): string => {
    const descriptions: { [key: string]: string } = {
      'Marketing & Sales Support': 'Access comprehensive marketing resources and sales enablement tools to effectively promote and sell our services.',
      'Client Engagement': 'Proven frameworks and strategies to enhance client relationships and deliver exceptional experiences.',
      'Expedited Service Delivery & Fulfillment': 'Fast-track implementation and delivery processes to ensure rapid time-to-value for your clients.',
      'Performance Reviews & Optimization': 'Regular performance analysis and optimization recommendations to maximize partnership benefits.',
      'Dedicated Agency Support & Growth Resources': 'Exclusive access to specialized resources and dedicated support team for your agency\'s growth.'
    };
    return descriptions[item] || '';
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
        
        <div className="absolute inset-0 opacity-30">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
            >
              Agency Partnership Opportunities
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/60 leading-relaxed mb-8"
            >
              Access our full range of development, design, and growth services to elevate your client offerings.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <a
                href="#transform-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('transform-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-8 py-3 rounded-full",
                  "bg-white text-[#030303]",
                  "font-medium",
                  "transform transition duration-300",
                  "hover:scale-105 hover:shadow-glow"
                )}
              >
                Explore Partnership Opportunities
              </a>
              <p className="text-white/40 text-sm mt-4">*subject to qualification</p>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* Transform Section */}
      <section id="transform-section" className="relative py-20 bg-[#040404] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-8">
              Transform Your Agency's Offering with Expert Solutions
            </h2>
            <p className="text-lg text-white/60 mb-8">
              Leverage our design and development team to expand your service offerings and unlock new business opportunities. By incorporating our advanced solutions, your agency can take on larger, more complex projects, attract new clients, and strengthen your reputation in the industry. This partnership positions you to elevate client relationships, establish yourself as a trusted leader, and scale your agency for sustained growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="relative py-20 bg-[#030303] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-4">
              Collaborative Onboarding
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              A structured approach to building successful partnerships
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20
                }}
                viewport={{ once: true }}
                className={cn(
                  "relative",
                  "bg-gradient-to-br from-[#0a0a0a]/50 to-[#0a0a0a]/70",
                  "backdrop-blur-sm",
                  "border-2 border-white/[0.2]",
                  "p-8 md:p-10 rounded-2xl",
                  "transform transition-all duration-500 ease-out",
                  "hover:bg-gradient-to-br hover:from-[#0a0a0a]/70 hover:to-[#0a0a0a]/90",
                  "hover:border-white/30",
                  "hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]",
                  "hover:scale-[1.03]",
                  "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-r after:from-transparent after:via-white/[0.05] after:to-transparent after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100",
                  "group"
                )}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-10 h-10 rounded-full",
                      "bg-gradient-to-br from-indigo-500/40 to-rose-500/40",
                      "border-2 border-white/25",
                      "flex items-center justify-center",
                      "text-white font-bold",
                      "transform transition-all duration-500 ease-out",
                      "group-hover:scale-125",
                      "group-hover:border-white/40",
                      "group-hover:from-indigo-500/50 group-hover:to-rose-500/50",
                      "group-hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]",
                      "group-hover:rotate-[360deg]"
                    )}>
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-xl font-bold",
                      "bg-clip-text text-transparent",
                      "bg-gradient-to-r from-white via-white to-white/90",
                      "mb-3 transform transition-all duration-500",
                      "group-hover:from-white group-hover:via-white/95 group-hover:to-white/90",
                      "group-hover:scale-105"
                    )}>{step.title}</h3>
                    <p className="text-white/60 leading-relaxed transition-all duration-500 group-hover:text-white/80 group-hover:translate-x-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Perks */}
      <section className="relative py-20 bg-[#040404] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={cn(
              "relative",
              "bg-[#0a0a0a]/40 backdrop-blur-sm",
              "border border-white/5",
              "p-12 rounded-xl text-center",
              "transform transition-all duration-500",
              "hover:bg-[#0a0a0a]/60 hover:border-white/10",
              "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6">
              Exclusive Agency Partner Perks
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
              We value our partnerships deeply and are committed to growing alongside you. That's why we offer exclusive perks, priority access, and personalized support tailored to your needs. From customized resources to dedicated assistance, these benefits are designed to help you scale quickly and succeed at every step. With us, you're not just a partner, you're a priority.
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "relative",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "p-8 rounded-xl",
                "transform transition-all duration-500",
                "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              )}
            >
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300 transition-colors duration-300">
                Ongoing Support & Growth
              </h3>
            </motion.div>
            {supportItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "relative",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "p-8 rounded-xl",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <h3 className={cn(
                  "text-2xl font-bold bg-clip-text text-transparent transition-colors duration-300",
                  index % 3 === 0 && "bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 hover:from-blue-300 hover:via-cyan-300 hover:to-teal-300",
                  index % 3 === 1 && "bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 hover:from-rose-300 hover:via-red-300 hover:to-orange-300",
                  index % 3 === 2 && "bg-gradient-to-r from-emerald-400 via-green-400 to-lime-400 hover:from-emerald-300 hover:via-green-300 hover:to-lime-300"
                )}>
                  {item}
                </h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/qualify"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-3 rounded-full",
                "bg-white text-[#030303]",
                "font-medium",
                "transform transition duration-300",
                "hover:scale-105 hover:shadow-glow"
              )}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>
      
      {/* Floating Book Call Widget */}
      <BookCallWidget />
    </>
  );
};

export default Partner;