export type EscalationLevelNumber = 1 | 2 | 3 | 4 | 5;

export interface EscalationLevelInfo {
  level: EscalationLevelNumber;
  title: string;
  subtitle: string;
  color: string;
  bgLight: string;
  borderColor: string;
  description: string;
}

export type CategoryKey = 
  | 'infrastructure'
  | 'services'
  | 'governance'
  | 'human_rights';

export type SubCategoryKey =
  | 'roads_potholes'
  | 'water_leakage'
  | 'waste_management'
  | 'streetlights'
  | 'drainage_sewage'
  | 'public_transport'
  | 'pollution'
  | 'healthcare_education'
  | 'human_rights'
  | 'corruption_misconduct'
  | 'public_safety'
  | 'other';

export interface CategoryDefinition {
  key: CategoryKey;
  label: string;
  subcategories: {
    key: SubCategoryKey;
    label: string;
    icon: string;
    description: string;
  }[];
}

export interface LocationHierarchy {
  countryCode: string;
  countryName: string;
  region: string; // State, province, territory
  district: string; // District, county, municipal borough
  city: string; // City or municipality
  locality: string; // Town, neighborhood, area
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ResponsibleOrganization {
  id: string;
  name: string;
  type: 'municipal' | 'utility' | 'regional' | 'national_ombudsman' | 'human_rights_commission' | 'international_body';
  countryCode: string;
  jurisdiction: string;
  officialWebsite: string;
  complaintPortalUrl?: string;
  email?: string;
  phone?: string;
  verifiedDate?: string;
  evidenceSource?: string;
}

export type ReportStatus = 
  | 'submitted'
  | 'under_review'
  | 'acknowledged'
  | 'in_progress'
  | 'investigated'
  | 'disputed'
  | 'resolved'
  | 'escalated';

export type VerificationTag = 
  | 'user_allegation'
  | 'community_corroborated'
  | 'officially_acknowledged'
  | 'verified_investigation';

export interface EscalationTimelineEvent {
  id: string;
  level: EscalationLevelNumber;
  date: string;
  title: string;
  description: string;
  organizationName?: string;
  referenceNumber?: string;
  responseSummary?: string;
  actorRole: string;
}

export interface ReportItem {
  id: string; // e.g. "PH-7842"
  title: string;
  description: string;
  category: CategoryKey;
  subcategory: SubCategoryKey;
  location: LocationHierarchy;
  photos: string[];
  documents?: { name: string; url: string; size: string }[];
  dateReported: string;
  updatedAt: string;
  status: ReportStatus;
  currentLevel: EscalationLevelNumber;
  escalationHistory: EscalationTimelineEvent[];
  responsibleOrg?: ResponsibleOrganization;
  officialReferenceNumber?: string;
  responseRecords?: {
    date: string;
    fromOrg: string;
    content: string;
    isOfficial: boolean;
  }[];
  supportCount: number;
  hasSupported?: boolean;
  isAnonymous: boolean;
  isSensitive: boolean;
  verificationTag: VerificationTag;
  reporterId: string;
  reporterName: string;
  isFlagged?: boolean;
  urgentNotice?: string;
}

export interface AwarenessCampaign {
  id: string;
  reportId: string;
  title: string;
  cause: string;
  country: string;
  targetCount: number;
  currentCount: number;
  targetBodies: string[];
  createdDate: string;
  imageUrl?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  country: string;
  role: 'citizen' | 'civic_advocate' | 'municipal_inspector' | 'moderator';
  submittedReportIds: string[];
  supportedReportIds: string[];
  notificationsCount: number;
}

export type ActiveScreen = 
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'home'
  | 'report_problem'
  | 'report_detail'
  | 'global_issues'
  | 'escalation_center'
  | 'org_directory'
  | 'profile'
  | 'admin_moderation';

export type AppLanguage = 'en' | 'es' | 'fr' | 'ar' | 'ur' | 'hi';
