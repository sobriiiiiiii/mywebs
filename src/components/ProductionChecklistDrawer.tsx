import React, { useState } from 'react';
import { X, CheckSquare, Square, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { PRODUCTION_REQUIREMENTS } from '../utils/roofingCalculations';

interface ProductionChecklistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductionChecklistDrawer: React.FC<ProductionChecklistDrawerProps> = ({ isOpen, onClose }) => {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleRequirement = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyChecklist = () => {
    const text = PRODUCTION_REQUIREMENTS.map((r, i) => {
      const isDone = completedIds.includes(r.id) ? '[X]' : '[ ]';
      return `${isDone} ${i + 1}. ${r.title} (${r.category})\n   Required: ${r.description}`;
    }).join('\n\n');

    const header = `JOHNSTON ROOFING PROS - PRODUCTION LAUNCH CHECKLIST\n\n${text}`;
    navigator.clipboard.writeText(header);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checklist-title"
    >
      <div className="w-full max-w-xl bg-white border-l border-gray-200 h-full flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FA5A00] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FA5A00]">
                CLIENT PROPOSAL ONBOARDING
              </span>
              <h3 id="checklist-title" className="font-display text-lg font-black text-gray-900">
                Johnston Roofing Launch Checklist
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close checklist drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative Agency Notice */}
        <div className="p-6 bg-[#FAF6EC] border-b border-[#EADBBE] text-xs text-gray-700 leading-relaxed font-medium">
          <p className="flex items-center gap-1.5 text-gray-900 font-bold mb-1">
            <AlertCircle className="w-4 h-4 text-[#FA5A00] shrink-0" />
            <span>Proposal Credibility Notice:</span>
          </p>
          This website was built with zero fake certifications, fabricated reviews, or invented phone numbers. 
          To launch this exact website live for Johnston Roofing, confirm the 7 items below.
        </div>

        {/* Scrollable Checklist Items */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3.5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>ITEMS CONFIRMED ({completedIds.length}/{PRODUCTION_REQUIREMENTS.length})</span>
            <span>TAP TO CHECK OFF</span>
          </div>

          {PRODUCTION_REQUIREMENTS.map((req) => {
            const isCompleted = completedIds.includes(req.id);
            return (
              <div
                key={req.id}
                onClick={() => toggleRequirement(req.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isCompleted
                    ? 'bg-green-50/60 border-green-300'
                    : 'bg-white border-gray-200 hover:border-[#FA5A00]/50 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-[#FA5A00] shrink-0"
                  aria-label={isCompleted ? `Uncheck ${req.title}` : `Check ${req.title}`}
                >
                  {isCompleted ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-300" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-900">
                      {req.title}
                    </span>
                    <span className="text-[10px] font-bold text-[#FA5A00] uppercase">
                      {req.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
          <button
            onClick={handleCopyChecklist}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-full transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#FA5A00]" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Onboarding List'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FA5A00] hover:bg-[#E04F00] rounded-full transition-colors cursor-pointer shadow-md"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
