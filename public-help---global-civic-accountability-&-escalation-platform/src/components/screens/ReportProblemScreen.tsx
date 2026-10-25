import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  Image as ImageIcon, 
  MapPin, 
  Lock, 
  ShieldAlert, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Navigation,
  Globe2
} from 'lucide-react';
import { 
  CategoryKey, 
  SubCategoryKey, 
  LocationHierarchy, 
  ReportItem, 
  UserAccount, 
  ResponsibleOrganization 
} from '../../types';
import { CATEGORIES_DATA } from '../../data/categories';
import { CountryData, COUNTRIES_DATA } from '../../data/countries';
import { findSuggestedOrganizations } from '../../data/organizations';

interface ReportProblemScreenProps {
  currentUser: UserAccount;
  defaultCountry: CountryData;
  onBack: () => void;
  onSubmitSuccess: (newReport: ReportItem) => void;
}

export const ReportProblemScreen: React.FC<ReportProblemScreenProps> = ({
  currentUser,
  defaultCountry,
  onBack,
  onSubmitSuccess
}) => {
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryKey>('infrastructure');
  const [subCategory, setSubCategory] = useState<SubCategoryKey>('roads_potholes');

  // Location Hierarchy State
  const [selectedCountryCode, setSelectedCountryCode] = useState(defaultCountry.code);
  const activeCountry = COUNTRIES_DATA.find(c => c.code === selectedCountryCode) || defaultCountry;

  const [selectedRegionName, setSelectedRegionName] = useState(activeCountry.regions[0]?.name || '');
  const activeRegion = activeCountry.regions.find(r => r.name === selectedRegionName) || activeCountry.regions[0];

  const [selectedDistrictName, setSelectedDistrictName] = useState(activeRegion?.districts[0]?.name || '');
  const activeDistrict = activeRegion?.districts.find(d => d.name === selectedDistrictName) || activeRegion?.districts[0];

  const [selectedCityName, setSelectedCityName] = useState(activeDistrict?.cities[0]?.name || '');
  const activeCity = activeDistrict?.cities.find(c => c.name === selectedCityName) || activeDistrict?.cities[0];

  const [locality, setLocality] = useState(activeCity?.neighborhoods[0] || 'Central Area');
  const [streetAddress, setStreetAddress] = useState('');
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsSimulated, setGpsSimulated] = useState(false);

  // Evidence Photos
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    '/src/assets/images/report_road_pothole_1792912377784.jpg'
  ]);

  // Privacy & Safety Controls
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSensitive, setIsSensitive] = useState(false);
  const [redactPii, setRedactPii] = useState(true);

  // Suggested Organizations
  const suggestedOrgs = findSuggestedOrganizations(selectedCountryCode, subCategory, selectedRegionName);
  const [selectedOrgId, setSelectedOrgId] = useState<string>(suggestedOrgs[0]?.id || '');

  // Handle GPS detection
  const handleAutoDetectGPS = () => {
    setGpsCoords({
      lat: activeCountry.lat + (Math.random() - 0.5) * 0.05,
      lng: activeCountry.lng + (Math.random() - 0.5) * 0.05
    });
    setGpsSimulated(true);
  };

  // Handle preset photo switch
  const handleSelectSamplePhoto = (photoPath: string) => {
    if (!uploadedPhotos.includes(photoPath)) {
      setUploadedPhotos([...uploadedPhotos, photoPath]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedOrg = suggestedOrgs.find(o => o.id === selectedOrgId) || suggestedOrgs[0];
    const newReportId = `PH-${Math.floor(1000 + Math.random() * 9000)}`;

    const newReport: ReportItem = {
      id: newReportId,
      title: title.trim() || `${subCategory.replace('_', ' ').toUpperCase()} in ${selectedCityName}`,
      description: description.trim() || 'Civic infrastructure defect logged for municipal intervention.',
      category,
      subcategory: subCategory,
      location: {
        countryCode: activeCountry.code,
        countryName: activeCountry.name,
        region: selectedRegionName,
        district: selectedDistrictName,
        city: selectedCityName,
        locality: locality,
        address: streetAddress || `${locality}, ${selectedCityName}`,
        coordinates: gpsCoords ? { latitude: gpsCoords.lat, longitude: gpsCoords.lng } : undefined
      },
      photos: uploadedPhotos.length > 0 ? uploadedPhotos : ['/src/assets/images/report_road_pothole_1792912377784.jpg'],
      dateReported: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'submitted',
      currentLevel: 1,
      responsibleOrg: selectedOrg,
      officialReferenceNumber: `REG-${activeCountry.code}-${Date.now().toString().slice(-6)}`,
      verificationTag: 'user_allegation',
      supportCount: 1,
      hasSupported: true,
      isAnonymous,
      isSensitive,
      reporterId: isAnonymous ? `anon_${Date.now()}` : currentUser.id,
      reporterName: isAnonymous ? 'Concerned Resident (Anonymous)' : currentUser.name,
      escalationHistory: [
        {
          id: `esc_${Date.now()}`,
          level: 1,
          date: new Date().toISOString(),
          title: 'Report Filed by Citizen',
          description: `Logged at Level 1 under ${activeCountry.name} civic directory.`,
          actorRole: isAnonymous ? 'Anonymous Citizen' : currentUser.name
        }
      ]
    };

    onSubmitSuccess(newReport);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 text-slate-900 pb-20 select-none">
      {/* Header (matches Screen 5: "<- Report a Problem") */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-slate-900">Report a Problem</h1>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Step 1 of 1</span>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 max-w-2xl mx-auto w-full space-y-5">
        {/* Section: Add Photos (matches Screen 5 photo strip) */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-teal-600" />
              <span>Add Photos & Evidence</span>
            </label>
            <span className="text-[10px] text-slate-500">Geo-tagged</span>
          </div>

          {/* Photo gallery preview */}
          <div className="grid grid-cols-3 gap-2">
            {uploadedPhotos.map((photo, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                <img src={photo} alt="Evidence" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                  Evidence #{i + 1}
                </div>
              </div>
            ))}

            {/* Quick Sample Attach triggers */}
            <button
              type="button"
              onClick={() => handleSelectSamplePhoto('/src/assets/images/report_water_leak_1792912390671.jpg')}
              className="aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-500 flex flex-col items-center justify-center text-slate-500 hover:text-teal-600 text-[10px] gap-1 bg-slate-50 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-teal-600" />
              <span>+ Water Leak</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectSamplePhoto('/src/assets/images/report_streetlight_1792912404332.jpg')}
              className="aspect-video rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-500 flex flex-col items-center justify-center text-slate-500 hover:text-teal-600 text-[10px] gap-1 bg-slate-50 transition-colors"
            >
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>+ Streetlight</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>EXIF metadata, timestamp, and coordinates preserved securely.</span>
          </div>
        </div>

        {/* Section: Category Selector */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            Category & Issue Type
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setCategory(cat.key);
                  setSubCategory(cat.subcategories[0]?.key || 'roads_potholes');
                }}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  category === cat.key
                    ? 'border-teal-600 bg-teal-50/70 text-teal-900 font-bold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs leading-tight">{cat.label}</div>
              </button>
            ))}
          </div>

          {/* Subcategory select */}
          <div className="pt-2">
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Specific Problem:
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value as SubCategoryKey)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 font-medium"
            >
              {CATEGORIES_DATA.find(c => c.key === category)?.subcategories.map((sub) => (
                <option key={sub.key} value={sub.key}>
                  {sub.label} — {sub.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section: 6-Tier Location Hierarchy */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              <span>Location Hierarchy (6 Tiers)</span>
            </label>

            <button
              type="button"
              onClick={handleAutoDetectGPS}
              className="text-[10px] font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200"
            >
              <Navigation className="w-3 h-3" />
              <span>{gpsSimulated ? 'GPS Pinned ✓' : 'Auto GPS'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* 1. Country */}
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">1. Country</span>
              <select
                value={selectedCountryCode}
                onChange={(e) => {
                  setSelectedCountryCode(e.target.value);
                  const newC = COUNTRIES_DATA.find(c => c.code === e.target.value) || defaultCountry;
                  setSelectedRegionName(newC.regions[0]?.name || '');
                  setSelectedDistrictName(newC.regions[0]?.districts[0]?.name || '');
                  setSelectedCityName(newC.regions[0]?.districts[0]?.cities[0]?.name || '');
                  setLocality(newC.regions[0]?.districts[0]?.cities[0]?.neighborhoods[0] || 'Central Area');
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              >
                {COUNTRIES_DATA.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Region / Province */}
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">
                2. {activeCountry.regionLabel}
              </span>
              <select
                value={selectedRegionName}
                onChange={(e) => {
                  setSelectedRegionName(e.target.value);
                  const newR = activeCountry.regions.find(r => r.name === e.target.value);
                  setSelectedDistrictName(newR?.districts[0]?.name || '');
                  setSelectedCityName(newR?.districts[0]?.cities[0]?.name || '');
                  setLocality(newR?.districts[0]?.cities[0]?.neighborhoods[0] || '');
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              >
                {activeCountry.regions.map((r) => (
                  <option key={r.name} value={r.name}>{r.name}</option>
                ))}
              </select>
            </div>

            {/* 3. District / County */}
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">
                3. {activeCountry.districtLabel}
              </span>
              <select
                value={selectedDistrictName}
                onChange={(e) => {
                  setSelectedDistrictName(e.target.value);
                  const newD = activeRegion?.districts.find(d => d.name === e.target.value);
                  setSelectedCityName(newD?.cities[0]?.name || '');
                  setLocality(newD?.cities[0]?.neighborhoods[0] || '');
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              >
                {activeRegion?.districts.map((d) => (
                  <option key={d.name} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* 4. City / Municipality */}
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">4. City / Municipality</span>
              <select
                value={selectedCityName}
                onChange={(e) => {
                  setSelectedCityName(e.target.value);
                  const newC = activeDistrict?.cities.find(c => c.name === e.target.value);
                  setLocality(newC?.neighborhoods[0] || '');
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
              >
                {activeDistrict?.cities.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Locality / Neighborhood & 6. Street / GPS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">5. Neighborhood / Area</span>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Lower East Side, Gulberg III"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              />
            </div>

            <div>
              <span className="text-[11px] text-slate-500 font-medium block mb-1">6. Exact Address / Landmark</span>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="e.g. 280 Grand Street, corner of 4th Ave"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Section: Description & Title */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            Issue Title & Factual Description
          </label>

          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hazardous Road Pothole Damaging Vehicles"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-semibold text-slate-900"
              required
            />
          </div>

          <div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the severity, duration, and safety impact on the public. Stick to verifiable facts."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-800 leading-relaxed"
              required
            />
          </div>
        </div>

        {/* Section: Potentially Responsible Organization */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>Target Responsible Organization</span>
            </label>
            <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-bold">Auto-Matched</span>
          </div>

          <div className="space-y-2">
            {suggestedOrgs.map((org) => (
              <label
                key={org.id}
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  selectedOrgId === org.id
                    ? 'border-teal-500 bg-teal-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="responsibleOrg"
                  checked={selectedOrgId === org.id}
                  onChange={() => setSelectedOrgId(org.id)}
                  className="mt-0.5 text-teal-600 focus:ring-teal-500"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-slate-900">{org.name}</div>
                  <div className="text-[11px] text-slate-500">{org.jurisdiction} · {org.type.replace('_', ' ')}</div>
                  {org.complaintPortalUrl && (
                    <div className="text-[10px] text-teal-700 font-mono mt-0.5">
                      Verified Complaint Channel: {org.officialWebsite}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Section: Privacy, Whistleblower & Safety Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Safety & Evidence Protection
            </label>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="font-medium">Submit Anonymously (Hide my name and profile)</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isSensitive}
                onChange={(e) => setIsSensitive(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="font-medium text-amber-800">
                Mark as Sensitive / High Risk Public Concern
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={redactPii}
                onChange={(e) => setRedactPii(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="text-[11px] text-slate-500">
                Automatically redact phone numbers and personal faces from photos
              </span>
            </label>
          </div>

          {isSensitive && (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Safety advisory: For allegations involving official misconduct or human rights, reports undergo extra privacy scrub before public discovery.
              </span>
            </div>
          )}
        </div>

        {/* Submit Report Button (matches Screen 5: "Submit Report" teal button) */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Submit Report</span>
          </button>
        </div>
      </form>
    </div>
  );
};
