import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Settings, 
  BarChart3,
  Phone,
  Database, 
  Code, 
  Briefcase
} from 'lucide-react';
import CTA from '../components/CTA';
import { ElegantShape } from '../components/ui/elegant-shape';
import { FloatingPaths } from '../components/ui/floating-paths';
import { ServiceCarousel } from '../components/ui/service-carousel';
import { cn } from '@/lib/utils';

const Services: React.FC = () => {
  // Reference for the scrollable container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Main scroll progress for the progress indicator
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });
  
  // Smoothed progress for the progress bar
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    restDelta: 0.001
  });

  // Services data
  const services = [
    {
      id: 'automation',
      icon: Settings,
      title: 'Strategic Workflow Systems',
      description: 'Optimize your operations with customized workflow systems that automate repetitive tasks and boost productivity. By streamlining processes and integrating seamlessly with existing tools, our solutions allow your team to focus on what matters most – growing your business.',
      color: 'from-blue-400 to-indigo-500',
      shadowColor: 'rgba(99, 102, 241, 0.15)',
      image: 'https://ik.imagekit.io/grant/Bliztics/bliztic_website%20images/line_art_stratworkflows.png?updatedAt=1747875460433',
      features: [
        'Custom workflow automation design',
        'Process optimization and streamlining',
        'Task automation implementation'
      ]
    },
    {
      id: 'software-development',
      icon: Code,
      title: 'Tailored Software Development',
      description: 'Enhance both team efficiency and customer experience with custom software solutions built to fit your unique business needs. From innovative tools to scalable platforms, our solutions are designed to grow with your business and provide lasting value.',
      color: 'from-rose-400 to-pink-600',
      shadowColor: 'rgba(244, 63, 94, 0.15)',
      image: 'https://ik.imagekit.io/grant/Bliztics/bliztic_website%20images/software_lineart.png?updatedAt=1747875460500',
      features: [
        'Custom software solution design',
        'Scalable architecture implementation',
        'Ongoing support and maintenance'
      ]
    },
    {
      id: 'call-automation',
      icon: Phone,
      title: 'Call Automation Systems',
      description: 'Never miss a sale—our AI-powered Call Automation Systems answer inbound calls, qualify leads, and follow up instantly. From first ring to booked appointment, every opportunity is handled under your brand without any manual effort.',
      color: 'from-violet-400 to-purple-600',
      shadowColor: 'rgba(124, 58, 237, 0.15)',
      image: 'https://ik.imagekit.io/grant/Bliztics/bliztic_website%20images/call_line_quer.png?updatedAt=1747875461156',
      features: [
        'Inbound AI Callers',
        'Outbound AI Callers',
        'Integrated Sales Flow'
      ]
    },
    {
      id: 'consulting',
      icon: Briefcase,
      title: 'Comprehensive Consulting',
      description: 'Unlock new growth opportunities through expert consulting that optimizes your strategy and refines your operations. We help streamline processes and guide you toward sustainable success by identifying opportunities and improving efficiency within all areas of your business.',
      color: 'from-cyan-400 to-teal-600',
      shadowColor: 'rgba(20, 184, 166, 0.15)',
      image: 'https://ik.imagekit.io/fuck/consultlineart.png?updatedAt=1748717141896',
      features: [
        'Business strategy development',
        'Operational efficiency analysis',
        'Process optimization consulting'
      ]
    },
    {
      id: 'lead-generation',
      icon: BarChart3,
      title: 'Automated Lead Generation Systems',
      description: 'Drive consistent, high-quality leads into your sales funnel with automated systems tailored to your business. By utilizing automated outreach, we save your team time and help strengthen lead conversions for faster growth and better results.',
      color: 'from-amber-400 to-orange-600',
      shadowColor: 'rgba(245, 158, 11, 0.15)',
      image: 'https://ik.imagekit.io/grant/Bliztics/bliztic_website%20images/image_leadgen_final.png?updatedAt=1747875461210',
      features: [
        'Lead generation strategy development',
        'Automation system implementation',
        'Performance tracking, analytics and conversion optimization'
      ]
    },
    {
      id: 'digital-solutions',
      icon: Database,
      title: 'Scalable Web & Digital Solutions',
      description: 'Build a strong, adaptable online presence with scalable digital solutions designed to evolve as your business grows. From responsive web design to digital marketing strategies, our solutions are optimized for long term success in the digital world.',
      color: 'from-emerald-400 to-green-600',
      shadowColor: 'rgba(16, 185, 129, 0.15)',
      image: 'https://ik.imagekit.io/grant/Bliztics/bliztic_website%20images/scalable_web_digital_solutions_final.png?updatedAt=1747875461292',
      features: [
        'Scalable website development',
        'SEO and visibility enhancement',
        'Analytics and growth tracking'
      ]
    }
  ];

  return (
    <>
      {/* Background container that starts from the top */}
      <div className="fixed inset-0 z-0 opacity-50">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Hero Section with transparent background */}
      <section className="relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
        
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60vh] min-h-[500px] flex flex-col justify-center bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                Our Services
              </span>
            </h1>
            <p className="text-xl text-white/40 mb-8 max-w-2xl">
              Explore our comprehensive solutions designed to optimize your operations 
              and accelerate business growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/qualify"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center px-6 py-3 rounded-full",
                  "bg-white text-[#030303]",
                  "font-medium transition-all duration-300",
                  "hover:shadow-glow hover:scale-105"
                )}
              >
                Book a Consultation
              </Link>
              <a 
                href="#services-carousel" 
                className={cn(
                  "inline-flex items-center px-6 py-3 rounded-full",
                  "bg-white/5 hover:bg-white/10 border border-white/10",
                  "text-white font-medium transition-all duration-300"
                )}
              >
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      <div ref={containerRef} id="services-carousel" className="pt-16">
        <ServiceCarousel services={services} />
      </div>

      {/* CTA Section */}
      <CTA />
    </>
  );
};

export default Services;