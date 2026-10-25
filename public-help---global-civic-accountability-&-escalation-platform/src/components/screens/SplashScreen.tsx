import React from 'react';
import { PublicHelpLogo } from '../common/PublicHelpLogo';
import { ArrowRight, ShieldCheck, Globe, Users } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
  onSkipToHome: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart, onSkipToHome }) => {
  return (
    <div className="min-h-full flex-1 flex flex-col justify-between items-center text-center p-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white select-none">
      {/* Top spacer */}
      <div className="pt-6"></div>

      {/* Hero Branding */}
      <div className="flex flex-col items-center max-w-sm space-y-6">
        <div className="relative">
          <div className="absolute -inset-4 bg-teal-500/20 rounded-full blur-xl"></div>
          <PublicHelpLogo size={96} />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Public <span className="text-teal-400">Help</span>
          </h1>
          <p className="text-sm font-medium text-teal-200/90 tracking-wide">
            Report Locally. Escalate Globally.
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed pt-1">
            A worldwide civic accountability network connecting citizens, public authorities, and global institutions.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-3 gap-2 w-full pt-4">
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <Globe className="w-5 h-5 text-teal-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-300 font-medium block">All Countries</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <ShieldCheck className="w-5 h-5 text-teal-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-300 font-medium block">5-Level Ladder</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
            <Users className="w-5 h-5 text-teal-400 mx-auto mb-1" />
            <span className="text-[10px] text-slate-300 font-medium block">Community Voice</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full max-w-xs space-y-3 pb-6">
        <button
          onClick={onStart}
          className="w-full py-3.5 px-6 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onSkipToHome}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Skip directly to Dashboard
        </button>
      </div>
    </div>
  );
};
