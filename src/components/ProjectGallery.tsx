import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'metal' | 'residential' | 'commercial' | 'craftsmanship';
  title: string;
  system: string;
  image: string;
  alt: string;
  details: string;
  specifications: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'residential',
    title: 'Professional Architectural Shingle Installation',
    system: 'Architectural Shingles & Eave Flashing',
    image: '/src/assets/images/hero_roofer_installing_shingles_1792832395239.jpg',
    alt: 'Roofer installing shingles on residential roof',
    details: 'Full roof replacement featuring high-definition dimensional shingles, synthetic vapor barrier, and precision starter strip alignment.',
    specifications: 'Pitch: 7:12 · Wind Load: 130 MPH · Class 4 Impact Rated',
  },
  {
    id: 'gal-2',
    category: 'metal',
    title: 'Modern Alpine Residence Standing Seam Installation',
    system: 'Concealed Fastener Standing Seam Metal',
    image: '/src/assets/images/hero_architectural_roofing_1792831418361.jpg',
    alt: 'Modern alpine residence with dark graphite standing seam metal roof',
    details: 'Custom 24-gauge Galvalume continuous panels with concealed expansion clips and integrated warm soffit lighting channels.',
    specifications: 'Pitch: 8:12 · Wind Load: 140+ MPH · Finish: Matte Kynar 500 Charcoal',
  },
  {
    id: 'gal-3',
    category: 'metal',
    title: 'Standing Seam with Hand-Crafted Copper Valley',
    system: 'Dual-Lock Standing Seam with Copper Transitions',
    image: '/src/assets/images/roof_metal_standing_seam_1792831419359.jpg',
    alt: 'High detail architectural standing seam metal roofing with copper valley flashing',
    details: 'Precision junction between converging gables featuring custom-soldered 16oz cold-rolled copper valley gutters and counter-flashing.',
    specifications: 'Material: Galvalume & 16oz Cold Rolled Copper · Seam Height: 1.5 inch',
  },
  {
    id: 'gal-4',
    category: 'residential',
    title: 'Custom Gabled Estate Slate Roof Installation',
    system: 'Natural Quarry Slate & Architectural Shingles',
    image: '/src/assets/images/roof_residential_slate_shingle_1792831421145.jpg',
    alt: 'Luxury home with deep grey natural slate roof tiles and copper gutters',
    details: 'Heavy-weight multi-tone slate tiles paired with seamless half-round copper gutters and high-temperature waterproof perimeter eave membranes.',
    specifications: 'Grade: Premium S-1 Architectural Slate · Fasteners: Solid Copper Nails',
  },
  {
    id: 'gal-5',
    category: 'commercial',
    title: 'Commercial Monolithic Membrane System',
    system: 'White Reflective 60-Mil TPO Membrane',
    image: '/src/assets/images/roof_commercial_flat_tpo_1792831420522.jpg',
    alt: 'Commercial building flat roof with reflective white TPO waterproof membrane',
    details: 'Single-ply cool roof membrane hot-air welded at 1000°F with engineered parapet terminations, internal roof drains, and HVAC curb wrapping.',
    specifications: 'Solar Reflectance: 0.79 · Insulation: 4" Tapered Polyiso · FM 1-90 Rated',
  },
  {
    id: 'gal-6',
    category: 'craftsmanship',
    title: 'Substrate Inspection & Multi-Point Flashing Verification',
    system: 'Craftsmanship Standard & Quality Control',
    image: '/src/assets/images/roof_inspection_craftsmanship_1792831420774.jpg',
    alt: 'Professional roofer in safety gear inspecting flashing on sloped roof',
    details: 'Senior roofing technician verifying step-flashing overlaps, valley expansion gaps, and precision weather-seal tolerances prior to signoff.',
    specifications: 'Inspection Standards: 28-Point Structural Substrate & Fastener Audit',
  },
];

export const ProjectGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handleNext = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') setSelectedItemIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-24 bg-[#FAF6EC] border-b border-[#EADBBE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FA5A00] uppercase tracking-wider mb-2">
              <span className="w-4 h-[2px] bg-[#FA5A00]" />
              <span>OUR WORK</span>
              <span aria-hidden="true" className="text-gray-400">·</span>
              <span className="text-gray-600">PHOTO SHOWCASE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Recent Roofing Projects & Installations
            </h2>
          </div>

          <div className="p-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-sm">
            <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
              <strong className="text-[#FA5A00]">Proposal Demo:</strong> High-resolution illustrative gallery ready for Johnston Roofing's verified job photos.
            </p>
          </div>
        </motion.div>

        {/* Filter Bar with Animated Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'residential', label: 'Residential Shingle & Slate' },
            { id: 'metal', label: 'Standing Seam Metal' },
            { id: 'commercial', label: 'Commercial Flat' },
            { id: 'craftsmanship', label: 'Safety & Inspection' },
          ].map((filter) => {
            const isSelected = activeFilter === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setSelectedItemIndex(null);
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2.5 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#FA5A00] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </div>

        {/* Responsive Gallery Grid with Alternating Scroll Reveals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const enterY = 30 + (index % 3) * 15;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: enterY }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedItemIndex(index)}
                className="group cursor-pointer rounded-3xl bg-white border border-gray-200 hover:border-[#FA5A00] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItemIndex(index);
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-xs font-bold text-gray-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-[#FA5A00]" />
                      <span>View Specifications</span>
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA5A00] block mb-1">
                      {item.system}
                    </span>
                    <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-[#FA5A00] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {item.details}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-medium">
                    <span>Verified Inspection</span>
                    <span className="text-[#FA5A00] font-bold group-hover:translate-x-1 transition-transform">
                      Specs →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fluid Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeItem && selectedItemIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItemIndex(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedItemIndex(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer shadow-lg"
              aria-label="Close image lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev/Next Navigation Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors cursor-pointer hidden sm:flex items-center justify-center shadow-lg"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors cursor-pointer hidden sm:flex items-center justify-center shadow-lg"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10"
            >
              <div className="relative aspect-[16/10] bg-black overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              <div className="p-6 sm:p-8 bg-white overflow-y-auto">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase text-[#FA5A00]">
                    {activeItem.system}
                  </span>
                  <span className="text-xs text-gray-500 font-bold font-mono">
                    Project {selectedItemIndex + 1} of {filteredItems.length}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-black text-gray-900">
                  {activeItem.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed font-normal">
                  {activeItem.details}
                </p>

                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                    ARCHITECTURAL SPECIFICATIONS
                  </span>
                  <p className="text-xs font-bold text-gray-800 font-mono">
                    {activeItem.specifications}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
