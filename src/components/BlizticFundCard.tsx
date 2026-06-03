import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Is this a grant, loan, or equity deal?',
    a: 'None of the above. The Bliztic Fund is an internal client incentive. We absorb the implementation cost so you can get started without an upfront payment. No equity, no debt, no external program. Your ongoing agreement with Bliztic is the only commitment required.'
  },
  {
    q: 'What does the ongoing agreement look like?',
    a: 'After implementation, Bliztic operates your Sales Engine on an ongoing basis. Weekly execution management, system optimization, performance oversight, and monthly and quarterly reviews are all included. Pricing is based on scope and is covered during the qualification process.'
  },
  {
    q: "What if a slot isn't available right now?",
    a: "You can still get started through the standard implementation agreement, which covers the same scope with an upfront development fee. Alternatively, we can add you to the priority list for the next available funded slot."
  }
];

export default function BlizticFundCard() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="relative w-full rounded-2xl overflow-hidden border border-blue-500/30"
        style={{ background: 'linear-gradient(160deg, #0C1122 0%, #090C18 100%)' }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 60%, transparent 100%)' }}
        />

        {/* HEADER */}
        <div className="px-7 pt-8 pb-6 border-b border-white/5">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">Bliztic Fund</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white/95 leading-snug mb-3">
            No payments until your engine goes live.
          </h3>
          <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
            The Bliztic Fund applies directly to this Sales Engine. All implementation and development costs are covered upfront for{' '}
            <em><strong className="text-white/70 not-italic">qualifying core clients</strong></em>, so nothing is owed until your engine is fully built and live. We service five core clients at a time and fund access is on a first come, first served basis.
          </p>
        </div>

        {/* STATS ROW */}
        <div className="flex flex-col sm:flex-row border-b border-white/5">
          {[
            { val: '$0', label: 'Due before go live' },
            { val: '$20K–$60K', label: 'Implementation costs covered' },
            { val: 'Limited to 5', label: 'Core client slots, first come first served' }
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex-1 px-7 py-5 ${i < arr.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-white/5' : ''}`}
            >
              <div className="text-xl font-extrabold text-blue-400 tracking-tight mb-1">{stat.val}</div>
              <div className="text-[11px] text-white/30 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* BODY */}
        <div className="px-7 py-6">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <a
              href="/qualify"
              className="inline-block text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 transition-colors duration-150"
            >
              Check core client availability
            </a>
            <button
              onClick={() => setAccordionOpen(prev => !prev)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 hover:text-white transition-colors duration-150"
            >
              How it works
              <motion.span animate={{ rotate: accordionOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>
          </div>
          <p className="text-[11.5px] text-white/25 leading-relaxed">
            Available to qualifying companies on a first come, first served basis. Slots do not roll over between quarters.
          </p>

          {/* ACCORDION */}
          <AnimatePresence initial={false}>
            {accordionOpen && (
              <motion.div
                key="accordion"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-white/5 space-y-5">

                  {/* Section 1 */}
                  <div>
                    <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-blue-500 mb-2">What the fund covers</div>
                    <p className="text-sm text-white/45 leading-relaxed">
                      The fund covers the initial development and implementation costs associated with the Full Stack Sales Engine. All build costs are absorbed upfront so your engagement begins with a fully operational system already in place.
                    </p>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Section 2 */}
                  <div>
                    <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-blue-500 mb-2">How core clients qualify</div>
                    <p className="text-sm text-white/45 leading-relaxed">
                      Core client slots are limited to five at any time. Availability is first come, first served for companies that meet our fit criteria: B2B companies with active revenue, an identifiable growth gap, and a decision maker ready to move.
                    </p>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Section 3 */}
                  <div>
                    <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-blue-500 mb-2">What happens after go-live</div>
                    <p className="text-sm text-white/45 leading-relaxed">
                      Once your engine is live, you enter the ongoing operating agreement where Bliztic manages, runs, and optimizes the system on a weekly, monthly, and quarterly basis. That is where the real return is built. The fund gets you in. The operating agreement is where we grow together.
                    </p>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* FAQ */}
                  <div>
                    <div className="text-[10px] font-bold tracking-[1.2px] uppercase text-blue-500 mb-3">Common questions</div>
                    <div>
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border-t border-white/5 last:border-b last:border-white/5">
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full flex justify-between items-center gap-3 py-3.5 text-left"
                          >
                            <span className="text-sm font-semibold text-white/70 leading-snug">{faq.q}</span>
                            <motion.span
                              animate={{ rotate: openFaq === idx ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0 text-white/25"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </motion.span>
                          </button>
                          <AnimatePresence initial={false}>
                            {openFaq === idx && (
                              <motion.div
                                key="answer"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <p className="text-sm text-white/35 leading-relaxed pb-4">{faq.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
