import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ShieldCheck, Thermometer, Wind, CheckCircle2, ArrowRight } from 'lucide-react';

interface LayerDetail {
  id: string;
  number: string;
  name: string;
  role: string;
  material: string;
  functionality: string;
  icon: React.ReactNode;
}

const ROOF_LAYERS: LayerDetail[] = [
  {
    id: 'layer-decking',
    number: '01',
    name: 'Structural Decking Substrate',
    role: 'Foundation & Load Bearing',
    material: 'Engineered 5/8" CDX Plywood or Oriented Strand Board',
    functionality: 'Provides uniform structural shear resistance, verified for moisture rot or deflection before any material is fastened.',
    icon: <Layers className="w-5 h-5 text-[#FA5A00]" />,
  },
  {
    id: 'layer-barrier',
    number: '02',
    name: 'High-Temperature Ice & Water Shield',
    role: 'Vulnerability Defense',
    material: 'SBS-Modified Bitumen Self-Sealing Membrane',
    functionality: 'Forms a monolithic watertight gasket around all fastener penetrations along eaves, valleys, rakes, and chimney transitions.',
    icon: <ShieldCheck className="w-5 h-5 text-[#FA5A00]" />,
  },
  {
    id: 'layer-underlayment',
    number: '03',
    name: 'Engineered Breathable Underlayment',
    role: 'Moisture Vapor Management',
    material: 'Multi-layer Woven Polyolefin Synthetic Barrier',
    functionality: 'Allows indoor water vapor to escape while serving as a secondary 100% water barrier against wind-driven torrential rains.',
    icon: <Thermometer className="w-5 h-5 text-[#FA5A00]" />,
  },
  {
    id: 'layer-flashing',
    number: '04',
    name: 'Precision Custom-Bent Flashing',
    role: 'Critical Junction Protection',
    material: '16oz Cold-Rolled Copper or 24-Gauge Coated Aluminum',
    functionality: 'Pre-fabricated and hand-crimped on site to seal step walls, dormers, and valleys without relying on perishable caulk.',
    icon: <Wind className="w-5 h-5 text-[#FA5A00]" />,
  },
  {
    id: 'layer-surface',
    number: '05',
    name: 'Architectural Weathering Surface',
    role: 'Primary Armor & Aesthetics',
    material: 'Standing Seam Metal, Natural/Composite Slate, or Class 4 Shingle',
    functionality: 'Deflects UV radiation, impacts from hail, and gale-force wind uplift while defining the building’s architectural silhouette.',
    icon: <CheckCircle2 className="w-5 h-5 text-[#FA5A00]" />,
  },
];

export const BrandPhilosophy: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('layer-surface');
  const activeLayer = ROOF_LAYERS.find((l) => l.id === activeLayerId) || ROOF_LAYERS[4];

  return (
    <section className="py-24 bg-[#FAF6EC] border-b border-[#EADBBE] relative overflow-hidden">
      {/* Subtle CAD Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d1b88e_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#FA5A00] uppercase tracking-wider mb-2">
            <span className="w-4 h-[2px] bg-[#FA5A00]" />
            <span>HOW WE BUILD BETTER</span>
            <span aria-hidden="true" className="text-gray-400">/</span>
            <span className="text-gray-600">5-LAYER PROTECTION SYSTEM</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            The Anatomy of a Leak-Free Roof
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            A reliable roof isn’t just surface shingles—it’s a coordinated multi-layer defense system. 
            Johnston Roofing inspects and reinforces every layer from the wooden deck up to the ridge cap.
          </p>
        </motion.div>

        {/* Interactive Layer Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Layer Selection Buttons (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3" role="tablist" aria-label="Roof structural layers">
            {ROOF_LAYERS.map((layer, index) => {
              const isSelected = layer.id === activeLayerId;
              return (
                <motion.button
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  role="tab"
                  aria-selected={isSelected}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#FA5A00] shadow-md ring-2 ring-[#FA5A00]/20'
                      : 'bg-white/70 border-gray-200 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5 z-10">
                    <span className={`font-mono text-sm font-bold tabular-nums transition-colors ${isSelected ? 'text-[#FA5A00]' : 'text-gray-400'}`}>
                      {layer.number}
                    </span>
                    <div>
                      <p className={`text-sm font-bold transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                        {layer.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{layer.role}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-xl z-10 transition-colors ${isSelected ? 'bg-orange-50' : 'bg-transparent'}`}>
                    {layer.icon}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Deep-Dive Active Spec Card (7 cols) with AnimatePresence */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-10 shadow-xl relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayer.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#FA5A00] uppercase tracking-wider">
                        <span>SPECIFICATION BREAKDOWN</span>
                        <span>·</span>
                        <span>LAYER {activeLayer.number}</span>
                      </div>
                      <h3 className="font-display text-2xl font-black text-gray-900 mt-1">
                        {activeLayer.name}
                      </h3>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100 shadow-sm">
                      {activeLayer.icon}
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block mb-1">
                        ENGINEERED MATERIAL SPECIFICATION
                      </span>
                      <p className="text-base font-bold text-gray-900 font-mono">
                        {activeLayer.material}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-gray-400 block mb-1">
                        PRIMARY WEATHERPROOFING FUNCTION
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed font-normal">
                        {activeLayer.functionality}
                      </p>
                    </div>

                    {/* Substrate Quality Guarantee Callout */}
                    <div className="p-5 rounded-2xl bg-[#FAF6EC] border border-[#EADBBE] flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FA5A00] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-gray-900 block mb-0.5">
                          Johnston Roofing Structural Guarantee
                        </span>
                        <p className="text-xs text-gray-700 leading-relaxed font-medium">
                          We never install shingles or metal over damaged, rotted, or dipping wood decks. Complete structural deck inspection is part of every installation contract.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
