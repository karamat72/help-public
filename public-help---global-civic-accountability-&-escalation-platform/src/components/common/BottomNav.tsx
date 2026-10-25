import React from 'react';
import { ActiveScreen } from '../../types';
import { Home, Compass, PlusCircle, ShieldAlert, User } from 'lucide-react';

interface BottomNavProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { key: 'home' as ActiveScreen, label: 'Home', icon: Home },
    { key: 'global_issues' as ActiveScreen, label: 'Explore', icon: Compass },
    { key: 'report_problem' as ActiveScreen, label: 'Report', icon: PlusCircle, isPrimary: true },
    { key: 'escalation_center' as ActiveScreen, label: 'Escalate', icon: ShieldAlert },
    { key: 'profile' as ActiveScreen, label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 max-w-lg mx-auto md:max-w-none md:w-full">
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.key || 
            (item.key === 'report_problem' && activeScreen === 'report_problem') ||
            (item.key === 'escalation_center' && (activeScreen === 'escalation_center' || activeScreen === 'report_detail')) ||
            (item.key === 'global_issues' && (activeScreen === 'global_issues' || activeScreen === 'org_directory'));

          if (item.isPrimary) {
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="flex flex-col items-center justify-center -mt-5 group"
                aria-label="Report New Issue"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-700 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-600/30 group-hover:scale-105 active:scale-95 transition-transform border-2 border-white">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-semibold text-teal-800 mt-1">
                  Report
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] ${
                isActive ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4] text-teal-600' : 'stroke-[1.8]'}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-semibold text-teal-700' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
