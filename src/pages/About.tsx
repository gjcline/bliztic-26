import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Users, Zap, Target, Lightbulb } from 'lucide-react';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ElegantShape } from '../components/ui/elegant-shape';
import CTA from '../components/CTA';
import { cn } from '@/lib/utils';

const About: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
        
        <div className="absolute inset-0 opacity-30">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80"
            >
              About Bliztic
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/60 leading-relaxed"
            >
              We are a creative consulting agency focused on delivering innovative solutions to businesses across all industries. Our mission is to provide strategic support and tailored solutions that address the unique challenges of every client, regardless of their size or stage of growth. Whether you're a startup or an established enterprise, we work alongside you to drive efficiency, optimize operations, and achieve sustainable success. At Bliztic, we are committed to delivering measurable results and helping businesses unlock their full potential.
            </motion.p>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </section>

      {/* Core Values */}
      <section className="relative py-20 bg-[#040404] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto">
              Principles That Fuel Our Success and Client Satisfaction
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "p-8",
                "transform transition-all duration-700 ease-out",
                "hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.03]",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              <div className={cn(
                "inline-flex items-center justify-center",
                "w-14 h-14 rounded-full mb-6",
                "bg-gradient-to-br from-indigo-500/20 to-rose-500/20",
                "border border-white/5",
                "transform transition-all duration-700 ease-out",
                "group-hover:scale-125 group-hover:border-white/10",
                "group-hover:rotate-12 group-hover:shadow-lg"
              )}>
                <Zap className="h-7 w-7 text-white/80 transform transition-all duration-700 group-hover:text-white group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 transform transition-all duration-500 group-hover:translate-x-1">Innovation</h3>
              <p className="text-white/40 leading-relaxed transform transition-all duration-500 group-hover:text-white/60">
                Unique and creative solutions are at the forefront of everything we do, empowering businesses to redefine their industries, stay ahead of market trends, and unlock new opportunities for growth.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "p-8",
                "transform transition-all duration-700 ease-out",
                "hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.03]",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              <div className={cn(
                "inline-flex items-center justify-center",
                "w-14 h-14 rounded-full mb-6",
                "bg-gradient-to-br from-indigo-500/20 to-rose-500/20",
                "border border-white/5",
                "transform transition-all duration-700 ease-out",
                "group-hover:scale-125 group-hover:border-white/10",
                "group-hover:rotate-12 group-hover:shadow-lg"
              )}>
                <Target className="h-7 w-7 text-white/80 transform transition-all duration-700 group-hover:text-white group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 transform transition-all duration-500 group-hover:translate-x-1">Collaboration</h3>
              <p className="text-white/40 leading-relaxed transform transition-all duration-500 group-hover:text-white/60">
                Rooted in a culture of open communication and seamless teamwork, we find collaboration to be the key to exceptional results, leveraging diverse perspectives to develop solutions that fuel sustainable success.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-xl",
                "bg-[#0a0a0a]/40 backdrop-blur-sm",
                "border border-white/5",
                "p-8",
                "transform transition-all duration-700 ease-out",
                "hover:bg-[#0a0a0a]/60 hover:border-white/10 hover:scale-[1.03]",
                "hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              <div className={cn(
                "inline-flex items-center justify-center",
                "w-14 h-14 rounded-full mb-6",
                "bg-gradient-to-br from-indigo-500/20 to-rose-500/20",
                "border border-white/5",
                "transform transition-all duration-700 ease-out",
                "group-hover:scale-125 group-hover:border-white/10",
                "group-hover:rotate-12 group-hover:shadow-lg"
              )}>
                <Lightbulb className="h-7 w-7 text-white/80 transform transition-all duration-700 group-hover:text-white group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 transform transition-all duration-500 group-hover:translate-x-1">Sustainability</h3>
              <p className="text-white/40 leading-relaxed transform transition-all duration-500 group-hover:text-white/60">
                Quick fixes may solve immediate issues, but true success lies in building sustainable solutions that stand the test of time. We cultivate solutions that enable businesses to thrive and adapt to their ever-changing markets for long term resilience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}


      {/* CTA Section */}
      <CTA />
    </>
  );
};

export default About;