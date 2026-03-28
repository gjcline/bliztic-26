import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Target, TrendingUp, Shield, Receipt, Building2, Unlock, HelpCircle } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const GTMFund: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fundingPurpose, setFundingPurpose] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [firstName, setFirstName] = useState('');

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
    const companyName = formData.get('company_name') as string;

    const extractedFirstName = fullName.trim().split(/\s+/)[0];
    setFirstName(extractedFirstName);

    const applicationData = {
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      company_name: companyName,
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
          event: 'gtm_fund_form_submission',
        }),
      });

      supabase
        .from('gtm_fund_applications')
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
              Bliztic Fund
            </h1>

            <p className="text-2xl md:text-3xl text-white/80 mb-6 font-semibold">
              Strategic GTM Infrastructure Funding
            </p>

            <p className="text-xl text-white/60 leading-relaxed mb-8">
              We transform go-to-market infrastructure across ambitious companies in all stages.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">GTM Infrastructure Assessment</h3>
                <p className="text-white/60 text-sm">Comprehensive diagnostic of your sales, marketing, and revenue operations</p>
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
                <h3 className="text-white font-semibold mb-2">Growth Partnership</h3>
                <p className="text-white/60 text-sm">Ongoing strategic support to optimize and scale your GTM motion</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <Button size="lg" variant="outline" asChild>
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
                  <HelpCircle className="mr-2 w-5 h-5" />
                  FAQ
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
              A streamlined process designed to move quickly and deliver clarity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "01",
                title: "Submit Your Application",
                description: "Complete the form below to tell us about your company and GTM infrastructure needs."
              },
              {
                number: "02",
                title: "Initial Assessment Call",
                description: "We'll schedule a diagnostic call to understand your operational health across key revenue systems."
              },
              {
                number: "03",
                title: "Receive Your Score",
                description: "Within 48-72 hours, we'll present your operational health score, explain what it means, and outline your funding eligibility."
              },
              {
                number: "04",
                title: "Move Forward Together",
                description: "If there's alignment, we'll formalize the partnership and begin building."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-blue-500/5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <div className="text-4xl font-bold text-blue-400/30 mb-4">{step.number}</div>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-cyan-500/[0.04] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Terms
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-3">
              Quarterly Allocation Cycles
            </h3>
            <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
              Grants are distributed quarterly to a limited number of qualified companies per cycle.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "No Equity Required",
                description: "All grants are awarded with no equity payback. Our non-dilutive funds are connected to our development team and partnered platforms."
              },
              {
                icon: Receipt,
                title: "Tax Implications",
                description: "Funding is structured to minimize tax implications for your business."
              },
              {
                icon: Building2,
                title: "Defining Parameters",
                description: "Our Fund aims to serve ambitious companies under 10M ARR"
              },
              {
                icon: Unlock,
                title: "No Long Term Obligations",
                description: "There is no commitment or contracts in place beyond the fund"
              }
            ].map((term, index) => {
              const Icon = term.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-blue-500/5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                    <Icon className="h-8 w-8 text-blue-400/70 mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-3">{term.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{term.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Should Apply Section */}
      <section className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-cyan-500/[0.02] blur-2xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              This fund is for growth-focused companies with operational fundamentals in place and ambition to scale.
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
                "border border-emerald-500/20",
                "transition-all duration-300",
                "hover:bg-blue-500/5 hover:border-emerald-500/30"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You're Ready to Scale</h3>
                  <p className="text-white/60">
                    You have product-market fit and are committed to building repeatable GTM systems.
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
                "border border-emerald-500/20",
                "transition-all duration-300",
                "hover:bg-blue-500/5 hover:border-emerald-500/30"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You Have Clear Revenue Goals</h3>
                  <p className="text-white/60">
                    You know your numbers and understand what infrastructure gaps are limiting growth.
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
                "border border-emerald-500/20",
                "transition-all duration-300",
                "hover:bg-blue-500/5 hover:border-emerald-500/30"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You Value Partnership</h3>
                  <p className="text-white/60">
                    You're open to Bliztic's strategic guidance and collaboration.
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
                "border border-emerald-500/20",
                "transition-all duration-300",
                "hover:bg-blue-500/5 hover:border-emerald-500/30"
              )}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">You Think Systematically</h3>
                  <p className="text-white/60">
                    You're building for long-term efficiency and scalability, not quick fixes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative py-20 bg-[#030303] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Common questions about the Bliztic Fund, eligibility, and how it works.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 hover:border-blue-500/20 transition-all duration-300"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  What is the purpose of the Bliztic Fund?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  The Bliztic Fund provides non-dilutive grant funding to eligible companies to support development, operational upgrades, and growth initiatives. Funds are applied directly towards approved project builds, with no equity required by default.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  How is funding allocated?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Funding is allocated based on your company's performance across predefined scoring criteria. Each allocation is applied towards your total build or operational cost, meaning the grant may cover all or part of your project depending on your score and available fund capital for that quarter.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  Do I need to pay back the grant?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  No. All grants are non-dilutive, meaning you retain full ownership of your company, and there is no repayment obligation. Our hope is that companies will choose to stick with us to run and operate their developed system long term. This is how we will recoup our investment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  What happens if my grant doesn't cover the full project cost?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Allocated funds are applied towards your total build or operational costs. If your project exceeds the grant amount, the remaining balance would need to be covered through your own capital or other funding sources. We outline this clearly during the scoring process to avoid surprises.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  How do I apply and how long does it take to get funded?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Applications are submitted through our site. Once approved, an initial consultation is scheduled, followed by a review call within 48 to 72 hours to discuss your eligible allocation. Funding is then applied directly to your project, with the full process typically completed within 4 to 5 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  Can the funding be used for any type of project?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Yes, including but not limited to operational upgrades, software or product development, sales infrastructure, and go-to-market systems. Projects are evaluated during the scoring process to ensure they align with the Fund's goals and resources.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  How do you decide how much funding I receive?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Funding is determined by a combination of your operational score and the capital remaining in the Fund for that quarter. Your score establishes your eligibility range, and available allocations determine the final awarded amount.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  How is my operational score calculated?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Your operational score is calculated using our diagnostic scorecard, which evaluates revenue performance, growth trajectory, operational readiness, scalability, and overall market positioning. This ensures funding decisions are objective and based on measurable business fundamentals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  What does the ongoing relationship look like?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  There is no mandatory long term commitment beyond development. Companies that choose to retain Bliztic as a growth partner to operate, refine, and scale the system may continue on a simple month to month agreement.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  How much equity do I need to give up to receive this funding?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  The Bliztic Fund is primarily non-dilutive, so no equity is required to receive funding. In cases where total project cost exceeds the grant allocation, we have previously structured equity arrangements to cover that difference or help manage ongoing operational expenses. But, equity is entirely optional, has no impact on your scoring, and is simply a tool to reduce additional capital requirements if necessary. The default remains no equity, and your ownership stays fully intact unless you choose otherwise.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-blue-400">
                  How does Bliztic make money on the fund?
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  Transparently, our goal is for companies to choose Bliztic to operate and maintain the systems we build. We make upfront investments in companies we believe have long term potential, aiming to recoup our investment over 8 to 12 months and beyond. There are no obligations, but we earn our returns by delivering results and continuing as a growth partner when it makes sense.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="relative py-16 bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-cyan-500/[0.02]" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-10 hover:border-blue-500/20 transition-all duration-300"
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
                We've built and scaled GTM systems across dozens of companies. We know what separates high-performing revenue engines from those stuck in manual chaos. The Bliztic Fund exists to partner with ambitious companies ready to scale their go-to-market infrastructure.
              </p>
              <p>
                We run this fund quarterly, allocating grants to companies that demonstrate strong fundamentals and clear growth potential. Our goal is to establish long-term relationships with partners who are serious about building scalable, repeatable revenue systems.
              </p>
              <p>
                If you're ready to revolutionize your go-to-market, we're ready to support you.
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
                We're excited to review your company and will be in touch soon to discuss the next steps.
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
                Tell us about your company and why you're ready to scale your GTM infrastructure.
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
                  <label htmlFor="company_name" className="block text-sm font-medium text-white/60 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    placeholder="Acme Inc."
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
                    <option value="optimize_sales" className="bg-[#0a0a0a] text-white">Optimize sales infrastructure</option>
                    <option value="build_outbound" className="bg-[#0a0a0a] text-white">Build outbound systems</option>
                    <option value="scale_lead_gen" className="bg-[#0a0a0a] text-white">Scale lead generation</option>
                    <option value="develop_gtm" className="bg-[#0a0a0a] text-white">Develop GTM strategy</option>
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
                  ) : 'Continue'}
                </button>

                <p className="text-center text-white/40 text-sm mt-4">
                  By submitting, you agree to be contacted about your application.
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default GTMFund;
