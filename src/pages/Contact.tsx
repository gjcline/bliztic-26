import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Phone, MapPin, CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import { cn } from '@/lib/utils';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('https://hook.us2.make.com/tpynj8pcarfootuo7b36k7w6xu7wtqho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formObject),
      });
      
      const data = await response.json();
      
      // Log the response for debugging
      console.log('Webhook response:', data);
      
      if (data && (data.success === true || data.success === 'true')) {
        setSubmitStatus('success');
        // Add null check before resetting the form
        if (e.currentTarget) {
          e.currentTarget.reset();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#030303]">
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              Get in Touch
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Ready to accelerate your business growth? Our team of experts is here to help.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* Contact Information and Form */}
      <section className="relative py-20 bg-[#040404]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6">
                Contact Information
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Have questions about our services or want to schedule a free consultation? Reach out to us using any of the methods below.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className={cn(
                    "p-3 rounded-lg mr-4",
                    "bg-white/5 group-hover:bg-white/10",
                    "border border-white/10 group-hover:border-white/20",
                    "transition-all duration-300"
                  )}>
                    <MapPin className="h-6 w-6 text-white/60 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Main Office</h3>
                    <p className="text-white/60">Dallas, TX</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className={cn(
                    "p-3 rounded-lg mr-4",
                    "bg-white/5 group-hover:bg-white/10",
                    "border border-white/10 group-hover:border-white/20",
                    "transition-all duration-300"
                  )}>
                    <Mail className="h-6 w-6 text-white/60 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <p className="text-white/60">info@bliztic.com</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className={cn(
                    "p-3 rounded-lg mr-4",
                    "bg-white/5 group-hover:bg-white/10",
                    "border border-white/10 group-hover:border-white/20",
                    "transition-all duration-300"
                  )}>
                    <MessageSquare className="h-6 w-6 text-white/60 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Business Hours</h3>
                    <p className="text-white/60">Monday - Friday: 9AM - 6PM EST</p>
                    <p className="text-white/60">Saturday - Sunday: Closed</p>
                  </div>
                </div>

                <Link
                  to="/qualify"
                  className="flex items-start group"
                >
                  <div className={cn(
                    "p-3 rounded-lg mr-4",
                    "bg-white/5 group-hover:bg-white/10",
                    "border border-white/10 group-hover:border-white/20",
                    "transition-all duration-300"
                  )}>
                    <Calendar className="h-6 w-6 text-white/60 group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 flex items-center">
                      Book a Call
                      <ArrowRight className="ml-2 h-5 w-5 text-white/60 group-hover:text-white transition-all group-hover:translate-x-1" />
                    </h3>
                    <p className="text-white/60">Schedule a free consultation with our team</p>
                  </div>
                </Link>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/60 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={cn(
                        "w-full p-3 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/40",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                        "transition-all duration-300"
                      )}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white/60 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={cn(
                        "w-full p-3 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/40",
                        "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                        "transition-all duration-300"
                      )}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={cn(
                      "w-full p-3 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder-white/40",
                      "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                      "transition-all duration-300"
                    )}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-white/60 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={cn(
                      "w-full p-3 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder-white/40",
                      "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                      "transition-all duration-300"
                    )}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="company" className="block text-sm font-medium text-white/60 mb-1">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className={cn(
                      "w-full p-3 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder-white/40",
                      "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                      "transition-all duration-300"
                    )}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-white/60 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className={cn(
                      "w-full p-3 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder-white/40",
                      "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                      "transition-all duration-300"
                    )}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={cn(
                      "w-full p-3 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder-white/40",
                      "focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20",
                      "transition-all duration-300"
                    )}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="consent"
                      className="h-4 w-4 bg-white/5 border-white/10 rounded focus:ring-white/20"
                    />
                    <span className="ml-2 text-sm text-white/60">I agree to receive communications from Bliztic</span>
                  </label>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </motion.div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-4 p-3 rounded-lg bg-rose-500/10 text-rose-400 text-sm">
                    There was an error sending your message. Please try again.
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full px-6 py-3 rounded-lg font-medium",
                    "bg-white text-[#030303]",
                    "transform transition-all duration-300",
                    "hover:shadow-glow hover:scale-[1.02]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#040404]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/40 max-w-3xl mx-auto">
              Find answers to common questions about our services and consultation process
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <h3 className="text-xl font-bold text-white mb-2">How does the free consultation work?</h3>
                <p className="text-white/60">
                  Our free consultation is a 30-minute call with one of our experts to discuss your business needs and challenges. We'll provide initial insights and recommend potential solutions tailored to your situation.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <h3 className="text-xl font-bold text-white mb-2">Do you partner with other agencies?</h3>
                <p className="text-white/60">
                  Yes. We actively partner with agencies looking to enhance their client offerings and scale their capabilities. Our collaborative partnerships include access to our design, development, and growth services, allowing agencies to tackle larger projects, attract new business, and elevate their industry presence.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <h3 className="text-xl font-bold text-white mb-2">What industries do you work in?</h3>
                <p className="text-white/60">
                  We’re open to partnering with businesses from all industries. Our adaptable solutions are specifically designed to meet the unique needs and challenges of any sector.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <h3 className="text-xl font-bold text-white mb-2">How long does a typical project take?</h3>
                <p className="text-white/60">
                  Project timelines vary depending on scope and complexity. Simple automation implementations might take 1-2 weeks, while comprehensive digital transformations can span 6-12 weeks. We provide detailed timelines during the proposal phase.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <h3 className="text-xl font-bold text-white mb-2">Do you work with small businesses or only enterprise clients?</h3>
                <p className="text-white/60">
                  We work with businesses of all sizes, from startups to Fortune 500 companies. Our solutions are scalable and can be tailored to fit different budgets and organizational requirements.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <h3 className="text-xl font-bold text-white mb-2">What sets Bliztic apart from other consultancies?</h3>
                <p className="text-white/60">
                  Our unique strength lies in our integrated approach to automation and market growth. Unlike firms that focus solely on technology or strategy, we combine both disciplines to deliver comprehensive solutions that drive measurable business outcomes.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;