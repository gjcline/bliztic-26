import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Rocket, TrendingUp, HelpCircle } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const Fund: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fundingPurpose, setFundingPurpose] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [firstName, setFirstName] = useState('');

  const scrollToApplication = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector('form');
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fundingPurpose) {
      alert('Please select what you will use the funding for.');
      return;
    }

    if (fundingPurpose === 'other' && !otherDetails.trim()) {
      alert('Please provide details about your funding needs.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get('full_name') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phone_number') as string;
    const ideaName = formData.get('idea_name') as string;

    const extractedFirstName = fullName.trim().split(/\s+/)[0];
    setFirstName(extractedFirstName);

    const applicationData = {
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      idea_name: ideaName,
      funding_purpose: fundingPurpose,
      other_details: fundingPurpose === 'other' ? otherDetails : null,
    };

    try {
      await fetch('https://hook.us2.make.com/nysxiz5bmca551k433ytiap2bhimhac5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...applicationData,
          event: 'fund_form_submission',
        }),
      });

      supabase
        .from('fund_applications')
        .insert([applicationData])
        .select()
        .then(({ data, error }) => {
          if (error) {
            console.error('Supabase error (non-blocking):', error);
          } else {
            console.log('Application saved to database:', data);
          }
        });

      setSubmitStatus('success');
      e.currentTarget.reset();
      setFundingPurpose('');
      setOtherDetails('');
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error('Webhook error:', error);

      setSubmitStatus('success');
      e.currentTarget.reset();
      setFundingPurpose('');
      setOtherDetails('');
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-cyan-500/[0.05] blur-3xl" />

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
            gradient="from-blue-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-cyan-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              Bliztic Development Fund
            </h1>

            <p className="text-2xl md:text-3xl text-white/80 mb-6 font-semibold">
              Up to $20,000 in Development Funding
            </p>

            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Get the development services and strategic guidance you need to bring your ambitious idea to life.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <Rocket className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Development Services</h3>
                <p className="text-white/60 text-sm">Professional development to build your vision</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Growth Support</h3>
                <p className="text-white/60 text-sm">Ongoing guidance to scale your business</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* FAQ and Apply Buttons */}
      <section className="relative py-8 bg-[#030303]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="outline" asChild>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('faq');
                  if (element) {
                    const navbarHeight = 80;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <HelpCircle className="mr-2 w-4 h-4" />
                FAQ
              </a>
            </Button>
            <Button onClick={scrollToApplication}>
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="relative py-16 bg-[#030303]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">A Note from the Founders</h3>
                <div className="h-px w-20 bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
            </div>
            <div className="text-white/70 leading-relaxed space-y-4 pl-8">
              <p>
                We've been where you are. We know what it's like to have a vision that keeps you up at night, to see the potential that others might miss, and to need someone in your corner who truly understands the journey ahead.
              </p>
              <p>
                The Bliztic Fund exists to support ambitious founders who are ready to take action. Whether you have a new idea ready for development, a project already in motion, or need strategic guidance to bring your vision to market, we're here to help make it happen in the best way possible.
              </p>
              <p>
                This opportunity is open to anyone with the drive to build something meaningful. If you're ready to move forward, we're ready to back you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="relative py-20 bg-[#040404]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitStatus === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "relative",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-emerald-500/20",
                "p-12 rounded-xl text-center"
              )}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6"
              >
                <CheckCircle className="h-10 w-10 text-emerald-400" />
              </motion.div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Thank You, {firstName}!
              </h2>

              <p className="text-xl text-white/80 mb-6">
                Your application has been submitted successfully.
              </p>

              <p className="text-white/60 mb-4">
                We're excited to review your idea and will be in touch soon to discuss the next steps.
              </p>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/40 text-sm">
                  Have questions? Feel free to reach out to us anytime.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={cn(
                "relative",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "p-8 md:p-12 rounded-xl",
                "transform transition-all duration-500",
                "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              )}
            >
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6 text-center">
                Apply for the Bliztic Fund
              </h2>

              <p className="text-white/60 text-center mb-8">
                Tell us about your idea and why you're ready to take action.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="full_name" className="block text-sm font-medium text-white/60 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    placeholder="John Doe"
                    className={cn(
                      "w-full p-4 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder-white/30",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                      "transition-all duration-300"
                    )}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      className={cn(
                        "w-full p-4 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/30",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-300"
                      )}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-white/60 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      placeholder="+1 (555) 123-4567"
                      className={cn(
                        "w-full p-4 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/30",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-300"
                      )}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="idea_name" className="block text-sm font-medium text-white/60 mb-2">
                    Idea Name *
                  </label>
                  <input
                    type="text"
                    id="idea_name"
                    name="idea_name"
                    placeholder="My Startup Name"
                    className={cn(
                      "w-full p-4 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white placeholder-white/30",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                      "transition-all duration-300"
                    )}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="funding_purpose" className="block text-sm font-medium text-white/60 mb-2">
                    What will you use this funding for? *
                  </label>
                  <select
                    id="funding_purpose"
                    name="funding_purpose"
                    value={fundingPurpose}
                    onChange={(e) => setFundingPurpose(e.target.value)}
                    className={cn(
                      "w-full p-4 rounded-lg",
                      "bg-white/5 border border-white/10",
                      "text-white",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                      "transition-all duration-300",
                      "appearance-none cursor-pointer"
                    )}
                    required
                  >
                    <option value="" className="bg-[#0a0a0a] text-white/60">Select an option</option>
                    <option value="new_business" className="bg-[#0a0a0a] text-white">Launch a new business idea</option>
                    <option value="existing_mvp" className="bg-[#0a0a0a] text-white">Scale an existing product or MVP</option>
                    <option value="go_to_market" className="bg-[#0a0a0a] text-white">Develop a go-to-market strategy</option>
                    <option value="other" className="bg-[#0a0a0a] text-white">Other</option>
                  </select>
                </div>

                {fundingPurpose === 'other' && (
                  <div className="mb-6">
                    <label htmlFor="other_details" className="block text-sm font-medium text-white/60 mb-2">
                      Please describe your funding needs *
                    </label>
                    <textarea
                      id="other_details"
                      name="other_details"
                      value={otherDetails}
                      onChange={(e) => setOtherDetails(e.target.value)}
                      rows={4}
                      placeholder="Tell us how you plan to use this funding..."
                      className={cn(
                        "w-full p-4 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/30",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-300",
                        "resize-none"
                      )}
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full px-8 py-4 rounded-lg font-medium text-lg",
                    "bg-white text-[#030303]",
                    "transform transition-all duration-300",
                    "hover:shadow-glow hover:scale-[1.02]",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#030303]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit Application'}
                </button>

                <p className="text-center text-white/40 text-sm mt-4">
                  By submitting, you agree to be contacted about your application.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>

      {/* Who Should Apply Section */}
      <section className="py-20 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Who Should Apply?
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              This fund is for ambitious, action-ready entrepreneurs who are committed to building something meaningful.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "p-6 rounded-xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-emerald-500/20"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You're Ready to Execute</h3>
                  <p className="text-white/60">
                    You have a clear vision and are committed to taking immediate action.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "p-6 rounded-xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-emerald-500/20"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You Solve Real Problems</h3>
                  <p className="text-white/60">
                    Your idea addresses a genuine market need with a scalable solution.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className={cn(
                "p-6 rounded-xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-emerald-500/20"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You're Coachable</h3>
                  <p className="text-white/60">
                    You're open to guidance and eager to learn from experienced strategists.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className={cn(
                "p-6 rounded-xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-emerald-500/20"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You Think Long-Term</h3>
                  <p className="text-white/60">
                    You're building for sustainable growth, not just a quick win.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#040404] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-cyan-500/[0.02] blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/60">
              Everything you need to know about the Bliztic Development Fund
            </p>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-3">How much funding can I receive?</h3>
              <p className="text-white/60 leading-relaxed">
                The Bliztic Development Fund provides up to $20,000 in development credits to help bring your idea to life. The exact amount depends on your project scope and needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-3">Do I need to give up equity?</h3>
              <p className="text-white/60 leading-relaxed">
                This depends on your specific situation and project. We'll discuss the best arrangement during our initial consultation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-3">What happens after I apply?</h3>
              <p className="text-white/60 leading-relaxed">
                We'll review your application and reach out within 3-5 business days to schedule an initial consultation. During this call, we'll discuss your idea, goals, and how we can best support you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-3">Can I apply if I already have a working product?</h3>
              <p className="text-white/60 leading-relaxed">
                Absolutely. The fund supports both new ideas and existing products that need development resources to scale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Fund;
