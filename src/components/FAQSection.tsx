import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Tear-Off vs Overlay',
    question: 'Why does Johnston Roofing recommend a complete tear-off rather than shingle overlay?',
    answer: 'While building codes sometimes allow a second layer of shingles, an overlay prevents our technicians from inspecting the wooden deck underneath for hidden rot, water intrusion, or sagging trusses. A complete tear-down ensures a 100% brand-new high-temperature ice & water barrier, proper synthetic underlayment, and protects your manufacturer warranty.',
  },
  {
    id: 'faq-2',
    category: 'Free Estimates',
    question: 'How does your FREE roofing estimate and roof inspection work?',
    answer: 'A Johnston Roofing technician arrives at your property, performs a complete attic moisture and roof surface inspection, calculates your true square footage and pitch, checks all chimney and wall flashings, and leaves you with an itemized, transparent written proposal—with zero sales pressure and no hidden fees.',
  },
  {
    id: 'faq-3',
    category: 'Insurance Claims',
    question: 'Do you assist homeowners with storm damage insurance claims?',
    answer: 'Yes! If your roof suffered hail or wind damage, we document all missing shingles, dented gutters, and flashing damage with photographic proof. We meet with your insurance adjuster on-site to ensure all storm damage is accurately accounted for in the claim scope.',
  },
  {
    id: 'faq-4',
    category: 'Wind & Weather',
    question: 'How do your roofing systems stand up to severe wind and rain storms?',
    answer: 'Our architectural shingle systems are installed with enhanced nail patterns rated for up to 130 MPH winds. For maximum protection, our concealed fastener standing seam metal panels are engineered and tested to withstand 140+ MPH gusts with zero exposed screws to leak or corrode.',
  },
  {
    id: 'faq-5',
    category: 'Property Protection',
    question: 'How do you protect my lawn, landscaping, and driveway during replacement?',
    answer: 'We deploy heavy-duty catch tarps and plywood wall shields around your home before any shingle is removed. At the end of every work day, we conduct rolling magnetic sweeps across driveways, walkways, and grass to remove all stray nails and metal shavings.',
  },
  {
    id: 'faq-6',
    category: 'Duration',
    question: 'How long does a typical residential roof replacement take?',
    answer: 'Most single-family residential replacements are completely torn off, dry-in underlayment installed, new shingles laid, and thoroughly cleaned up in 1 to 2 working days, weather permitting.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20 sm:py-24 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FA5A00] uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>COMMON QUESTIONS & TRANSPARENT ANSWERS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm text-gray-600 leading-relaxed font-normal">
            Everything you need to know about our estimates, roof replacement, materials, and cleanup.
          </p>
        </motion.div>

        {/* Accessible Accordion with Fluid Motion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isOpen
                    ? 'border-[#FA5A00] bg-orange-50/30 shadow-[0_4px_20px_rgba(250,90,0,0.06)]'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FA5A00]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors ${
                        isOpen
                          ? 'bg-[#FA5A00] text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[#FA5A00]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-orange-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

