import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BookCallWidget: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={cn(
        "fixed bottom-8 right-8 z-50",
        "md:bottom-12 md:right-12"
      )}
    >
      <Link
        to="/qualify"
        className={cn(
          "flex items-center gap-2",
          "px-6 py-4 rounded-full",
          "bg-white text-[#030303]",
          "font-medium shadow-lg",
          "transform transition-all duration-300",
          "hover:scale-105 hover:shadow-glow",
          "focus:outline-none focus:ring-2 focus:ring-white/20",
          "group"
        )}
        aria-label="Book a Call"
      >
        <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span>Book a Call</span>
      </Link>
    </motion.div>
  );
};

export { BookCallWidget };