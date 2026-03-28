import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Target, Zap, Rocket, TrendingUp, Sparkles } from 'lucide-react';
import { SparklesText } from '../components/ui/sparkles-text';
import { FAQ } from '../components/ui/faq-section';
import { cn } from '@/lib/utils';

const Offers: React.FC = () => {
  return (
    <>
      {/* What We Do Best Section */}
      <section id="what-we-do-best" className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.02] via-transparent to-cyan-500/[0.02]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What We Do Best
            </h2>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              Comprehensive solutions built by entrepreneurs for entrepreneurs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Development Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true }}
            >
              <Link
                to="/dev"
                onClick={() => window.scrollTo(0, 0)}
                className="group relative overflow-hidden rounded-xl h-full block bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/5 p-8 transform transition-all duration-300 hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-white/10 group-hover:shadow-lg">
                    <Rocket className="h-7 w-7 text-white/80 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Software Development</h3>
                  <p className="text-white/40 leading-relaxed transition-colors duration-300 group-hover:text-white/50">
                    Custom software solutions built for scale. From concept to production, we deliver strategic, production-ready applications that drive real business results.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* GTM Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true }}
            >
              <Link
                to="/services"
                onClick={() => window.scrollTo(0, 0)}
                className="group relative overflow-hidden rounded-xl h-full block bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/5 p-8 transform transition-all duration-300 hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-white/10 group-hover:shadow-lg">
                    <TrendingUp className="h-7 w-7 text-white/80 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Go-To-Market Strategy</h3>
                  <p className="text-white/40 leading-relaxed transition-colors duration-300 group-hover:text-white/50">
                    End-to-end GTM strategies that drive results. From positioning to execution, we help you capture markets and scale with precision.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* CDR Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true }}
            >
              <a
                href="#cdr-section"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('cdr-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative overflow-hidden rounded-xl h-full block bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/5 p-8 transform transition-all duration-300 hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 bg-gradient-to-br from-orange-500/20 to-rose-500/20 border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-white/10 group-hover:shadow-lg">
                    <Search className="h-7 w-7 text-white/80 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Conversion Diagnostic Review</h3>
                  <p className="text-white/40 leading-relaxed transition-colors duration-300 group-hover:text-white/50">
                    Our signature diagnostic session identifies hidden conversion leaks and delivers actionable solutions.
                  </p>
                </div>
              </a>
            </motion.div>

            {/* Fund Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
              viewport={{ once: true }}
            >
              <Link
                to="/fund"
                onClick={() => window.scrollTo(0, 0)}
                className="group relative overflow-hidden rounded-xl h-full block bg-[#0a0a0a]/40 backdrop-blur-sm border border-white/5 p-8 transform transition-all duration-300 hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-white/10 group-hover:shadow-lg">
                    <Sparkles className="h-7 w-7 text-white/80 transition-all duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Bliztic Fund</h3>
                  <p className="text-white/40 leading-relaxed transition-colors duration-300 group-hover:text-white/50">
                    Funding opportunities for entrepreneurs with transformative ideas. We partner with innovative founders to accelerate growth and turn visions into reality.
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CDR Section */}
      <section id="cdr-section" className="py-20 bg-[#040404] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 pb-2 flex flex-wrap items-center justify-center gap-x-3">
              <span>The</span>
              <SparklesText
                text="Magic"
                className="text-3xl md:text-5xl font-bold inline-block"
                colors={{ first: "#60A5FA", second: "#06B6D4" }}
                sparklesCount={8}
              />
              <span>of a Bliztic CDR Session</span>
            </h2>
            <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
              Many teams are stuck adjusting the wrong variables in their campaigns, tweaking messaging or budgets while the real conversion blockers sit right beneath the surface, unnoticed.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">The Problem</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Most teams are closer to strong conversions than they realize, but focus on the wrong fixes.
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
                  <Search className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Our Approach</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We analyze your campaign structure, messaging, and flow to identify what is leaking conversions.
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
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-rose-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-rose-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">Your Results</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  You leave with a clear diagnostic and actionable solutions you can implement immediately.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Invitation Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12 text-center"
          >
            <p className="text-white/90 font-medium text-lg">
              This is an invitation only session for select businesses ready to optimize their conversion performance.
            </p>
          </motion.div>

          {/* Dual CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/qualify"
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-3 rounded-full",
                "bg-white text-[#030303]",
                "font-medium",
                "transform transition duration-300",
                "hover:scale-105 hover:shadow-glow",
                "min-w-[180px]"
              )}
            >
              Request a Call
            </Link>
            <Link
              to="/expertise"
              onClick={() => window.scrollTo(0, 0)}
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-3 rounded-full",
                "bg-white/5 hover:bg-white/10 border border-white/10",
                "text-white font-medium",
                "transform transition duration-300",
                "hover:scale-105 hover:shadow-glow",
                "min-w-[180px]"
              )}
            >
              Our Expertise <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#030303]">
        <FAQ />
      </section>
    </>
  );
};

export default Offers;
