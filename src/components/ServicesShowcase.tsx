import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, Info, X } from 'lucide-react';

interface ServiceDetail {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  alt: string;
  summary: string;
  involves: string[];
  addresses: string;
  idealFor: string;
  specifications: {
    longevity: string;
    windRating: string;
    maintenance: string;
    fasteners: string;
  };
}

const SERVICES: ServiceDetail[] = [
  {
    id: 'standing-seam',
    name: 'Concealed Fastener Standing Seam Metal',
    subtitle: 'Architectural Grade 24-Gauge Galvalume & Aluminum',
    category: 'Marquee Metal System',
    image: '/src/assets/images/roof_metal_standing_seam_1792831419359.jpg',
    alt: 'High detail architectural standing seam metal roofing with copper valley flashing',
    summary: 'Custom-formed continuous metal panels with concealed mechanical clips, eliminating exposed screw washers that deteriorate over time.',
    involves: [
      'Site-formed 24-gauge Galvalume or aluminum continuous panels',
      'Concealed floating clip system allowing natural thermal expansion',
      'Hand-crimped standing seams (single or double lock)',
      'Custom fabricated copper or Kynar 500 ridge caps and valley gutters',
    ],
    addresses: 'Homeowners and property managers seeking 50+ year longevity, clean geometric modern aesthetics, and impervious defense against high winds and driving rain.',
    idealFor: 'Modern contemporary homes, mountain retreats, coastal properties, and architectural commercial structures.',
    specifications: {
      longevity: '50+ Years',
      windRating: 'Tested up to 140+ MPH',
      maintenance: 'Virtually Maintenance-Free',
      fasteners: '100% Concealed Clips',
    },
  },
  {
    id: 'residential-replacement',
    name: 'Architectural Shingle & Composite Slate',
    subtitle: 'Dimensional Aesthetics with Multi-Layer Protection',
    category: 'Residential Roof Replacement',
    image: '/src/assets/images/roof_residential_slate_shingle_1792831421145.jpg',
    alt: 'Luxury home with deep grey natural slate roof tiles and copper gutters',
    summary: 'High-definition architectural laminate shingles and engineered composite slate that reproduce authentic quarry texture with Class 4 impact resistance.',
    involves: [
      'Full strip-down to bare wood deck for complete rot inspection',
      'Installation of high-temp self-adhering ice barrier and synthetic underlayment',
      'Starter strip reinforcement along all eaves and rakes',
      'Enhanced high-profile ridge caps and low-profile ridge venting',
    ],
    addresses: 'Homeowners looking to upgrade aged asphalt roofs, prevent storm leak recurrences, and significantly elevate exterior property curb appeal.',
    idealFor: 'Single-family residences, historic renovations, and upscale suburban estates.',
    specifications: {
      longevity: '30–50 Years',
      windRating: 'Up to 130 MPH',
      maintenance: 'Low Periodic Inspection',
      fasteners: 'Corrosion-Resistant Ring Shank',
    },
  },
  {
    id: 'commercial-membrane',
    name: 'Commercial Low-Slope & Flat TPO Membranes',
    subtitle: 'Heat-Welded Single-Ply Monolithic Waterproofing',
    category: 'Commercial Flat Roofing',
    image: '/src/assets/images/roof_commercial_flat_tpo_1792831420522.jpg',
    alt: 'Commercial building flat roof with reflective white TPO waterproof membrane',
    summary: 'Solar-reflective 60-mil TPO and EPDM single-ply membranes hot-air welded into a continuous monolithic shield over tapered polyiso insulation.',
    involves: [
      'Engineering positive slope drainage via custom tapered insulation systems',
      'Robotic hot-air welded seam fusion creating joints stronger than the membrane itself',
      'Parapet wall terminations, scupper drains, and HVAC curb flashing boots',
      'High-reflectance ENERGY STAR cool roof surfacing to lower cooling costs',
    ],
    addresses: 'Commercial facility managers, warehouse operators, and multi-family owners battling ponding water, joint degradation, or high cooling bills.',
    idealFor: 'Office complexes, retail centers, industrial warehouses, and modern residential flat additions.',
    specifications: {
      longevity: '25–35 Years',
      windRating: 'FM Global Engineered Standard',
      maintenance: 'Bi-annual Drain Cleanouts',
      fasteners: 'Mechanically Fastened / Fully Adhered',
    },
  },
  {
    id: 'diagnostics-restoration',
    name: 'Emergency Leak Repair & Storm Restoration',
    subtitle: 'Rapid Response Diagnostics & Flashing Rebuilds',
    category: 'Repair & Storm Remediation',
    image: '/src/assets/images/roof_inspection_craftsmanship_1792831420774.jpg',
    alt: 'Professional roofer in safety gear inspecting flashing on sloped roof',
    summary: 'Comprehensive thermal and visual inspection to locate hidden moisture pathways, rebuild failing chimney/dormer flashings, and restore compromised sections.',
    involves: [
      'Digital moisture detection and attic ventilation flow analysis',
      'Surgical chimney step-flashing and counter-flashing rebuilds',
      'Valley resealing and replacement of damaged tiles or panels',
      'Protective elastomeric coating and rust encapsulation on metal sections',
    ],
    addresses: 'Properties experiencing active leaks around chimneys or valleys that do not yet require full premature roof replacement.',
    idealFor: 'Older architectural homes, post-storm storm damage assessments, and preemptive preventive maintenance.',
    specifications: {
      longevity: '10–15 Year Extension',
      windRating: 'Restores Original Code Rating',
      maintenance: 'Scheduled Preventive Check',
      fasteners: 'Stainless & Copper Match',
    },
  },
];

interface ServicesShowcaseProps {
  onSelectServiceForEstimate: (serviceKey: string) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onSelectServiceForEstimate }) => {
  const [modalService, setModalService] = useState<ServiceDetail | null>(null);

  const marqueeService = SERVICES[0];
  const secondaryServices = SERVICES.slice(1);

  return (
    <section id="services" className="py-24 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Stagger Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FA5A00] uppercase tracking-wider mb-2">
              <span className="w-4 h-[2px] bg-[#FA5A00]" />
              <span>OUR ROOFING SERVICES</span>
              <span aria-hidden="true" className="text-gray-300">·</span>
              <span className="text-gray-600">INSTALLATION & REPAIRS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Quality Craftsmanship For Every Roof Style
            </h2>
          </div>
          <p className="text-sm text-gray-600 max-w-md leading-relaxed font-normal">
            Whether you need emergency storm repair, complete shingle tear-off, or architectural standing seam metal, Johnston Roofing delivers guaranteed results.
          </p>
        </motion.div>

        {/* Marquee Featured Service Spotlight: Standing Seam Metal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 rounded-3xl bg-[#FFFDF8] border-2 border-[#FA5A00]/25 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Panel (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-[460px] overflow-hidden">
              <motion.img
                src={marqueeService.image}
                alt={marqueeService.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute top-5 left-5">
                <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 bg-[#FA5A00] text-white rounded-full shadow-md">
                  {marqueeService.category}
                </span>
              </div>
            </div>

            {/* Content Panel (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                  {marqueeService.name}
                </h3>
                <p className="text-xs font-bold text-[#FA5A00] mt-1.5 uppercase tracking-wide">
                  {marqueeService.subtitle}
                </p>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed font-normal">
                  {marqueeService.summary}
                </p>

                <div className="mt-6 space-y-3">
                  {marqueeService.involves.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-800 font-medium">
                      <div className="w-4 h-4 rounded-full bg-orange-100 text-[#FA5A00] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                <button
                  onClick={() => setModalService(marqueeService)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#FA5A00] transition-colors cursor-pointer"
                >
                  <Info className="w-4 h-4 text-[#FA5A00]" />
                  <span>Technical Specs</span>
                </button>

                <motion.button
                  onClick={() => onSelectServiceForEstimate(marqueeService.id)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FA5A00] hover:bg-[#E04F00] rounded-full transition-colors cursor-pointer shadow-md group"
                >
                  <span>Get Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alternating Secondary Services Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondaryServices.map((service, index) => {
            // Alternating entrance animation: odd from left (-40px), even from right (40px)
            const enterX = index % 2 === 0 ? -40 : 40;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: enterX, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="flex flex-col justify-between rounded-3xl bg-white border border-gray-200 hover:border-[#FA5A00] transition-all duration-300 overflow-hidden group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-gray-900/90 text-white rounded-md backdrop-blur-sm">
                        {service.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-gray-900 group-hover:text-[#FA5A00] transition-colors leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-500 mt-1 uppercase">
                      {service.subtitle}
                    </p>
                    <p className="mt-3 text-xs text-gray-600 leading-relaxed line-clamp-3">
                      {service.summary}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-gray-400 block font-medium">Longevity</span>
                        <span className="text-gray-900 font-bold">{service.specifications.longevity}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Wind Rating</span>
                        <span className="text-gray-900 font-bold">{service.specifications.windRating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100 mt-4">
                  <button
                    onClick={() => setModalService(service)}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    Learn More
                  </button>
                  <button
                    onClick={() => onSelectServiceForEstimate(service.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FA5A00] hover:text-[#E04F00] transition-colors cursor-pointer group"
                  >
                    <span>Select Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fluid Modal Transition with AnimatePresence */}
      <AnimatePresence>
        {modalService && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10"
            >
              <button
                onClick={() => setModalService(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold uppercase tracking-wider text-[#FA5A00]">
                {modalService.category}
              </span>
              <h3 className="font-display text-2xl font-black text-gray-900 mt-1">
                {modalService.name}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {modalService.summary}
              </p>

              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF6EC] border border-[#EADBBE]">
                  <h4 className="text-xs font-bold uppercase text-[#FA5A00] mb-1">CUSTOMER NEED ADDRESSED</h4>
                  <p className="text-xs text-gray-800 leading-relaxed font-medium">{modalService.addresses}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">SCOPE OF WORK</h4>
                  <div className="space-y-2">
                    {modalService.involves.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-[#FA5A00] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] text-gray-500 uppercase block">LIFESPAN</span>
                    <span className="text-xs font-bold text-gray-900 mt-0.5 block">{modalService.specifications.longevity}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] text-gray-500 uppercase block">WIND UPLIFT</span>
                    <span className="text-xs font-bold text-gray-900 mt-0.5 block">{modalService.specifications.windRating}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] text-gray-500 uppercase block">MAINTENANCE</span>
                    <span className="text-xs font-bold text-gray-900 mt-0.5 block">{modalService.specifications.maintenance}</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <span className="text-[10px] text-gray-500 uppercase block">FASTENER TYPE</span>
                    <span className="text-xs font-bold text-gray-900 mt-0.5 block">{modalService.specifications.fasteners}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setModalService(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = modalService.id;
                    setModalService(null);
                    onSelectServiceForEstimate(id);
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FA5A00] hover:bg-[#E04F00] rounded-full transition-colors shadow-md cursor-pointer"
                >
                  Apply to Estimate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
