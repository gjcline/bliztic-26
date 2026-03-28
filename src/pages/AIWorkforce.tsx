import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, TrendingUp, Cpu, Shield, CheckCircle, Zap, Brain, Lock, Users, MessageSquare, Calendar, Timer } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import { Button } from '../components/ui/button';
import { FeatureCard } from '../components/ui/grid-feature-cards';
import { TeamFeatureCards } from '../components/ui/team-feature-cards';
import { CpuArchitecture } from '../components/ui/cpu-architecture';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const AIWorkforce: React.FC = () => {
  const [formStep, setFormStep] = useState<'form' | 'loading' | 'booking'>('form');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company_name: '',
    website: '',
    team_size: '',
    role: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormStep('loading');

    try {
      await fetch('https://hook.us2.make.com/w4iw1ro0avib8w556laxa3402k3dmqtl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-make-apikey': 'Ss-gfCNCXFEXw2-4',
        },
        body: JSON.stringify(formData),
      });

      setTimeout(() => {
        setFormStep('booking');
      }, 2500);

    } catch (error) {
      console.error('Webhook error:', error);
      setTimeout(() => {
        setFormStep('booking');
      }, 2500);
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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              Double your output without doubling your payroll.
            </h1>

            <p className="text-2xl md:text-3xl text-white/80 mb-12 font-light leading-relaxed">
              Ultra-intelligent agents built around your business, working around the clock.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
              <Button size="lg" asChild>
                <a
                  href="#cost-calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('cost-calculator');
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
                  See What It Costs
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* Anything and Everything Section */}
      <section className="py-32 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.03] blur-3xl" />

        {/* CPU Architecture Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.25 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex items-center justify-center z-[1]"
        >
          <div className="w-full h-full max-w-7xl mx-auto scale-150">
            <CpuArchitecture />
          </div>
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100 leading-tight pb-2">
              Anything and Everything
            </h2>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-4xl mx-auto">
              Define the outcome you want, and the AI workforce figures out how to do it. No predefined roles. They don't just execute tasks, they think through problems, learn your business and takes care of whatever you need it to.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Built for Your Whole Team Section */}
      <section className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamFeatureCards
            title="Built for Your Whole Team"
            subtitle="Everyone stays connected, aligned, and moving forward together."
            items={[
              {
                title: "Keep Everyone Connected",
                description: "Your AI workforce manages updates and visibility across the team so strategy stays aligned and management stays simple.",
                icon: <Users className="h-16 w-16 text-blue-400" />
              },
              {
                title: "Streamline Communication",
                description: "Automatically updates teammates on task progress, eliminating the need for constant status meetings and check-ins. Everyone knows where things stand without asking.",
                icon: <MessageSquare className="h-16 w-16 text-blue-400" />
              },
              {
                title: "Daily Action Plans",
                description: "Creates personalized daily plans for each team member, schedules meetings between teammates, and ensures priorities are clear and aligned.",
                icon: <Calendar className="h-16 w-16 text-blue-400" />
              },
              {
                title: "Save Everyone Time",
                description: "Analyzes calls, creates meeting briefs, prepares documentation, and handles the administrative work that eats into productive hours.",
                icon: <Timer className="h-16 w-16 text-blue-400" />
              }
            ]}
          />
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-cyan-500/[0.04] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Core Capabilities
            </h2>
            <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
              Built for reliability, designed for scale, optimized for your workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "24/7 Operation",
                description: "Never sleeps, never takes breaks. Your agents are always on, handling tasks around the clock."
              },
              {
                icon: Brain,
                title: "Learns and Adapts",
                description: "Continuously improves from every interaction, becoming more effective over time."
              },
              {
                icon: Cpu,
                title: "Built Around You",
                description: "If you can describe what you need, we figure out how to make it happen."
              },
              {
                icon: Lock,
                title: "Private and Secure",
                description: "Hosted privately on Bliztic servers with enterprise-grade security protocols."
              }
            ].map((capability, index) => {
              const Icon = capability.icon;
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
                    <Icon className="h-10 w-10 text-blue-400/70 mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-3">{capability.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{capability.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gets Smarter Over Time Section */}
      <section className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-blue-500/[0.02] blur-2xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mb-6">
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Gets Smarter Over Time
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8">
              This isn't static software. Your AI workforce adapts to your workflows, learns your preferences, and evolves with your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Pattern Recognition",
                description: "Identifies recurring workflows and optimizes them automatically."
              },
              {
                icon: Brain,
                title: "Contextual Understanding",
                description: "Learns the nuances of your business to make better decisions."
              },
              {
                icon: TrendingUp,
                title: "Continuous Improvement",
                description: "Every task completed makes the next one faster and more accurate."
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className={cn(
                    "p-6 rounded-xl",
                    "bg-[#0a0a0a]/40 backdrop-blur-sm",
                    "border border-white/10",
                    "transition-all duration-300",
                    "hover:bg-blue-500/5 hover:border-blue-500/30"
                  )}
                >
                  <Icon className="h-8 w-8 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-white/50 italic max-w-2xl mx-auto">
              It feels less like software, more like a real team member who knows your business inside and out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy and Security Section */}
      <section className="py-20 bg-[#030303] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 mb-6">
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Privacy and Security
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Your data stays yours. Built with security-first architecture from day one.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Private Hosting",
                description: "Deployed on dedicated Bliztic servers. Your data never touches third-party infrastructure."
              },
              {
                title: "Data Compliance",
                description: "Built to meet enterprise security standards and regulatory requirements."
              },
              {
                title: "Security-First Architecture",
                description: "End-to-end encryption, role-based access controls, and continuous security monitoring."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className={cn(
                  "p-8 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-emerald-500/20",
                  "transition-all duration-300",
                  "hover:bg-emerald-500/5 hover:border-emerald-500/30"
                )}
              >
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator Form Section */}
      <section id="cost-calculator" className="relative py-20 bg-[#040404]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {formStep === 'form' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
                See What AI Workforce Costs For Your Team
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="full_name" className="block text-sm font-medium text-white/60 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
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
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                    <label htmlFor="company_name" className="block text-sm font-medium text-white/60 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
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

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-white/60 mb-2">
                      Website <span className="text-white/40">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="example.com"
                      className={cn(
                        "w-full p-4 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white placeholder-white/30",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-300"
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="team_size" className="block text-sm font-medium text-white/60 mb-2">
                      Team Size *
                    </label>
                    <select
                      id="team_size"
                      value={formData.team_size}
                      onChange={(e) => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
                      className={cn(
                        "w-full p-4 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-300"
                      )}
                      required
                    >
                      <option value="" disabled>Select team size</option>
                      <option value="1-5">1 to 5</option>
                      <option value="6-10">6 to 10</option>
                      <option value="11-25">11 to 25</option>
                      <option value="26-50">26 to 50</option>
                      <option value="50+">50 plus</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-white/60 mb-2">
                      Your Role *
                    </label>
                    <select
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className={cn(
                        "w-full p-4 rounded-lg",
                        "bg-white/5 border border-white/10",
                        "text-white",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
                        "transition-all duration-300"
                      )}
                      required
                    >
                      <option value="" disabled>Select your role</option>
                      <option value="Founder/CEO">Founder or CEO</option>
                      <option value="Operations">Operations</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>


                <button
                  type="submit"
                  className={cn(
                    "w-full px-8 py-4 rounded-lg font-medium text-lg",
                    "bg-white text-[#030303]",
                    "transform transition-all duration-300",
                    "hover:shadow-glow hover:scale-[1.02]"
                  )}
                >
                  Continue
                </button>
              </form>
            </motion.div>
          )}

          {formStep === 'loading' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "relative",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "p-12 rounded-xl text-center"
              )}
            >
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Analyzing your needs...
                </h3>
              </div>
            </motion.div>
          )}

          {formStep === 'booking' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "relative",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "p-8 md:p-12 rounded-xl text-center"
              )}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                We need a bit more context to give you an accurate quote.
              </h2>

              <div className="mb-8 space-y-2">
                <p className="text-lg text-white/80">
                  Bliztic's AI Workforce is custom built for your business.
                </p>
                <p className="text-lg text-white/80">
                  Book an intro call and we'll walk you through what makes the most sense for your team.
                </p>
              </div>

              <Button size="lg" asChild>
                <a
                  href="https://cal.com/bliztic/workforce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Your Call
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Badge Section */}
      <section className="relative py-12 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="flex items-center space-x-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-white/80 text-sm font-medium">30 Day Satisfaction Guarantee</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AIWorkforce;
