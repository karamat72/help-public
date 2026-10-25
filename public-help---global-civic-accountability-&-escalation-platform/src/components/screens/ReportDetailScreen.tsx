import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ThumbsUp, 
  Share2, 
  ShieldCheck, 
  Clock, 
  Building2, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Send,
  Lock,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { ReportItem, UserAccount, EscalationLevelNumber } from '../../types';
import { ESCALATION_LEVELS } from '../../data/escalation';

interface ReportDetailScreenProps {
  report: ReportItem;
  currentUser: UserAccount;
  onBack: () => void;
  onToggleSupport: (reportId: string) => void;
  onEscalateReport: (reportId: string, targetLevel: EscalationLevelNumber, note: string) => void;
  onAddResponseRecord: (reportId: string, referenceNo: string, responseNote: string) => void;
}

export const ReportDetailScreen: React.FC<ReportDetailScreenProps> = ({
  report,
  currentUser,
  onBack,
  onToggleSupport,
  onEscalateReport,
  onAddResponseRecord
}) => {
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showRefModal, setShowRefModal] = useState(false);
  const [escalateNote, setEscalateNote] = useState('');
  const [customRefNo, setCustomRefNo] = useState(report.officialReferenceNumber || '');
  const [responseNote, setResponseNote] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const levelInfo = ESCALATION_LEVELS[report.currentLevel];
  const nextLevel = Math.min(5, report.currentLevel + 1) as EscalationLevelNumber;
  const nextLevelInfo = ESCALATION_LEVELS[nextLevel];

  // Stepper milestones
  const steps = [
    { title: 'Submitted', date: report.dateReported, done: true },
    { title: 'Under Review', date: report.updatedAt, done: ['under_review', 'in_progress', 'resolved', 'escalated'].includes(report.status) },
    { title: 'In Progress', date: 'Active Work Order', done: ['in_progress', 'resolved', 'escalated'].includes(report.status) },
    { title: 'Resolved / Escalated', date: 'Final Outcome', done: report.status === 'resolved' || report.currentLevel >= 3 }
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleConfirmEscalate = () => {
    if (report.currentLevel < 5) {
      onEscalateReport(report.id, nextLevel, escalateNote || `Escalated by ${currentUser.name} to ${nextLevelInfo.title}`);
      setShowEscalateModal(false);
      setEscalateNote('');
    }
  };

  const handleConfirmAddRef = () => {
    onAddResponseRecord(report.id, customRefNo, responseNote);
    setShowRefModal(false);
    setResponseNote('');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-20 select-none">
      {/* Header (matches Screen 6: "<- Track a Report") */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-mono font-bold text-teal-700 block">
              REPORT ID: #{report.id}
            </span>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">
              Track a Report
            </h1>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="p-2 text-slate-600 hover:text-teal-700 rounded-full hover:bg-slate-100 transition-colors"
          title="Share Report Link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {copiedLink && (
        <div className="bg-teal-600 text-white text-xs py-1.5 px-4 text-center font-medium animate-in fade-in">
          Official report link copied to clipboard!
        </div>
      )}

      {/* Main Track Container */}
      <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full space-y-4">
        {/* Card: Title, Location & Level Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-md text-slate-800">
              #{report.id}
            </span>

            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${levelInfo.bgLight}`}>
              Level {report.currentLevel}: {levelInfo.title}
            </span>
          </div>

          <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
            {report.title}
          </h2>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="font-semibold text-slate-700">
              {report.location.city}, {report.location.countryName}
            </span>
            <span>·</span>
            <span className="truncate">{report.location.address || report.location.locality}</span>
          </div>

          {/* Allegation / Verification disclaimer */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-semibold text-slate-800">Verification Status: </span>
              {report.verificationTag === 'user_allegation' && 'User-Reported Allegation (pending official response).'}
              {report.verificationTag === 'community_corroborated' && 'Corroborated by verified community residents.'}
              {report.verificationTag === 'officially_acknowledged' && 'Officially acknowledged by public agency dispatch.'}
              {report.verificationTag === 'verified_investigation' && 'Verified via independent civic oversight audit.'}
            </div>
          </div>
        </div>

        {/* Stepper Timeline (matches Screen 6 Stepper: Submitted -> Under Review -> In Progress -> Resolved) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Resolution Progress Stepper
          </h3>

          <div className="space-y-4 pt-1">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 relative">
                {/* Vertical connector line */}
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute left-3 top-5 w-0.5 h-10 ${
                      step.done ? 'bg-teal-500' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Circle marker */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                    step.done
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-400 border border-slate-300'
                  }`}
                >
                  {step.done ? '✓' : idx + 1}
                </div>

                <div className="flex-1 -mt-0.5">
                  <div className="text-xs font-bold text-slate-900">{step.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {step.date.includes('T') ? new Date(step.date).toLocaleDateString() + ' ' + new Date(step.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : step.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Evidence Gallery */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Photographic Evidence
          </h3>

          <div className="rounded-xl overflow-hidden border border-slate-200 aspect-video max-h-72">
            <img
              src={report.photos[0]}
              alt={report.title}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            {report.description}
          </p>

          {report.documents && report.documents.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 block">Supporting Documents:</span>
              {report.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 text-slate-800">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span className="font-medium truncate max-w-xs">{doc.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{doc.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Responsible Organization & Official Reference */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Target Responsible Organization</span>
            </h3>
            {report.officialReferenceNumber && (
              <span className="text-[10px] font-mono bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold border border-teal-200">
                Ref: {report.officialReferenceNumber}
              </span>
            )}
          </div>

          {report.responsibleOrg ? (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <div className="font-bold text-slate-900 text-sm">
                {report.responsibleOrg.name}
              </div>
              <div className="text-slate-500">
                Jurisdiction: {report.responsibleOrg.jurisdiction}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {report.responsibleOrg.officialWebsite && (
                  <a
                    href={report.responsibleOrg.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-teal-700 hover:underline font-medium text-[11px]"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {report.responsibleOrg.complaintPortalUrl && (
                  <a
                    href={report.responsibleOrg.complaintPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-teal-600 text-white rounded-md text-[11px] font-bold hover:bg-teal-700"
                  >
                    <span>File Direct Grievance</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No official agency assigned yet.</p>
          )}

          {/* Record Official Response button */}
          <button
            onClick={() => setShowRefModal(true)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Record Official Response / Reference ID</span>
          </button>
        </div>

        {/* Multi-Level Escalation History */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Escalation Audit Timeline
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              {report.escalationHistory.length} Events
            </span>
          </div>

          <div className="space-y-3">
            {report.escalationHistory.map((item) => {
              const itemLevel = ESCALATION_LEVELS[item.level];
              return (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${itemLevel.bgLight}`}>
                      Level {item.level}: {itemLevel.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 pt-0.5">{item.title}</div>
                  <p className="text-[11px] text-slate-600">{item.description}</p>
                  {item.referenceNumber && (
                    <div className="text-[10px] font-mono text-teal-800 pt-0.5">
                      Statutory Reference: {item.referenceNumber}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Trigger Next Escalation Level */}
          {report.currentLevel < 5 && (
            <div className="pt-2">
              <button
                onClick={() => setShowEscalateModal(true)}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                <span>
                  Escalate to Level {nextLevel}: {nextLevelInfo.title}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Actions: Support & Share */}
        <div className="pt-2 flex items-center gap-3">
          <button
            onClick={() => onToggleSupport(report.id)}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors ${
              report.hasSupported
                ? 'bg-teal-700 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>
              {report.hasSupported ? 'Supported' : 'Support Issue'} ({report.supportCount})
            </span>
          </button>

          <button
            onClick={handleShare}
            className="py-3 px-4 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Escalation Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Escalate to Level {nextLevel}: {nextLevelInfo.title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {nextLevelInfo.description}
            </p>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Factual Justification for Escalation:
              </label>
              <textarea
                rows={3}
                value={escalateNote}
                onChange={(e) => setEscalateNote(e.target.value)}
                placeholder="Detail why previous response window elapsed without remediation..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowEscalateModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmEscalate}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm"
              >
                Confirm Escalation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Record Reference Modal */}
      {showRefModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              Record Official Response or Ticket ID
            </h3>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Official Reference / Case Number:
              </label>
              <input
                type="text"
                value={customRefNo}
                onChange={(e) => setCustomRefNo(e.target.value)}
                placeholder="e.g. 311-NYC-8849201"
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Agency Response Notes:
              </label>
              <textarea
                rows={3}
                value={responseNote}
                onChange={(e) => setResponseNote(e.target.value)}
                placeholder="Copy agency reply email, work order date, or inspection verdict..."
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRefModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAddRef}
                className="px-4 py-2 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-sm"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
