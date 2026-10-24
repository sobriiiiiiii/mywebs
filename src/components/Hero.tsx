import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  onConfigureScope: () => void;
  onExploreServices: () => void;
  onInstantQuoteSubmit: (data: { name: string; phone: string; address: string; service: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onConfigureScope, onExploreServices, onInstantQuoteSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Subtle parallax effect on background image
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 600], [0, 70]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }
    setError('');
    setSubmitted(true);
    onInstantQuoteSubmit({ name, phone, address, service: service || 'Roof Replacement / Installation' });
  };

  return (
    <div id="about" className="relative w-full overflow-hidden">
      {/* Hero Visual Area with Background Photo */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 min-h-[660px] flex items-center">
        {/* Real roofer background image with cinematic scale-down entrance and subtle parallax */}
        <motion.div
          className="absolute inset-0 z-0 origin-center"
          initial={{ scale: 1.07, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: backgroundY }}
        >
          <img
            src="/src/assets/images/hero_roofer_installing_shingles_1792832395239.jpg"
            alt="Professional roofing contractor installing architectural shingles"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
            referrerPolicy="no-referrer"
            loading="eager"
          />
          {/* Subtle directional gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75 pointer-events-none" />
        </motion.div>

        {/* Subtle Architectural / Technical Overlay Lines (Precision Manufacturing feel) */}
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden opacity-30 hidden md:block">
          {/* Top-left coordinate crosshair */}
          <div className="absolute top-8 left-8 text-[10px] font-mono text-white/50 tracking-widest flex items-center gap-1.5">
            <span className="text-[#FA5A00]">+</span>
            <span>SPEC: CT-ROOF-2026 // ELEV 42°</span>
          </div>

          {/* Bottom-left precision pitch marker */}
          <div className="absolute bottom-8 left-8 text-[10px] font-mono text-white/40 tracking-wider">
            <span>TOLERANCE: ±0.05MM // WATERPROOF SUBSTRATE LOCK</span>
          </div>

          {/* Delicate horizontal hairline across hero */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content (7 cols on lg) */}
            <div className="lg:col-span-7 text-white flex flex-col justify-center">
              {/* Eyebrow Label with smooth wipe-in */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-gray-200 uppercase mb-3"
              >
                <span className="w-5 h-[2px] bg-[#FA5A00] inline-block" />
                <span>JOHNSTON ROOFING PROS</span>
              </motion.div>

              {/* Bold Headline with Line-by-Line Reveal */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white tracking-tight leading-[1.1] [text-wrap:balance]">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Trusted Roofing
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-orange-100"
                >
                  Installation &
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Repair Experts
                </motion.span>
              </h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-lg sm:text-xl text-gray-200 font-normal max-w-xl leading-relaxed"
              >
                Roof repair, replacement, and installation. Licensed and Insured.
              </motion.p>

              {/* CTA Buttons with Stagger */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <motion.button
                  onClick={onConfigureScope}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="px-8 py-3.5 text-base font-bold text-white bg-[#FA5A00] hover:bg-[#E04F00] rounded-full transition-all shadow-xl hover:shadow-orange-500/35 whitespace-nowrap cursor-pointer group"
                >
                  <span>FREE Roofing Estimate</span>
                </motion.button>

                <motion.button
                  onClick={onExploreServices}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Our Services
                </motion.button>
              </motion.div>

              {/* Social Proof / 5 Star Customer Ratings */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-10 flex items-center gap-4"
              >
                {/* 4 Overlapping Avatar Circles with Stagger */}
                <div className="flex -space-x-2.5 overflow-hidden">
                  {[
                    { id: 'jd', bg: 'bg-amber-600', text: 'JD' },
                    { id: 'mr', bg: 'bg-sky-700', text: 'MR' },
                    { id: 'sk', bg: 'bg-emerald-700', text: 'SK' },
                    { id: 'aw', bg: 'bg-purple-700', text: 'AW' },
                  ].map((avatar, idx) => (
                    <motion.div
                      key={avatar.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.75 + idx * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                      className={`w-10 h-10 rounded-full border-2 border-white ${avatar.bg} flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                    >
                      {avatar.text}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span className="font-mono text-sm">5/5</span>
                    <span className="text-gray-400">|</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.85 + i * 0.06 }}
                        >
                          <Star className="w-4 h-4 fill-amber-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-300 font-medium mt-0.5">
                    5 Star Rated by Customers
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Floating White Lead Capture Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 sm:p-9 border border-gray-100 text-gray-900 transition-all hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-gray-900">
                      Quote Request Received!
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      Thank you, <strong className="text-gray-900">{name}</strong>. A roofing specialist from Johnston Roofing will call you at <strong className="text-gray-900">{phone}</strong> same-day to schedule your free inspection.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-xs font-bold text-[#FA5A00] underline cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
                      Get Your FREE Quote
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 mb-5 font-medium">
                      We respond same day. Emergency services available!
                    </p>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                          required
                        />
                      </div>

                      <div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                          required
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Address"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          placeholder="Service Needed (ie. Roof Install, Storm)"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#FA5A00] hover:bg-[#E04F00] text-white text-sm sm:text-base font-bold transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span>Yes, please call me</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3-Column Trust Stats Bar with Smooth Counting Animations */}
      <section className="bg-[#FAF6EC] border-y border-[#EADBBE] py-8 sm:py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-300/60">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6 }}
              className="pt-4 md:pt-0"
            >
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight block">
                <AnimatedCounter value={100} suffix="%" />
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-800 mt-1 block">
                Customer Satisfaction
              </span>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="pt-6 md:pt-0"
            >
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight block">
                <AnimatedCounter value={15} suffix="+" />
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-800 mt-1 block">
                Years Experience
              </span>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-6 md:pt-0"
            >
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight block">
                <AnimatedCounter value={100} suffix="%" />
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-800 mt-1 block">
                5 Star Reviews
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
