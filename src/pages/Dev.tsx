import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Handshake,
  Rocket,
  Code,
  Workflow,
  Brain,
  CheckCircle,
  ArrowRight,
  ArrowDown
} from 'lucide-react';
import { HeroGeometric } from '../components/ui/hero-geometric';
import { ElegantShape } from '../components/ui/elegant-shape';
import { Button } from '../components/ui/button';
import { cn } from '@/lib/utils';

const Dev: React.FC = () => {
  const scrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('booking-cta');
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

  return (
    <div className="bg-[#030303]">
      {/* Hero Section */}
      <HeroGeometric
        title1="Software Development"
        title2="Built for Growth"
        description="Custom software solutions designed by entrepreneurs who understand what it takes to scale. We build with strategy, not just code."
        primaryActionText="Book a Development Call"
        primaryActionHref="https://cal.com/bliztic/dev"
        secondaryActionText="Continue"
        secondaryActionHref="#why-partner"
        tertiaryActionText="Dev Fund"
        tertiaryActionHref="#development-funding"
        hideAdditionalButtons={true}
      />

      {/* Why Partner Section */}
      <section id="why-partner" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Why Partner With Bliztic?
            </h2>
            <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
              We're not your typical dev shop. We build software the way operators build businesses.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Fast & Precise Development</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We ship quickly without sacrificing quality. Clean code, modern architecture, and built to scale from day one.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">True Partnership</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We don't just write code and disappear. We're invested in your success and build with your long-term goals in mind.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Growth-Driven Approach</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Every feature we build is designed to drive revenue, reduce costs, or unlock new opportunities for your business.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built by Operators Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-blue-500/[0.02] blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Built by Conversion Experts, Not Just Developers
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              We've been in your shoes. We've built businesses, scaled teams, and learned what actually matters when shipping software. We're entrepreneurs first, developers second.
            </p>
            <div className="text-left max-w-2xl mx-auto space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-white/60 leading-relaxed">
                  <span className="text-white font-medium">We understand your business.</span> Not just your tech stack.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-white/60 leading-relaxed">
                  <span className="text-white font-medium">We build strategically.</span> Every line of code serves your growth goals.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                <p className="text-white/60 leading-relaxed">
                  <span className="text-white font-medium">We're connected.</span> Access to our network of operators and investors.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our Specialties
            </h2>
            <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
              From MVPs to enterprise tools, we build software that solves real business problems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center mb-4">
                  <Code className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">SaaS Products</h3>
                <p className="text-white/60 leading-relaxed">
                  Full-stack web applications with modern architecture. Scalable, secure, and built for recurring revenue.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center mb-4">
                  <Workflow className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">Automation & Integrations</h3>
                <p className="text-white/60 leading-relaxed">
                  Connect your tools, automate workflows, and eliminate manual processes that slow you down.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">AI-Powered Tools</h3>
                <p className="text-white/60 leading-relaxed">
                  Leverage cutting-edge AI to automate decisions, generate insights, and create competitive advantages.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/10 flex items-center justify-center mb-4">
                  <Rocket className="w-7 h-7 text-rose-400" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">MVPs & Prototypes</h3>
                <p className="text-white/60 leading-relaxed">
                  Validate your idea fast. We'll build a functional prototype to test with users and investors.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-blue-500/[0.02] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How We Work Together
            </h2>
            <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
              A proven process designed for speed, clarity, and results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: "01",
                title: "Discovery Call",
                description: "We learn about your business, goals, and technical needs to ensure we're the right fit."
              },
              {
                number: "02",
                title: "Scope & Strategy",
                description: "We map out the project, define deliverables, and create a roadmap aligned with your growth."
              },
              {
                number: "03",
                title: "Build & Iterate",
                description: "We ship fast in sprints, gathering feedback and refining as we go."
              },
              {
                number: "04",
                title: "Launch & Scale",
                description: "We deploy your solution and provide ongoing support to ensure continued success."
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
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                  <div className="text-4xl font-bold text-blue-400/30 mb-4">{step.number}</div>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Opportunities Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-cyan-500/[0.05] blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.1}
            width={400}
            height={100}
            rotate={-10}
            gradient="from-blue-500/[0.12]"
            className="left-[-5%] top-[20%]"
          />
          <ElegantShape
            delay={0.2}
            width={300}
            height={80}
            rotate={15}
            gradient="from-cyan-500/[0.12]"
            className="right-[-5%] bottom-[20%]"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-cyan-500/[0.05] rounded-3xl" />

              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Looking to Partner on a Project?
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  We occasionally take on equity partnerships or revenue-share deals for the right projects. If you have a compelling idea and are looking for a technical co-founder or development partner, let's talk.
                </p>

                <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="text-white font-semibold text-lg mb-4">We're interested if you have:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <p className="text-white/70">A validated idea with early traction or clear market demand</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <p className="text-white/70">A compelling business model with revenue potential</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                      <p className="text-white/70">The right team and domain expertise to execute</p>
                    </div>
                  </div>
                </div>

                <a
                  href="#booking-cta"
                  onClick={scrollToBooking}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "px-8 py-3 rounded-full",
                    "bg-white text-[#030303]",
                    "font-medium",
                    "transform transition duration-300",
                    "hover:scale-105 hover:shadow-glow"
                  )}
                >
                  Discuss Partnership Opportunities
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Development Funding Section */}
      <section id="development-funding" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] via-transparent to-blue-500/[0.02] blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-emerald-500/[0.08] to-blue-500/[0.08] backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 md:p-10 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-6">
              <Rocket className="w-8 h-8 text-emerald-400" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Looking for Development Funding?
            </h2>

            <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              The Bliztic Development Fund provides up to $20,000 in development credits to ambitious founders ready to build something meaningful. If you have a clear vision that needs technical execution, we're here to support you. <br />(Seperate from GTM Fund)
            </p>

            <a
              href="/fund"
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-3 rounded-full",
                "bg-white text-[#030303]",
                "font-medium",
                "transform transition duration-300",
                "hover:scale-105 hover:shadow-glow"
              )}
              onClick={() => window.scrollTo(0, 0)}
            >
              Learn About Development Funding
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="booking-cta" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.1}
            width={400}
            height={100}
            rotate={-10}
            gradient="from-blue-500/[0.10]"
            className="left-[-5%] top-[20%]"
          />
          <ElegantShape
            delay={0.2}
            width={300}
            height={80}
            rotate={15}
            gradient="from-cyan-500/[0.10]"
            className="right-[-5%] bottom-[20%]"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-4">
              Let's Build Something Great
            </h2>
            <p className="text-white/40 mb-8 max-w-3xl mx-auto text-lg">
              Book a 30-minute intro call to discuss your project, explore partnership opportunities, or just talk shop about software and growth.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
                href="https://cal.com/bliztic/dev"
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
                Book Your Development Call
              </a>
              <p className="text-white/40 text-sm">
                Or email us directly at{' '}
                <a
                  href="mailto:dev@bliztic.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  dev@bliztic.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dev;
