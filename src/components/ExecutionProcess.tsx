import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Search, Ruler, Wrench, CheckCircle } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  leadTime: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
}

const STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Free On-Site Assessment & Roof Survey',
    leadTime: 'Initial Consultation',
    description: 'A licensed roofing specialist conducts a comprehensive physical and attic moisture inspection to analyze decking condition, ventilation airflow, and drainage pitch.',
    deliverables: ['Moisture detection', 'Substrate decking evaluation', 'Measurements & slope documentation'],
    icon: <Search className="w-5 h-5 text-white" />,
  },
  {
    number: '02',
    title: 'Written Scope & Same-Day Estimate',
    leadTime: 'Proposal Presentation',
    description: 'You receive a transparent itemized estimate outlining recommended materials (architectural shingles, standing seam metal, or TPO) with zero hidden fees.',
    deliverables: ['Detailed material options', 'Wind & fire rating certificates', 'Insurance claim documentation'],
    icon: <Ruler className="w-5 h-5 text-white" />,
  },
  {
    number: '03',
    title: 'Tear-Off & Structural Deck Prep',
    leadTime: 'Project Day 1',
    description: 'Existing worn shingles are completely removed. Structural decking is inspected for rot, damaged boards replaced, and high-temp ice barrier installed.',
    deliverables: ['Property & landscape protection nets', 'Rotted substrate replacement', 'Monolithic self-sealing membrane'],
    icon: <ClipboardCheck className="w-5 h-5 text-white" />,
  },
  {
    number: '04',
    title: 'Precision Installation & Flashing',
    leadTime: 'Core Construction',
    description: 'Factory-trained technicians install the primary roof system with custom-bent valleys, counter-flashings, and low-profile ridge vents.',
    deliverables: ['Corrosion-resistant fasteners', 'Watertight valley flashings', 'Seamless chimney & pipe boots'],
    icon: <Wrench className="w-5 h-5 text-white" />,
  },
  {
    number: '05',
    title: 'Final Quality Audit & Debris Sweep',
    leadTime: 'Job Completion',
    description: 'Our project supervisor conducts a thorough multi-point weather-seal inspection and runs continuous rolling magnetic sweeps across lawns and driveways.',
    deliverables: ['Magnetic nail sweep verification', 'Photo completion album', 'Manufacturer warranty packet'],
    icon: <CheckCircle className="w-5 h-5 text-white" />,
  },
];

export const ExecutionProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-24 bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#FA5A00] uppercase tracking-wider mb-2">
            <span className="w-4 h-[2px] bg-[#FA5A00]" />
            <span>OUR SIMPLE PROCESS</span>
            <span aria-hidden="true" className="text-gray-300">·</span>
            <span className="text-gray-600">FROM ESTIMATE TO COMPLETION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            How Johnston Roofing Delivers a Hassle-Free Job
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            We respect your home and schedule. Here is what you can expect from the moment you request a quote to final inspection.
          </p>
        </motion.div>

        {/* Desktop Progress Bar Line */}
        <div className="hidden lg:block relative mb-8">
          <div className="h-[2px] bg-gray-200 absolute top-5 left-8 right-8 z-0" />
          <motion.div
            className="h-[2px] bg-[#FA5A00] absolute top-5 left-8 z-0 origin-left"
            animate={{ width: `${(activeStep / (STEPS.length - 1)) * 92}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* 5-Step Grid with Sequential Stagger and Interactive Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {STEPS.map((step, index) => {
            const isActive = index === activeStep;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveStep(index)}
                whileHover={{ y: -6 }}
                className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#FFFDF8] border-2 border-[#FA5A00] shadow-xl ring-2 ring-[#FA5A00]/20'
                    : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-sm font-black transition-colors ${isActive ? 'text-[#FA5A00]' : 'text-gray-400'}`}>
                      STEP {step.number}
                    </span>
                    <motion.div
                      animate={{ scale: isActive ? 1.08 : 1 }}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-colors ${
                        isActive ? 'bg-[#FA5A00]' : 'bg-gray-800'
                      }`}
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    {step.leadTime}
                  </span>

                  <h3 className="font-display text-base font-bold text-gray-900 mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1.5">
                    DELIVERABLES
                  </span>
                  <ul className="space-y-1">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="text-[11px] text-gray-700 font-medium flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-[#FA5A00]' : 'bg-gray-400'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
