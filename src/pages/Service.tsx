import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, DollarSign, Star, Users, Zap, Calendar, ArrowRight } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import { cn } from '@/lib/utils';

const Service: React.FC = () => {
  const workflows = [
    {
      title: "Automatic Lead Follow-up",
      description: "Automatically follows up on leads without manual effort, ensuring no potential customer falls through the cracks.",
      icon: Users
    },
    {
      title: "Estimate Nudges & Reminders", 
      description: "Sends nudges and reminders on open estimates to keep your sales pipeline moving forward.",
      icon: Star
    },
    {
      title: "Cold Quote Revival",
      description: "Revives cold quotes without manual effort, turning stale opportunities into active prospects.",
      icon: Clock
    },
    {
      title: "Review & Testimonial Requests",
      description: "Sends review and testimonial requests after completed jobs to boost your online reputation.",
      icon: DollarSign
    },
    {
      title: "Appointment Confirm & Prep",
      description: "Auto-reminders and prep info to reduce no-shows and improve customer experience.",
      icon: Calendar
    },
    {
      title: "Team Task & Job Updates",
      description: "Automatically sends team members daily or job-specific updates, task reminders, and status changes—keeping everyone aligned without endless calls or texts.",
      icon: Users
    }
  ];

  const benefits = [
    {
      title: "Quick revenue boost",
      description: "Recover lost leads and increase booking rates by 10–20% with no extra ad spend.",
      icon: DollarSign
    },
    {
      title: "Improved cash flow",
      description: "Faster booking means faster payment cycles.",
      icon: Zap
    },
    {
      title: "Better online reputation",
      description: "More reviews improve local rankings and inbound leads.",
      icon: Star
    },
    {
      title: "Reduced no-shows",
      description: "Reminders improve appointment adherence.",
      icon: CheckCircle
    },
    {
      title: "Low risk, easy entry",
      description: "Affordable monthly fee with immediate value.",
      icon: Users
    },
    {
      title: "Time savings",
      description: "Automates repetitive outreach so staff can focus on service delivery.",
      icon: Clock
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
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
              Plug n Play Automations for Contractors & Service Businesses
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/60 leading-relaxed mb-8"
            >
              Save hours every week, boost bookings, and improve customer experience—without complicated onboarding.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button
                onClick={scrollToContact}
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-8 py-4 rounded-full",
                  "bg-white text-[#030303]",
                  "text-lg font-medium",
                  "transform transition duration-300",
                  "hover:scale-105 hover:shadow-glow"
                )}
              >
                Get Your Free Systems Audit
              </button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* Product Overview */}
      <section className="relative py-20 bg-[#040404] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6">
              Ready-to-Go Automated Workflows
            </h2>
            <p className="text-xl text-white/40 max-w-3xl mx-auto">
              Our plug-and-play automations are ready-to-go 3–5 step automated workflows designed for rapid deployment with minimal setup. Get up and running in days, not months.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workflows.map((workflow, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "p-8",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.02]",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                <div className={cn(
                  "inline-flex items-center justify-center",
                  "w-14 h-14 rounded-full mb-6",
                  "bg-gradient-to-br from-indigo-500/20 to-rose-500/20",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "group-hover:scale-110 group-hover:border-white/10"
                )}>
                  <workflow.icon className="h-7 w-7 text-white/80 transform transition-all duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{workflow.title}</h3>
                <p className="text-white/60 leading-relaxed">{workflow.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section */}
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
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6">
              ROI & Benefits
            </h2>
            <p className="text-xl text-white/40 max-w-3xl mx-auto">
              See immediate results with our proven automation systems designed specifically for contractors and service businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "p-8",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.02]",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                <div className={cn(
                  "inline-flex items-center justify-center",
                  "w-14 h-14 rounded-full mb-6",
                  "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "group-hover:scale-110 group-hover:border-white/10"
                )}>
                  <benefit.icon className="h-7 w-7 text-white/80 transform transition-all duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-white/60 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact-form" className="relative bg-[#050505] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.1}
            width={400}
            height={100}
            rotate={-10}
            gradient="from-indigo-500/[0.10]"
            className="left-[-5%] top-[20%]"
          />
          <ElegantShape
            delay={0.2}
            width={300}
            height={80}
            rotate={15}
            gradient="from-rose-500/[0.10]"
            className="right-[-5%] bottom-[20%]"
          />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6">
              Want to see exactly where you could save 12 hours per week?
            </h2>
            <p className="text-white/40 mb-8 max-w-3xl mx-auto text-lg">
              Book a free 10-minute audit call—no strings attached.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className={cn(
              "bg-[#0a0a0a]/40 backdrop-blur-sm",
              "border border-white/5",
              "p-8 rounded-2xl",
              "transform transition-all duration-500",
              "hover:bg-[#0a0a0a]/60 hover:border-white/10",
              "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            )}>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                <p className="text-white/60 mb-8">
                  Our systems audit will show you exactly where automation can save you time and increase your revenue. 
                  It's completely free and takes just 10 minutes.
                </p>
                <div className="space-y-4">
                  <Link
                    to="/qualify"
                    className={cn(
                      "inline-flex items-center justify-center w-full",
                      "px-8 py-4 rounded-full",
                      "bg-white text-[#030303]",
                      "text-lg font-medium",
                      "transform transition duration-300",
                      "hover:scale-105 hover:shadow-glow",
                      "group"
                    )}
                  >
                    Book Your Free Audit Call
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-white/40 text-sm">
                    No sales pitch. Just actionable insights you can use immediately.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Service;