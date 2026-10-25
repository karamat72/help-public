import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, AlertTriangle, Check, X, Search, FileText } from 'lucide-react';
import { ReportItem, VerificationTag } from '../../types';

interface AdminModerationScreenProps {
  reports: ReportItem[];
  onBack: () => void;
  onUpdateVerification: (reportId: string, newTag: VerificationTag) => void;
  onFlagReport: (reportId: string, flagged: boolean) => void;
}

export const AdminModerationScreen: React.FC<AdminModerationScreenProps> = ({
  reports,
  onBack,
  onUpdateVerification,
  onFlagReport
}) => {
  const [filter, setFilter] = useState<'all' | 'unverified' | 'flagged'>('all');

  const filtered = reports.filter((r) => {
    if (filter === 'unverified') return r.verificationTag === 'user_allegation';
    if (filter === 'flagged') return r.isFlagged;
    return true;
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
            <h1 className="text-base font-bold text-slate-900">Admin Moderation Console</h1>
            <p className="text-[10px] text-slate-500">Review factual standards, duplicates & verification</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-4">
        {/* Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
              filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            All Reports ({reports.length})
          </button>
          <button
            onClick={() => setFilter('unverified')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${
              filter === 'unverified' ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Pending Verification
          </button>
        </div>

        {/* List of items */}
        <div className="space-y-3">
          {filtered.map((report) => (
            <div key={report.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-2xs">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-800">#{report.id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                      {report.location.city}, {report.location.countryCode}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200">
                      {report.verificationTag.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{report.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{report.description}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onUpdateVerification(report.id, 'officially_acknowledged')}
                    className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                    title="Mark Officially Acknowledged"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Verify</span>
                  </button>

                  <button
                    onClick={() => onFlagReport(report.id, !report.isFlagged)}
                    className={`px-2.5 py-1.5 font-bold text-xs rounded-lg flex items-center gap-1 border ${
                      report.isFlagged
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{report.isFlagged ? 'Flagged' : 'Flag'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Reporter: {report.reporterName}</span>
                <span>Ref: {report.officialReferenceNumber || 'None'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
