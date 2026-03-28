import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { Rocket, RefreshCw, TrendingUp } from 'lucide-react';

const data = [
  { month: 'Launch', traditional: 85, infrastructure: 65 },
  { month: 'M2', traditional: 72, infrastructure: 70 },
  { month: 'M3', traditional: 65, infrastructure: 74 },
  { month: 'M4', traditional: 71, infrastructure: 78 },
  { month: 'M5', traditional: 58, infrastructure: 80 },
  { month: 'M6', traditional: 52, infrastructure: 82 },
  { month: 'M7', traditional: 48, infrastructure: 86 },
  { month: 'M8', traditional: 56, infrastructure: 92 },
  { month: 'M9', traditional: 46, infrastructure: 90 },
  { month: 'M10', traditional: 41, infrastructure: 88 },
  { month: 'M11', traditional: 38, infrastructure: 96 },
  { month: 'M12', traditional: 47, infrastructure: 105 },
  { month: 'M13', traditional: 39, infrastructure: 101 },
  { month: 'M14', traditional: 35, infrastructure: 98 },
  { month: 'M15', traditional: 32, infrastructure: 108 },
  { month: 'M16', traditional: 40, infrastructure: 120 },
  { month: 'M17', traditional: 34, infrastructure: 117 },
  { month: 'M18', traditional: 30, infrastructure: 115 },
  { month: 'M19', traditional: 28, infrastructure: 125 },
  { month: 'M20', traditional: 35, infrastructure: 135 },
  { month: 'M22', traditional: 26, infrastructure: 142 },
  { month: 'M24', traditional: 22, infrastructure: 150 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0a]/95 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-xl">
        <p className="text-white/60 text-xs mb-2">{payload[0].payload.month}</p>
        <div className="space-y-1">
          <p className="text-rose-400 text-sm font-medium">
            Traditional: {payload[0].value}%
          </p>
          <p className="text-cyan-400 text-sm font-medium">
            Infrastructure: {payload[1].value}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function GTMComparisonChart() {
  return (
    <section id="gtm-section" className="py-20 bg-[#030303] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.02] via-transparent to-cyan-500/[0.02]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight text-center lg:text-left">
                GTM is forgotten about too quickly
              </h2>
              <p className="text-white/60 text-lg leading-relaxed text-center lg:text-left">
                Most companies will create an elaborate go to market strategy, then drop it off after successfully entering the market.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Launch repeatedly</h3>
                  <p className="text-white/50 text-sm">
                    Maintain momentum with systematic launches, not one-time wins
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <RefreshCw className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Adapt without chaos</h3>
                  <p className="text-white/50 text-sm">
                    Respond to market changes with infrastructure that scales
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Expand market share over time</h3>
                  <p className="text-white/50 text-sm">
                    Build compounding growth instead of diminishing returns
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[500px] bg-[#0a0a0a]/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 p-6">
              {/* Legend */}
              <div className="flex gap-6 mb-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-rose-500 to-orange-500" />
                  <span className="text-white/60 text-sm">Traditional GTM</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
                  <span className="text-white/60 text-sm">Bulletproof GTM</span>
                </div>
              </div>

              {/* Chart */}
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="traditionalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="infrastructureGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    stroke="rgba(255,255,255,0.3)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.3)"
                    tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                    label={{
                      value: 'Market Performance',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fill: 'rgba(255,255,255,0.5)', fontSize: 12 }
                    }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="traditional"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    fill="url(#traditionalGradient)"
                    animationDuration={2000}
                  />
                  <Area
                    type="monotone"
                    dataKey="infrastructure"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    fill="url(#infrastructureGradient)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>

              {/* Annotations */}
              <div className="absolute top-24 left-20 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-lg px-3 py-1.5">
                <p className="text-cyan-400 text-xs font-medium">Sustained growth trajectory</p>
              </div>
              <div className="absolute bottom-32 right-20 bg-rose-500/10 backdrop-blur-sm border border-rose-500/20 rounded-lg px-3 py-1.5">
                <p className="text-rose-400 text-xs font-medium">Initial spike, continuous decline</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
