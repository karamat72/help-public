import React, { useState } from 'react';
import { 
  Search, 
  PlusCircle, 
  Compass, 
  MapPin, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  ThumbsUp, 
  Clock, 
  AlertTriangle,
  Building2,
  Share2,
  ChevronRight
} from 'lucide-react';
import { ReportItem, UserAccount, ActiveScreen, SubCategoryKey } from '../../types';
import { POPULAR_CATEGORY_BUTTONS } from '../../data/categories';
import { ESCALATION_LEVELS } from '../../data/escalation';
import { CountryData } from '../../data/countries';

interface HomeScreenProps {
  currentUser: UserAccount;
  reports: ReportItem[];
  selectedCountry: CountryData;
  onNavigate: (screen: ActiveScreen) => void;
  onSelectReport: (report: ReportItem) => void;
  onSelectCategoryFilter: (categoryKey: string) => void;
  onToggleSupport: (reportId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  reports,
  selectedCountry,
  onNavigate,
  onSelectReport,
  onSelectCategoryFilter,
  onToggleSupport
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter reports by search or selected country (or all if worldwide)
  const filteredReports = reports.filter((r) => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-20 select-none">
      {/* Top Hero Section (White card background with greeting) */}
      <div className="bg-white px-5 pt-5 pb-6 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Greeting */}
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Hello, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Together we can make a difference in {selectedCountry.name} and worldwide.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search issues, locations, #PH-7842..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Dual Action Buttons (matches Screen 4 of mockup) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => onNavigate('report_problem')}
              className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.2]" />
              <span>Report Issue</span>
            </button>

            <button
              onClick={() => onNavigate('global_issues')}
              className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <Compass className="w-4 h-4 text-slate-600" />
              <span>Explore</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popular Categories Grid (matches design mockup icon badges) */}
      <div className="px-5 py-4 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Popular Categories
            </h2>
            <button
              onClick={() => onNavigate('global_issues')}
              className="text-[11px] font-semibold text-teal-700 hover:underline"
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
            {POPULAR_CATEGORY_BUTTONS.slice(0, 5).map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  onSelectCategoryFilter(cat.key);
                  onNavigate('global_issues');
                }}
                className="flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-105 active:scale-95 ${cat.color}`}>
                  <span className="text-lg font-bold">
                    {cat.key === 'roads_potholes' && '▲'}
                    {cat.key === 'water_leakage' && '💧'}
                    {cat.key === 'waste_management' && '🗑️'}
                    {cat.key === 'public_transport' && '🚌'}
                    {cat.key === 'streetlights' && '💡'}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-700 mt-1.5 truncate max-w-[64px]">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5-Level Escalation Banner (Visual teaser from design) */}
      <div className="px-5 py-3 bg-gradient-to-r from-slate-900 to-teal-950 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold text-xs">
              5L
            </div>
            <div>
              <div className="text-xs font-bold text-white">Local to Global Escalation</div>
              <div className="text-[10px] text-teal-200/80">From neighborhood complaint to international oversight</div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('escalation_center')}
            className="text-[11px] bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3 py-1 rounded-lg transition-colors flex items-center gap-1"
          >
            <span>Ladder</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Community Reports Feed */}
      <div className="p-5 max-w-4xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Community Reports
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {filteredReports.length} Active
          </span>
        </div>

        {/* Reports Card List */}
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const levelInfo = ESCALATION_LEVELS[report.currentLevel];
            return (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Photo & Level Header */}
                <div className="relative h-44 sm:h-52 bg-slate-100 overflow-hidden">
                  <img
                    src={report.photos[0]}
                    alt={report.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Top Bar inside image */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm text-white font-mono text-[11px] font-bold">
                      #{report.id}
                    </span>

                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${levelInfo.bgLight}`}>
                      Level {report.currentLevel}: {levelInfo.title}
                    </span>
                  </div>

                  {/* Verification disclaimer badge */}
                  <div className="absolute bottom-2 left-2.5 bg-slate-900/80 backdrop-blur-sm text-slate-200 px-2 py-0.5 rounded text-[10px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    <span>{report.verificationTag.replace('_', ' ')}</span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700 truncate">
                      {report.location.city}, {report.location.countryName}
                    </span>
                    <span>·</span>
                    <span className="truncate">{report.location.locality}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {report.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {report.description}
                  </p>

                  {/* Responsible Organization Callout */}
                  {report.responsibleOrg && (
                    <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-medium text-slate-800 truncate">
                        Assigned: {report.responsibleOrg.name}
                      </span>
                    </div>
                  )}

                  {/* Footer actions: Support counter, Status, Details chevron */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSupport(report.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          report.hasSupported
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{report.supportCount}</span>
                      </button>

                      <span className="text-[10px] text-slate-500">
                        {report.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-800">
                      <span>Track Progress</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
