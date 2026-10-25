import { CategoryDefinition } from '../types';

export const CATEGORIES_DATA: CategoryDefinition[] = [
  {
    key: 'infrastructure',
    label: 'Public Infrastructure',
    subcategories: [
      {
        key: 'roads_potholes',
        label: 'Roads & Potholes',
        icon: 'road',
        description: 'Damaged asphalt, craters, missing manhole covers, unsafe road surfaces.'
      },
      {
        key: 'water_leakage',
        label: 'Water & Leakage',
        icon: 'droplets',
        description: 'Broken municipal mainlines, drinking water shortage, pipe bursts.'
      },
      {
        key: 'waste_management',
        label: 'Waste Management',
        icon: 'trash-2',
        description: 'Uncollected garbage, overflowing dumpsters, illegal commercial dumping.'
      },
      {
        key: 'streetlights',
        label: 'Streetlights',
        icon: 'lightbulb',
        description: 'Dark streets, broken electrical poles, burnt-out neighborhood lamps.'
      },
      {
        key: 'drainage_sewage',
        label: 'Drainage & Sewage',
        icon: 'waves',
        description: 'Sewage overflow, backed-up gutters, monsoon urban flooding risks.'
      },
      {
        key: 'public_transport',
        label: 'Public Transport',
        icon: 'bus',
        description: 'Broken bus shelters, metro station safety hazards, irregular transit schedules.'
      }
    ]
  },
  {
    key: 'services',
    label: 'Public Services',
    subcategories: [
      {
        key: 'healthcare_education',
        label: 'Healthcare & Education',
        icon: 'cross',
        description: 'Lacking medical supplies, school facility defects, public clinic closures.'
      },
      {
        key: 'pollution',
        label: 'Pollution & Environment',
        icon: 'leaf',
        description: 'Toxic industrial discharge, hazardous smoke, noise code violations.'
      },
      {
        key: 'public_safety',
        label: 'Public Safety',
        icon: 'shield-alert',
        description: 'Missing emergency signage, structurally hazardous bridges, blind intersections.'
      }
    ]
  },
  {
    key: 'governance',
    label: 'Governance & Accountability',
    subcategories: [
      {
        key: 'corruption_misconduct',
        label: 'Corruption & Misconduct',
        icon: 'scale',
        description: 'Bribery demands, misuse of public budget funds, lack of tender transparency.'
      },
      {
        key: 'other',
        label: 'Administrative Misconduct',
        icon: 'file-text',
        description: 'Unanswered formal petitions, unnotified public project stoppages, bureaucratic delays.'
      }
    ]
  },
  {
    key: 'human_rights',
    label: 'Human Rights & Serious Concerns',
    subcategories: [
      {
        key: 'human_rights',
        label: 'Human Rights Concerns',
        icon: 'users',
        description: 'Abuse of official authority, unlawful detainment, speech restrictions, civilian safety threats.'
      }
    ]
  }
];

export const POPULAR_CATEGORY_BUTTONS = [
  { key: 'roads_potholes', label: 'Roads', icon: 'road', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { key: 'water_leakage', label: 'Water', icon: 'droplet', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { key: 'waste_management', label: 'Waste', icon: 'trash-2', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { key: 'public_transport', label: 'Transport', icon: 'bus', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { key: 'streetlights', label: 'Lighting', icon: 'lightbulb', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { key: 'drainage_sewage', label: 'Sewage', icon: 'waves', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { key: 'pollution', label: 'Pollution', icon: 'leaf', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { key: 'healthcare_education', label: 'Health', icon: 'activity', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { key: 'human_rights', label: 'Rights', icon: 'users', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { key: 'corruption_misconduct', label: 'Integrity', icon: 'scale', color: 'bg-slate-100 text-slate-800 border-slate-300' }
];
