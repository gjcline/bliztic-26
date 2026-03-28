import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { cn } from '@/lib/utils';

const NotFound: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.02] via-transparent to-cyan-500/[0.02] blur-3xl" />

      <div className="absolute inset-0 opacity-20">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-rose-500/10 backdrop-blur-sm border border-rose-500/20"
          >
            <AlertCircle className="w-12 h-12 text-rose-400" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Page Not Found
            </h2>
            <p className="text-xl text-white/60 max-w-md mx-auto leading-relaxed">
              Sorry, there's nothing here. The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/"
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium",
                "bg-white text-[#030303]",
                "transform transition-all duration-300",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105",
                "active:scale-95"
              )}
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <p className="text-white/40 text-sm">
              Need help? <Link to="/contact" className="text-white/60 hover:text-white underline transition-colors">Contact us</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </section>
  );
};

export default NotFound;
