import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay },
});

const Eyebrow: React.FC<{ children: React.ReactNode; centered?: boolean }> = ({ children, centered }) => (
  <div className={`flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-5 ${centered ? 'justify-center' : ''}`}>
    <div className="w-4 h-[1px] bg-blue-400" />
    {children}
  </div>
);

const About: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#030303] overflow-x-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-25 pointer-events-none" />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-full max-w-3xl h-[480px] bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.09)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.04)_0%,transparent_65%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">

          <motion.div {...fadeUp()}>
            <Eyebrow>About Bliztic</Eyebrow>
            <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.08] tracking-tight mb-7">
              Built from the<br/>ground up.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to deploy.
              </span>
            </h1>
            <p className="text-[0.95rem] text-white/55 leading-[1.85] max-w-[44ch]">
              Bliztic is a managed revenue services company. We partner with select B2B founders to serve as their complete front-end revenue function, built on years of deliberate infrastructure development and refined through real industrial engagements.
            </p>
          </motion.div>

          {/* Founder quote card */}
          <motion.div {...fadeUp(0.15)}>
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-xl px-8 py-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-blue-400 to-cyan-500 rounded-l-xl" />
              <div className="absolute top-0 right-0 w-64 h-48 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.07)_0%,transparent_65%)] pointer-events-none" />
              <blockquote className="relative z-10 text-[0.95rem] text-white/80 leading-[1.85] italic mb-6">
                "We spent years building something we were genuinely proud of before we ever offered it to anyone. Every system, every process, and every operational layer was tested under real conditions and refined until it worked the way it needed to. What we bring to our partners on day one is not a framework. It is a finished engine."
              </blockquote>
              <p className="relative z-10 text-[0.68rem] font-semibold tracking-[0.15em] uppercase text-white/30">
                Founder, <span className="text-blue-400">Bliztic</span>
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── WHO WE ARE ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <motion.div {...fadeUp()}>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              A revenue division.<br/>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Not a consulting firm.
              </span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="flex flex-col gap-4 text-[0.9rem] text-white/55 leading-[1.9] lg:pt-2">
            <p>
              Bliztic was founded on the conviction that B2B companies do not fail because of product. They fail because they never build the infrastructure that makes selling consistent, scalable, and sustainable.
            </p>
            <p>
              We do not consult. We do not advise from the sidelines. We step in as your front-end revenue partner, handling strategy, systems, staffing, and execution as a fully managed service. When you work with us, you are not hiring a firm. You are gaining an engine.
            </p>
            <p>
              We work with no more than four to five partners at any given time. Our model is built around deep partnership, not volume. Every company we take on receives our full attention and our full capability from day one.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ── HOW WE GOT HERE / TIMELINE ─────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp()} className="mb-14">
            <Eyebrow>How We Got Here</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Years of building.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                One engine.
              </span>
            </h2>
            <p className="text-[0.9rem] text-white/50 leading-relaxed max-w-[56ch]">
              Our engine did not emerge from theory. It was assembled piece by piece, pressure tested in real environments, and refined until every component worked to our satisfaction. The timeline below reflects exactly how it came together.
            </p>
          </motion.div>

          <div className="flex flex-col max-w-3xl">
            {[
              {
                period: 'Year One, Q1 and Q2',
                title: 'Building the Strategic Core',
                text: 'Before any outreach, any system, or any hire, strategy came first. We developed a repeatable framework for diagnosing where revenue breaks down in B2B companies. Positioning, ideal client definition, message architecture, and competitive differentiation were established as the foundation that everything else would be built upon.',
                current: false,
              },
              {
                period: 'Year One, Q3 and Q4',
                title: 'Connecting Strategy to Infrastructure',
                text: 'Strategy without systems is only planning. We built the underlying infrastructure that converts intent into measurable activity. CRM architecture, outreach sequencing, pipeline tracking, and the full operational layer that ties strategy to execution were developed and stress tested during this phase.',
                current: false,
              },
              {
                period: 'Year Two, Q1 and Q2',
                title: 'Staffing the Right Roles the Right Way',
                text: 'Systems require people, but not just any people. We developed a staffing model built around the specific roles a revenue function actually needs and how to hire, onboard, and manage those roles within a fully managed service context. This is where most companies spend the most and get the least. We spent a full quarter getting it right.',
                current: false,
              },
              {
                period: 'Year Two, Q3 and Q4',
                title: 'Building the Execution Layer',
                text: 'The final and most demanding component was execution. Reporting architecture, performance feedback loops, quality control, and the daily operational cadence that keeps the entire engine running were developed and integrated during this phase. This is the layer that holds everything together in practice.',
                current: false,
              },
              {
                period: 'Today',
                title: 'A Full Stack Revenue Division, Ready to Deploy',
                text: "All four pillars are fully assembled, integrated, and field tested. What took years to build can now be deployed into a client's business within 30 days. The research and development is complete. Our partners inherit the result and everything that came with building it.",
                current: true,
              },
            ].map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="grid grid-cols-[14px_1fr] gap-x-8 pb-12 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1 z-10 transition-all ${
                    item.current
                      ? 'bg-blue-400 border-blue-400 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]'
                      : 'bg-[#030303] border-blue-400/50 shadow-[0_0_0_3px_rgba(59,130,246,0.08)]'
                  }`} />
                  {i < 4 && <div className="flex-1 w-px bg-gradient-to-b from-white/10 to-white/[0.04] mt-2" />}
                </div>
                <div>
                  <div className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-blue-400 mb-1.5">{item.period}</div>
                  <div className="text-[1rem] font-bold text-white mb-2.5 tracking-tight">{item.title}</div>
                  <div className="text-[0.85rem] text-white/42 leading-[1.85]">{item.text}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── WHAT IT TOOK ───────────────────────────────────────────────── */}
      <section className="relative z-10 border-y border-white/5 bg-[#060608]">
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <motion.div {...fadeUp()}>
            <Eyebrow>What It Took</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              The real cost of building{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                this from scratch.
              </span>
            </h2>
            <p className="text-[0.9rem] text-white/50 leading-[1.9]">
              We want you to understand what these years actually looked like so you can make an honest comparison between partnering with us and attempting to build it on your own. The infrastructure we bring to your business on day one is the result of hundreds of hours of development, real engagement experience, and systematic refinement across every pillar. The question is never whether you need it. The question is whether you want to build it or inherit it.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.12)} className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {[
              {
                label: 'Time',
                text: 'Years of deliberate, sequential development. One pillar at a time, each one built on the last and validated before the next began.',
              },
              {
                label: 'Capital',
                text: 'Significant investment in tooling, infrastructure, and the iteration cycles required to get each component to the standard we hold ourselves to.',
              },
              {
                label: 'Field Experience',
                text: 'Real engagements, real feedback, and real refinement. No framework survives without being pressure tested in live market conditions.',
              },
              {
                label: 'Team Assembly',
                text: 'Building and refining a staffing model that performs inside a fully managed service is not a standard hire. It took dedicated time and intentional design to get right.',
              },
            ].map((card) => (
              <div key={card.label} className="bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors p-7">
                <div className="text-[0.62rem] font-bold tracking-[0.2em] uppercase text-blue-400 mb-2.5">{card.label}</div>
                <div className="text-[0.82rem] text-white/42 leading-[1.8]">{card.text}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── INSIGHTS ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp()} className="mb-10">
            <Eyebrow>What We Have Learned</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Insights from{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                the field.
              </span>
            </h2>
            <p className="text-[0.9rem] text-white/50 leading-relaxed max-w-[56ch]">
              Every engagement sharpens us. Below are a few of the clearest lessons we have carried forward, not as client stories, but as the specific insights that changed how we think and how we build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                tag: 'On Sales Process',
                quote: '"Structure closes more deals than skill ever will."',
                text: 'The most consistent closers are not the smoothest talkers. They are the ones operating inside the clearest process. A well designed sales sequence does the heavy lifting long before any conversation begins.',
              },
              {
                tag: 'On Positioning',
                quote: '"Clarity is the product."',
                text: 'Companies that cannot explain what they do in a single sentence are not confused about their product. They are confused about their audience. Getting positioning right unlocked everything downstream in every engagement we have run.',
              },
              {
                tag: 'On Partnership',
                quote: '"Trust is the first deliverable."',
                text: 'Before any system is built or strategy deployed, a client has to believe you are genuinely in it with them. We treat the first 30 days as a trust building exercise as much as an operational one. The results follow naturally from there.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.tag}
                {...fadeUp(i * 0.1)}
                className="bg-[#0a0a0a] border border-white/5 hover:border-blue-500/25 hover:bg-[#0c0c0c] transition-all duration-300 rounded-xl p-8"
              >
                <div className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-blue-400 mb-4">{card.tag}</div>
                <blockquote className="text-[1rem] font-semibold italic text-white leading-[1.55] mb-4 tracking-tight">{card.quote}</blockquote>
                <p className="text-[0.82rem] text-white/42 leading-[1.82]">{card.text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PRINCIPLES ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">

          <motion.div {...fadeUp()} className="mb-10">
            <Eyebrow>Company Principles</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              How we{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                lead.
              </span>
            </h2>
            <p className="text-[0.9rem] text-white/50 leading-relaxed max-w-[52ch]">
              These are not decorative values. They shape every decision we make, every partner we take on, and everything our clients can count on from us throughout the engagement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: 'Faith',
                text: 'We operate with conviction in our model, in our partners, and in the outcomes we are building toward together. When the work gets difficult, we do not waver. We have invested too much to leave anything on the table.',
              },
              {
                name: 'Loyalty',
                text: 'When we commit to a partner, we are fully committed. We do not spread ourselves across dozens of clients. The few relationships we take on receive our complete capacity and our undivided attention for the duration of the engagement.',
              },
              {
                name: 'Integrity',
                text: 'We tell you what we see, not what you want to hear. Our value to you starts with honesty. If something is not working, we will say it plainly and move to fix it. That standard never changes regardless of what the engagement looks like.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.name}
                {...fadeUp(i * 0.1)}
                className="group relative bg-[#0a0a0a] border border-white/5 hover:border-blue-500/25 rounded-xl p-8 overflow-hidden transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-xl font-extrabold tracking-tight text-white mb-3">{card.name}</div>
                <p className="text-[0.85rem] text-white/42 leading-[1.82]">{card.text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#060608] overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_50%,rgba(59,130,246,0.07)_0%,transparent_65%)] pointer-events-none" />

        <motion.div {...fadeUp()} className="max-w-2xl mx-auto relative z-10">
          <Eyebrow centered>What Comes Next</Eyebrow>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-5">
            Now you know who we are.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              See what we offer.
            </span>
          </h2>
          <p className="text-[0.92rem] text-white/50 leading-[1.9] mb-10 max-w-[46ch] mx-auto">
            The engine is built, the model is proven, and the partnership structure is designed to move fast. If Bliztic feels like the right fit, the next step is understanding exactly what working with us looks like and what it costs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            >
              View Pricing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer note */}
      <div className="relative z-10 border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-[0.75rem] text-white/20">© {new Date().getFullYear()} Bliztic. All rights reserved.</div>
          <div className="text-[0.75rem] text-white/20">Revenue Division as a Service.</div>
        </div>
      </div>
    </div>
  );
};

export default About;
