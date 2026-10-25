import React from 'react';
import { Smartphone, Monitor, Eye, Sparkles, UserCheck, ShieldAlert } from 'lucide-react';
import { UserAccount } from '../../types';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenBlueprint: () => void;
  currentUser: UserAccount;
  onSwitchUser: (role: UserAccount['role']) => void;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  children,
  isMobileFrame,
  onToggleFrame,
  onOpenBlueprint,
  currentUser,
  onSwitchUser
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start antialiased text-slate-100 selection:bg-teal-500 selection:text-white">
      {/* Top Civic Navigation & Viewport Bar */}
      <div className="w-full bg-slate-900 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="font-bold text-white text-sm tracking-tight">Public Help</span>
            <span className="text-slate-400 hidden sm:inline">| Global Civic Escalation Network</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[11px]">
            <span>Active Persona:</span>
            <span className="font-semibold text-teal-300 capitalize">{currentUser.role.replace('_', ' ')}</span>
            <span className="text-slate-500">({currentUser.name})</span>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Persona Switcher */}
          <div className="relative group">
            <button
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              title="Switch demo persona"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Role: {currentUser.role.split('_')[0]}</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 w-44 z-50">
              <button
                onClick={() => onSwitchUser('citizen')}
                className={`px-3 py-1.5 text-left text-xs ${currentUser.role === 'citizen' ? 'text-teal-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                👤 Citizen (Alex Johnson)
              </button>
              <button
                onClick={() => onSwitchUser('civic_advocate')}
                className={`px-3 py-1.5 text-left text-xs ${currentUser.role === 'civic_advocate' ? 'text-teal-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                📢 Civic Advocate (NGO)
              </button>
              <button
                onClick={() => onSwitchUser('municipal_inspector')}
                className={`px-3 py-1.5 text-left text-xs ${currentUser.role === 'municipal_inspector' ? 'text-teal-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🏛️ Municipal Inspector
              </button>
              <button
                onClick={() => onSwitchUser('moderator')}
                className={`px-3 py-1.5 text-left text-xs ${currentUser.role === 'moderator' ? 'text-teal-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🛡️ Civic Moderator
              </button>
            </div>
          </div>

          {/* Blueprint Reference Button */}
          <button
            onClick={onOpenBlueprint}
            className="px-2.5 py-1 bg-teal-950/80 hover:bg-teal-900/90 text-teal-300 border border-teal-700/50 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Inspect Original Infographic & Blueprint"
          >
            <Eye className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-medium">Design Blueprint</span>
          </button>

          {/* Mobile vs Full Screen Toggle */}
          <button
            onClick={onToggleFrame}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
            title={isMobileFrame ? 'Expand to Full-Width Responsive View' : 'Switch to iPhone Mobile Frame'}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container Area */}
      <div className={`w-full flex items-center justify-center flex-1 ${isMobileFrame ? 'py-4 sm:py-8 px-2' : ''}`}>
        {isMobileFrame ? (
          /* Realistic Smartphone Bezel (iPhone 16 Pro styling) */
          <div className="relative w-full max-w-[420px] h-[860px] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-slate-800 ring-offset-2 ring-offset-slate-950 border-[6px] border-slate-800 flex flex-col overflow-hidden">
            {/* Dynamic Island and Status Bar */}
            <div className="relative w-full bg-white text-slate-900 pt-2 pb-1 px-6 flex items-center justify-between text-[11px] font-semibold select-none shrink-0 z-40 rounded-t-[40px]">
              <span>9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-5 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500/80 animate-ping"></div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]">5G</span>
                {/* Battery icon */}
                <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-800 rounded-xs"></div>
                </div>
              </div>
            </div>

            {/* App viewport viewport container */}
            <div className="relative w-full flex-1 bg-white overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar rounded-b-[40px]">
              {children}
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-500/70 rounded-full pointer-events-none z-50"></div>
          </div>
        ) : (
          /* Full Screen Responsive Layout */
          <div className="w-full max-w-5xl bg-white text-slate-900 min-h-screen shadow-lg flex flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
