import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Layers, 
  TrendingUp, 
  Building2, 
  Globe2, 
  FileText, 
  CheckCircle2, 
  Users, 
  ArrowRight,
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';
import { ReportItem, AwarenessCampaign } from '../../types';
import { ESCALATION_LEVELS } from '../../data/escalation';
import { SAMPLE_CAMPAIGNS } from '../../data/sampleReports';

interface EscalationCenterScreenProps {
  reports: ReportItem[];
  onSelectReport: (report: ReportItem) => void;
  onNavigateToOrgDirectory: () => void;
}

export const EscalationCenterScreen: React.FC<EscalationCenterScreenProps> = ({
  reports,
  onSelectReport,
  onNavigateToOrgDirectory
}) => {
  const [selectedLevelTab, setSelectedLevelTab] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [campaigns, setCampaigns] = useState<AwarenessCampaign[]>(SAMPLE_CAMPAIGNS);
  const [supportedCampaignIds, setSupportedCampaignIds] = useState<string[]>([]);
  const [generatedDossier, setGeneratedDossier] = useState<string | null>(null);

  const handleSupportCampaign = (campId: string) => {
    if (supportedCampaignIds.includes(campId)) {
      setSupportedCampaignIds(supportedCampaignIds.filter(id => id !== campId));
      setCampaigns(campaigns.map(c => c.id === campId ? { ...c, currentCount: c.currentCount - 1 } : c));
    } else {
      setSupportedCampaignIds([...supportedCampaignIds, campId]);
      setCampaigns(campaigns.map(c => c.id === campId ? { ...c, currentCount: c.currentCount + 1 } : c));
    }
  };

  const handleGenerateDossier = (report: ReportItem) => {
    const text = `PUBLIC HELP CIVIC ESCALATION DOSSIER
Case ID: #${report.id}
Jurisdiction: ${report.location.city}, ${report.location.region}, ${report.location.countryName}
Issue Category: ${report.category} (${report.subcategory})
Current Escalation Stage: Level ${report.currentLevel} - ${ESCALATION_LEVELS[report.currentLevel].title}
Reported Date: ${report.dateReported}
Statutory Reference: ${report.officialReferenceNumber || 'PENDING_AGENCY_DISPATCH'}

SUMMARY OF COMPLAINT:
${report.description}

EVIDENCE AUDIT LOG:
- Photographic records verified: ${report.photos.length} files attached.
- Community corroboration count: ${report.supportCount} verified residents.
- Target Oversight Authority: ${report.responsibleOrg?.name || 'Local Municipal Council'}

SUBMISSION CERTIFICATE:
Generated via Public Help International Civic Network.
https://publichelp.org/case/${report.id}`;
    setGeneratedDossier(text);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-20 select-none">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-teal-600" />
          <h1 className="text-base font-bold text-slate-900">Complaint Escalation Center</h1>
        </div>
        <button
          onClick={onNavigateToOrgDirectory}
          className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg hover:bg-teal-100 flex items-center gap-1 border border-teal-200"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Org Directory</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* The 5-Level Escalation Ladder Panel (directly replicates the infographic layout) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div>
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest block">
              Multi-Tier Framework
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Local to Global Escalation
            </h2>
            <p className="text-xs text-slate-500">
              Structured progressive channels to resolve grievances when primary departments lapse.
            </p>
          </div>

          <div className="space-y-2.5">
            {([1, 2, 3, 4, 5] as const).map((lvl) => {
              const info = ESCALATION_LEVELS[lvl];
              const isSelected = selectedLevelTab === lvl;
              const matchingReports = reports.filter(r => r.currentLevel === lvl);

              return (
                <div
                  key={lvl}
                  onClick={() => setSelectedLevelTab(lvl)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected ? 'ring-2 ring-teal-500 bg-white shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold text-white"
                        style={{ backgroundColor: info.color }}
                      >
                        {lvl}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span>Level {lvl}: {info.title}</span>
                          <span className="text-[10px] font-mono text-slate-500 font-normal">
                            ({matchingReports.length} Active Cases)
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">{info.subtitle}</div>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-teal-600' : 'text-slate-400'}`} />
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-600 space-y-2 animate-in fade-in">
                      <p className="leading-relaxed">{info.description}</p>
                      
                      {/* Cases at this level */}
                      <div className="pt-1">
                        <span className="text-[11px] font-bold text-slate-800 block mb-1">
                          Reports Currently at Level {lvl}:
                        </span>
                        <div className="space-y-1.5">
                          {matchingReports.slice(0, 3).map((r) => (
                            <div
                              key={r.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectReport(r);
                              }}
                              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-teal-500 flex items-center justify-between transition-colors"
                            >
                              <div className="truncate max-w-xs">
                                <span className="font-mono font-bold text-teal-700">#{r.id}</span>
                                <span className="text-slate-800 ml-2 font-medium">{r.title}</span>
                              </div>
                              <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                                {r.location.countryCode}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* International Awareness Campaigns Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest block">
                Level 5 In Action
              </span>
              <h2 className="text-base font-extrabold text-slate-900">
                International Awareness Campaigns
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">{campaigns.length} Active</span>
          </div>

          <div className="space-y-3">
            {campaigns.map((camp) => {
              const pct = Math.min(100, Math.round((camp.currentCount / camp.targetCount) * 100));
              const isSupported = supportedCampaignIds.includes(camp.id);

              return (
                <div key={camp.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                          {camp.country}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Ref: #{camp.reportId}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {camp.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {camp.cause}
                      </p>
                    </div>

                    <button
                      onClick={() => handleSupportCampaign(camp.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                        isSupported
                          ? 'bg-rose-700 text-white'
                          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                      }`}
                    >
                      {isSupported ? 'Signed ✓' : 'Sign & Support'}
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                      <span>{camp.currentCount.toLocaleString()} Citizens Supported</span>
                      <span>Target: {camp.targetCount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* Target oversight bodies */}
                  <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-700">Target Bodies:</span>
                    {camp.targetBodies.map((b, i) => (
                      <span key={i} className="bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Civic Dossier Generator Tool */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Official Evidence Dossier Generator
            </h3>
          </div>
          <p className="text-xs text-slate-600">
            Generate a formal, tamper-evident submission dossier for submission to municipal ombudsmen or human rights bodies.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {reports.slice(0, 3).map((r) => (
              <button
                key={r.id}
                onClick={() => handleGenerateDossier(r)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-colors"
              >
                Generate for #{r.id}
              </button>
            ))}
          </div>

          {generatedDossier && (
            <div className="mt-3 p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl relative overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-xs">
                <span>Official Factual Dossier Export</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(generatedDossier);
                    alert('Dossier copied to clipboard for official filing!');
                  }}
                  className="px-2 py-0.5 bg-teal-600 text-white rounded text-[10px] font-sans font-bold"
                >
                  Copy Text
                </button>
              </div>
              {generatedDossier}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
