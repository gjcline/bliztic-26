import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the service type
interface Service {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  shadowColor?: string;
  image: string;
  features: string[];
}

interface ServiceCarouselProps {
  services: Service[];
}

export const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPrev, setIsPrev] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    setIsPrev(true);
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(services.length - 1);
    }
    scrollToService(activeIndex - 1 >= 0 ? activeIndex - 1 : services.length - 1);
  };

  const scrollRight = () => {
    setIsPrev(false);
    if (activeIndex < services.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
    scrollToService(activeIndex + 1 < services.length ? activeIndex + 1 : 0);
  };

  const handleServiceClick = (index: number) => {
    setIsPrev(activeIndex > index);
    setActiveIndex(index);
    scrollToService(index);
  };

  const scrollToService = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const serviceCards = container.querySelectorAll('.service-card');
      if (serviceCards[index]) {
        const card = serviceCards[index] as HTMLElement;
        const containerWidth = container.offsetWidth;
        const cardWidth = card.offsetWidth;
        const scrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  const activeService = services[activeIndex];

  return (
    <div className="py-16 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Carousel */}
        <div className="relative mb-12">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-[#0a0a0a]/80 hover:bg-[#0a0a0a] p-3 rounded-full border border-white/10 text-white/60 hover:text-white transition-all"
            aria-label="Previous service"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div 
            ref={scrollContainerRef}
            className="overflow-x-auto mx-10 pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-4 min-w-max">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(index)}
                  className={cn(
                    "service-card relative p-6 rounded-xl transition-all duration-300",
                    "flex flex-col items-center gap-4 text-center",
                    "min-w-[250px] w-[250px]",
                    activeIndex === index 
                      ? "bg-[#0a0a0a] border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.15)]" 
                      : "bg-[#0a0a0a]/40 border border-white/5 hover:bg-[#0a0a0a]/60 hover:border-white/10"
                  )}
                >
                  {activeIndex === index && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent rounded-xl"
                      initial={{ x: '100%' }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                  
                  <service.icon className={cn(
                    "h-12 w-12 mb-2",
                    activeIndex === index ? "text-white" : "text-white/60"
                  )} />
                  <h3 className={cn(
                    "text-lg font-medium",
                    activeIndex === index 
                      ? "text-white" 
                      : "text-white/60"
                  )}>
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/40 line-clamp-2">{service.description.split('.')[0]}.</p>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-[#0a0a0a]/80 hover:bg-[#0a0a0a] p-3 rounded-full border border-white/10 text-white/60 hover:text-white transition-all"
            aria-label="Next service"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Active Service Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: isPrev ? -20 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isPrev ? 20 : -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#0a0a0a]/60 border border-white/10 rounded-2xl p-8 md:p-12 mt-8"
          >
            <div>
              <div className="mb-2 text-white/40 text-sm font-medium uppercase tracking-wider">Selected Service</div>
              <h2 className="text-3xl font-bold text-white mb-6">{activeService.title}</h2>
              <p className="text-lg text-white/60 mb-8">{activeService.description}</p>
              
              <h3 className="text-white text-xl font-medium mb-4">How We Deliver</h3>
              <ul className="space-y-4">
                {activeService.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-gradient-to-br text-white font-medium flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                      style={{ 
                        backgroundImage: `linear-gradient(to bottom right, ${activeService.color.split(' ')[0].replace('from-', '')}, ${activeService.color.split(' ')[1].replace('to-', '')})` 
                      }}
                    >
                      {idx + 1}
                    </div>
                    <span className="text-white/60">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src={activeService.image} 
                alt={activeService.title}
                className="w-full h-auto max-h-[400px] object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#030303]/70 via-[#030303]/40 to-transparent"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <p className="text-center text-white/40 max-w-2xl mx-auto">
          Click on a service to see how we can help your business grow through innovative solutions and expert implementation.
        </p>
      </div>
    </div>
  );
};