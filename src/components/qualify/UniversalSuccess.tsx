import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DotsPattern } from '@/components/ui/bg-pattern';

export function UniversalSuccess() {
  const handleScheduleCall = () => {
    window.open('https://cal.com/bliztic/bliztic-consultation-call', '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#030303] flex items-center justify-center p-6 overflow-hidden">
      {/* Gradient Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-25" />

      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Radial Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.12)_0%,_rgba(6,182,212,0.06)_50%,_transparent_100%)] pointer-events-none blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center space-y-8 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Thank You!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-white/70"
          >
            We've received your information and will be in touch soon to discuss how we can help grow your business.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={handleScheduleCall}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-[0_4px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_32px_rgba(37,99,235,0.4)] hover:scale-105 transition-all duration-200 text-lg px-8 py-6 h-auto"
          >
            Schedule Your Consultation Call
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-white/50"
        >
          Ready to take the next step? Book a time that works for you.
        </motion.p>
      </motion.div>
    </div>
  );
}
