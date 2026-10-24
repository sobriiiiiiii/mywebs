import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight } from 'lucide-react';
import { ROOFING_SYSTEMS } from '../utils/roofingCalculations';

interface ComparisonRow {
  label: string;
  metal: string;
  shingle: string;
  slate: string;
  tpo: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    label: 'Design Lifespan Expectancy',
    metal: '50+ Years',
    shingle: '30–50 Years',
    slate: '50–100 Years',
    tpo: '25–35 Years',
  },
  {
    label: 'Wind Uplift Rating',
    metal: 'Tested up to 140+ MPH',
    shingle: 'Up to 130 MPH',
    slate: 'Up to 130 MPH',
    tpo: 'FM Global Parapet Standard',
  },
  {
    label: 'Structural Weight Class',
    metal: '1.0 – 1.5 lbs/sq ft (Light)',
    shingle: '2.5 – 4.0 lbs/sq ft (Medium)',
    slate: '6.0 – 9.0 lbs/sq ft (Heavy)',
    tpo: '0.8 – 1.2 lbs/sq ft (Light)',
  },
  {
    label: 'Fire Resistance Class',
    metal: 'Class A Non-Combustible',
    shingle: 'Class A Fiberglass Core',
    slate: 'Class A Non-Combustible',
    tpo: 'Class A Commercial Assembly',
  },
  {
    label: 'Minimum Pitch Suitability',
    metal: '1:12 slope and above',
    shingle: '3:12 slope and above',
    slate: '4:12 slope and above',
    tpo: 'Flat to low slope (< 2:12)',
  },
  {
    label: 'Thermal Solar Reflectance',
    metal: 'High (Cool Roof pigments)',
    shingle: 'Moderate (Granule reflection)',
    slate: 'Natural dense thermal mass',
    tpo: 'Maximum (ENERGY STAR white)',
  },
];

interface MaterialSpecExplorerProps {
  onSelectSystem: (systemKey: string) => void;
}

export const MaterialSpecExplorer: React.FC<MaterialSpecExplorerProps> = ({ onSelectSystem }) => {
  const [activeSystemKey, setActiveSystemKey] = useState<string>('standing-seam');
  const activeSystem = ROOFING_SYSTEMS[activeSystemKey];

  return (
    <section id="materials" className="py-24 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span>TECHNICAL SPECIFICATIONS</span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span className="text-gray-600">MATERIAL COMPARISON</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Compare Roofing Materials & Lifespans
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            Choose the best system for your property’s architectural style, budget, and local weather exposure. 
            Review key performance benchmarks side by side.
          </p>
        </motion.div>

        {/* System Tab Selector */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 rounded-2xl mb-8">
          {Object.entries(ROOFING_SYSTEMS).map(([key, sys]) => {
            const isSelected = key === activeSystemKey;
            return (
              <button
                key={key}
                onClick={() => setActiveSystemKey(key)}
                className={`flex-1 min-w-[180px] py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-center relative ${
                  isSelected
                    ? 'bg-white text-gray-900 shadow-md ring-2 ring-[#FA5A00]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                }`}
              >
                <span>{sys.name.split(' ')[0]} {sys.name.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Active System Spotlight Card with Animated Cross-fade */}
        <motion.div
          layout
          className="rounded-3xl bg-[#FFFDF8] border-2 border-[#FA5A00]/25 p-6 sm:p-8 mb-12 shadow-md relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSystemKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-200">
                <div>
                  <span className="text-xs font-bold uppercase text-[#FA5A00] tracking-wider">
                    ACTIVE SYSTEM SPECIFICATION
                  </span>
                  <h3 className="font-display text-2xl font-black text-gray-900 mt-1">
                    {activeSystem.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 font-semibold">
                    {activeSystem.weightClass} · {activeSystem.lifespanExpectancy} Lifespan · {activeSystem.fireRating}
                  </p>
                </div>

                <motion.button
                  onClick={() => onSelectSystem(activeSystemKey)}
                  whileHover={{ scale: 1.04, x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FA5A00] hover:bg-[#E04F00] rounded-full transition-colors shrink-0 cursor-pointer shadow-md group"
                >
                  <span>Use in Quote Estimator</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">KEY ADVANTAGES</h4>
                  <div className="space-y-2.5">
                    {activeSystem.keyAdvantages.map((adv, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-800 font-medium">
                        <div className="w-4 h-4 rounded-full bg-orange-100 text-[#FA5A00] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-gray-400 mb-3">UNDERLAYMENT SPECIFICATION</h4>
                  <p className="text-xs text-gray-700 p-4 rounded-2xl bg-white border border-gray-200 leading-relaxed font-semibold">
                    {activeSystem.underlaymentSpec}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Side-by-Side Comparison Table with Row Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm"
        >
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider border-b border-gray-200 font-bold">
              <tr>
                <th scope="col" className="py-4 px-5">Performance Metric</th>
                <th scope="col" className="py-4 px-5 text-gray-900 font-black">Standing Seam Metal</th>
                <th scope="col" className="py-4 px-5">Architectural Shingle</th>
                <th scope="col" className="py-4 px-5">Natural Slate</th>
                <th scope="col" className="py-4 px-5">Single-Ply TPO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-orange-50/40 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-gray-900 whitespace-nowrap">{row.label}</td>
                  <td className="py-3.5 px-5 text-[#FA5A00] font-black">{row.metal}</td>
                  <td className="py-3.5 px-5 text-gray-700">{row.shingle}</td>
                  <td className="py-3.5 px-5 text-gray-700">{row.slate}</td>
                  <td className="py-3.5 px-5 text-gray-700">{row.tpo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};
