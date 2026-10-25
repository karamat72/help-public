import React from 'react';
import { X, ShieldAlert, Lock, EyeOff, FileCheck, CheckCircle2 } from 'lucide-react';

interface PrivacySafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacySafetyModal: React.FC<PrivacySafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">Privacy & Safety Center</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5">
            <div className="font-bold text-amber-900 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-700" />
              Whistleblower & Civic Safety Standards
            </div>
            <p className="text-amber-800">
              Reporting serious governance or human rights matters can carry personal risks. Public Help enforces strict privacy boundaries to protect citizens.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <EyeOff className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Reporter Anonymity</h4>
                <p className="text-slate-600 mt-0.5">
                  When enabled, your name, email, and IP coordinates are stripped from the public feed. Only our cryptographic verification hash is retained to prevent bot spam.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <FileCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Clear Distinction of Allegations</h4>
                <p className="text-slate-600 mt-0.5">
                  Reports start labeled as “User-Reported Allegation”. They only advance to “Officially Acknowledged” or “Verified Investigation” after receipt of documentary corroboration.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">Zero Doxxing & Anti-Harassment Rule</h4>
                <p className="text-slate-600 mt-0.5">
                  Publication of private residential addresses of individuals, private phone records, or threats is strictly prohibited and subject to automated moderation redaction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
