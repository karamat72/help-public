import React from 'react';
import { X, Bell, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReportId: (reportId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectReportId
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif_1',
      reportId: 'PH-7842',
      title: 'NYC DOT Dispatched Work Order',
      description: 'Your report #PH-7842 (Road Damage) was prioritized for repair crew dispatch.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 'notif_2',
      reportId: 'PH-4219',
      title: 'Escalation to Level 3 Recorded',
      description: 'Complaint #PH-4219 in Lahore was escalated to Punjab Urban Development Ministry.',
      time: 'Yesterday',
      unread: true
    },
    {
      id: 'notif_3',
      reportId: 'PH-1104',
      title: 'Global Awareness Campaign Reached 2,800 Signatures',
      description: 'The Pinheiros River water security campaign gained 400 new international supporters.',
      time: '2 days ago',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl max-h-[80vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">Notifications & Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 divide-y divide-slate-100 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onSelectReportId(n.reportId);
                onClose();
              }}
              className={`p-3 rounded-xl cursor-pointer transition-colors ${
                n.unread ? 'bg-teal-50/60 hover:bg-teal-50' : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[10px] font-bold text-teal-800">
                  #{n.reportId}
                </span>
                <span className="text-[10px] text-slate-500">{n.time}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">{n.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
