import { ResponsibleOrganization } from '../types';

export const DIRECTORY_ORGANIZATIONS: ResponsibleOrganization[] = [
  // United States
  {
    id: 'us_dot_nyc',
    name: 'NYC Department of Transportation (NYC DOT)',
    type: 'municipal',
    countryCode: 'US',
    jurisdiction: 'New York City, New York',
    officialWebsite: 'https://www.nyc.gov/dot',
    complaintPortalUrl: 'https://portal.311.nyc.gov/article/?kanumber=KA-01090',
    phone: '311 (or +1-212-639-9675)',
    email: 'customerservice@dot.nyc.gov',
    verifiedDate: '2026-04-10',
    evidenceSource: 'NYC Open Data & Mayor’s Office of Technology'
  },
  {
    id: 'us_dep_nyc',
    name: 'NYC Department of Environmental Protection (Water & Sewer)',
    type: 'utility',
    countryCode: 'US',
    jurisdiction: 'New York, USA',
    officialWebsite: 'https://www.nyc.gov/dep',
    complaintPortalUrl: 'https://portal.311.nyc.gov/water-sewer-issues/',
    phone: '311',
    verifiedDate: '2026-03-22',
    evidenceSource: 'NYC DEP Official Civic Directory'
  },
  {
    id: 'us_caltrans',
    name: 'California Department of Transportation (Caltrans District 7)',
    type: 'regional',
    countryCode: 'US',
    jurisdiction: 'Los Angeles & Ventura County, CA',
    officialWebsite: 'https://dot.ca.gov/caltrans-near-me/district-7',
    complaintPortalUrl: 'https://csr.dot.ca.gov/',
    phone: '+1-213-897-3656',
    verifiedDate: '2026-02-15',
    evidenceSource: 'State of California Public Portal'
  },
  {
    id: 'us_ftc_consumer',
    name: 'U.S. Consumer Financial Protection & Oversight (Federal)',
    type: 'national_ombudsman',
    countryCode: 'US',
    jurisdiction: 'United States (National)',
    officialWebsite: 'https://www.consumerfinance.gov',
    complaintPortalUrl: 'https://www.consumerfinance.gov/complaint/',
    verifiedDate: '2026-01-18',
    evidenceSource: 'US Gov Federal Directory'
  },

  // Pakistan
  {
    id: 'pk_lda_lahore',
    name: 'Lahore Development Authority (LDA)',
    type: 'municipal',
    countryCode: 'PK',
    jurisdiction: 'Lahore Division, Punjab',
    officialWebsite: 'https://lda.gop.pk',
    complaintPortalUrl: 'https://lda.gop.pk/one-window-cell/',
    phone: '+92-42-99262270',
    email: 'info@lda.gop.pk',
    verifiedDate: '2026-04-01',
    evidenceSource: 'Government of Punjab Official Gazette'
  },
  {
    id: 'pk_wasa_lahore',
    name: 'Water and Sanitation Agency (WASA Lahore)',
    type: 'utility',
    countryCode: 'PK',
    jurisdiction: 'Lahore, Punjab',
    officialWebsite: 'https://wasa.punjab.gov.pk',
    complaintPortalUrl: 'https://wasa.punjab.gov.pk/complaint-cell',
    phone: '1334 (Toll Free) / +92-42-99203672',
    email: 'complaints@wasa.punjab.gov.pk',
    verifiedDate: '2026-03-30',
    evidenceSource: 'Punjab Housing & Urban Development'
  },
  {
    id: 'pk_kda_karachi',
    name: 'Karachi Metropolitan Corporation (KMC / KDA)',
    type: 'municipal',
    countryCode: 'PK',
    jurisdiction: 'Karachi, Sindh',
    officialWebsite: 'https://www.kmc.gos.pk',
    complaintPortalUrl: 'https://www.kmc.gos.pk/complaint-management',
    phone: '1339',
    verifiedDate: '2026-02-28',
    evidenceSource: 'Sindh Local Government Registry'
  },
  {
    id: 'pk_wafaqi_mohtasib',
    name: 'Wafaqi Mohtasib (Federal Ombudsman of Pakistan)',
    type: 'national_ombudsman',
    countryCode: 'PK',
    jurisdiction: 'Pakistan (National)',
    officialWebsite: 'https://www.mohtasib.gov.pk',
    complaintPortalUrl: 'https://www.mohtasib.gov.pk/e-complaint',
    phone: '1055 (National Hotline)',
    email: 'complaint@mohtasib.gov.pk',
    verifiedDate: '2026-03-12',
    evidenceSource: 'Federal Ombudsman Act Statutory Registry'
  },

  // United Kingdom
  {
    id: 'uk_birmingham_council',
    name: 'Birmingham City Council - Highways & Street Lighting',
    type: 'municipal',
    countryCode: 'GB',
    jurisdiction: 'Birmingham, West Midlands',
    officialWebsite: 'https://www.birmingham.gov.uk',
    complaintPortalUrl: 'https://www.birmingham.gov.uk/report-a-pothole',
    phone: '+44-121-303-1114',
    verifiedDate: '2026-03-14',
    evidenceSource: 'UK Local Government Directory'
  },
  {
    id: 'uk_lgo_ombudsman',
    name: 'Local Government and Social Care Ombudsman (LGSCO)',
    type: 'national_ombudsman',
    countryCode: 'GB',
    jurisdiction: 'England, United Kingdom',
    officialWebsite: 'https://www.lgo.org.uk',
    complaintPortalUrl: 'https://www.lgo.org.uk/make-a-complaint',
    phone: '+44-300-061-0614',
    verifiedDate: '2026-01-20',
    evidenceSource: 'Parliamentary Oversight Register'
  },

  // France
  {
    id: 'fr_mairie_paris',
    name: 'Ville de Paris (Direction de la Voirie et des Déplacements)',
    type: 'municipal',
    countryCode: 'FR',
    jurisdiction: 'Paris, Île-de-France',
    officialWebsite: 'https://www.paris.fr',
    complaintPortalUrl: 'https://dansmarue.paris.fr',
    phone: '3975',
    verifiedDate: '2026-02-10',
    evidenceSource: 'Mairie de Paris Service Public'
  },
  {
    id: 'fr_defenseur_droits',
    name: 'Défenseur des Droits (French National Ombudsperson)',
    type: 'national_ombudsman',
    countryCode: 'FR',
    jurisdiction: 'France (National)',
    officialWebsite: 'https://www.defenseurdesdroits.fr',
    complaintPortalUrl: 'https://formulaire.defenseurdesdroits.fr',
    verifiedDate: '2026-03-05',
    evidenceSource: 'Journal Officiel de la République Française'
  },

  // International Bodies
  {
    id: 'intl_un_ohchr',
    name: 'UN Office of the High Commissioner for Human Rights (OHCHR)',
    type: 'international_body',
    countryCode: 'GLOBAL',
    jurisdiction: 'International / Global',
    officialWebsite: 'https://www.ohchr.org',
    complaintPortalUrl: 'https://www.ohchr.org/en/treaty-bodies/individual-communications',
    verifiedDate: '2026-01-10',
    evidenceSource: 'United Nations International Treaties Registry'
  },
  {
    id: 'intl_transparency',
    name: 'Transparency International - Advocacy & Legal Advice Centres (ALAC)',
    type: 'international_body',
    countryCode: 'GLOBAL',
    jurisdiction: 'Worldwide Civic Network (Over 60 countries)',
    officialWebsite: 'https://www.transparency.org',
    complaintPortalUrl: 'https://www.transparency.org/en/alac',
    verifiedDate: '2026-02-01',
    evidenceSource: 'TI Global Registry'
  },
  {
    id: 'intl_who_civic',
    name: 'World Health Organization (WHO) Public Health Observatories',
    type: 'international_body',
    countryCode: 'GLOBAL',
    jurisdiction: 'Global Health Standards',
    officialWebsite: 'https://www.who.int',
    complaintPortalUrl: 'https://www.who.int/data/gho',
    verifiedDate: '2026-01-15',
    evidenceSource: 'UN Specialized Agency Directory'
  }
];

export function findSuggestedOrganizations(countryCode: string, category: string, region?: string): ResponsibleOrganization[] {
  // First match country specific
  const matched = DIRECTORY_ORGANIZATIONS.filter(org => org.countryCode === countryCode);
  const international = DIRECTORY_ORGANIZATIONS.filter(org => org.countryCode === 'GLOBAL');
  
  if (category === 'human_rights' || category === 'corruption_misconduct') {
    return [...matched, ...international];
  }
  
  if (matched.length > 0) {
    return matched;
  }
  return DIRECTORY_ORGANIZATIONS.slice(0, 4);
}
