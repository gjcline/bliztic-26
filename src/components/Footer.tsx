import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ExternalLink, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-[#050505]/50 backdrop-blur-sm border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <img
                src="https://ik.imagekit.io/grant/Bliztics/LIZTIC_logo_white.png?updatedAt=1747875460398"
                alt="Bliztic Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="ml-2 text-xl font-bold text-white">Bliztic</span>
            </div>
            <p className="text-white/40 mb-4">
              Accelerating Business Growth Through Smart Automation
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/bliztic/" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://x.com/bliztics" className="text-white/40 hover:text-white transition-colors" aria-label="X (formerly Twitter)">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/qualify" target="_blank" rel="noopener noreferrer" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/40 hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Contact</Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gtm" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">GTM</Link>
              </li>
              <li>
                <Link to="/dev" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Dev</Link>
              </li>
              <li>
                <Link to="/ai-workforce" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">AI Workforce</Link>
              </li>
              <li>
                <Link to="/gtm-fund" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Fund</Link>
              </li>
              <li>
                <a href="https://cdr.bliztic.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">CDR</a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Partner</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/partner/login" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Log in</Link>
              </li>
              <li>
                <Link to="/partner" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Learn more</Link>
              </li>
              <li>
                <Link to="/qualify" onClick={() => window.scrollTo(0, 0)} className="text-white/40 hover:text-white transition-colors">Book a call</Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-medium text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-white/40 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/40">Dallas, TX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-white/40 mr-2 flex-shrink-0" />
                <span className="text-white/40">info@bliztic.com</span>
              </li>
              <li className="flex items-center pt-2">
                <Link to="/contact" className="text-white inline-flex items-center group" onClick={() => window.scrollTo(0, 0)}>
                  Get in touch <ExternalLink className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="relative z-10 border-t border-white/5 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-white/30 text-sm">&copy; {currentYear} Bliztic. All rights reserved.</p>
              <Link to="/privacy" onClick={() => window.scrollTo(0, 0)} className="text-white/30 hover:text-white/60 transition-colors text-sm">
                Privacy Policy
              </Link>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Shield className="h-4 w-4 text-emerald-400" />
              <span className="text-sm">30-Day Money-Back Guarantee*</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;