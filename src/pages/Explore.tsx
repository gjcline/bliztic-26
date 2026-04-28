import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const CAL_URL = 'https://cal.com/bliztic/bliztic-base-consultation-session';
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL as string;

const PRIMARY_OPTIONS = [
  {
    value: 'A',
    title: 'We have not done the internal work yet to define what we actually need at this level',
    desc: 'We have not aligned internally on the problem, the scope, or the case for this investment.',
  },
  {
    value: 'B',
    title: 'We are not yet at the financial stage where this level of investment is viable',
    desc: 'The direction is right. The business is not yet in a position to back it.',
  },
  {
    value: 'C',
    title: 'We are not yet at the stage where committing to an engagement of this size is the right move',
    desc: 'The business has not reached the point where a full engagement is the appropriate next step.',
  },
  {
    value: 'D',
    title: 'Our existing infrastructure is not at the standard required to build on top of',
    desc: 'Systems are in place but need to be brought up to the right level first.',
  },
  {
    value: 'E',
    title: 'We have not completed the internal groundwork required to make a decision of this size',
    desc: 'The internal review has not reached the point where committing responsibly is possible.',
  },
];

type FollowupOption = { value: string; title: string; desc?: string };
type FollowupConfig = { question: string; type: 'choice' | 'pill'; options: FollowupOption[] };

const FOLLOWUP: Record<string, FollowupConfig> = {
  A: {
    question: 'Where has the internal work broken down?',
    type: 'choice',
    options: [
      { value: 'scope', title: 'We have not defined internally what we actually need', desc: 'The internal conversation about scope and requirements has not happened at the level it needs to.' },
      { value: 'roi', title: 'We have not built the internal business case to justify this investment', desc: 'No one internally has done the work to establish what this is worth to the business.' },
      { value: 'timing', title: 'The business is not yet at the stage where this level of commitment is appropriate', desc: 'The direction makes sense. The moment to act on it has not arrived.' },
      { value: 'fit', title: 'We have not done enough internal due diligence to make this decision responsibly', desc: 'We have not evaluated our situation with the rigor a commitment of this size requires.' },
    ],
  },
  B: {
    question: 'What best describes your current position?',
    type: 'pill',
    options: [
      { value: 'a1', title: 'We have not made this a priority in our current budget cycle' },
      { value: 'a2', title: 'We are early stage and not yet at the revenue level to support it' },
      { value: 'a3', title: 'We are not yet at the internal maturity or scale to commit at this level' },
      { value: 'a4', title: 'Our financial position requires us to phase commitments over a longer period' },
    ],
  },
  C: {
    question: 'Where is the gap most visible in your business right now?',
    type: 'pill',
    options: [
      { value: 'sales', title: 'Sales or revenue operations' },
      { value: 'ops', title: 'Internal operations or workflow automation' },
      { value: 'cx', title: 'Client delivery or service operations' },
      { value: 'data', title: 'Reporting, visibility, or data infrastructure' },
      { value: 'idk', title: 'Not sure. Need help identifying the right area.' },
    ],
  },
  D: {
    question: 'What best describes the state of your existing systems?',
    type: 'choice',
    options: [
      { value: 'opt', title: 'They work but are not performing at the level required', desc: 'Functional but not optimized for where the business is going.' },
      { value: 'grow', title: 'We have outgrown what we built for an earlier stage', desc: 'The infrastructure served us then. It is not serving us now.' },
      { value: 'gaps', title: 'There are specific gaps we do not have the internal capability to close', desc: 'Known problems that require outside expertise to solve properly.' },
      { value: 'self', title: 'We built it ourselves and it needs to be brought up to a professional standard', desc: 'It functions. It is not scalable and it will not hold under pressure.' },
    ],
  },
  E: {
    question: 'What internal work has not been completed yet?',
    type: 'pill',
    options: [
      { value: 'p1', title: 'We have not mapped out what this type of engagement would actually require from us internally' },
      { value: 'p2', title: 'We have not done the internal work to establish what the right level of investment looks like for our business' },
      { value: 'p3', title: 'We have not been honest internally about whether we are actually ready for this' },
      { value: 'p4', title: 'We need more time to complete our internal review before we can make this decision' },
    ],
  },
};

type RouteKey = 'consulting' | 'terms';
const ROUTES: Record<RouteKey, { badge: string; title: string; desc: string; bullets: string[]; note: string }> = {
  consulting: {
    badge: 'Base Level Consulting',
    title: 'This is where the work starts.',
    desc: 'Before a core client relationship is appropriate, there is foundational work to be done. Base level consulting is designed to build the clarity, infrastructure, and organizational readiness that core clients arrive with.',
    bullets: [
      'We identify exactly what needs to be in place before a core client engagement is the right next step.',
      'You work with us at a level calibrated to where you actually are right now, not where you want to be.',
      'When you are ready to move to a core client relationship, the groundwork will already be there.',
    ],
    note: 'This is the path most companies who eventually become core clients take first.',
  },
  terms: {
    badge: 'Core Client Terms Discussion',
    title: "The fit is there. Let's find a structure that works.",
    desc: 'You are at the stage where a core client relationship is the right fit. The current structure is the constraint, not the readiness. There are alternative arrangements — including equity and revenue share structures — that exist for exactly this situation.',
    bullets: [
      'We review your situation and identify which alternative structure is appropriate for where you are.',
      'Equity arrangements and increased revenue share models are both on the table.',
      'If a workable structure exists, you will leave with something concrete to evaluate and act on.',
    ],
    note: 'This conversation is only appropriate for companies that are operationally ready to function as core clients.',
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
};

interface PricingContact {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
}

export default function Explore() {
  const location = useLocation();
  const prefill = (location.state as PricingContact | null) ?? null;

  const [step, setStep] = useState(1);
  const [primaryReason, setPrimaryReason] = useState<string | null>(null);
  const [followupAnswer, setFollowupAnswer] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const route: RouteKey = primaryReason === 'B' ? 'terms' : 'consulting';
  const progress = { 1: 25, 2: 50, 3: 75, 4: 92, 5: 100 }[step] ?? 100;

  const primaryLabel = PRIMARY_OPTIONS.find(o => o.value === primaryReason)?.title ?? '';
  const followupConfig = primaryReason ? FOLLOWUP[primaryReason] : null;
  const followupLabel = followupConfig?.options.find(o => o.value === followupAnswer)?.title ?? '';

  function goTo(n: number) {
    setErrors({});
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePrimarySelect(val: string) {
    setPrimaryReason(val);
    setFollowupAnswer(null);
    setErrors({});
  }

  function nextFrom1() {
    if (!primaryReason) { setErrors({ primary: 'Select an option to continue.' }); return; }
    goTo(2);
  }

  function nextFrom2() {
    if (!followupAnswer) { setErrors({ followup: 'Select an option to continue.' }); return; }
    goTo(3);
  }

  async function submitAndBook() {
    setSubmitting(true);
    try {
      const nameParts = (prefill?.name ?? '').trim().split(' ');
      const firstName = nameParts[0] ?? '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const { data: row, error } = await supabase
        .from('explore_submissions')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: prefill?.email?.trim() ?? '',
          company: prefill?.company?.trim() ?? '',
          outcome: '',
          primary_reason: primaryReason,
          primary_reason_label: primaryLabel,
          followup_answer: followupAnswer,
          followup_answer_label: followupLabel,
          recommended_route: route,
        })
        .select('id')
        .single();

      if (error) console.error('Supabase insert error:', error);

      if (row?.id && WEBHOOK_URL) {
        try {
          const res = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              submissionId: row.id,
              source: 'explore_form',
              timestamp: new Date().toISOString(),
              contactInfo: {
                fullName: prefill?.name?.trim() ?? '',
                firstName,
                lastName,
                email: prefill?.email?.trim() ?? '',
                company: prefill?.company?.trim() ?? '',
                phone: prefill?.phone?.trim() ?? '',
              },
              answers: {
                primaryReason: primaryLabel,
                primaryReasonCode: primaryReason,
                followupAnswer: followupLabel,
                followupAnswerCode: followupAnswer,
                recommendedRoute: route,
              },
            }),
          });
          if (res.ok) {
            await supabase
              .from('explore_submissions')
              .update({ webhook_sent: true, webhook_sent_at: new Date().toISOString() })
              .eq('id', row.id);
          }
        } catch (webhookErr) {
          console.error('Webhook error:', webhookErr);
        }
      }

      window.open(CAL_URL, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const firstName = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('#ex-first')?.value.trim() ?? '';
    const lastName = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('#ex-last')?.value.trim() ?? '';
    const email = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('#ex-email')?.value.trim() ?? '';
    const company = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('#ex-company')?.value.trim() ?? '';
    const outcome = (e.currentTarget as HTMLFormElement).querySelector<HTMLTextAreaElement>('#ex-outcome')?.value.trim() ?? '';

    const errs: Record<string, string> = {};
    if (!firstName) errs.firstName = 'Required';
    if (!lastName) errs.lastName = 'Required';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email required';
    if (!company) errs.company = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const { data: row, error } = await supabase
        .from('explore_submissions')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email,
          company,
          outcome,
          primary_reason: primaryReason,
          primary_reason_label: primaryLabel,
          followup_answer: followupAnswer,
          followup_answer_label: followupLabel,
          recommended_route: route,
        })
        .select('id')
        .single();

      if (error) console.error('Supabase insert error:', error);

      if (row?.id && WEBHOOK_URL) {
        try {
          const res = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              submissionId: row.id,
              source: 'explore_form',
              timestamp: new Date().toISOString(),
              contactInfo: { fullName: `${firstName} ${lastName}`, firstName, lastName, email, company },
              answers: {
                primaryReason: primaryLabel,
                primaryReasonCode: primaryReason,
                followupAnswer: followupLabel,
                followupAnswerCode: followupAnswer,
                recommendedRoute: route,
                outcome: outcome || null,
              },
            }),
          });
          if (res.ok) {
            await supabase
              .from('explore_submissions')
              .update({ webhook_sent: true, webhook_sent_at: new Date().toISOString() })
              .eq('id', row.id);
          }
        } catch (webhookErr) {
          console.error('Webhook error:', webhookErr);
        }
      }

      goTo(5);
    } catch (err) {
      console.error('Submit error:', err);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#05070D] text-white flex flex-col items-center px-5 pb-24">
      {/* Top bar */}
      <div className="w-full max-w-[680px] flex items-center justify-between pt-9 mb-10">
        <a href="/" className="text-[13px] font-bold tracking-[0.16em] uppercase text-white">
          BLIZTIC<span className="text-blue-500">.</span>
        </a>
        {step < 5 && (
          <span className="text-[11px] font-medium tracking-wide text-white/30 font-mono">
            <span className="text-blue-300">{String(step).padStart(2, '0')}</span> / 04
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[680px] h-px bg-white/7 mb-14 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      <div className="w-full max-w-[640px]">
        <AnimatePresence mode="wait">

          {/* STEP 1 */}
          {step === 1 && (
            <motion.div key="step-1" {...fadeUp}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-5 h-px bg-blue-500" />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-300">Core Client Readiness</span>
              </div>
              <h1 className="font-light text-[clamp(28px,5vw,46px)] leading-[1.12] tracking-tight mb-4">
                Not every company is ready<br />to be a core client. <em className="not-italic text-blue-300">Yet.</em>
              </h1>
              <p className="text-[15px] leading-[1.75] text-white/55 max-w-[520px] mb-10">
                The companies we work with at the core client level meet a specific threshold of readiness. Answer a few questions and we will identify the right starting point.
              </p>
              <div className="w-full h-px bg-white/7 mb-8" />
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/30 mb-3">Where you are right now</p>
              <p className="text-[18px] font-normal leading-[1.4] text-white tracking-tight mb-5">
                What is the primary reason you are not yet in a position to move forward as a core client?
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {PRIMARY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => handlePrimarySelect(opt.value)}
                    className={`flex items-start gap-4 px-5 py-[17px] rounded-lg border text-left transition-all duration-200 ${
                      primaryReason === opt.value
                        ? 'border-blue-600 bg-blue-600/11'
                        : 'border-white/7 bg-[#0C1120] hover:border-white/13 hover:bg-[#111828]'
                    }`}
                  >
                    <span className={`w-[18px] h-[18px] mt-0.5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${
                      primaryReason === opt.value ? 'border-blue-500 bg-blue-600' : 'border-white/20'
                    }`}>
                      {primaryReason === opt.value && <span className="w-[7px] h-[7px] rounded-full bg-white" />}
                    </span>
                    <span>
                      <span className="block text-[14px] font-medium text-white leading-[1.42] mb-0.5">{opt.title}</span>
                      <span className="block text-[13px] text-white/50 leading-[1.55]">{opt.desc}</span>
                    </span>
                  </button>
                ))}
              </div>
              {errors.primary && <p className="text-[12px] text-red-400 font-medium mb-4">{errors.primary}</p>}
              <button
                onClick={nextFrom1}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-semibold rounded-lg transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && primaryReason && followupConfig && (
            <motion.div key="step-2" {...fadeUp}>
              <button onClick={() => goTo(1)} className="flex items-center gap-1.5 text-[12px] font-medium text-white/30 hover:text-white/55 mb-10 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-px bg-blue-500" />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-300">One more question</span>
              </div>
              <p className="text-[18px] font-normal leading-[1.4] text-white tracking-tight mb-5">{followupConfig.question}</p>
              {followupConfig.type === 'choice' ? (
                <div className="flex flex-col gap-2 mb-6">
                  {followupConfig.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setFollowupAnswer(opt.value); setErrors({}); }}
                      className={`flex items-start gap-4 px-5 py-[17px] rounded-lg border text-left transition-all duration-200 ${
                        followupAnswer === opt.value
                          ? 'border-blue-600 bg-blue-600/11'
                          : 'border-white/7 bg-[#0C1120] hover:border-white/13 hover:bg-[#111828]'
                      }`}
                    >
                      <span className={`w-[18px] h-[18px] mt-0.5 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${
                        followupAnswer === opt.value ? 'border-blue-500 bg-blue-600' : 'border-white/20'
                      }`}>
                        {followupAnswer === opt.value && <span className="w-[7px] h-[7px] rounded-full bg-white" />}
                      </span>
                      <span>
                        <span className="block text-[14px] font-medium text-white leading-[1.42] mb-0.5">{opt.title}</span>
                        {opt.desc && <span className="block text-[13px] text-white/50 leading-[1.55]">{opt.desc}</span>}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mb-6">
                  {followupConfig.options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setFollowupAnswer(opt.value); setErrors({}); }}
                      className={`px-4 py-2.5 rounded-full border text-[13px] font-medium transition-all duration-200 ${
                        followupAnswer === opt.value
                          ? 'border-blue-600 bg-blue-600/11 text-blue-300'
                          : 'border-white/7 bg-[#0C1120] text-white/55 hover:border-white/13 hover:text-white'
                      }`}
                    >
                      {opt.title}
                    </button>
                  ))}
                </div>
              )}
              {errors.followup && <p className="text-[12px] text-red-400 font-medium mb-4">{errors.followup}</p>}
              <button
                onClick={nextFrom2}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-semibold rounded-lg transition-colors"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 3 — Route reveal */}
          {step === 3 && (
            <motion.div key="step-3" {...fadeUp}>
              <button onClick={() => goTo(2)} className="flex items-center gap-1.5 text-[12px] font-medium text-white/30 hover:text-white/55 mb-10 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-px bg-blue-500" />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-300">Your path to core client</span>
              </div>
              <h2 className="text-[clamp(22px,4vw,32px)] font-light tracking-tight leading-[1.18] text-white mb-3">
                Here is your recommended starting point.
              </h2>
              <p className="text-[15px] leading-[1.75] text-white/55 mb-6">
                Based on your answers, this is the engagement designed to close the gap between where you are and where you need to be.
              </p>
              <div className="relative bg-[#0C1120] border border-white/7 rounded-xl px-7 py-7 mb-8 overflow-hidden">
                <span className="absolute top-0 left-0 right-0 h-[2px] bg-blue-600" />
                <span className="inline-block px-3 py-1 bg-blue-600/11 border border-blue-600/30 rounded-full text-[10.5px] font-bold tracking-[0.13em] uppercase text-blue-300 mb-4">
                  {ROUTES[route].badge}
                </span>
                <p className="text-[clamp(19px,2.8vw,24px)] font-medium tracking-tight text-white leading-[1.2] mb-2">{ROUTES[route].title}</p>
                <p className="text-[14.5px] leading-[1.72] text-white/55 mb-5">{ROUTES[route].desc}</p>
                <ul className="flex flex-col gap-2.5 mb-5">
                  {ROUTES[route].bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[14px] text-white/55 leading-[1.55]">
                      <span className="text-blue-500 text-[12px] mt-[3px] flex-shrink-0">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="pt-5 border-t border-white/7 text-[12.5px] text-white/30 italic leading-[1.65]">{ROUTES[route].note}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  onClick={prefill ? submitAndBook : () => goTo(4)}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-[14px] font-semibold rounded-lg transition-colors"
                >
                  {submitting ? 'Saving...' : <>{prefill ? 'Book my call' : 'Continue'} <ArrowRight className="w-4 h-4" /></>}
                </button>
                <button
                  onClick={() => { setPrimaryReason(null); setFollowupAnswer(null); goTo(1); }}
                  className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/12 bg-white/[0.04] text-white/60 text-[14px] font-medium rounded-lg hover:bg-white/[0.07] hover:text-white transition-all"
                >
                  Start over
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4 — Data capture */}
          {step === 4 && (
            <motion.div key="step-4" {...fadeUp}>
              <button onClick={() => goTo(3)} className="flex items-center gap-1.5 text-[12px] font-medium text-white/30 hover:text-white/55 mb-10 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-px bg-blue-500" />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-300">Last step</span>
              </div>
              <h2 className="text-[clamp(22px,4vw,32px)] font-light tracking-tight leading-[1.18] text-white mb-3">
                Before we schedule your call
              </h2>
              <p className="text-[15px] leading-[1.75] text-white/55 mb-8">
                A few details so we can prepare. Nothing more than what is necessary.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">First name</label>
                    <input
                      id="ex-first"
                      type="text"
                      placeholder="Alex"
                      className="bg-[#0C1120] border border-white/7 rounded-lg px-4 py-3.5 text-[14.5px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors"
                    />
                    {errors.firstName && <p className="text-[11.5px] text-red-400">{errors.firstName}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Last name</label>
                    <input
                      id="ex-last"
                      type="text"
                      placeholder="Chen"
                      className="bg-[#0C1120] border border-white/7 rounded-lg px-4 py-3.5 text-[14.5px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors"
                    />
                    {errors.lastName && <p className="text-[11.5px] text-red-400">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Work email</label>
                  <input
                    id="ex-email"
                    type="email"
                    placeholder="alex@company.com"
                    className="bg-[#0C1120] border border-white/7 rounded-lg px-4 py-3.5 text-[14.5px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors"
                  />
                  {errors.email && <p className="text-[11.5px] text-red-400">{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">Company</label>
                  <input
                    id="ex-company"
                    type="text"
                    placeholder="Acme Inc."
                    className="bg-[#0C1120] border border-white/7 rounded-lg px-4 py-3.5 text-[14.5px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors"
                  />
                  {errors.company && <p className="text-[11.5px] text-red-400">{errors.company}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30">
                    The outcome you are working toward <span className="text-white/20 normal-case font-normal text-[10px]">Optional</span>
                  </label>
                  <textarea
                    id="ex-outcome"
                    placeholder="Describe the result you are trying to achieve or the problem you are solving..."
                    rows={3}
                    className="bg-[#0C1120] border border-white/7 rounded-lg px-4 py-3.5 text-[14.5px] text-white placeholder-white/20 outline-none focus:border-blue-600 transition-colors resize-y leading-[1.65]"
                  />
                </div>
                {errors.submit && <p className="text-[12px] text-red-400 font-medium">{errors.submit}</p>}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-[14px] font-semibold rounded-lg transition-colors"
                  >
                    {submitting ? 'Submitting...' : 'Book my call'}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[12px] text-white/25 leading-[1.65]">Used only to prepare for your call. No unsolicited follow-up.</p>
              </form>
            </motion.div>
          )}

          {/* STEP 5 — Confirmation */}
          {step === 5 && (
            <motion.div key="step-5" {...fadeUp}>
              <div className="w-12 h-12 rounded-full bg-blue-600/11 border border-blue-600/28 flex items-center justify-center mb-6">
                <Check className="w-5 h-5 text-blue-300" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-5 h-px bg-blue-500" />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-300">Confirmed</span>
              </div>
              <h2 className="text-[clamp(22px,4vw,32px)] font-light tracking-tight leading-[1.18] text-white mb-3">
                {route === 'terms' ? 'Your terms discussion call is confirmed.' : 'Your consulting call is confirmed.'}
              </h2>
              <p className="text-[15px] leading-[1.75] text-white/55 mb-7">
                {route === 'terms'
                  ? 'Come ready to be specific about your current position and what you are able to put on the table.'
                  : 'Come prepared to talk honestly about where you are and what is currently standing in the way of moving forward.'}
              </p>
              <div className="relative bg-[#0C1120] border border-white/7 rounded-xl px-7 py-6 mb-8 overflow-hidden">
                <span className="absolute top-0 left-0 right-0 h-[2px] bg-blue-600" />
                <span className="inline-block px-3 py-1 bg-blue-600/11 border border-blue-600/30 rounded-full text-[10.5px] font-bold tracking-[0.13em] uppercase text-blue-300 mb-3">
                  {ROUTES[route].badge}
                </span>
                <p className="text-[17px] font-medium text-white mb-2">{ROUTES[route].title}</p>
                <p className="text-[13.5px] text-white/50 leading-[1.65]">
                  Schedule your call below. We will review your answers before the session.
                </p>
              </div>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-[14px] font-semibold rounded-lg transition-colors mb-3"
              >
                Schedule my call <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <p className="mt-16 text-[11.5px] text-white/15 tracking-wide">© Bliztic. All information shared is kept confidential.</p>
    </div>
  );
}
