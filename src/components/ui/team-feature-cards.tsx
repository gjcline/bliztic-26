import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type TeamFeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
};

const TeamFeatureCard = ({ title, description, icon, index }: TeamFeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      viewport={{ once: true }}
      className="team-feature-card group"
    >
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-blue-400/30 rounded-tl-xl group-hover:border-blue-400/60 transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-blue-400/30 rounded-br-xl group-hover:border-blue-400/60 transition-colors duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-white/60 leading-relaxed text-base flex-grow">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

type TeamFeatureCardsProps = {
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
};

export const TeamFeatureCards = ({ title, subtitle, items }: TeamFeatureCardsProps) => {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <TeamFeatureCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
