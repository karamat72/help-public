import React from 'react';
import { X, ExternalLink, CheckCircle2, Smartphone, Layers, ShieldCheck, Globe2 } from 'lucide-react';

interface DesignComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignComparisonModal: React.FC<DesignComparisonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Public Help: Master Architecture & Design Blueprint
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-800 text-sm">
          {/* Blueprint Verification Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-teal-50/70 border border-teal-200 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-teal-800 font-bold mb-1.5 text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4 text-teal-600" />
                5 Escalation Levels
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Level 1 (Local), Level 2 (Org), Level 3 (Regional), Level 4 (National), Level 5 (Global Awareness).
              </p>
            </div>
            <div className="bg-indigo-50/70 border border-indigo-200 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-800 font-bold mb-1.5 text-xs uppercase tracking-wider">
                <Globe2 className="w-4 h-4 text-indigo-600" />
                Worldwide Location System
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                6-tier geographic structure: Country &rarr; State/Province &rarr; District/County &rarr; City &rarr; Locality &rarr; GPS pin.
              </p>
            </div>
            <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1.5 text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Trust & Verification
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distinguishes user allegations from verified official records. Includes anonymous whistleblower options.
              </p>
            </div>
          </div>

          {/* Reference Image */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-100 p-2">
            <div className="flex items-center justify-between mb-2 px-1 text-xs text-slate-600">
              <span className="font-medium">Original Blueprint / System Design:</span>
              <a
                href="/public/assets/aistudio/WhatsApp_Image_2026-10-25_at_12.01.59_PM_2c1e8adc.jpeg"
                target="_blank"
                rel="noreferrer"
                className="text-teal-700 hover:underline inline-flex items-center gap-1"
              >
                <span>Open Raw Image</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <img
              src="/public/assets/aistudio/WhatsApp_Image_2026-10-25_at_12.01.59_PM_2c1e8adc.jpeg"
              alt="Public Help Master Infographic"
              className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-sm bg-white"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
