import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOtherOpen, setIsOtherOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOtherOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navbarClass = cn(
    "fixed w-full z-50 transition-all duration-300",
    scrolled
      ? "bg-[#030303]/90 backdrop-blur-md border-b border-white/5 py-2"
      : "bg-transparent py-4"
  );

  const otherItems = [
    { name: 'GTM', path: '/gtm' },
    { name: 'Dev', path: '/dev' },
    { name: 'AI Workforce', path: '/ai-workforce' },
    { name: 'Fund', path: '/gtm-fund' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={navbarClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img 
                src="https://ik.imagekit.io/grant/Bliztics/LIZTIC_logo_white.png?updatedAt=1747875460398" 
                alt="Bliztic Logo" 
                className="h-24 w-24 object-contain"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === '/'
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              Home
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOtherOpen(!isOtherOpen)}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center gap-1",
                  isOtherOpen ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                Resources
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  isOtherOpen && "rotate-180"
                )} />
              </button>
              {isOtherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-2 right-0 bg-[#030303] border border-white/10 rounded-lg shadow-xl min-w-[160px] overflow-hidden"
                >
                  {otherItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setIsOtherOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={cn(
                        "block px-4 py-2.5 text-sm transition-colors",
                        location.pathname === item.path
                          ? "text-white bg-white/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
            <Link
              to="/qualify"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#030303] px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-glow hover:scale-105"
              onClick={() => window.scrollTo(0, 0)}
            >
              Pricing
            </Link>
            <Link
              to="/partner/login"
              className="bg-white text-[#030303] px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-glow hover:scale-105"
              onClick={() => window.scrollTo(0, 0)}
            >
              Partner Log In
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-[#030303] border-t border-white/5"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={cn(
                "block px-3 py-2 text-base font-medium rounded-md",
                location.pathname === '/'
                  ? "text-white bg-white/5"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <div className="pt-2 mt-2 border-t border-white/5">
              <p className="px-3 py-1 text-xs font-medium text-white/40 uppercase tracking-wider">Resources</p>
              {otherItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md",
                    location.pathname === item.path
                      ? "text-white bg-white/5"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              to="/qualify"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white text-[#030303] mt-3 px-4 py-2 rounded-md font-medium text-center"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Pricing
            </Link>
            <Link
              to="/partner/login"
              className="block bg-white text-[#030303] mt-2 px-4 py-2 rounded-md font-medium text-center"
              onClick={() => {
                toggleMenu();
                window.scrollTo(0, 0);
              }}
            >
              Partner Log In
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;