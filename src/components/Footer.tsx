import React from 'react';
import { ArrowUp, CheckSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onOpenChecklist: () => void;
  onNavigateToQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenChecklist, onNavigateToQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400 text-xs overflow-hidden">
      {/* High-Impact Pre-Footer CTA */}
      <div className="bg-[#FA5A00] py-14 sm:py-16 px-4 sm:px-6 lg:px-8 text-white text-center relative overflow-hidden">
        {/* Subtle geometric background line */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider mb-3">
            Zero-Cost On-Site Inspection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight [text-wrap:balance]">
            Ready for Your Free Roofing Estimate?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/95 max-w-xl mx-auto font-medium">
            Contact Johnston Roofing today. Same-day emergency response and fast itemized proposals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={onNavigateToQuote}
              className="px-8 py-4 text-sm font-black uppercase tracking-wider text-gray-900 bg-white hover:bg-gray-50 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>Get My Free Quote Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenChecklist}
              className="px-6 py-4 text-xs font-bold text-white bg-black/25 hover:bg-black/35 rounded-full transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4 text-orange-200" />
              <span>Owner's Onboarding Checklist</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Main Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FA5A00] flex items-center justify-center text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-black text-white leading-none">
                  JOHNSTON
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FA5A00] uppercase mt-0.5">
                  ROOFING PROS
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              Professional residential & commercial roofing contractor website proposal. Full-service replacement, repairs, storm restoration, and standing seam metal.
            </p>

            <div className="mt-5 pt-4 border-t border-gray-800 space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#FA5A00]" />
                <span className="font-semibold">Licensed & Fully Insured</span>
              </div>
            </div>
          </div>

          {/* Column 2: Roofing Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              ROOFING SERVICES
            </h3>
            <ul className="space-y-2.5 font-medium">
              {[
                { label: 'Residential Roof Replacement', href: '#services' },
                { label: 'Standing Seam Metal Roofs', href: '#services' },
                { label: 'Commercial Flat TPO & EPDM', href: '#services' },
                { label: 'Emergency Leak Diagnostics', href: '#services' },
                { label: 'Storm Damage & Flashing Repair', href: '#services' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="inline-block hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5 font-medium">
              {[
                { label: 'About Johnston Roofing', href: '#about' },
                { label: 'Material Comparison Matrix', href: '#materials' },
                { label: 'Project Gallery', href: '#gallery' },
                { label: '5-Step Installation Process', href: '#process' },
                { label: 'FAQs & Guidance', href: '#faqs' },
                { label: 'Book Roof Estimate', href: '#quote' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="inline-block hover:text-white transition-all duration-200 hover:translate-x-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Client Proposal Governance */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              PROPOSAL GOVERNANCE
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              This concept presentation contains zero fabricated customer names, license claims, or addresses.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenChecklist}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 text-xs font-medium text-white hover:bg-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-[#FA5A00]" />
              <span>Launch Onboarding Checklist</span>
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500">
          <p>© {new Date().getFullYear()} Johnston Roofing Pros Website Demo Concept. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer font-bold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
