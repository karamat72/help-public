import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  ThumbsUp, 
  Bell, 
  Settings, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Globe2, 
  CheckCircle,
  ExternalLink,
  ShieldAlert,
  Sliders
} from 'lucide-react';
import { UserAccount, ActiveScreen, AppLanguage, ReportItem } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/translations';

interface ProfileScreenProps {
  currentUser: UserAccount;
  userReports: ReportItem[];
  supportedReports: ReportItem[];
  language: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
  onNavigate: (screen: ActiveScreen) => void;
  onSelectReport: (report: ReportItem) => void;
  onOpenPrivacyCenter: () => void;
  onOpenAdminDashboard: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  currentUser,
  userReports,
  supportedReports,
  language,
  onChangeLanguage,
  onNavigate,
  onSelectReport,
  onOpenPrivacyCenter,
  onOpenAdminDashboard,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'my_reports' | 'supported'>('menu');

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-20 select-none">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-base font-bold text-slate-900">My Profile</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-200">
          Verified Civic ID
        </span>
      </div>

      <div className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-4">
        {/* User Card (matches Screen 8 avatar & name) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col items-center text-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-slate-900 text-white font-extrabold text-2xl flex items-center justify-center ring-4 ring-teal-500/20 mb-3">
            {currentUser.name.slice(0, 1)}
          </div>

          <h2 className="text-lg font-bold text-slate-900">{currentUser.name}</h2>
          <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium capitalize">
              Role: {currentUser.role.replace('_', ' ')}
            </span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-medium">
              Location: {currentUser.country}
            </span>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 w-full mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('my_reports')}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-500 transition-colors text-center"
            >
              <span className="text-xl font-bold text-slate-900 block font-mono">
                {userReports.length}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">My Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('supported')}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-teal-500 transition-colors text-center"
            >
              <span className="text-xl font-bold text-slate-900 block font-mono">
                {supportedReports.length}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Supported Issues</span>
            </button>
          </div>
        </div>

        {/* Tab view for My Reports or Supported Issues */}
        {activeTab === 'my_reports' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                My Filed Reports ({userReports.length})
              </h3>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs text-teal-700 font-semibold"
              >
                Back to Menu
              </button>
            </div>

            {userReports.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">You have not submitted any reports yet.</p>
            ) : (
              <div className="space-y-2">
                {userReports.map((rep) => (
                  <div
                    key={rep.id}
                    onClick={() => onSelectReport(rep)}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 truncate max-w-xs">{rep.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        #{rep.id} · Level {rep.currentLevel} · {rep.location.city}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'supported' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Supported Community Issues ({supportedReports.length})
              </h3>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs text-teal-700 font-semibold"
              >
                Back to Menu
              </button>
            </div>

            {supportedReports.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No supported issues yet.</p>
            ) : (
              <div className="space-y-2">
                {supportedReports.map((rep) => (
                  <div
                    key={rep.id}
                    onClick={() => onSelectReport(rep)}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 truncate max-w-xs">{rep.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        #{rep.id} · {rep.supportCount} supporters
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Menu Navigation Rows (matches Screen 8: My Reports, Supported Issues, Notifications, Settings, Help & Support, Log Out) */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            <button
              onClick={() => setActiveTab('my_reports')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-500" />
                <span className="text-xs font-semibold text-slate-800">My Reports</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveTab('supported')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <ThumbsUp className="w-5 h-5 text-slate-500" />
                <span className="text-xs font-semibold text-slate-800">Supported Issues</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={onOpenPrivacyCenter}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Privacy & Safety Center</span>
                  <span className="text-[10px] text-slate-500">Whistleblower protection & risk advisories</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={onOpenAdminDashboard}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-teal-600" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Admin Moderation Dashboard</span>
                  <span className="text-[10px] text-slate-500">Duplicate detection & verification audits</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Language Selector row */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe2 className="w-5 h-5 text-slate-500" />
                <span className="text-xs font-semibold text-slate-800">Language / زَبان</span>
              </div>
              <select
                value={language}
                onChange={(e) => onChangeLanguage(e.target.value as AppLanguage)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Log Out button in Red */}
            <button
              onClick={onLogout}
              className="w-full p-4 flex items-center justify-center gap-2 text-rose-600 hover:bg-rose-50/50 font-bold text-xs transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
