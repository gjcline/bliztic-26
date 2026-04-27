import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

// ─── Calculation constants ───────────────────────────────────────────────────

const TIERS = [
  { max: 12000,     tier: 'Foundational Engagement',        scope: 'Foundational' },
  { max: 25000,     tier: 'Core Build Engagement',          scope: 'Core' },
  { max: 50000,     tier: 'Growth Division Engagement',     scope: 'Growth' },
  { max: 80000,     tier: 'Enterprise Division Engagement', scope: 'Enterprise' },
  { max: Infinity,  tier: 'Strategic Division Engagement',  scope: 'Strategic' },
];

const STAFFING_LABELS = [
  'Full division build',
  'Full division build',
  'Division augmentation',
  'Team restructure + build',
  'Pipeline and systems',
];

const STAFFING_HINTS = [
  'Starting from scratch gives us full control to build the right way from day one.',
  'Founder-led selling is a ceiling. We replace that motion with a scalable division.',
  'Early-stage teams usually need more support than they realize. We fill the gaps.',
  'Underperforming teams are almost always a systems and pipeline problem, not a people one.',
  "We'll build the infrastructure around your team and make sure they always have pipeline.",
];

// Base values intentionally low — adjustments drive the estimate up from here.
// All-lowest inputs: sf=1 (no team), rt=1 (under $25K), mt=1 (1-5 meetings),
// ds=1 (under $5K), mk=1 (one market), inf=3 (solid foundation) → mid ≈ $7K → $5K–$10K band.
// All-highest inputs: sf=1 (full build) + max adjustments → mid ≈ $88K → $80K–$100K band.
const STAFFING_BASE = [7000, 7000, 5500, 6500, 5000];

function fmt(n: number) {
  return '$' + Math.round(n / 1000) + 'K';
}

function bandWidth(mid: number) {
  if (mid < 10000) return 5000;
  if (mid < 20000) return 8000;
  if (mid < 35000) return 12000;
  if (mid < 60000) return 16000;
  if (mid < 90000) return 20000;
  return 24000;
}

function calcEstimate(sf: number, rt: number, mt: number, ds: number, mk: number, inf: number, _urg: number) {
  // Revenue target is the primary driver — keeps estimate below the target bracket.
  // rt=1 (under $25K) → adds nothing, keeping estimate well under $25K.
  // rt=5 ($750K+) → adds ~$55K, pushing high-end estimates toward $80K–$100K.
  const revAdj  = [0, 8000, 20000, 38000, 55000][rt - 1] ?? 0;

  // Meeting volume: moderate driver.
  const meetAdj = [0, 2500, 6000, 10000][mt - 1] ?? 0;

  // Deal size: higher complexity for larger deals.
  const dealAdj = [0, 1500, 4000, 7000][ds - 1] ?? 0;

  // Market scope: each additional market adds meaningful outbound/strategy load.
  const mktAdj  = [0, 3000, 7000][mk - 1] ?? 0;

  // Infrastructure: building from nothing adds cost; solid foundation reduces it.
  const infraAdj = [3000, 1000, 0][inf - 1] ?? 0;

  const mid  = STAFFING_BASE[sf - 1] + revAdj + meetAdj + dealAdj + mktAdj + infraAdj;
  const midR = Math.round(mid / 500) * 500;
  const half = Math.round(bandWidth(midR) / 2 / 500) * 500;
  const lo   = Math.max(5000, midR - half);
  let hi     = midR + half;
  if (hi - lo < 5000) hi = lo + 5000;

  const tier = TIERS.find(t => midR <= t.max) ?? TIERS[TIERS.length - 1];
  return { lo, hi, tier: tier.tier, scope: tier.scope };
}

// ─── Select component ────────────────────────────────────────────────────────

interface SelectProps {
  value: string;
  onChange: (v: string) => void;
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
}

const EstSelect: React.FC<SelectProps> = ({ value, onChange, label, hint, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[0.8rem] font-semibold text-white">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="bg-[#111620] border border-white/10 text-white text-[0.8rem] font-medium px-3 py-2.5 rounded-lg outline-none cursor-pointer appearance-none transition-colors focus:border-blue-500/40 w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%237E8A9A' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        paddingRight: '32px',
      }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    {hint && <p className="text-[0.68rem] text-white/30 leading-relaxed">{hint}</p>}
  </div>
);

// ─── Main page ───────────────────────────────────────────────────────────────

const Pricing: React.FC = () => {
  const [bizType,   setBizType]   = useState('');
  const [staffing,  setStaffing]  = useState('');
  const [revTarget, setRevTarget] = useState('');
  const [meetings,  setMeetings]  = useState('');
  const [dealSize,  setDealSize]  = useState('');
  const [markets,   setMarkets]   = useState('');
  const [infra,     setInfra]     = useState('');

  const [name,     setName]     = useState('');
  const [company,  setCompany]  = useState('');
  const [email,    setEmail]    = useState('');
  const [phone,    setPhone]    = useState('');
  const [role,     setRole]     = useState('');

  const [revealed,   setRevealed]   = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors,     setErrors]     = useState<Record<string, boolean>>({});

  const allDropdownsFilled = !!(bizType && staffing && revTarget && meetings && dealSize && markets && infra);
  const canSubmit = allDropdownsFilled && name.trim() && email.trim() && company.trim();

  const estimate = useMemo(() => {
    if (!allDropdownsFilled) return null;
    return calcEstimate(
      parseInt(staffing), parseInt(revTarget), parseInt(meetings),
      parseInt(dealSize), parseInt(markets), parseInt(infra), 2
    );
  }, [bizType, staffing, revTarget, meetings, dealSize, markets, infra, allDropdownsFilled]);

  const staffingHint  = staffing ? STAFFING_HINTS[parseInt(staffing) - 1] : '';
  const staffingLabel = estimate && staffing ? STAFFING_LABELS[parseInt(staffing) - 1] : '—';

  const displayRange     = estimate ? `${fmt(Math.round(estimate.lo / 4))} – ${fmt(Math.round(estimate.hi / 4))}` : '$1K – $2K';
  const displayQuarterly = estimate ? `${fmt(estimate.lo * 3)} – ${fmt(estimate.hi * 3)}` : '$15K – $24K';
  const displayTier      = estimate?.tier ?? 'Core Build Engagement';
  const displayScope     = estimate?.scope ?? 'Core';

  const handleSubmit = async () => {
    const newErrors: Record<string, boolean> = {};
    if (!name.trim())    newErrors.name = true;
    if (!email.trim())   newErrors.email = true;
    if (!company.trim()) newErrors.company = true;
    if (!allDropdownsFilled) return;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 2500);
      return;
    }

    setSubmitting(true);
    try {
      await supabase.from('pricing_estimates').insert({
        name: name.trim(), company: company.trim(), email: email.trim(),
        phone: phone.trim(), role: role.trim(),
        biz_type: bizType, staffing, rev_target: revTarget, meetings, deal_size: dealSize,
        markets, infra,
        estimate_lo: estimate?.lo, estimate_hi: estimate?.hi, tier: estimate?.tier,
      });
    } catch {
      // silent — still reveal on error
    }
    setSubmitting(false);
    setRevealed(true);
    setSubmitted(true);
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-x-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-25 pointer-events-none" />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-6">
            <div className="w-4 h-[1px] bg-blue-400" />
            Pricing
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-7 max-w-2xl">
            Built around your deal.{' '}
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Structured to perform.
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg mb-10">
            No tiers. No fixed packages. Every engagement is priced to the scope of the division we build and scoped individually before a number is ever set.
          </p>
        </motion.div>
      </section>

      {/* ─── SCOPE VARIABLES ─────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-4">
                <div className="w-4 h-[1px] bg-blue-400" />
                Scope Variables
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                What determines<br/>
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  your investment.
                </span>
              </h2>
            </motion.div>
            <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="text-[0.9rem] text-white/50 leading-relaxed">
              Every engagement is scoped individually before pricing is set. These five factors determine the complexity and depth of the Revenue Division we build for you.
            </motion.p>
          </div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="border border-white/8 rounded-xl overflow-hidden divide-y divide-white/5">
            {[
              {
                num: '01',
                name: 'Headcount and Staff Composition',
                note: 'The number of revenue roles we source, place, and manage. Each additional role expands the managed scope we carry on your behalf across the full operating cycle.',
                impact: 'High Impact',
                high: true,
              },
              {
                num: '02',
                name: 'Systems Infrastructure Complexity',
                note: 'The number of tools, integrations, and automated workflows required to build and run your revenue stack. Greenfield builds carry more architectural load than inherited foundations.',
                impact: 'High Impact',
                high: true,
              },
              {
                num: '03',
                name: 'Market and Pipeline Scope',
                note: 'Target market breadth, deal cycle complexity, and outbound volume all determine the strategic and execution load we carry each operating quarter.',
                impact: 'High Impact',
                high: true,
              },
              {
                num: '04',
                name: 'Deployment Starting Point',
                note: "Whether we're building from zero or scaling an existing foundation changes the upfront architecture work required and the speed at which the division becomes operational.",
                impact: 'Moderate',
                high: false,
              },
              {
                num: '05',
                name: 'Strategic Engagement Depth',
                note: 'Standard managed services versus full executive partnership. Clients who want Bliztic embedded at the leadership level and involved in go-to-market direction carry a broader engagement scope.',
                impact: 'Moderate',
                high: false,
              },
            ].map((v, i) => (
              <div key={v.num} className="grid grid-cols-[40px_1fr_auto] gap-5 items-start p-6 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors">
                <div className="text-[0.75rem] font-bold text-white/20 pt-0.5">{v.num}</div>
                <div>
                  <div className="text-[0.85rem] font-semibold text-white mb-1.5">{v.name}</div>
                  <div className="text-[0.78rem] text-white/40 leading-relaxed">{v.note}</div>
                </div>
                <div className={`text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded whitespace-nowrap mt-0.5 ${
                  v.high
                    ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                    : 'text-white/40 bg-white/[0.04] border border-white/8'
                }`}>
                  {v.impact}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS / LOGISTICS ────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-10">
            <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-4">
              <div className="w-4 h-[1px] bg-blue-400" />
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              The structure behind{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                every engagement.
              </span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="grid sm:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {[
              {
                tag: 'Operating Period',
                title: 'Quarterly Cycles',
                body: 'Engagements run on <strong>90-day operating cycles</strong>, not annual contracts. Each quarter renews based on performance and strategic alignment, keeping us accountable and keeping you in control.',
              },
              {
                tag: 'Investment Structure',
                title: 'Fixed. All-In. No Surprises.',
                body: 'Covers <strong>strategy, systems, staff, and execution</strong> in full. One number, billed monthly or weekly. No hourly fees and no variable costs. Third-party software is passed through at cost with zero markup.',
              },
              {
                tag: 'Deployment',
                title: 'Operational in 30 Days',
                body: 'From signed agreement, your Revenue Division is <strong>fully operational within 30 days</strong>. Strategy locked, systems live, staff placed, outbound running. No multi-quarter ramp periods and no planning-only phases.',
              },
              {
                tag: 'Capacity',
                title: 'Five Core Clients. No More.',
                body: 'Bliztic holds a strict limit of <strong>five active core engagements</strong> at any time. The depth of service we deliver requires it. When a seat opens, it goes to the right company.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors p-8">
                <div className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-blue-400 mb-3">{card.tag}</div>
                <div className="text-base font-bold text-white mb-3 tracking-tight">{card.title}</div>
                <div
                  className="text-[0.8rem] text-white/50 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: card.body.replace(/<strong>/g, '<strong class="text-white/80 font-semibold">') }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ESTIMATOR ───────────────────────────────────────────────────── */}
      <section id="estimator" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-4">
                <div className="w-4 h-[1px] bg-blue-400" />
                Engagement Estimator
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5">
                Estimate your{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  investment.
                </span>
              </h2>
              <div className="inline-flex items-center gap-3 border border-white/10 rounded-lg px-4 py-3 bg-[#0a0a0a]">
                <span className="text-base font-extrabold text-white tracking-tight">$5K<span className="text-xs font-medium text-white/40">/mo</span></span>
                <div className="w-px h-5 bg-white/10" />
                <span className="text-xs text-white/40 leading-snug">Minimum monthly commitment<br/>to become a <strong className="text-white/60 font-semibold">Core Client</strong>.</span>
              </div>
            </motion.div>
            <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="text-[0.85rem] text-white/50 leading-relaxed">
              Not a formal quote. Use this to orient yourself on what an engagement of your scope typically looks like before we connect. All pricing is confirmed through our diagnostic consultation.
            </motion.p>
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">

            {/* LEFT: Controls */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/25">
                Tell us about your business
              </div>
              <div className="p-6 flex flex-col gap-6">

                <EstSelect
                  value={bizType}
                  onChange={setBizType}
                  label="What type of business do you run?"
                  options={[
                    { value: '', label: 'Select business type...' },
                    { value: 'agency', label: 'Agency' },
                    { value: 'saas', label: 'SaaS' },
                    { value: 'ecommerce', label: 'E-commerce' },
                    { value: 'startup', label: 'Startup' },
                    { value: 'consulting', label: 'Consulting' },
                    { value: 'other', label: 'Other' },
                  ]}
                />

                <EstSelect
                  value={staffing}
                  onChange={setStaffing}
                  label="How would you describe your current sales team?"
                  hint={staffingHint}
                  options={[
                    { value: '', label: 'Select team situation...' },
                    { value: '1', label: "We don't have one yet" },
                    { value: '2', label: "It's just me or a founder-led effort" },
                    { value: '3', label: 'We have one or two external reps' },
                    { value: '4', label: "We have an internal team but underperforming" },
                    { value: '5', label: 'We have a strong team and just need more pipeline' },
                  ]}
                />

                <EstSelect
                  value={revTarget}
                  onChange={setRevTarget}
                  label="What is your monthly revenue target?"
                  options={[
                    { value: '', label: 'Select revenue target...' },
                    { value: '1', label: 'Under $25K per month' },
                    { value: '2', label: '$25K to $75K per month' },
                    { value: '3', label: '$75K to $250K per month' },
                    { value: '4', label: '$250K to $750K per month' },
                    { value: '5', label: '$750K+ per month' },
                  ]}
                />

                <EstSelect
                  value={meetings}
                  onChange={setMeetings}
                  label="How many qualified meetings do you need monthly?"
                  options={[
                    { value: '', label: 'Select meeting volume...' },
                    { value: '1', label: '1 to 5 meetings' },
                    { value: '2', label: '6 to 15 meetings' },
                    { value: '3', label: '16 to 30 meetings' },
                    { value: '4', label: '30+ meetings' },
                  ]}
                />

                <EstSelect
                  value={dealSize}
                  onChange={setDealSize}
                  label="What is your average deal size?"
                  options={[
                    { value: '', label: 'Select deal size...' },
                    { value: '1', label: 'Under $5K' },
                    { value: '2', label: '$5K to $25K' },
                    { value: '3', label: '$25K to $100K' },
                    { value: '4', label: '$100K+' },
                  ]}
                />

                <EstSelect
                  value={markets}
                  onChange={setMarkets}
                  label="How many markets or segments are you selling into?"
                  options={[
                    { value: '', label: 'Select market scope...' },
                    { value: '1', label: 'One focused market' },
                    { value: '2', label: 'Two to three markets' },
                    { value: '3', label: 'Four or more markets' },
                  ]}
                />

                <EstSelect
                  value={infra}
                  onChange={setInfra}
                  label="What does your current acquisition infrastructure look like?"
                  options={[
                    { value: '', label: 'Select infrastructure state...' },
                    { value: '1', label: 'Nothing in place yet' },
                    { value: '2', label: 'Some tools and processes, needs work' },
                    { value: '3', label: 'Solid foundation, needs optimization' },
                  ]}
                />

              </div>
            </motion.div>

            {/* RIGHT: Result panel */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="lg:sticky lg:top-24 relative">
              {/* Pulsing glow ring — appears when all dropdowns filled */}
              {allDropdownsFilled && !submitted && (
                <motion.div
                  className="absolute -inset-px rounded-xl border border-blue-500/60 pointer-events-none z-20"
                  style={{ boxShadow: '0 0 40px rgba(59,130,246,0.2), 0 0 12px rgba(59,130,246,0.15) inset' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden relative z-10">

                {/* Panel header */}
                <div className="bg-[#0f0f0f] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/30">Estimated Monthly Investment</span>
                  <span className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded">Indicative</span>
                </div>

                <div className="p-6">
                  {/* Numbers section — blurred until revealed */}
                  <div className="relative mb-6">
                    <div className={`transition-all duration-700 ${revealed ? '' : 'blur-[7px] select-none pointer-events-none'}`}>
                      <div className="text-[0.75rem] text-white/40 mb-1.5">Per week</div>
                      <div className="text-4xl font-extrabold tracking-tight text-white mb-1 leading-none">{displayRange}</div>
                      <div className="text-[0.75rem] text-white/40 mb-6">Billed weekly. Quarterly operating cycle.</div>

                      <div className="flex items-center gap-2.5 bg-blue-500/8 border border-blue-500/18 rounded-lg px-4 py-3 mb-5">
                        <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                        <div className="text-[0.78rem] font-semibold text-blue-300">{displayTier}</div>
                      </div>

                      <div className="border-t border-white/5 pt-4 flex flex-col gap-2.5 mb-5">
                        {[
                          ['Quarterly total',      displayQuarterly],
                          ['Sales staffing',       staffingLabel],
                          ['Engagement scope',     displayScope],
                          ['Operating period',     '90-day cycle'],
                          ['Deployment timeline',  '30 days or less'],
                        ].map(([k, v]) => (
                          <div key={k} className="flex justify-between items-baseline text-[0.8rem]">
                            <span className="text-white/40">{k}</span>
                            <span className="font-semibold text-white">{v}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[0.68rem] text-white/20 leading-relaxed border-t border-white/5 pt-4 mb-4">
                        Indicative only. Not a formal quote. All engagements are scoped individually through our diagnostic consultation.
                      </div>
                    </div>

                    {/* Lock overlay */}
                    {!revealed && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                        <div className="bg-[#0a0a0a]/90 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/8 flex flex-col items-center gap-2">
                          <Lock className="w-4 h-4 text-blue-400" />
                          <p className="text-[0.72rem] text-white/50 leading-relaxed">
                            {allDropdownsFilled
                              ? 'Enter your info below and submit to reveal your estimate'
                              : 'Complete all selections to unlock your estimate'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form — shown until submitted */}
                  {!submitted ? (
                    <div className={`border-t pt-5 flex flex-col gap-3 transition-all duration-500 ${allDropdownsFilled ? 'border-blue-500/25' : 'border-white/5'}`}>
                      {/* Nudge banner — appears when all dropdowns filled */}
                      {allDropdownsFilled ? (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center gap-2.5 bg-blue-500/10 border border-blue-500/30 rounded-lg px-3.5 py-2.5"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
                          <p className="text-[0.72rem] font-semibold text-blue-300 leading-snug">
                            Your estimate is ready — enter your details below to reveal it
                          </p>
                        </motion.div>
                      ) : (
                        <div>
                          <p className="text-[0.78rem] font-bold text-white mb-0.5">Redeem your free consultation</p>
                          <p className="text-[0.7rem] text-white/40 leading-relaxed">Complete the questions on the left, then enter your details to reveal your estimate.</p>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Your name *"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className={`bg-[#111620] border text-white text-[0.78rem] font-medium px-3 py-2.5 rounded-lg outline-none placeholder:text-white/20 transition-colors focus:border-blue-500/40 ${errors.name ? 'border-red-500/50' : allDropdownsFilled ? 'border-blue-500/25 focus:border-blue-500/60' : 'border-white/10'}`}
                        />
                        <input
                          type="text"
                          placeholder="Company *"
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          className={`bg-[#111620] border text-white text-[0.78rem] font-medium px-3 py-2.5 rounded-lg outline-none placeholder:text-white/20 transition-colors focus:border-blue-500/40 ${errors.company ? 'border-red-500/50' : allDropdownsFilled ? 'border-blue-500/25 focus:border-blue-500/60' : 'border-white/10'}`}
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Work email *"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`bg-[#111620] border text-white text-[0.78rem] font-medium px-3 py-2.5 rounded-lg outline-none placeholder:text-white/20 transition-colors focus:border-blue-500/40 ${errors.email ? 'border-red-500/50' : allDropdownsFilled ? 'border-blue-500/25 focus:border-blue-500/60' : 'border-white/10'}`}
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className={`bg-[#111620] border text-white text-[0.78rem] font-medium px-3 py-2.5 rounded-lg outline-none placeholder:text-white/20 transition-colors focus:border-blue-500/40 ${allDropdownsFilled ? 'border-blue-500/25 focus:border-blue-500/60' : 'border-white/10'}`}
                      />
                      <input
                        type="text"
                        placeholder="Your role / title"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className={`bg-[#111620] border text-white text-[0.78rem] font-medium px-3 py-2.5 rounded-lg outline-none placeholder:text-white/20 transition-colors focus:border-blue-500/40 ${allDropdownsFilled ? 'border-blue-500/25 focus:border-blue-500/60' : 'border-white/10'}`}
                      />

                      <button
                        onClick={handleSubmit}
                        disabled={submitting || !canSubmit}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[0.8rem] font-bold tracking-wide shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-1"
                      >
                        {submitting ? 'Submitting...' : 'Reveal My Estimate'}
                        {!submitting && <ArrowRight className="w-4 h-4" />}
                      </button>

                      {!canSubmit && (
                        <p className="text-[0.68rem] text-white/25 text-center leading-relaxed">
                          {!allDropdownsFilled ? 'Complete all selections on the left first' : 'Name, company, and email required'}
                        </p>
                      )}
                    </div>
                  ) : (
                    /* Success state */
                    <div className="border-t border-white/5 pt-5 flex flex-col items-center text-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-[0.85rem] font-bold text-white">You're on the list.</div>
                      <div className="text-[0.75rem] text-white/45 leading-relaxed">
                        We'll reach out within one business day to confirm your consultation. Your estimate has been included for context.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            className="relative bg-[#0a0a0a] border border-blue-500/20 rounded-2xl px-8 sm:px-16 py-16 overflow-hidden"
          >
            {/* top-edge gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            {/* glow */}
            <div className="absolute top-0 right-0 w-96 h-72 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.07)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded mb-6">
                Free for All Prospective Core Clients
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5 max-w-2xl">
                Price should never be the reason you don't take the call.{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  So the first one is on us.
                </span>
              </h2>

              <p className="text-[0.9rem] text-white/55 leading-relaxed max-w-2xl mb-10">
                Every company considering a Bliztic core engagement is eligible for a complimentary introductory consultation. No cost, no obligation. We diagnose your revenue situation, show you exactly what a Revenue Division looks like inside your company, and give you a real scope. If it is not the right fit, we will tell you. If it is, you will know immediately.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
                <a
                  href="#estimator"
                  onClick={e => { e.preventDefault(); document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:opacity-90 transition-opacity"
                >
                  Build Your Estimate
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  to="/qualify"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors pt-3 sm:pt-3.5"
                >
                  Or apply to qualify
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="flex gap-1.5">
                  {[true, true, false, false, false].map((filled, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full ${filled ? 'bg-blue-400' : 'bg-white/15'}`}
                    />
                  ))}
                </div>
                <p className="text-[0.8rem] text-white/40">
                  <strong className="text-white/70 font-semibold">2 of 5 core client seats</strong> currently filled. 3 available this quarter.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER NOTE ─────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[0.75rem] text-white/20">
            Minimum base investment $5,000/mo. All engagements subject to availability and qualification.
          </div>
          <div className="text-[0.75rem] text-white/20">
            © {new Date().getFullYear()} Bliztic. Revenue Division as a Service.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
