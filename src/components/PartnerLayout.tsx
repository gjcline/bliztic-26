import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Footer from './Footer';

interface PartnerLayoutProps {
  children: React.ReactNode;
}

const PartnerLayout: React.FC<PartnerLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white">
      <nav className="fixed w-full z-50 transition-all duration-300 bg-[#030303]/90 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src="https://ik.imagekit.io/grant/Bliztics/LIZTIC_logo_white.png?updatedAt=1747875460398"
                alt="Bliztic Logo" 
                className="h-16 w-16 object-contain"
              />
            </Link>
            
            <div className="flex items-center">
              <Link
                to="/partner/login"
                className="bg-white text-[#030303] px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-glow hover:scale-105"
                onClick={() => window.scrollTo(0, 0)}
              >
                Partner Log In
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PartnerLayout;