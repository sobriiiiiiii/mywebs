import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  calculateRoofEstimate,
  validateEnquiryForm,
  PITCH_MULTIPLIERS,
  ROOFING_SYSTEMS,
  EnquiryFormData,
} from '../utils/roofingCalculations';
import { Calculator, CheckCircle, Send, AlertCircle, Copy, Check } from 'lucide-react';

interface QuoteCalculatorProps {
  initialSystemKey?: string;
  initialLeadData?: { name: string; phone: string; address: string; service: string } | null;
}

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({
  initialSystemKey = 'standing-seam',
  initialLeadData,
}) => {
  // Estimator State
  const [footprintSqFt, setFootprintSqFt] = useState<number>(2400);
  const [pitchKey, setPitchKey] = useState<keyof typeof PITCH_MULTIPLIERS>('medium');
  const [systemKey, setSystemKey] = useState<keyof typeof ROOFING_SYSTEMS>(
    initialSystemKey in ROOFING_SYSTEMS ? (initialSystemKey as keyof typeof ROOFING_SYSTEMS) : 'standing-seam'
  );

  // Form State
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: initialLeadData?.name || '',
    email: '',
    phone: initialLeadData?.phone || '',
    propertyType: 'Residential Single-Family',
    serviceInterest: initialLeadData?.service || 'Concealed Fastener Standing Seam Metal',
    estimatedSqFt: 2400,
    projectNotes: initialLeadData?.address ? `Property Address: ${initialLeadData.address}` : '',
    preferredTimeline: 'Within 30 Days',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedSummary, setSubmittedSummary] = useState<any | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Derived calculation
  const estimate = calculateRoofEstimate({
    footprintSqFt,
    pitch: pitchKey,
    systemKey,
    complexityFactor: 1.10,
  });

  const handleInputChange = (field: keyof EnquiryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field] || formErrors.contact) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        delete next.contact;
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEnquiryForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setSubmittedSummary({
      ...formData,
      estimate,
      submissionId: `JR-QUOTE-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };

  const handleCopySpec = () => {
    if (!submittedSummary) return;
    const summaryText = `
JOHNSTON ROOFING - PROPOSED SCOPE & ESTIMATE
Reference ID: ${submittedSummary.submissionId}
Client: ${submittedSummary.fullName}
Contact: ${submittedSummary.email || submittedSummary.phone}
Property: ${submittedSummary.propertyType}
Selected System: ${submittedSummary.estimate.system.name}
Calculated Surface: ${submittedSummary.estimate.calculatedSurfaceArea} sq ft (${submittedSummary.estimate.squares} squares)
Estimated Crew Days: ${submittedSummary.estimate.estimatedCrewDays.min} - ${submittedSummary.estimate.estimatedCrewDays.max} days
Underlayment: ${submittedSummary.estimate.system.underlaymentSpec}
Notes: ${submittedSummary.projectNotes || 'None'}
    `.trim();

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setSubmittedSummary(null);
    setFormErrors({});
  };

  return (
    <section id="quote" className="py-24 bg-[#FAF6EC] border-b border-[#EADBBE] overflow-hidden">
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
            <span>ONLINE ROOF ESTIMATOR</span>
            <span aria-hidden="true" className="text-gray-400">·</span>
            <span className="text-gray-600">INSTANT SCOPE & SQUARE CALCULATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Calculate Your Roof Size & Request Detailed Proposal
          </h2>
          <p className="mt-4 text-base text-gray-600 leading-relaxed font-normal">
            Adjust your property square footage and pitch to preview required materials, squares, and installation time. 
            Send your specs directly to our team for a guaranteed same-day price.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submittedSummary ? (
            /* Submission Confirmation Card */
            <motion.div
              key="submitted-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-white border border-gray-200 p-8 sm:p-10 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FA5A00] uppercase">
                      <span>ESTIMATE GENERATED</span>
                      <span>·</span>
                      <span className="text-gray-500 font-mono">{submittedSummary.submissionId}</span>
                    </div>
                    <h3 className="font-display text-2xl font-black text-gray-900 mt-0.5">
                      Proposal Ready for Johnston Roofing Dispatch
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopySpec}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#FA5A00]" />}
                    <span>{copied ? 'Copied' : 'Copy Estimate'}</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    Calculate Another
                  </button>
                </div>
              </div>

              {/* Generated Specification Metrics */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                    CLIENT & PROPERTY
                  </span>
                  <p className="text-sm font-bold text-gray-900">{submittedSummary.fullName}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{submittedSummary.email || submittedSummary.phone}</p>
                  <p className="text-xs text-gray-800 mt-3 font-semibold">{submittedSummary.propertyType}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Timeline: {submittedSummary.preferredTimeline}</p>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                    SURFACE METRICS
                  </span>
                  <p className="text-sm font-bold text-[#FA5A00]">{submittedSummary.estimate.system.name}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                    <div>
                      <span className="text-gray-400 block text-[10px]">SURFACE AREA</span>
                      <span className="text-gray-900 text-base">{submittedSummary.estimate.calculatedSurfaceArea} sq ft</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">TOTAL SQUARES</span>
                      <span className="text-gray-900 text-base">{submittedSummary.estimate.squares} Sq</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[10px] font-bold uppercase text-gray-500 block mb-1">
                    CREW INSTALLATION WINDOW
                  </span>
                  <p className="text-2xl font-black text-gray-900 font-mono">
                    {submittedSummary.estimate.estimatedCrewDays.min} – {submittedSummary.estimate.estimatedCrewDays.max} Days
                  </p>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Standard 4-person professional crew. Weather permitting.
                  </p>
                </div>
              </div>

              {/* Scope Checklist Included */}
              <div className="mt-8 p-6 rounded-2xl bg-[#FFFDF8] border border-orange-200">
                <span className="text-xs font-bold uppercase text-[#FA5A00] block mb-3">
                  RECOMMENDED SCOPE OF WORK INCLUDED
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {submittedSummary.estimate.scopeBreakdown.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-800 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#FA5A00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Live Estimator + Form Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Scope Configuration (6 cols) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 shadow-md"
              >
                <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100 text-sm font-bold text-gray-900">
                  <Calculator className="w-5 h-5 text-[#FA5A00]" />
                  <span>Roof Size & Pitch Calculator</span>
                </div>

                {/* Footprint Slider */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <label htmlFor="footprint-slider" className="font-bold uppercase text-gray-700">
                      Home Ground Footprint
                    </label>
                    <span className="font-mono font-black text-gray-900 text-base">
                      {footprintSqFt.toLocaleString()} sq ft
                    </span>
                  </div>
                  <input
                    id="footprint-slider"
                    type="range"
                    min="800"
                    max="7000"
                    step="100"
                    value={footprintSqFt}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setFootprintSqFt(val);
                      handleInputChange('estimatedSqFt', val);
                    }}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FA5A00]"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-1">
                    <span>800 sq ft</span>
                    <span>3,500 sq ft</span>
                    <span>7,000 sq ft</span>
                  </div>
                </div>

                {/* Pitch Selector */}
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase text-gray-700 block mb-2">
                    Roof Slope & Architecture
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(PITCH_MULTIPLIERS).map(([key, config]) => {
                      const isSelected = key === pitchKey;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setPitchKey(key as keyof typeof PITCH_MULTIPLIERS)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-orange-50/70 border-[#FA5A00] text-gray-900 ring-2 ring-[#FA5A00]/20'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-xs font-bold block">{config.label}</span>
                          <span className="text-[10px] text-gray-500 block mt-0.5">{config.slopeDescription}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred System */}
                <div className="mt-6">
                  <label className="text-xs font-bold uppercase text-gray-700 block mb-2">
                    Roofing Material
                  </label>
                  <select
                    value={systemKey}
                    onChange={(e) => {
                      const key = e.target.value as keyof typeof ROOFING_SYSTEMS;
                      setSystemKey(key);
                      handleInputChange('serviceInterest', ROOFING_SYSTEMS[key].name);
                    }}
                    className="w-full p-3 bg-white border border-gray-300 rounded-2xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#FA5A00]"
                  >
                    {Object.entries(ROOFING_SYSTEMS).map(([key, sys]) => (
                      <option key={key} value={key}>
                        {sys.name} ({sys.lifespanExpectancy})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calculated Outputs */}
                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">TRUE SURFACE</span>
                    <span className="text-base font-black text-gray-900 font-mono block mt-1">
                      {estimate.calculatedSurfaceArea.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">sq ft</span>
                  </div>

                  <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200">
                    <span className="text-[10px] font-bold text-[#FA5A00] uppercase block">ROOF SQUARES</span>
                    <span className="text-base font-black text-[#FA5A00] font-mono block mt-1">
                      {estimate.squares}
                    </span>
                    <span className="text-[10px] text-orange-800 font-medium">Squares</span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">ESTIMATED CREW</span>
                    <span className="text-base font-black text-gray-900 font-mono block mt-1">
                      {estimate.estimatedCrewDays.min}–{estimate.estimatedCrewDays.max}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">Days</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Booking Form (6 cols) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 rounded-3xl bg-white border border-gray-200 p-6 sm:p-8 shadow-md"
              >
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-sm font-bold text-gray-900">
                  <Send className="w-4 h-4 text-[#FA5A00]" />
                  <span>Request Free In-Person Inspection & Written Quote</span>
                </div>

                {Object.keys(formErrors).length > 0 && (
                  <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Please complete the required fields:</span>
                      <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-[11px]">
                        {Object.values(formErrors).map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="input-name" className="text-xs font-bold uppercase text-gray-700 block mb-1">
                      Full Name <span className="text-[#FA5A00]">*</span>
                    </label>
                    <input
                      id="input-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. John Miller"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="input-email" className="text-xs font-bold uppercase text-gray-700 block mb-1">
                        Email Address
                      </label>
                      <input
                        id="input-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="input-phone" className="text-xs font-bold uppercase text-gray-700 block mb-1">
                        Phone Number <span className="text-[#FA5A00]">*</span>
                      </label>
                      <input
                        id="input-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="select-property" className="text-xs font-bold uppercase text-gray-700 block mb-1">
                        Property Type
                      </label>
                      <select
                        id="select-property"
                        value={formData.propertyType}
                        onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-[#FA5A00]"
                      >
                        <option value="Residential Single-Family">Residential Single-Family</option>
                        <option value="Luxury Custom Estate">Luxury Custom Estate</option>
                        <option value="Commercial / Industrial Building">Commercial Building</option>
                        <option value="Townhome / Multi-Family">Townhome / Multi-Family</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="select-timeline" className="text-xs font-bold uppercase text-gray-700 block mb-1">
                        Timeline
                      </label>
                      <select
                        id="select-timeline"
                        value={formData.preferredTimeline}
                        onChange={(e) => handleInputChange('preferredTimeline', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm text-gray-900 focus:outline-none focus:border-[#FA5A00]"
                      >
                        <option value="Urgent (Active Leak)">Emergency (Active Leak)</option>
                        <option value="Within 30 Days">Within 30 Days</option>
                        <option value="1 to 3 Months">1 to 3 Months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="input-notes" className="text-xs font-bold uppercase text-gray-700 block mb-1">
                      Address / Project Notes
                    </label>
                    <textarea
                      id="input-notes"
                      rows={2}
                      value={formData.projectNotes}
                      onChange={(e) => handleInputChange('projectNotes', e.target.value)}
                      placeholder="Enter street address or describe leak / storm damage..."
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FA5A00] focus:ring-2 focus:ring-[#FA5A00]/20 transition-all"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 px-6 rounded-full bg-[#FA5A00] hover:bg-[#E04F00] text-white text-sm font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Submit My Estimate Request</span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-[11px] text-gray-400 text-center font-medium">
                    We respect your privacy. No obligation.
                  </p>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
