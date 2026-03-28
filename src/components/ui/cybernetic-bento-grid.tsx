import React, { useEffect, useRef } from 'react';

type BentoItemProps = {
  className?: string;
  children: React.ReactNode;
};

const BentoItem = ({ className = '', children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);

    return () => {
      item.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={itemRef} className={`bento-item ${className}`}>
      {children}
    </div>
  );
};

type BentoGridProps = {
  title?: string;
  subtitle?: string;
  items: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
    className?: string;
  }>;
};

export const CyberneticBentoGrid = ({ title, subtitle, items }: BentoGridProps) => {
  return (
    <div className="main-container">
      <div className="w-full max-w-6xl z-10">
        {title && (
          <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-6">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="max-w-3xl mx-auto text-white/60 text-lg leading-relaxed text-center mb-16">
            {subtitle}
          </p>
        )}
        <div className="bento-grid">
          {items.map((item, index) => (
            <BentoItem key={index} className={item.className}>
              {item.icon && <div className="mb-4">{item.icon}</div>}
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </BentoItem>
          ))}
        </div>
      </div>
    </div>
  );
};
