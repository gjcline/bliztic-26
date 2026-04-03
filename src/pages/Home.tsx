import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Target,
  Building2,
  TrendingUp,
  ArrowRight,
  Check,
  X,
  Circle
} from 'lucide-react';
import WhoWeAreSection from '../components/WhoWeAreSection';
import { ImmersiveTimeline } from '../components/ui/immersive-timeline';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-25" />

      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.15)_0%,_rgba(6,182,212,0.08)_50%,_transparent_100%)] pointer-events-none blur-2xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-5 mb-10"
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-blue-400" />
          <span className="text-[0.72rem] font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Revenue Division as a Service
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-blue-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-6 max-w-4xl"
        >
          <span className="block text-[0.72em] font-semibold text-white/60 tracking-normal mb-2">
            The Only
          </span>
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Full-Stack
          </span>
          <span className="block text-white">
            Sales Engine.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed"
        >
          Bliztic installs and operates a <strong className="text-white/80 font-medium">proprietary sales engine</strong> inside your company. strategy, systems, staff, and execution. <strong className="text-white/80 font-medium">Live in 30 days. Or you don't pay.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <Link
            to="/qualify"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:opacity-90 transition-opacity"
          >
            Get Your Sales Engine
          </Link>
          <a
            href="#how"
            className="px-8 py-3.5 rounded-lg border border-white/10 text-white/60 font-medium text-sm tracking-wide hover:border-blue-500 hover:text-white transition-all"
          >
            See How It Works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch gap-0 border border-white/5 bg-[#0a0a0a] rounded-lg overflow-hidden"
        >
          <div className="px-8 sm:px-10 py-6 border-b sm:border-b-0 sm:border-r border-white/5 text-center">
            <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              30 Days
            </div>
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 mt-1">
              Fully operational
            </div>
          </div>
          <div className="px-8 sm:px-10 py-6 border-b sm:border-b-0 sm:border-r border-white/5 text-center">
            <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              $0
            </div>
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 mt-1">
              Owed if we miss the 30-day mark
            </div>
          </div>
          <div className="px-8 sm:px-10 py-6 border-b sm:border-b-0 sm:border-r border-white/5 text-center">
            <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              100%
            </div>
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 mt-1">
              Hands-free. you manage nothing
            </div>
          </div>
          <div className="px-8 sm:px-10 py-6 text-center">
            <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              1 Year+
            </div>
            <div className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 mt-1">
              R&D already done for you
            </div>
          </div>
        </motion.div>
      </section>

      {/* Who We Are Section */}
      <WhoWeAreSection />

      {/* Proof Band */}
      <section className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-gradient-to-r from-[#0a0a0a] to-[#0f0a1f] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row justify-center items-stretch gap-0 max-w-6xl mx-auto">
          <div className="text-center px-10 md:px-14 py-8 border-b md:border-b-0 md:border-r border-white/5 w-full md:w-auto">
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              30
            </div>
            <div className="text-[0.65rem] tracking-[0.18em] uppercase text-white/40 mt-2 max-w-[140px] mx-auto">
              Days to a fully operational sales engine
            </div>
          </div>
          <div className="text-center px-10 md:px-14 py-8 border-b md:border-b-0 md:border-r border-white/5 w-full md:w-auto">
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              8–12mo
            </div>
            <div className="text-[0.65rem] tracking-[0.18em] uppercase text-white/40 mt-2 max-w-[140px] mx-auto">
              Saved vs. building internally
            </div>
          </div>
          <div className="text-center px-10 md:px-14 py-8 border-b md:border-b-0 md:border-r border-white/5 w-full md:w-auto">
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Day 1
            </div>
            <div className="text-[0.65rem] tracking-[0.18em] uppercase text-white/40 mt-2 max-w-[140px] mx-auto">
              Running at full capacity
            </div>
          </div>
          <div className="text-center px-10 md:px-14 py-8 w-full md:w-auto">
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              4 Pillars
            </div>
            <div className="text-[0.65rem] tracking-[0.18em] uppercase text-white/40 mt-2 max-w-[140px] mx-auto">
              No one else owns all four
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section id="how" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-5">
          <div className="w-4 h-[1px] bg-blue-400" />
          The Engine
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Four Pillars.<br/>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            One Complete Division.
          </span>
        </h2>

        <p className="text-white/60 max-w-lg mb-14 leading-relaxed">
          Every competitor covers one or two. Revenue Division as a Service owns all four. and delivers them as a single integrated engine inside your company.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: '01',
              name: 'STRATEGY',
              tag: 'The blueprint before the bullets.',
              items: [
                'Revenue Architecture',
                'ICP & Market Mapping',
                'GTM Blueprint'
              ]
            },
            {
              num: '02',
              name: 'SYSTEMS',
              tag: 'The infrastructure that never sleeps.',
              items: [
                'CRM Configuration',
                'Sales Operating System',
                'Automation Engine'
              ]
            },
            {
              num: '03',
              name: 'STAFF',
              tag: 'The division that runs under your brand.',
              items: [
                'Fractional CRO',
                'SDR & Closers',
                'Pre-Trained Team'
              ]
            },
            {
              num: '04',
              name: 'EXECUTION',
              tag: 'The operation that owns the result.',
              items: [
                'Pipeline Management',
                'Deal Optimization',
                'Revenue Reporting'
              ]
            }
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-ink2 border border-white/5 rounded-xl p-6 lg:p-8 overflow-hidden group hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-[-2rem] right-[-1rem] text-[6rem] font-extrabold text-white/[0.02] pointer-events-none select-none transition-all duration-500 group-hover:text-white/[0.04]">
                {idx + 1}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <div className="text-sm font-bold text-blue-400">{pillar.num}</div>
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-white">
                    {pillar.name}
                  </h3>
                </div>

                <p className="text-xs text-blue-400/80 mb-6 leading-relaxed">
                  {pillar.tag}
                </p>

                <div className="space-y-3">
                  {pillar.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                      <div className="text-sm text-white/70 font-medium group-hover/item:text-white/90 transition-colors duration-300">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA after Four Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <Link
            to="/qualify"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-base tracking-wide shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-200"
          >
            See If You Qualify
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Comparison Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-5">
          <div className="w-4 h-[1px] bg-blue-400" />
          The Difference
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          What Everyone Else<br/>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Leaves Out.
          </span>
        </h2>

        <p className="text-white/60 max-w-lg mb-14 leading-relaxed">
          Every alternative covers a piece. Our Revenue Division owns the full stack.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-6">
          {['all', 'leadgen', 'cro', 'sdr', 'staffing', 'revops'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-white'
                  : 'border border-white/10 text-white/60 hover:border-blue-500/30 hover:text-white/80'
              }`}
            >
              {tab === 'all' && 'All Alternatives'}
              {tab === 'leadgen' && 'Lead Gen'}
              {tab === 'cro' && 'Fractional CRO'}
              {tab === 'sdr' && 'SDR Firm'}
              {tab === 'staffing' && 'Sales Staffing'}
              {tab === 'revops' && 'RevOps Firm'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto"
          >
            <table className="w-full border border-white/20 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-ink2">
                  <th className="text-left p-4 text-sm font-bold text-white/80 border-b border-r border-white/20">Service</th>
                  <th className="text-center p-4 text-sm font-bold text-red-400 border-b border-r border-white/20">Lead Gen</th>
                  <th className="text-center p-4 text-sm font-bold text-red-400 border-b border-r border-white/20">Fractional CRO</th>
                  <th className="text-center p-4 text-sm font-bold text-red-400 border-b border-r border-white/20">SDR Firm</th>
                  <th className="text-center p-4 text-sm font-bold text-blue-400 border-b border-white/20 bg-blue-500/5">Revenue Division as a Service</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                  <td className="p-4 text-sm font-medium text-white border-r border-white/20">Strategy</td>
                  <td className="p-4 text-center border-r border-white/20"><X className="w-5 h-5 text-red-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><Check className="w-5 h-5 text-green-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><X className="w-5 h-5 text-red-400/60 mx-auto" /></td>
                  <td className="p-4 text-center bg-blue-500/5"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                  <td className="p-4 text-sm font-medium text-white border-r border-white/20">Systems</td>
                  <td className="p-4 text-center border-r border-white/20"><Circle className="w-5 h-5 text-yellow-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><Circle className="w-5 h-5 text-yellow-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><X className="w-5 h-5 text-red-400/60 mx-auto" /></td>
                  <td className="p-4 text-center bg-blue-500/5"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                  <td className="p-4 text-sm font-medium text-white border-r border-white/20">Staff</td>
                  <td className="p-4 text-center border-r border-white/20"><X className="w-5 h-5 text-red-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><X className="w-5 h-5 text-red-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><Circle className="w-5 h-5 text-yellow-400/60 mx-auto" /></td>
                  <td className="p-4 text-center bg-blue-500/5"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
                <tr className="hover:bg-ink2 transition-colors">
                  <td className="p-4 text-sm font-medium text-white border-r border-white/20">Execution</td>
                  <td className="p-4 text-center border-r border-white/20"><X className="w-5 h-5 text-red-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><X className="w-5 h-5 text-red-400/60 mx-auto" /></td>
                  <td className="p-4 text-center border-r border-white/20"><Circle className="w-5 h-5 text-yellow-400/60 mx-auto" /></td>
                  <td className="p-4 text-center bg-blue-500/5"><Check className="w-5 h-5 text-green-400 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-white/5 rounded-lg p-8 bg-ink2">
                <h3 className="text-lg font-bold text-red-400/80 mb-4">Where They Stop</h3>
                <ul className="space-y-3">
                  {activeTab === 'leadgen' && (
                    <>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No strategic foundation or GTM architecture
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        Limited CRM integration, no full stack build
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No sales team provided
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        You still manage pipeline, close deals, optimize
                      </li>
                    </>
                  )}
                  {activeTab === 'cro' && (
                    <>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        Strategy only, no system build or deployment
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No staff, no execution team
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        You implement everything yourself
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No ongoing execution or accountability
                      </li>
                    </>
                  )}
                  {activeTab === 'sdr' && (
                    <>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No revenue strategy or GTM architecture
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No CRM or tech stack deployment
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        SDRs only—no closers or leadership
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        Limited optimization and performance management
                      </li>
                    </>
                  )}
                  {activeTab === 'staffing' && (
                    <>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No strategy or revenue architecture
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No systems, CRM, or tech stack build
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        Staff needs training and onboarding
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        You manage execution and optimization
                      </li>
                    </>
                  )}
                  {activeTab === 'revops' && (
                    <>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        Systems focus only—no GTM strategy
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No sales team or staff deployment
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        No execution or revenue accountability
                      </li>
                      <li className="text-sm text-white/70 flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400/60 mt-0.5 flex-shrink-0" />
                        You run the entire go-to-market motion
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="border border-blue-500/20 rounded-lg p-8 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                <h3 className="text-lg font-bold text-blue-400 mb-4">What You Get</h3>
                <ul className="space-y-3">
                  <li className="text-sm text-white/80 flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Full revenue architecture and GTM strategy
                  </li>
                  <li className="text-sm text-white/80 flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Complete CRM, tech stack, and automation build
                  </li>
                  <li className="text-sm text-white/80 flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Pre-trained SDRs, closers, and fractional CRO
                  </li>
                  <li className="text-sm text-white/80 flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    Full execution, optimization, and revenue accountability
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6">
                <p className="text-sm text-white/70 text-center">
                  <strong className="text-white">The Verdict:</strong> {activeTab === 'leadgen' && 'Lead gen fills your calendar. Revenue Division as a Service builds the engine that converts it.'}
                  {activeTab === 'cro' && 'A fractional CRO gives you the blueprint. Revenue Division as a Service builds it and runs it for you.'}
                  {activeTab === 'sdr' && 'SDR firms book meetings. Revenue Division as a Service owns the full revenue motion from strategy to close.'}
                  {activeTab === 'staffing' && 'Staffing gives you bodies. Revenue Division as a Service gives you a trained, managed, and accountable sales division.'}
                  {activeTab === 'revops' && 'RevOps builds the infrastructure. Revenue Division as a Service operates the entire revenue engine.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA after Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16"
        >
          <Link
            to="/qualify"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-base tracking-wide shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-200"
          >
            Check Eligibility
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/qualify"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg border border-white/10 text-white/80 font-semibold text-base tracking-wide hover:border-blue-500 hover:text-white hover:bg-blue-500/5 transition-all duration-200"
          >
            Try Risk-Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* 30-Day Timeline Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-5">
            <div className="w-4 h-[1px] bg-blue-400" />
            The Timeline
            <div className="w-4 h-[1px] bg-blue-400" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            30 Days From<br/>
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Contract to Live.
            </span>
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            Most firms take 6 months to deliver what Bliztic deploys in 30 days. Here's exactly how it works.
          </p>
        </div>

        <ImmersiveTimeline
          weeks={[
            {
              week: 'Week 1',
              title: 'Audit and Architecture',
              tasks: [
                'Deep-dive discovery session',
                'ICP and market analysis',
                'Revenue architecture design',
                'Tech stack assessment'
              ],
              outcome: 'Your GTM blueprint is locked.'
            },
            {
              week: 'Week 2',
              title: 'Systems Build',
              tasks: [
                'CRM configuration and deployment',
                'Automation engine setup',
                'Sales playbook documentation',
                'Pipeline and dashboard build'
              ],
              outcome: 'Your infrastructure is live.'
            },
            {
              week: 'Week 3',
              title: 'Warm and Prepare',
              tasks: [
                'Domain warmup and email config',
                'List building and segmentation',
                'Sequence creation and testing',
                'Staff briefing and calibration'
              ],
              outcome: 'Your outbound is prepped.'
            },
            {
              week: 'Week 4',
              title: 'Final Prep and Launch',
              tasks: [
                'Final QA and system checks',
                'Team training and dry runs',
                'Soft launch monitoring',
                'Full activation and handoff'
              ],
              outcome: "You're live. Day 30."
            }
          ]}
        />

        {/* CTA after Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mt-16"
        >
          <Link
            to="/qualify"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-base tracking-wide shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-200"
          >
            Launch My Engine
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-white/50 mt-4">
            30-day guarantee. No risk.
          </p>
        </motion.div>
      </section>

      {/* Build vs Buy Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
        <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-5">
          <div className="w-4 h-[1px] bg-blue-400" />
          Build vs Buy
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Why Companies<br/>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Choose Bliztic.
          </span>
        </h2>

        <p className="text-white/60 max-w-lg mb-14 leading-relaxed">
          Building internally takes time, capital, and risk. Bliztic delivers the same result faster, cheaper, and guaranteed.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border border-white/20 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-ink2">
                <th className="text-left p-5 text-sm font-bold text-white/80 border-b border-r border-white/20">Metric</th>
                <th className="text-left p-5 text-sm font-bold text-white/80 border-b border-r border-white/20">Build Internally</th>
                <th className="text-left p-5 text-sm font-bold text-blue-400 border-b border-white/20 bg-blue-500/5">BLIZTIC</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                <td className="p-5 text-sm font-medium text-white border-r border-white/20">Time to First Outreach</td>
                <td className="p-5 text-sm text-white/70 border-r border-white/20"><span className="font-bold text-red-500">8–12</span> months (hiring + ramp + systems)</td>
                <td className="p-5 text-sm text-white/80 bg-blue-500/5"><span className="font-bold text-blue-400">30</span> days (guaranteed or you don't pay)</td>
              </tr>
              <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                <td className="p-5 text-sm font-medium text-white border-r border-white/20">R&D Required</td>
                <td className="p-5 text-sm text-white/70 border-r border-white/20"><span className="font-bold text-red-500">Months</span> of testing, iteration, failure</td>
                <td className="p-5 text-sm text-white/80 bg-blue-500/5"><span className="font-bold text-blue-400">Zero.</span> It's already built and proven.</td>
              </tr>
              <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                <td className="p-5 text-sm font-medium text-white border-r border-white/20">Commitment Structure</td>
                <td className="p-5 text-sm text-white/70 border-r border-white/20"><span className="font-bold text-red-500">Full-time</span> hires, long-term overhead</td>
                <td className="p-5 text-sm text-white/80 bg-blue-500/5"><span className="font-bold text-blue-400">Month-to-month.</span> Scale up or down.</td>
              </tr>
              <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                <td className="p-5 text-sm font-medium text-white border-r border-white/20">Performance Guarantee</td>
                <td className="p-5 text-sm text-white/70 border-r border-white/20"><span className="font-bold text-red-500">None.</span> You own all the risk.</td>
                <td className="p-5 text-sm text-white/80 bg-blue-500/5"><span className="font-bold text-blue-400">30-day</span> launch or you pay nothing.</td>
              </tr>
              <tr className="border-b border-white/20 hover:bg-ink2 transition-colors">
                <td className="p-5 text-sm font-medium text-white border-r border-white/20">Management Overhead</td>
                <td className="p-5 text-sm text-white/70 border-r border-white/20"><span className="font-bold text-red-500">You</span> hire, train, manage, and optimize</td>
                <td className="p-5 text-sm text-white/80 bg-blue-500/5"><span className="font-bold text-blue-400">Zero.</span> We build it, run it, and report results.</td>
              </tr>
              <tr className="hover:bg-ink2 transition-colors">
                <td className="p-5 text-sm font-medium text-white border-r border-white/20">Scalability</td>
                <td className="p-5 text-sm text-white/70 border-r border-white/20"><span className="font-bold text-red-500">Slow.</span> Requires new hiring cycles.</td>
                <td className="p-5 text-sm text-white/80 bg-blue-500/5"><span className="font-bold text-blue-400">Instant.</span> Add capacity on demand.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA after Build vs Buy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mt-16"
        >
          <Link
            to="/qualify"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-base tracking-wide shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-200"
          >
            See If You Qualify
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-white/50 mt-4">
            Find out if Revenue Division as a Service is right for you
          </p>
        </motion.div>
      </section>

      {/* Guarantee Section */}
      <section id="guarantee" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12)_0%,_rgba(6,182,212,0.06)_50%,_transparent_100%)] pointer-events-none blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
              Risk-Free Guarantee
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              30 Days to Live.
            </span>
            <br/>
            Or You Pay Nothing.
          </h2>

          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            We guarantee your sales engine is fully operational in 30 days. If we miss that deadline, you owe us nothing. No fine print. No excuses. That's how confident we are in what we've built.
          </p>

          <Link
            to="/qualify"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-base tracking-wide shadow-[0_4px_32px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_48px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-200"
          >
            Get Your Sales Engine
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
