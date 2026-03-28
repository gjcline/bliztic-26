import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react'; 

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  href?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  href,
  className,
}) => {
  const CardWrapper = href ? 'a' : 'div';
  const cardProps = href ? { href } : {};
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      viewport={{ once: true }}
    >
      <CardWrapper
        {...cardProps}
        className={cn(
          "group relative overflow-hidden rounded-xl h-full",
          "bg-[#0a0a0a]/40 backdrop-blur-sm",
          "border border-white/5",
          "p-8",
          "transform transition-all duration-300",
          "hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.02]",
          "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
          className
        )}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className={cn(
            "inline-flex items-center justify-center",
            "w-14 h-14 rounded-full mb-6",
            "bg-gradient-to-br from-indigo-500/20 to-rose-500/20",
            "border border-white/5",
            "transition-all duration-300",
            "group-hover:scale-105 group-hover:border-white/10",
            "group-hover:shadow-lg"
          )}>
            <Icon className="h-7 w-7 text-white/80 transition-all duration-300 group-hover:text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
          <p className="text-white/40 leading-relaxed transition-colors duration-300 group-hover:text-white/50">{description}</p>
        </div>
      </CardWrapper>
    </motion.div>
  );
};

export { FeatureCard };