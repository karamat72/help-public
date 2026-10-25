import React, { useState } from 'react';
import { Building2, Search, ExternalLink, Globe, Phone, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';
import { DIRECTORY_ORGANIZATIONS } from '../../data/organizations';
import { ResponsibleOrganization } from '../../types';

interface OrgDirectoryProps {
  onBack: () => void;
}

export const OrganizationDirectoryScreen: React.FC<OrgDirectoryProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const filtered = DIRECTORY_ORGANIZATIONS.filter((org) => {
    const matchesQuery = 
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.countryCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'ALL' || org.type === selectedType;

    return matchesQuery && matchesType;
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-20 select-none">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900">Organization Directory</h1>
            <p className="text-[10px] text-slate-500">Verified official grievance channels worldwide</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-4">
        {/* Search & Type filter */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search organizations, cities, or ombudsmen..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setSelectedType('ALL')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedType === 'ALL' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({DIRECTORY_ORGANIZATIONS.length})
            </button>
            <button
              onClick={() => setSelectedType('municipal')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedType === 'municipal' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Municipal
            </button>
            <button
              onClick={() => setSelectedType('utility')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedType === 'utility' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Utilities
            </button>
            <button
              onClick={() => setSelectedType('national_ombudsman')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedType === 'national_ombudsman' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Ombudsman
            </button>
            <button
              onClick={() => setSelectedType('international_body')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                selectedType === 'international_body' ? 'bg-teal-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              International
            </button>
          </div>
        </div>

        {/* Directory listings */}
        <div className="space-y-3">
          {filtered.map((org) => (
            <div key={org.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                      {org.countryCode}
                    </span>
                    <span className="text-[10px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded">
                      {org.type.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{org.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Jurisdiction: {org.jurisdiction}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {org.complaintPortalUrl && (
                    <a
                      href={org.complaintPortalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <span>Official Channel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Verified Source info */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Source: {org.evidenceSource || 'Official Government Gazette'}</span>
                </div>
                {org.phone && (
                  <div className="flex items-center gap-1 font-mono text-slate-700">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{org.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
