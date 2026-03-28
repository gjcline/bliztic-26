import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Briefcase, Code, Database } from 'lucide-react';
import { BentoGrid, type BentoItem } from '../components/ui/bento-grid';
import { cn } from '@/lib/utils';

const expertiseItems: BentoItem[] = [
  {
    title: "Tailored Software Development",
    description: "Elevate your business with custom software solutions that introduce innovative tools, enhancing both team efficiency and customer experience.",
    icon: <Code className="w-4 h-4 text-blue-500" />,
    status: "Featured",
    tags: ["Custom", "Development", "Innovation"],
    colSpan: 2,
    hasPersistentHover: true,
    href: "/dev",
  },
  {
    title: "Comprehensive Consulting",
    description: "Unlock new growth opportunities with expert consulting that optimizes your strategy, refines your operations, enhances efficiency, and ensures sustainable success.",
    icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
    status: "Popular",
    tags: ["Strategy", "Growth"],
    href: "/dev",
  },
  {
    title: "Automated Lead Generation",
    description: "Feed your sales funnel with consistent, quality leads through an automated system tailored to your business, saving you time and strengthening conversions.",
    icon: <BarChart3 className="w-4 h-4 text-purple-500" />,
    status: "Active",
    tags: ["Automation", "Leads"],
    colSpan: 2,
  },
  {
    title: "Scalable Web & Digital Solutions",
    description: "Build a strong, reputable online presence with scalable web solutions, workflow automation, and digital tools designed to adapt and grow with your business.",
    icon: <Database className="w-4 h-4 text-cyan-500" />,
    status: "Core",
    tags: ["Web", "Digital"],
    href: "/dev",
  },
];

const Expertise: React.FC = () => {
  return (
    <div className="bg-[#040404] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80 mb-6">
              Our Expertise
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Specialized services designed to optimize your operations and accelerate market growth
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 bg-[#040404]">
        <BentoGrid items={expertiseItems} />

        {/* CTA Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/qualify"
            className={cn(
              "inline-flex items-center justify-center",
              "px-8 py-3 rounded-full",
              "bg-white text-[#030303]",
              "font-medium",
              "transform transition duration-300",
              "hover:scale-105 hover:shadow-glow",
              "min-w-[180px]"
            )}
          >
            Request a Call
          </Link>
          <Link
            to="/dev"
            onClick={() => window.scrollTo(0, 0)}
            className={cn(
              "inline-flex items-center justify-center",
              "px-8 py-3 rounded-full",
              "bg-white/5 hover:bg-white/10 border border-white/10",
              "text-white font-medium",
              "transform transition duration-300",
              "hover:scale-105 hover:shadow-glow",
              "min-w-[180px]"
            )}
          >
            Explore Software Development <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Expertise;
