import { ReportItem, AwarenessCampaign } from '../types';
import { DIRECTORY_ORGANIZATIONS } from './organizations';

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'PH-7842',
    title: 'Severe Asphalt Pothole Hazard on Major Transit Corridor',
    description: 'Deep road crater in middle lane near pedestrian crossing causing dangerous vehicle swerves, tire damage, and bicyclist hazard. Municipal street maintenance has not responded for 14 days.',
    category: 'infrastructure',
    subcategory: 'roads_potholes',
    location: {
      countryCode: 'US',
      countryName: 'United States',
      region: 'New York',
      district: 'New York County (Manhattan)',
      city: 'New York',
      locality: 'Lower East Side, Grand St & Essex',
      address: '280 Grand Street, New York, NY 10002',
      coordinates: { latitude: 40.7163, longitude: -73.9898 }
    },
    photos: [
      '/src/assets/images/report_road_pothole_1792912377784.jpg'
    ],
    documents: [
      { name: 'Community_Safety_Inspection_Log.pdf', url: '#', size: '1.2 MB' },
      { name: 'Photo_Exif_Coordinates_Verification.txt', url: '#', size: '24 KB' }
    ],
    dateReported: '2026-04-12T10:24:00Z',
    updatedAt: '2026-04-13T09:30:00Z',
    status: 'in_progress',
    currentLevel: 2,
    responsibleOrg: DIRECTORY_ORGANIZATIONS[0], // NYC DOT
    officialReferenceNumber: 'DOT-NYC-311-8849201',
    verificationTag: 'officially_acknowledged',
    supportCount: 142,
    hasSupported: false,
    isAnonymous: false,
    isSensitive: false,
    reporterId: 'user_alex',
    reporterName: 'Alex Johnson',
    escalationHistory: [
      {
        id: 'esc_1',
        level: 1,
        date: '2026-04-12T10:24:00Z',
        title: 'Report Filed by Citizen',
        description: 'Initial report submitted with geo-tagged photographic evidence.',
        actorRole: 'Citizen Reporter'
      },
      {
        id: 'esc_2',
        level: 1,
        date: '2026-04-12T14:15:00Z',
        title: 'Community Corroboration',
        description: '18 verified neighborhood residents confirmed road hazard.',
        actorRole: 'Community Verification'
      },
      {
        id: 'esc_3',
        level: 2,
        date: '2026-04-13T09:30:00Z',
        title: 'Escalated to NYC DOT (Level 2)',
        description: 'Formal ticket generated in NYC 311. Work order dispatched for asphalt crew.',
        organizationName: 'NYC Department of Transportation',
        referenceNumber: 'DOT-NYC-311-8849201',
        responseSummary: 'Work order #7712 assigned to Manhattan Highway Repair Depot.',
        actorRole: 'Municipal Authority'
      }
    ],
    responseRecords: [
      {
        date: '2026-04-13T11:00:00Z',
        fromOrg: 'NYC Department of Transportation',
        content: 'Service request DOT-NYC-311-8849201 has been prioritized for inspection within 48 business hours.',
        isOfficial: true
      }
    ]
  },
  {
    id: 'PH-4219',
    title: 'High-Pressure Clean Drinking Water Pipeline Rupture',
    description: 'Subterranean municipal drinking water pipe burst along main road shoulder. Clean drinking water flooding street pavement for over 36 hours while adjacent blocks experience zero water pressure.',
    category: 'infrastructure',
    subcategory: 'water_leakage',
    location: {
      countryCode: 'PK',
      countryName: 'Pakistan',
      region: 'Punjab',
      district: 'Lahore',
      city: 'Lahore',
      locality: 'Gulberg III, Near Ghalib Market',
      address: 'Main Boulevard Gulberg, Lahore, Punjab 54660',
      coordinates: { latitude: 31.5204, longitude: 74.3587 }
    },
    photos: [
      '/src/assets/images/report_water_leak_1792912390671.jpg'
    ],
    documents: [
      { name: 'Water_Supply_Loss_Estimation.pdf', url: '#', size: '2.4 MB' }
    ],
    dateReported: '2026-04-10T08:15:00Z',
    updatedAt: '2026-04-13T14:00:00Z',
    status: 'escalated',
    currentLevel: 3,
    responsibleOrg: DIRECTORY_ORGANIZATIONS[5], // WASA Lahore
    officialReferenceNumber: 'WASA-LHR-2026-9041',
    verificationTag: 'community_corroborated',
    supportCount: 489,
    hasSupported: true,
    isAnonymous: false,
    isSensitive: false,
    reporterId: 'user_tariq',
    reporterName: 'Tariq Mehmood',
    escalationHistory: [
      {
        id: 'pk_esc_1',
        level: 1,
        date: '2026-04-10T08:15:00Z',
        title: 'Local Community Alert Submitted',
        description: 'Resident report of severe drinking water wastage and road subsidence.',
        actorRole: 'Local Community'
      },
      {
        id: 'pk_esc_2',
        level: 2,
        date: '2026-04-11T10:00:00Z',
        title: 'Submitted to WASA Complaint Cell',
        description: 'Complaint registered at 1334 helpline. Reference WASA-LHR-2026-9041.',
        organizationName: 'Water and Sanitation Agency Lahore',
        referenceNumber: 'WASA-LHR-2026-9041',
        actorRole: 'Service Operator'
      },
      {
        id: 'pk_esc_3',
        level: 3,
        date: '2026-04-13T14:00:00Z',
        title: 'Escalated to Punjab Housing Department (Level 3)',
        description: 'Escalated to Secretary Housing & Urban Development after local division failed to isolate valve in 48h.',
        organizationName: 'Government of Punjab Urban Development',
        actorRole: 'Civic Monitor'
      }
    ]
  },
  {
    id: 'PH-5820',
    title: 'Leaning Damaged Streetlight Lantern with Broken Wiring',
    description: 'Cast iron street lighting column struck by vehicle, leaning over residential pedestrian sidewalk with shattered glass lantern and exposed 240V wiring.',
    category: 'infrastructure',
    subcategory: 'streetlights',
    location: {
      countryCode: 'GB',
      countryName: 'United Kingdom',
      region: 'England - West Midlands',
      district: 'Birmingham Council',
      city: 'Birmingham',
      locality: 'Digbeth High Street corridor',
      address: '74 Heath Mill Lane, Birmingham B9 4AR',
      coordinates: { latitude: 52.4761, longitude: -1.8845 }
    },
    photos: [
      '/src/assets/images/report_streetlight_1792912404332.jpg'
    ],
    dateReported: '2026-04-14T19:40:00Z',
    updatedAt: '2026-04-14T21:10:00Z',
    status: 'under_review',
    currentLevel: 2,
    responsibleOrg: DIRECTORY_ORGANIZATIONS[8], // Birmingham City Council
    officialReferenceNumber: 'BCC-HWY-449182',
    verificationTag: 'officially_acknowledged',
    supportCount: 88,
    hasSupported: false,
    isAnonymous: false,
    isSensitive: false,
    reporterId: 'user_sarah',
    reporterName: 'Sarah Jenkins',
    escalationHistory: [
      {
        id: 'uk_esc_1',
        level: 1,
        date: '2026-04-14T19:40:00Z',
        title: 'Emergency Safety Report Logged',
        description: 'Pedestrian public safety alert regarding leaning column and exposed electrical wiring.',
        actorRole: 'Citizen'
      },
      {
        id: 'uk_esc_2',
        level: 2,
        date: '2026-04-14T21:10:00Z',
        title: 'Emergency Make-Safe Order Dispatched',
        description: 'Highways safety team notified for immediate electrical isolation.',
        organizationName: 'Birmingham City Council Highways',
        referenceNumber: 'BCC-HWY-449182',
        actorRole: 'Council Operator'
      }
    ]
  },
  {
    id: 'PH-9031',
    title: 'Inaccessible Rural Primary Health Clinic & Medication Shortage',
    description: 'Sub-county clinic lacking basic maternal diagnostic equipment and antimalarial medications for past 3 months despite budgetary allocations.',
    category: 'services',
    subcategory: 'healthcare_education',
    location: {
      countryCode: 'KE',
      countryName: 'Kenya',
      region: 'Nairobi County',
      district: 'Westlands Sub-County',
      city: 'Nairobi',
      locality: 'Kibera Outer Ward',
      address: 'Community Road Block 4, Nairobi',
      coordinates: { latitude: -1.3138, longitude: 36.7874 }
    },
    photos: [
      '/src/assets/images/onboarding_community_1792912361748.jpg'
    ],
    dateReported: '2026-03-28T11:20:00Z',
    updatedAt: '2026-04-12T16:00:00Z',
    status: 'escalated',
    currentLevel: 4,
    responsibleOrg: DIRECTORY_ORGANIZATIONS[12], // International WHO / Regional ombudsman
    officialReferenceNumber: 'KNY-HLTH-OMB-901',
    verificationTag: 'verified_investigation',
    supportCount: 1320,
    hasSupported: true,
    isAnonymous: true,
    isSensitive: true,
    reporterId: 'anon_civic_ke',
    reporterName: 'Verified Community Advocate (Anonymous)',
    urgentNotice: 'Sensitive public interest health report. Whistleblower identity protected.',
    escalationHistory: [
      {
        id: 'ke_esc_1',
        level: 1,
        date: '2026-03-28T11:20:00Z',
        title: 'Local Clinic Audit Report Submitted',
        description: 'Community health volunteers submitted inventory audit.',
        actorRole: 'Health Volunteers'
      },
      {
        id: 'ke_esc_2',
        level: 2,
        date: '2026-04-02T09:00:00Z',
        title: 'Sub-County Health Office Notified',
        description: 'Sub-County Medical Director received inventory report with 14-day reply window.',
        actorRole: 'Local Authority'
      },
      {
        id: 'ke_esc_3',
        level: 3,
        date: '2026-04-07T12:00:00Z',
        title: 'Escalated to Ministry of Health Regional Inspectorate',
        description: 'No response received. Escalated to County Health Executive.',
        actorRole: 'Advocacy Coalition'
      },
      {
        id: 'ke_esc_4',
        level: 4,
        date: '2026-04-12T16:00:00Z',
        title: 'National Ombudsman & Public Services Commission Engaged',
        description: 'Filed petition with Commission on Administrative Justice regarding supply chain negligence.',
        referenceNumber: 'KNY-HLTH-OMB-901',
        actorRole: 'National Ombudsman'
      }
    ]
  },
  {
    id: 'PH-1104',
    title: 'Industrial Toxic Effluent Discharge into Tributary River',
    description: 'Unfiltered chemical manufacturing effluent released during nocturnal hours directly into river canal, creating noxious fumes and aquatic die-off.',
    category: 'services',
    subcategory: 'pollution',
    location: {
      countryCode: 'BR',
      countryName: 'Brazil',
      region: 'São Paulo',
      district: 'Região Metropolitana de SP',
      city: 'São Paulo',
      locality: 'Pinheiros River basin',
      coordinates: { latitude: -23.5505, longitude: -46.6333 }
    },
    photos: [
      '/src/assets/images/report_water_leak_1792912390671.jpg'
    ],
    dateReported: '2026-04-08T03:15:00Z',
    updatedAt: '2026-04-14T10:00:00Z',
    status: 'escalated',
    currentLevel: 5,
    responsibleOrg: DIRECTORY_ORGANIZATIONS[11], // Transparency / Environmental
    officialReferenceNumber: 'CETESB-SP-2026-1940',
    verificationTag: 'community_corroborated',
    supportCount: 2840,
    hasSupported: false,
    isAnonymous: false,
    isSensitive: true,
    reporterId: 'user_marcos',
    reporterName: 'Marcos Silva',
    escalationHistory: [
      {
        id: 'br_esc_1',
        level: 1,
        date: '2026-04-08T03:15:00Z',
        title: 'Community Environmental Alert Filed',
        description: 'Samples and night-vision video of discharge logged.',
        actorRole: 'Local Residents'
      },
      {
        id: 'br_esc_2',
        level: 2,
        date: '2026-04-09T08:00:00Z',
        title: 'CETESB Environmental Agency Dispatched',
        description: 'State environmental agency notified; water sampling ordered.',
        referenceNumber: 'CETESB-SP-2026-1940',
        actorRole: 'State Regulator'
      },
      {
        id: 'br_esc_3',
        level: 5,
        date: '2026-04-14T10:00:00Z',
        title: 'Level 5: Global Awareness Campaign Launched',
        description: 'International civic campaign initiated for basin water security. 2,800+ international supporters joined.',
        actorRole: 'International Civic Coalition'
      }
    ]
  }
];

export const SAMPLE_CAMPAIGNS: AwarenessCampaign[] = [
  {
    id: 'camp_1',
    reportId: 'PH-1104',
    title: 'Clean Water Security: Stop Illegal River Effluent Discharge',
    cause: 'Protect potable river basins and demand strict industrial wastewater compliance.',
    country: 'Brazil',
    targetCount: 5000,
    currentCount: 2840,
    targetBodies: ['State Environmental Ministry', 'UN Environment Programme (UNEP)', 'Global Water Partnership'],
    createdDate: '2026-04-14',
    imageUrl: '/src/assets/images/report_water_leak_1792912390671.jpg'
  },
  {
    id: 'camp_2',
    reportId: 'PH-9031',
    title: 'Equitable Rural Clinic Supply Chain & Maternal Health',
    cause: 'Urgent petition to restock essential pediatric medications and diagnostic supplies.',
    country: 'Kenya',
    targetCount: 2500,
    currentCount: 1320,
    targetBodies: ['Commission on Administrative Justice', 'WHO Regional Office for Africa'],
    createdDate: '2026-04-12',
    imageUrl: '/src/assets/images/onboarding_community_1792912361748.jpg'
  },
  {
    id: 'camp_3',
    reportId: 'PH-4219',
    title: 'Lahore Urban Water Infrastructure Overhaul',
    cause: 'Eliminate chronic pipe ruptures and implement real-time civic sensor telemetry.',
    country: 'Pakistan',
    targetCount: 1000,
    currentCount: 489,
    targetBodies: ['Punjab Housing Department', 'Federal Ombudsman', 'Asian Development Bank Urban Board'],
    createdDate: '2026-04-13',
    imageUrl: '/src/assets/images/report_road_pothole_1792912377784.jpg'
  }
];
