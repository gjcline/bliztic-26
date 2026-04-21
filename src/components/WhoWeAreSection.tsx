import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Building2, TrendingUp } from 'lucide-react';

const features = [
  {
    id: 0,
    icon: Zap,
    title: 'Pre-Built. Ready to Deploy.',
    description: 'You are not paying us to figure things out. That work is already done. Every system, sequence, and playbook is built, tested, and ready. You get the output of over a year of R&D on day one.'
  },
  {
    id: 1,
    icon: Target,
    title: "You Know Exactly What You're Getting.",
    description: 'No vague deliverables. No "we\'ll figure it out together." You get a clearly defined engine with timelines, milestones, and guarantees. Think of it less like hiring a firm and more like activating a product.'
  },
  {
    id: 2,
    icon: Building2,
    title: 'We Build It. We Run It. You Scale.',
    description: 'Bliztic operates the entire front end of your sales motion. Strategy, systems, staff, and execution. all under one roof. You focus on the product and back-end delivery. We handle everything else.'
  },
  {
    id: 3,
    icon: TrendingUp,
    title: 'Speed No One Else Can Match.',
    description: 'To replicate what we deploy in 30 days internally, you are looking at 8 to 12 months of hiring, ramp time, and R&D. We have already done all of it. We just activate it inside your company.'
  }
];

const AUTO_ROTATE_INTERVAL = 5000;

export default function WhoWeAreSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeFeature = features[activeIndex];

  useEffect(() => {
    if (!isPaused) {
      const startTime = Date.now();

      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / AUTO_ROTATE_INTERVAL) * 100, 100);
        setProgress(newProgress);
      }, 50);

      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
        setProgress(0);
      }, AUTO_ROTATE_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex]);

  const handleFeatureClick = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  };

  return (
    <section id="who" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5">
      <div className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-blue-400 font-semibold mb-5">
        <div className="w-4 h-[1px] bg-blue-400" />
        Who We Are
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
        Not a Consultant.<br/>
        Not an Agency.<br/>
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Your Revenue Division.
        </span>
      </h2>

      <p className="text-white/60 max-w-lg mb-14 leading-relaxed">
        Every other solution sells you a piece of the puzzle. Bliztic is the only firm that installs the entire engine and operates it for you.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side - Icon Navigation (Mobile: Icons only, Desktop: Full cards) */}
        <div className="flex-shrink-0 lg:w-[45%]">
          {/* Mobile: Icon-only horizontal navigation */}
          <div className="flex lg:hidden gap-3 mb-6 justify-center">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeIndex === idx;

              return (
                <motion.button
                  key={feature.id}
                  onClick={() => handleFeatureClick(idx)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-16 h-16 rounded-xl border transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-blue-500/50 shadow-lg shadow-blue-500/20'
                      : 'bg-ink2 border-white/10 hover:border-blue-500/30 hover:bg-ink3'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className={`w-7 h-7 transition-all duration-500 ${
                      isActive ? 'text-blue-400' : 'text-white/40'
                    }`} />
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}

                  {isActive && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-500/30"
                        strokeDasharray={`${2 * Math.PI * 30}`}
                        strokeDashoffset={0}
                      />
                      <motion.circle
                        cx="50%"
                        cy="50%"
                        r="30"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-blue-400"
                        strokeDasharray={`${2 * Math.PI * 30}`}
                        strokeDashoffset={2 * Math.PI * 30 * (1 - progress / 100)}
                        style={{ transition: 'stroke-dashoffset 0.05s linear' }}
                      />
                    </svg>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop: Full feature cards */}
          <div className="hidden lg:block space-y-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              const isActive = activeIndex === idx;

              return (
                <motion.button
                  key={feature.id}
                  onClick={() => handleFeatureClick(idx)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                  className={`relative w-full text-left p-6 rounded-xl border transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-r from-ink3 to-ink2 border-blue-500/50 shadow-lg shadow-blue-500/10'
                      : 'bg-ink2 border-white/5 hover:border-white/10 hover:bg-ink3'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border-blue-500/50 scale-110'
                        : 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20'
                    }`}>
                      <Icon className={`w-5 h-5 transition-all duration-500 ${
                        isActive ? 'text-blue-400' : 'text-blue-400/50'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-bold tracking-tight transition-all duration-500 ${
                        isActive ? 'text-blue-400' : 'text-white/40'
                      }`}>
                        {feature.title}
                      </h3>
                    </div>
                  </div>

                  {isActive && (
                    <>
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-r"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.05, ease: 'linear' }}
                      />
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Side - Content Display */}
        <div className="flex-1 lg:min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="relative bg-gradient-to-br from-ink2 via-ink3 to-ink2 border border-white/10 rounded-2xl p-8 lg:p-10 h-full overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-start gap-5 mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/50 flex items-center justify-center shadow-lg shadow-blue-500/20"
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.1
                    }}
                  >
                    {(() => {
                      const Icon = activeFeature.icon;
                      return <Icon className="w-7 h-7 text-blue-400" />;
                    })()}
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      className="text-2xl lg:text-3xl font-bold text-white tracking-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeFeature.title}
                    </motion.h3>
                  </div>
                </div>

                <motion.div
                  className="w-16 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: '4rem' }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />

                <motion.p
                  className="text-white/70 leading-relaxed text-base lg:text-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  {activeFeature.description.split('. ').map((sentence, idx) => {
                    const isBold = sentence.includes('That work is already done') ||
                                   sentence.includes('You get a clearly defined engine') ||
                                   sentence.includes('Strategy, systems, staff, and execution') ||
                                   sentence.includes('We have already done all of it');

                    return (
                      <span key={idx}>
                        {isBold ? (
                          <strong className="text-white/95 font-semibold">{sentence}.</strong>
                        ) : (
                          sentence + (idx < activeFeature.description.split('. ').length - 1 ? '. ' : '')
                        )}
                        {idx < activeFeature.description.split('. ').length - 1 && ' '}
                      </span>
                    );
                  })}
                </motion.p>

                {/* Progress indicators */}
                <motion.div
                  className="flex gap-2 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {features.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleFeatureClick(idx)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={`relative h-1.5 rounded-full transition-all duration-500 overflow-hidden ${
                        idx === activeIndex
                          ? 'w-12 bg-white/10'
                          : 'w-6 bg-white/10 hover:bg-white/20'
                      }`}
                      aria-label={`Go to feature ${idx + 1}`}
                    >
                      {idx === activeIndex && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500"
                          initial={{ width: '0%' }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.05, ease: 'linear' }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
