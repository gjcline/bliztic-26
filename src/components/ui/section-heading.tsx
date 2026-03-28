import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle,
  alignment = 'center',
  titleClassName,
  subtitleClassName
}) => {
  const wrapperClass = cn(
    "mb-12",
    alignment === 'center' ? "text-center" : "text-left"
  );
  
  const titleClass = cn(
    "text-3xl md:text-4xl font-bold",
    "bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80",
    "mb-4",
    titleClassName
  );
  
  const subtitleClass = cn(
    "text-white/40 max-w-2xl",
    alignment === 'center' ? "mx-auto" : "",
    subtitleClassName
  );
  
  return (
    <div className={wrapperClass}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className={titleClass}>{title}</h2>
        {subtitle && <p className={subtitleClass}>{subtitle}</p>}
      </motion.div>
    </div>
  );
};

export { SectionHeading };