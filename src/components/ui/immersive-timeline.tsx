import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TimelineWeek {
  week: string;
  title: string;
  tasks: string[];
  outcome: string;
}

interface ImmersiveTimelineProps {
  weeks: TimelineWeek[];
}

export function ImmersiveTimeline({ weeks }: ImmersiveTimelineProps) {
  return (
    <div className="relative py-20">
      <div className="relative space-y-4 lg:space-y-6">
        {weeks.map((week, idx) => (
          <TimelineItem
            key={week.week}
            week={week}
            index={idx}
            totalWeeks={weeks.length}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  week: TimelineWeek;
  index: number;
  totalWeeks: number;
}

function TimelineItem({ week, index, totalWeeks }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -10]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);

  const circleScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  const isLeft = index % 2 === 0;
  const isLast = index === totalWeeks - 1;
  const nextIsLeft = !isLeft;

  return (
    <>
      <div ref={itemRef} className="relative min-h-[30vh] flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{ scale: circleScale, opacity: circleOpacity }}
            className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl"
          />
        </div>

        <motion.div
          style={{
            scale,
            opacity,
            rotateX,
            y,
            transformPerspective: 1200
          }}
          className={`relative max-w-3xl w-full px-4 ${
            isLeft ? 'mr-auto lg:ml-0' : 'ml-auto lg:mr-0'
          }`}
        >
        <div className="relative border border-white/10 rounded-3xl p-10 md:p-12 bg-gradient-to-br from-ink1 via-ink2 to-ink3 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/50"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </motion.div>
                <div className="text-[0.7rem] tracking-[0.3em] uppercase text-blue-400 font-bold">
                  {week.week}
                </div>
              </div>
              <div className="text-xs text-white/40 font-medium">
                {index + 1} of {totalWeeks}
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-8 group-hover:text-blue-400 transition-colors duration-500">
              {week.title}
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-xs tracking-wider uppercase text-cyan-400/80 font-semibold mb-4">
                  Key Activities
                </div>
                <ul className="space-y-3">
                  {week.tasks.map((task, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                      viewport={{ once: true }}
                      className="text-sm text-white/80 flex items-start gap-3 group/item"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 flex-shrink-0 group-hover/item:scale-150 group-hover/item:bg-cyan-400 transition-all duration-300" />
                      <span className="group-hover/item:text-white transition-colors duration-300">{task}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <div className="text-xs tracking-wider uppercase text-cyan-400/80 font-semibold mb-4">
                    Outcome
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                  >
                    <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/20 rounded-full blur-2xl" />
                    <p className="text-base font-bold text-white relative z-10 flex items-start gap-3">
                      <span className="text-cyan-400 text-xl flex-shrink-0">→</span>
                      {week.outcome}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-white/50">On Track</span>
              </div>
              <div className="text-xs text-white/40 font-mono">
                Day {(index * 7) + 1}-{(index + 1) * 7}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>

      {!isLast && (
        <div className="relative h-24 lg:h-32 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <motion.path
              d={
                isLeft
                  ? "M 25 0 L 25 40 L 75 60 L 75 100"
                  : "M 75 0 L 75 40 L 25 60 L 25 100"
              }
              stroke="url(#gradient)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </>
  );
}
