import React, { useState } from 'react';
import { CountryData, COUNTRIES_DATA } from '../../data/countries';
import { Search, X, Check, MapPin, Globe } from 'lucide-react';

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: CountryData;
  onSelectCountry: (country: CountryData) => void;
}

export const CountrySelectorModal: React.FC<CountrySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredCountries = COUNTRIES_DATA.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.regions.some(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Top Handle for mobile */}
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden"></div>

        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-base">Select Country & Jurisdiction</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-slate-100 bg-slate-50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country, province, state..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Country list */}
        <div className="overflow-y-auto p-3 space-y-1.5 divide-y divide-slate-100">
          {filteredCountries.map((c) => {
            const isSelected = c.code === selectedCountry.code;
            return (
              <button
                key={c.code}
                onClick={() => {
                  onSelectCountry(c);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors ${
                  isSelected ? 'bg-teal-50/80 border border-teal-200' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                      <span>{c.name}</span>
                      <span className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {c.code}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{c.regions.length} {c.regionLabel}s configured</span>
                      <span>·</span>
                      <span>Calling: {c.phoneCode}</span>
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <Check className="w-5 h-5 text-teal-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Global coverage: All sovereign territories supported.</span>
          <button
            onClick={onClose}
            className="text-teal-700 font-semibold hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
