import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Search, Target, Users, Zap, ArrowRight, Calendar } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import { cn } from '@/lib/utils';

const SystemsAudit: React.FC = () => {
  const auditBenefits = [
    'A map of your internal processes, including areas of waste, redundancy, and friction',
    'A breakdown of manual tasks that can be automated to save time and increase productivity',
    'An overview of how your tools and platforms interact (or don\'t), and what can be integrated',
    'Clarity on your customer journey, from lead to delivery, including drop-off points and revenue leaks',
    'Insight into team structure inefficiencies, including role overlap and workload distribution',
    'A prioritized action plan that shows where the highest-ROI improvements can be made'
  ];

  const idealFor = [
    'You\'ve grown quickly and your backend operations haven\'t kept pace',
    'You\'re spending too much time on manual or repetitive tasks',
    'Your team\'s overwhelmed, and you\'re unsure if it\'s a headcount issue or a systems problem',
    'You\'re using multiple tools that don\'t seem to "talk" to each other',
    'Projects, deals, or follow-ups are slipping through the cracks',
    'You want to scale, but you\'re hitting invisible ceilings'
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery Call (30-45 min)',
      description: 'We\'ll walk through a guided conversation with you (and any key team members) to understand how your business currently operates. What\'s working, what\'s not, and where the opportunities lie.',
      topics: [
        'Core business goals and roadblocks',
        'Current systems and day-to-day operations',
        'Team structure, communication, and project flow',
        'Customer journey and revenue generation',
        'Your existing tech stack and tool usage',
        'How decisions are made and data is tracked'
      ]
    },
    {
      number: '02',
      title: 'Custom Audit Report (Delivered within 3–5 business days)',
      description: 'We compile the findings and develop a tailored report outlining:',
      topics: [
        'Key inefficiencies and potential risks',
        'High-impact improvements',
        'Systems you can implement immediately',
        'A recommended roadmap if you choose to move forward with us'
      ]
    },
    {
      number: '03',
      title: 'Strategy Review Call',
      description: 'We walk you through our findings and present the ROI behind each recommended solution. If it makes sense to work together, we\'ll provide a proposal for implementation.',
      topics: []
    }
  ];

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
            >
              The Bliztic Advanced Systems Audit
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl text-white/60 leading-relaxed mb-12"
            >
              Scale smarter, faster, and with less friction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                to="/qualify"
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-8 py-4 rounded-full",
                  "bg-white text-[#030303]",
                  "text-lg font-medium",
                  "transform transition duration-300",
                  "hover:scale-105 hover:shadow-glow"
                )}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule My Free Audit
              </Link>
            </motion.div>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* Why We Offer This Audit */}
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
              Why We Offer This Audit
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-lg text-white/60 leading-relaxed">
                <p>
                  Most businesses don't fail because of a bad product. They struggle because their internal systems can't keep up with their growth.
                </p>
                <p>
                  We created the Advanced Systems Audit to give founders and operators a clear, unbiased view of what's silently capping their growth, without charging for yet another vague consultation that leads them nowhere.
                </p>
                <p>
                  This is a <span className="text-white font-medium">no-cost, no-obligation audit</span> designed to identify process bottlenecks, operational inefficiencies, and missed automation opportunities that are slowing down your business or costing you money.
                </p>
                <div className={cn(
                  "p-6 rounded-xl",
                  "bg-gradient-to-r from-indigo-500/10 to-rose-500/10",
                  "border border-white/10"
                )}>
                  <p className="text-white font-medium">
                    We firmly believe in the principle of providing upfront value before signing on a new client. This is why we will never charge for one of our systems audits.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/realistic_backdrop.webp"
                alt="Team collaboration and systems analysis"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030303]/30 via-transparent to-[#030303]/30 rounded-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What This Audit Will Reveal */}
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
              What This Audit Will Reveal
            </h2>
            <p className="text-xl text-white/40 max-w-3xl mx-auto">
              Our Advanced Systems Audit is a deep dive into your operations, focused on actionable insights tied to real business outcomes rather than generic feedback or surface level advice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">You'll walk away with:</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "flex items-start p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 mt-1 flex-shrink-0" />
                <p className="text-white/60 leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
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
              Who It's For
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              This audit is ideal if:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {idealFor.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "flex items-start p-6 rounded-xl",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <Target className="h-6 w-6 text-rose-400 mr-4 mt-1 flex-shrink-0" />
                <p className="text-white/60 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
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
              Our Process
            </h2>
          </motion.div>

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={cn(
                  "relative",
                  "bg-[#0a0a0a]/40 backdrop-blur-sm",
                  "border border-white/5",
                  "p-8 md:p-10 rounded-2xl",
                  "transform transition-all duration-500",
                  "hover:bg-[#0a0a0a]/60 hover:border-white/10",
                  "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                )}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className={cn(
                      "w-16 h-16 rounded-full",
                      "bg-gradient-to-br from-indigo-500/20 to-rose-500/20",
                      "border-2 border-white/10",
                      "flex items-center justify-center",
                      "text-white font-bold text-xl"
                    )}>
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-white/60 mb-6 leading-relaxed">{step.description}</p>
                    
                    {step.topics.length > 0 && (
                      <div>
                        <p className="text-white font-medium mb-4">We'll cover topics like:</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start">
                              <div className="h-2 w-2 rounded-full bg-indigo-400 mr-3 mt-2 flex-shrink-0" />
                              <span className="text-white/60">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {index === 0 && (
                      <div className={cn(
                        "mt-6 p-4 rounded-lg",
                        "bg-gradient-to-r from-indigo-500/10 to-rose-500/10",
                        "border border-white/10"
                      )}>
                        <p className="text-white/80 font-medium">
                          This is not a sales pitch. It's an honest look under the hood with someone who knows what to look for.
                        </p>
                      </div>
                    )}
                    
                    {index === 2 && (
                      <div className={cn(
                        "mt-6 p-4 rounded-lg",
                        "bg-gradient-to-r from-emerald-500/10 to-teal-500/10",
                        "border border-white/10"
                      )}>
                        <p className="text-white/80">
                          There's no pressure to move forward. But if you do, we'll be ready to execute.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's the Catch */}
      <section className="relative py-20 bg-[#040404] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-8">
              What's the Catch?
            </h2>
            
            <div className={cn(
              "max-w-3xl mx-auto p-8 rounded-2xl",
              "bg-[#0a0a0a]/40 backdrop-blur-sm",
              "border border-white/5"
            )}>
              <h3 className="text-2xl font-bold text-white mb-6">There isn't one.</h3>
              <p className="text-lg text-white/60 leading-relaxed">
                We believe businesses should experience our expertise before making a commitment. This audit is how we build trust and ensure alignment before offering a solution.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-[#050505] py-20 overflow-hidden">
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
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-4">
              Ready to See What's Holding You Back?
            </h2>
            <p className="text-white/40 mb-8 max-w-3xl mx-auto text-lg">
              If you're serious about building a business that scales without chaos, we'll help you build the foundation to do it right.
            </p>
            <Link
              to="/qualify"
              className={cn(
                "inline-flex items-center justify-center",
                "px-8 py-4 rounded-full",
                "bg-white text-[#030303]",
                "text-lg font-medium",
                "transform transition duration-300",
                "hover:scale-105 hover:shadow-glow"
              )}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule My Audit
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SystemsAudit;