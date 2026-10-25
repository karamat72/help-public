import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  ThumbsUp, 
  Globe2, 
  ChevronRight, 
  Layers, 
  ShieldCheck,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ReportItem, CategoryKey } from '../../types';
import { ESCALATION_LEVELS } from '../../data/escalation';
import { COUNTRIES_DATA } from '../../data/countries';

interface GlobalIssuesScreenProps {
  reports: ReportItem[];
  onSelectReport: (report: ReportItem) => void;
  onToggleSupport: (reportId: string) => void;
  initialCategoryFilter?: string;
}

export const GlobalIssuesScreen: React.FC<GlobalIssuesScreenProps> = ({
  reports,
  onSelectReport,
  onToggleSupport,
  initialCategoryFilter
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('ALL');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(initialCategoryFilter || 'ALL');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<number | 'ALL'>('ALL');
  const [selectedMapPinReport, setSelectedMapPinReport] = useState<ReportItem | null>(reports[0] || null);

  // Filtering
  const filteredReports = reports.filter((r) => {
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCountry = selectedCountryFilter === 'ALL' || r.location.countryCode === selectedCountryFilter;
    const matchesCategory = selectedCategoryFilter === 'ALL' || r.subcategory === selectedCategoryFilter || r.category === selectedCategoryFilter;
    const matchesLevel = selectedLevelFilter === 'ALL' || r.currentLevel === selectedLevelFilter;

    return matchesSearch && matchesCountry && matchesCategory && matchesLevel;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-20 select-none">
      {/* Top Header & Segmented Control (matches Screen 7: Map / List tabs) */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 pt-3 pb-2.5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-teal-600" />
            <span>Global Issues Explorer</span>
          </h1>

          {/* Map vs List Tabs */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                viewMode === 'map' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                viewMode === 'list' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Country filter */}
          <select
            value={selectedCountryFilter}
            onChange={(e) => setSelectedCountryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium shrink-0"
          >
            <option value="ALL">All Countries 🌍</option>
            {COUNTRIES_DATA.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>

          {/* Level filter */}
          <select
            value={selectedLevelFilter}
            onChange={(e) => setSelectedLevelFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium shrink-0"
          >
            <option value="ALL">All Escalation Levels</option>
            <option value="1">Level 1: Local</option>
            <option value="2">Level 2: Org</option>
            <option value="3">Level 3: Regional</option>
            <option value="4">Level 4: National</option>
            <option value="5">Level 5: International</option>
          </select>
        </div>
      </div>

      {/* View Mode: MAP (matches Screen 7 World Map with Pins) */}
      {viewMode === 'map' ? (
        <div className="relative flex-1 flex flex-col min-h-[480px] bg-slate-900 overflow-hidden">
          {/* Interactive SVG World Map Canvas */}
          <div className="relative w-full h-[460px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full max-h-[420px] opacity-75 select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified World Continents SVG Outlines */}
              {/* North America */}
              <path
                d="M150 80 Q 220 50 320 90 Q 360 140 280 200 Q 220 220 200 280 Q 180 290 160 250 Q 120 180 150 80 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* South America */}
              <path
                d="M260 270 Q 340 280 320 370 Q 280 460 240 470 Q 220 400 240 330 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Europe */}
              <path
                d="M450 90 Q 540 80 560 140 Q 520 180 460 180 Q 430 140 450 90 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Africa */}
              <path
                d="M460 190 Q 550 180 570 260 Q 550 380 490 390 Q 440 310 440 240 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Asia & Middle East */}
              <path
                d="M560 90 Q 750 70 850 160 Q 820 280 720 280 Q 640 250 560 180 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="1.5"
              />
              {/* Australia */}
              <path
                d="M750 330 Q 850 330 840 410 Q 760 430 740 370 Z"
                fill="#1E293B"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Geo Coordinate Grid lines */}
              <line x1="0" y1="250" x2="1000" y2="250" stroke="#0F172A" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="500" y1="0" x2="500" y2="500" stroke="#0F172A" strokeDasharray="4 4" strokeWidth="1" />
            </svg>

            {/* Simulated Geographic Issue Markers placed across coordinates */}
            {reports.map((report) => {
              // Convert lat/lng to svg x/y
              const lat = report.location.coordinates?.latitude || 0;
              const lng = report.location.coordinates?.longitude || 0;
              // Map projection formula:
              const xPercent = Math.min(95, Math.max(5, ((lng + 180) / 360) * 100));
              const yPercent = Math.min(95, Math.max(5, ((90 - lat) / 180) * 100));
              const isSelected = selectedMapPinReport?.id === report.id;

              return (
                <div
                  key={report.id}
                  style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
                  onClick={() => setSelectedMapPinReport(report)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulsing ring */}
                    <div
                      className={`absolute w-7 h-7 rounded-full animate-ping opacity-75 ${
                        report.currentLevel === 5 ? 'bg-rose-500' : 'bg-teal-500'
                      }`}
                    />
                    {/* Pin button */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg transition-transform group-hover:scale-125 ${
                        isSelected ? 'ring-4 ring-white scale-125' : ''
                      } ${
                        report.currentLevel === 5 ? 'bg-rose-600' :
                        report.currentLevel === 4 ? 'bg-amber-600' :
                        report.currentLevel === 3 ? 'bg-indigo-600' : 'bg-teal-600'
                      }`}
                    >
                      L{report.currentLevel}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Map Legend Overlay */}
            <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-xl p-2.5 text-[10px] text-slate-300 space-y-1 z-30 pointer-events-none">
              <div className="font-bold text-white">Escalation Levels:</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500"></span> Level 1-2: Municipal</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Level 3: Regional</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Level 4: Oversight</div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Level 5: Global</div>
            </div>
          </div>

          {/* Selected Pin Preview Card pinned to the bottom of the map (matches Screen 7 preview card) */}
          {selectedMapPinReport && (
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
              <div className="max-w-lg mx-auto bg-white rounded-xl border border-slate-200 p-3 shadow-md flex items-center justify-between gap-3">
                <div
                  onClick={() => onSelectReport(selectedMapPinReport)}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">
                      {selectedMapPinReport.location.city}, {selectedMapPinReport.location.countryName}
                    </span>
                    <span>·</span>
                    <span className="font-mono text-teal-700 font-bold">#{selectedMapPinReport.id}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                    {selectedMapPinReport.title}
                  </h3>

                  <div className="text-[10px] text-slate-500 capitalize mt-0.5">
                    Status: {selectedMapPinReport.status.replace('_', ' ')} · L{selectedMapPinReport.currentLevel}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleSupport(selectedMapPinReport.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      selectedMapPinReport.hasSupported
                        ? 'bg-teal-700 text-white'
                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                    }`}
                  >
                    Support
                  </button>

                  <button
                    onClick={() => onSelectReport(selectedMapPinReport)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* View Mode: LIST */
        <div className="p-4 max-w-3xl mx-auto w-full space-y-3">
          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredReports.length} worldwide public reports
          </div>

          <div className="space-y-3">
            {filteredReports.map((report) => {
              const levelInfo = ESCALATION_LEVELS[report.currentLevel];
              return (
                <div
                  key={report.id}
                  onClick={() => onSelectReport(report)}
                  className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs hover:border-teal-500 cursor-pointer flex gap-3 transition-all"
                >
                  <img
                    src={report.photos[0]}
                    alt={report.title}
                    className="w-20 h-20 rounded-lg object-cover bg-slate-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        #{report.id}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${levelInfo.bgLight}`}>
                        L{report.currentLevel}: {levelInfo.title}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {report.title}
                    </h3>

                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{report.location.city}, {report.location.countryName}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-500">
                        {report.status.replace('_', ' ')}
                      </span>
                      <div className="flex items-center gap-1 font-bold text-teal-700">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{report.supportCount} Supporters</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
