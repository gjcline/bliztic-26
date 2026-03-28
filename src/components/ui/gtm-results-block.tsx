import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp, Users, BarChart3, ArrowRight, X, Check, Rocket, Activity, GitBranch, MessageSquare, RefreshCw, MoreHorizontal, Sprout, LineChart, Building2 } from 'lucide-react';

const iconGridItems = [
  { icon: Zap, label: 'Faster new offer launches' },
  { icon: Target, label: 'Cleaner market entry' },
  { icon: TrendingUp, label: 'Stable conversion behavior' },
  { icon: Users, label: 'Teams scale without friction' },
  { icon: BarChart3, label: 'Market share compounds' },
];

const withoutGTM = [
  { icon: X, label: 'Every launch resets', color: 'rose' },
  { icon: X, label: 'Momentum decays', color: 'rose' },
  { icon: X, label: 'Teams misalign', color: 'rose' },
];

const withGTM = [
  { icon: Check, label: 'Repeatable launches', color: 'cyan' },
  { icon: Check, label: 'Consistent execution', color: 'cyan' },
  { icon: Check, label: 'Market expansion', color: 'cyan' },
];

const componentStructure = [
  { icon: Rocket, label: 'Launch engine', description: 'Deploy new offers systematically' },
  { icon: Activity, label: 'Signal systems', description: 'Track what actually moves revenue' },
  { icon: GitBranch, label: 'Conversion rules', description: 'Codify what makes buyers act' },
  { icon: MessageSquare, label: 'Team interfaces', description: 'Align execution across functions' },
  { icon: RefreshCw, label: 'Feedback loops', description: 'Capture and apply market response' },
  { icon: MoreHorizontal, label: 'More...', description: 'Custom infrastructure components' },
];

const targetAudience = [
  { icon: Sprout, label: 'Early teams surviving first markets', description: 'Building foundations that scale from day one' },
  { icon: LineChart, label: 'Growth teams expanding offers', description: 'Multiplying revenue without multiplying chaos' },
  { icon: Building2, label: 'Mature companies defending share', description: 'Systematizing advantage before competitors catch up' },
];

export default function GTMResultsBlock() {
  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-rose-500/[0.03]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The power of bulletproof<br />GTM engineering
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20"
        >
          {iconGridItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/[0.05] to-orange-500/[0.05] border border-rose-500/20 p-8"
          >
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="chaosPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <motion.path
                      d="M 0 50 Q 25 20, 50 50 T 100 50"
                      stroke="rgba(244, 63, 94, 0.3)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#chaosPattern)" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <X className="w-6 h-6 text-rose-400" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-white">Without GTM Infrastructure</h3>
              </div>

              <div className="space-y-4">
                {withoutGTM.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 bg-[#0a0a0a]/40 backdrop-blur-sm rounded-lg p-4 border border-rose-500/10"
                  >
                    <motion.div
                      animate={{ scale: [1, 0.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="flex-shrink-0"
                    >
                      <item.icon className="w-5 h-5 text-rose-400" strokeWidth={3} />
                    </motion.div>
                    <p className="text-white/80 font-medium">{item.label}</p>
                    <motion.div
                      className="ml-auto w-16 h-1 bg-gradient-to-r from-rose-500/50 to-transparent rounded-full"
                      animate={{ opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                <p className="text-rose-400/80 text-sm italic">
                  Constant restarts. Energy wasted. Progress lost.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-500/[0.05] to-blue-500/[0.05] border border-cyan-500/20 p-8"
          >
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="orderPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <motion.path
                      d="M 0 80 L 20 70 L 40 55 L 60 45 L 80 30 L 100 20"
                      stroke="rgba(6, 182, 212, 0.4)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#orderPattern)" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-cyan-400" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-white">With GTM Infrastructure</h3>
              </div>

              <div className="space-y-4">
                {withGTM.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 bg-[#0a0a0a]/40 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="flex-shrink-0"
                    >
                      <item.icon className="w-5 h-5 text-cyan-400" strokeWidth={3} />
                    </motion.div>
                    <p className="text-white/80 font-medium">{item.label}</p>
                    <motion.div
                      className="ml-auto flex gap-1 items-end h-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.3 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-6 bg-gradient-to-t from-cyan-500 to-transparent rounded-full origin-bottom"
                          animate={{ scaleY: [1, 1.33, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 + index * 0.3 }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                <p className="text-cyan-400/80 text-sm italic">
                  Systematic growth. Compounding gains. Sustainable expansion.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-6 py-3">
            <p className="text-white/80 text-sm font-medium">
              The difference isn't <strong className="font-bold">just strategy</strong>. It's <strong className="font-bold">infrastructure</strong>.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Key components and structure
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentStructure.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-[#0a0a0a]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <component.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-lg">{component.label}</h4>
                  <div className="h-px bg-gradient-to-r from-cyan-500/30 to-transparent mb-3" />
                  <p className="text-white/60 text-sm leading-relaxed">{component.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            This applies at every stage
          </h3>

          <div className="space-y-6 max-w-4xl mx-auto">
            {targetAudience.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-r from-[#0a0a0a]/80 to-[#0a0a0a]/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <audience.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-2 text-lg">{audience.label}</h4>
                      <p className="text-white/60 text-sm leading-relaxed">{audience.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
