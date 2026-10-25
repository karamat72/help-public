import { EscalationLevelInfo } from '../types';

export const ESCALATION_LEVELS: Record<1 | 2 | 3 | 4 | 5, EscalationLevelInfo> = {
  1: {
    level: 1,
    title: 'Local Report',
    subtitle: 'Neighborhood & Community Notification',
    color: '#0D9488', // Teal
    bgLight: 'bg-teal-50 text-teal-800 border-teal-200',
    borderColor: 'border-teal-500',
    description: 'Document the issue in your area with precise photos, time stamps, and street coordinates.'
  },
  2: {
    level: 2,
    title: 'Responsible Organization',
    subtitle: 'Direct Municipal or Utility Grievance',
    color: '#0F766E', // Dark Teal
    bgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'border-emerald-600',
    description: 'Directly file or link with the primary municipal authority or service operator via official channel.'
  },
  3: {
    level: 3,
    title: 'Regional Authority',
    subtitle: 'Provincial / State / County Escalation',
    color: '#4338CA', // Indigo
    bgLight: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    borderColor: 'border-indigo-600',
    description: 'Escalate to regional or provincial governing departments if the primary provider remains unresponsive.'
  },
  4: {
    level: 4,
    title: 'National Authority / Oversight',
    subtitle: 'Statutory Ombudsman & Federal Regulators',
    color: '#D97706', // Amber
    bgLight: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'border-amber-600',
    description: 'Formally engage national ombudsman offices, regulatory audit watchdogs, or judicial oversight tribunals.'
  },
  5: {
    level: 5,
    title: 'International Awareness',
    subtitle: 'Global Public Interest & Treaty Bodies',
    color: '#E11D48', // Rose Red
    bgLight: 'bg-rose-50 text-rose-800 border-rose-200',
    borderColor: 'border-rose-600',
    description: 'Mobilize verified global civic awareness, international NGO attention, and multilateral reporting bodies.'
  }
};
