import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown, CheckSquare, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenChecklist: () => void;
  onNavigateToQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenChecklist, onNavigateToQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
        setAreasDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services', hasDropdown: true },
    { name: 'Service Areas', href: '#services', hasDropdown: true },
    { name: 'Info & FAQs', href: '#faqs' },
    { name: 'Materials & Specs', href: '#materials' },
    { name: 'Book Now', href: '#quote' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200/80 py-0'
            : 'bg-white shadow-sm border-b border-gray-100 py-0'
        }`}
      >
        {/* Top Banner Announcement Bar */}
        <div className="bg-[#FA5A00] text-white text-xs font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span>Enjoy your FREE estimate throughout fall & winter</span>
            <span aria-hidden="true" className="hidden sm:inline text-white/60">·</span>
            <button
              onClick={onOpenChecklist}
              className="hidden md:inline underline hover:text-white/90 text-[11px] cursor-pointer"
            >
              View Johnston Roofing Proposal Specs
            </button>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              isScrolled ? 'h-16' : 'h-20'
            }`}
          >
            {/* Brand Logo Lockup */}
            <motion.a
              href="#"
              className="flex items-center gap-3 group text-decoration-none shrink-0"
              aria-label="Johnston Roofing Home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white group-hover:bg-[#FA5A00] transition-colors shadow-sm relative overflow-hidden">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-black tracking-tight text-gray-900 leading-none">
                  JOHNSTON
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-700 uppercase leading-tight mt-0.5">
                  ROOFING PROS
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation Links with Smooth Animated Underlines */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-gray-700" aria-label="Main Navigation">
              {/* About Link */}
              <a
                href="#about"
                onMouseEnter={() => setHoveredLink('about')}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative py-2 hover:text-[#FA5A00] transition-colors whitespace-nowrap"
              >
                <span>About</span>
                {hoveredLink === 'about' && (
                  <motion.div
                    layoutId="navHoverUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA5A00] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>

              {/* Services with Animated Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setServicesDropdownOpen(true);
                  setHoveredLink('services');
                }}
                onMouseLeave={() => {
                  setServicesDropdownOpen(false);
                  setHoveredLink(null);
                }}
              >
                <a
                  href="#services"
                  className="flex items-center gap-1 py-2 hover:text-[#FA5A00] transition-colors whitespace-nowrap"
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>Services</span>
                  <motion.div
                    animate={{ rotate: servicesDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                </a>
                {hoveredLink === 'services' && (
                  <motion.div
                    layoutId="navHoverUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA5A00] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2.5 z-50 origin-top-left"
                    >
                      <a
                        href="#services"
                        className="block px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#FA5A00] transition-colors"
                      >
                        Roof Replacement & Installation
                      </a>
                      <a
                        href="#services"
                        className="block px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#FA5A00] transition-colors"
                      >
                        Standing Seam Metal Roofing
                      </a>
                      <a
                        href="#services"
                        className="block px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#FA5A00] transition-colors"
                      >
                        Commercial Flat & TPO Systems
                      </a>
                      <a
                        href="#services"
                        className="block px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-orange-50 hover:text-[#FA5A00] transition-colors"
                      >
                        Emergency Leak & Storm Repair
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Service Areas Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => {
                  setAreasDropdownOpen(true);
                  setHoveredLink('areas');
                }}
                onMouseLeave={() => {
                  setAreasDropdownOpen(false);
                  setHoveredLink(null);
                }}
              >
                <button
                  className="flex items-center gap-1 py-2 hover:text-[#FA5A00] transition-colors whitespace-nowrap cursor-pointer"
                  aria-expanded={areasDropdownOpen}
                >
                  <span>Service Areas</span>
                  <motion.div
                    animate={{ rotate: areasDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.div>
                </button>
                {hoveredLink === 'areas' && (
                  <motion.div
                    layoutId="navHoverUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA5A00] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                <AnimatePresence>
                  {areasDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-gray-100 py-2.5 z-50 origin-top-left"
                    >
                      <div className="px-4 py-1.5 text-[10px] font-mono uppercase text-gray-400">
                        Coverage Area
                      </div>
                      <span className="block px-4 py-1.5 text-xs font-semibold text-gray-700">
                        Metropolitan Service Zone
                      </span>
                      <span className="block px-4 py-1.5 text-xs font-semibold text-gray-700">
                        Suburban Residential Counties
                      </span>
                      <div className="px-4 pt-2 border-t border-gray-100 text-[10px] text-orange-600 font-medium">
                        *Customizable for Johnston Roofing
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info & FAQs */}
              <a
                href="#faqs"
                onMouseEnter={() => setHoveredLink('faqs')}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative py-2 hover:text-[#FA5A00] transition-colors whitespace-nowrap"
              >
                <span>Info & FAQs</span>
                {hoveredLink === 'faqs' && (
                  <motion.div
                    layoutId="navHoverUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA5A00] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>

              {/* Materials & Specs */}
              <a
                href="#materials"
                onMouseEnter={() => setHoveredLink('materials')}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative py-2 hover:text-[#FA5A00] transition-colors whitespace-nowrap"
              >
                <span>Materials & Specs</span>
                {hoveredLink === 'materials' && (
                  <motion.div
                    layoutId="navHoverUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA5A00] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>

              {/* Book Now */}
              <a
                href="#quote"
                onMouseEnter={() => setHoveredLink('book')}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative py-2 hover:text-[#FA5A00] transition-colors whitespace-nowrap"
              >
                <span>Book Now</span>
                {hoveredLink === 'book' && (
                  <motion.div
                    layoutId="navHoverUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA5A00] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            </nav>

            {/* Action Zone: Owner's Checklist + Free Estimate Button */}
            <div className="flex items-center gap-3 shrink-0">
              <motion.button
                onClick={onOpenChecklist}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                title="Proposal onboarding checklist"
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                <CheckSquare className="w-3.5 h-3.5 text-[#FA5A00]" />
                <span>Owner's Checklist</span>
              </motion.button>

              <motion.button
                onClick={onNavigateToQuote}
                className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#FA5A00] hover:bg-[#E04F00] rounded-full transition-all shadow-md hover:shadow-orange-500/25 whitespace-nowrap cursor-pointer group"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span>Free Estimate</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Mobile Animated Hamburger Button (Smoothly Morphs into X) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative w-10 h-10 rounded-lg text-gray-800 hover:bg-gray-100 flex items-center justify-center focus:outline-none transition-colors cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-0.5 bg-gray-900 rounded-full origin-center"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-gray-900 rounded-full"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-0.5 bg-gray-900 rounded-full origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fluid Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Slide-In Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-10 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                  </div>
                  <span className="font-display font-black text-lg text-gray-900">JOHNSTON</span>
                </div>

                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Close menu"
                >
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    <span className="absolute w-5 h-0.5 bg-gray-900 rotate-45 rounded-full" />
                    <span className="absolute w-5 h-0.5 bg-gray-900 -rotate-45 rounded-full" />
                  </div>
                </button>
              </div>

              {/* Staggered Navigation Items */}
              <div className="p-6 space-y-6 flex-1">
                <nav className="flex flex-col space-y-1">
                  {[
                    { label: 'About', href: '#about' },
                    { label: 'Services & Capabilities', href: '#services' },
                    { label: 'Materials & Specifications', href: '#materials' },
                    { label: 'Visual Gallery', href: '#gallery' },
                    { label: 'Installation Process', href: '#process' },
                    { label: 'Info & FAQs', href: '#faqs' },
                    { label: 'Book Now', href: '#quote' },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: 0.05 * index + 0.1, duration: 0.3 }}
                      className="py-3 px-3 rounded-xl text-base font-bold text-gray-800 hover:text-[#FA5A00] hover:bg-orange-50/60 transition-colors flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </motion.a>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                  className="space-y-3 pt-4 border-t border-gray-100"
                >
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      onNavigateToQuote();
                    }}
                    className="w-full py-3.5 text-sm font-bold text-white bg-[#FA5A00] hover:bg-[#E04F00] rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Free Estimate</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      closeMobileMenu();
                      onOpenChecklist();
                    }}
                    className="w-full py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckSquare className="w-4 h-4 text-[#FA5A00]" />
                    <span>Client Onboarding Checklist</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
