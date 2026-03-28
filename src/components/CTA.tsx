import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { ElegantShape } from './ui/elegant-shape';
import { cn } from '@/lib/utils';

const CTA: React.FC = () => {
  return (
    <section className="relative bg-[#050505] py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
      
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.1}
          width={400}
          height={100}
          rotate={-10}
          gradient="from-indigo-500/[0.10]"
          className="left-[-5%] top-[20%]"
        />
        <ElegantShape
          delay={0.2}
          width={300}
          height={80}
          rotate={15}
          gradient="from-rose-500/[0.10]"
          className="right-[-5%] bottom-[20%]"
        />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-4">
            How strong is your GTM infrastructure?
          </h2>
          <p className="text-white/40 mb-8 max-w-3xl mx-auto text-lg">
            Discover if your GTM strategy is built to own your market or just win it once. Learn how to transform one-time launches into sustained market dominance.
          </p>
          <Link
            to="/qualify"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center justify-center",
              "px-8 py-3 rounded-full",
              "bg-white text-[#030303]",
              "font-medium",
              "transform transition duration-300",
              "hover:scale-105 hover:shadow-glow"
            )}
          >
            Continue
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 flex items-center justify-center gap-2 text-white/60"
          >
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-sm">30-Day Money-Back Guarantee*</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;