/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ActiveScreen, 
  AppLanguage, 
  ReportItem, 
  UserAccount, 
  EscalationLevelNumber,
  VerificationTag 
} from './types';
import { COUNTRIES_DATA, CountryData, DEFAULT_COUNTRY } from './data/countries';
import { INITIAL_REPORTS } from './data/sampleReports';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from './data/translations';

// Components
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DeviceFrameWrapper } from './components/common/DeviceFrameWrapper';
import { CountrySelectorModal } from './components/common/CountrySelectorModal';
import { DesignComparisonModal } from './components/common/DesignComparisonModal';
import { NotificationsModal } from './components/common/NotificationsModal';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ReportProblemScreen } from './components/screens/ReportProblemScreen';
import { ReportDetailScreen } from './components/screens/ReportDetailScreen';
import { GlobalIssuesScreen } from './components/screens/GlobalIssuesScreen';
import { EscalationCenterScreen } from './components/screens/EscalationCenterScreen';
import { OrganizationDirectoryScreen } from './components/screens/OrganizationDirectoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { PrivacySafetyModal } from './components/screens/PrivacySafetyModal';
import { AdminModerationScreen } from './components/screens/AdminModerationScreen';

export default function App() {
  // Navigation & Screen State
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [previousScreen, setPreviousScreen] = useState<ActiveScreen>('home');

  // Country & I18n State
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(DEFAULT_COUNTRY);
  const [language, setLanguage] = useState<AppLanguage>('en');

  // Viewport Frame Mode (default: mobile device frame for iPhone mockup)
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Modals
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Active User Account
  const [currentUser, setCurrentUser] = useState<UserAccount>({
    id: 'user_alex',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    country: 'United States',
    role: 'citizen',
    submittedReportIds: ['PH-7842'],
    supportedReportIds: ['PH-4219', 'PH-9031'],
    notificationsCount: 2
  });

  // Reports Store
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [selectedReport, setSelectedReport] = useState<ReportItem>(INITIAL_REPORTS[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Navigation Helper
  const navigateTo = (screen: ActiveScreen) => {
    setPreviousScreen(activeScreen);
    setActiveScreen(screen);
  };

  // Toggle Support / Upvote
  const handleToggleSupport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const hasSupported = !r.hasSupported;
          return {
            ...r,
            hasSupported,
            supportCount: hasSupported ? r.supportCount + 1 : Math.max(0, r.supportCount - 1)
          };
        }
        return r;
      })
    );

    // Also update selectedReport if currently viewed
    setSelectedReport((prev) => {
      if (prev.id === reportId) {
        const hasSupported = !prev.hasSupported;
        return {
          ...prev,
          hasSupported,
          supportCount: hasSupported ? prev.supportCount + 1 : Math.max(0, prev.supportCount - 1)
        };
      }
      return prev;
    });

    // Update user profile supported IDs
    setCurrentUser((prev) => {
      const isAlready = prev.supportedReportIds.includes(reportId);
      return {
        ...prev,
        supportedReportIds: isAlready
          ? prev.supportedReportIds.filter((id) => id !== reportId)
          : [...prev.supportedReportIds, reportId]
      };
    });
  };

  // Escalate Report to Next Stage
  const handleEscalateReport = (
    reportId: string,
    targetLevel: EscalationLevelNumber,
    note: string
  ) => {
    const event = {
      id: `esc_${Date.now()}`,
      level: targetLevel,
      date: new Date().toISOString(),
      title: `Escalated to Level ${targetLevel}`,
      description: note,
      actorRole: currentUser.role
    };

    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            currentLevel: targetLevel,
            status: targetLevel >= 3 ? 'escalated' : r.status,
            escalationHistory: [...r.escalationHistory, event],
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    setSelectedReport((prev) => {
      if (prev.id === reportId) {
        return {
          ...prev,
          currentLevel: targetLevel,
          status: targetLevel >= 3 ? 'escalated' : prev.status,
          escalationHistory: [...prev.escalationHistory, event],
          updatedAt: new Date().toISOString()
        };
      }
      return prev;
    });
  };

  // Record Official Reference Number
  const handleAddResponseRecord = (
    reportId: string,
    referenceNo: string,
    responseNote: string
  ) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const newResponses = responseNote
            ? [
                ...(r.responseRecords || []),
                {
                  date: new Date().toISOString(),
                  fromOrg: r.responsibleOrg?.name || 'Public Authority',
                  content: responseNote,
                  isOfficial: true
                }
              ]
            : r.responseRecords;

          return {
            ...r,
            officialReferenceNumber: referenceNo || r.officialReferenceNumber,
            responseRecords: newResponses,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    setSelectedReport((prev) => {
      if (prev.id === reportId) {
        return {
          ...prev,
          officialReferenceNumber: referenceNo || prev.officialReferenceNumber,
          updatedAt: new Date().toISOString()
        };
      }
      return prev;
    });
  };

  // Submit New Report
  const handleCreateReport = (newReport: ReportItem) => {
    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
    setCurrentUser((prev) => ({
      ...prev,
      submittedReportIds: [newReport.id, ...prev.submittedReportIds]
    }));
    setActiveScreen('report_detail');
  };

  // Switch demo persona
  const handleSwitchPersona = (role: UserAccount['role']) => {
    const names: Record<UserAccount['role'], string> = {
      citizen: 'Alex Johnson',
      civic_advocate: 'Fatima Al-Hassan',
      municipal_inspector: 'David Miller',
      moderator: 'Elena Rostova'
    };
    setCurrentUser((prev) => ({
      ...prev,
      role,
      name: names[role],
      email: `${role}@publichelp.org`
    }));
  };

  // Verification Tag update by Admin
  const handleUpdateVerification = (reportId: string, newTag: VerificationTag) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, verificationTag: newTag } : r))
    );
  };

  const handleFlagReport = (reportId: string, isFlagged: boolean) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, isFlagged } : r))
    );
  };

  // Check RTL language
  const isRtl = language === 'ur' || language === 'ar';

  // Screen routing determination
  const shouldShowTopHeader = !['splash', 'onboarding', 'auth'].includes(activeScreen);
  const shouldShowBottomNav = !['splash', 'onboarding', 'auth'].includes(activeScreen);

  return (
    <DeviceFrameWrapper
      isMobileFrame={isMobileFrame}
      onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
      onOpenBlueprint={() => setIsBlueprintModalOpen(true)}
      currentUser={currentUser}
      onSwitchUser={handleSwitchPersona}
    >
      <div 
        dir={isRtl ? 'rtl' : 'ltr'} 
        className="flex-1 flex flex-col min-h-full bg-slate-50 text-slate-900 relative font-sans"
      >
        {/* Top Header */}
        {shouldShowTopHeader && (
          <Header
            activeScreen={activeScreen}
            onNavigate={navigateTo}
            selectedCountry={selectedCountry}
            onOpenCountryModal={() => setIsCountryModalOpen(true)}
            language={language}
            onChangeLanguage={setLanguage}
            currentUser={currentUser}
            unreadNotificationsCount={currentUser.notificationsCount}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            title={
              activeScreen === 'report_problem'
                ? 'Report a Problem'
                : activeScreen === 'report_detail'
                ? `Report #${selectedReport.id}`
                : activeScreen === 'global_issues'
                ? 'Global Issues'
                : activeScreen === 'escalation_center'
                ? 'Escalation Center'
                : activeScreen === 'profile'
                ? 'My Profile'
                : undefined
            }
            showBack={activeScreen === 'report_detail' || activeScreen === 'report_problem' || activeScreen === 'org_directory' || activeScreen === 'admin_moderation'}
          />
        )}

        {/* Screen Routing */}
        <main className="flex-1 flex flex-col">
          {activeScreen === 'splash' && (
            <SplashScreen
              onStart={() => navigateTo('onboarding')}
              onSkipToHome={() => navigateTo('home')}
            />
          )}

          {activeScreen === 'onboarding' && (
            <OnboardingScreen
              onComplete={() => navigateTo('auth')}
              language={language}
              onChangeLanguage={setLanguage}
            />
          )}

          {activeScreen === 'auth' && (
            <AuthScreen
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                navigateTo('home');
              }}
              onContinueAsGuest={() => navigateTo('home')}
            />
          )}

          {activeScreen === 'home' && (
            <HomeScreen
              currentUser={currentUser}
              reports={reports}
              selectedCountry={selectedCountry}
              onNavigate={navigateTo}
              onSelectReport={(rep) => {
                setSelectedReport(rep);
                navigateTo('report_detail');
              }}
              onSelectCategoryFilter={(cat) => setCategoryFilter(cat)}
              onToggleSupport={handleToggleSupport}
            />
          )}

          {activeScreen === 'report_problem' && (
            <ReportProblemScreen
              currentUser={currentUser}
              defaultCountry={selectedCountry}
              onBack={() => navigateTo(previousScreen || 'home')}
              onSubmitSuccess={handleCreateReport}
            />
          )}

          {activeScreen === 'report_detail' && (
            <ReportDetailScreen
              report={selectedReport}
              currentUser={currentUser}
              onBack={() => navigateTo('home')}
              onToggleSupport={handleToggleSupport}
              onEscalateReport={handleEscalateReport}
              onAddResponseRecord={handleAddResponseRecord}
            />
          )}

          {activeScreen === 'global_issues' && (
            <GlobalIssuesScreen
              reports={reports}
              onSelectReport={(rep) => {
                setSelectedReport(rep);
                navigateTo('report_detail');
              }}
              onToggleSupport={handleToggleSupport}
              initialCategoryFilter={categoryFilter}
            />
          )}

          {activeScreen === 'escalation_center' && (
            <EscalationCenterScreen
              reports={reports}
              onSelectReport={(rep) => {
                setSelectedReport(rep);
                navigateTo('report_detail');
              }}
              onNavigateToOrgDirectory={() => navigateTo('org_directory')}
            />
          )}

          {activeScreen === 'org_directory' && (
            <OrganizationDirectoryScreen
              onBack={() => navigateTo('escalation_center')}
            />
          )}

          {activeScreen === 'profile' && (
            <ProfileScreen
              currentUser={currentUser}
              userReports={reports.filter((r) => r.reporterId === currentUser.id || currentUser.submittedReportIds.includes(r.id))}
              supportedReports={reports.filter((r) => r.hasSupported || currentUser.supportedReportIds.includes(r.id))}
              language={language}
              onChangeLanguage={setLanguage}
              onNavigate={navigateTo}
              onSelectReport={(rep) => {
                setSelectedReport(rep);
                navigateTo('report_detail');
              }}
              onOpenPrivacyCenter={() => setIsPrivacyModalOpen(true)}
              onOpenAdminDashboard={() => navigateTo('admin_moderation')}
              onLogout={() => navigateTo('auth')}
            />
          )}

          {activeScreen === 'admin_moderation' && (
            <AdminModerationScreen
              reports={reports}
              onBack={() => navigateTo('profile')}
              onUpdateVerification={handleUpdateVerification}
              onFlagReport={handleFlagReport}
            />
          )}
        </main>

        {/* Bottom Navigation */}
        {shouldShowBottomNav && (
          <BottomNav activeScreen={activeScreen} onNavigate={navigateTo} />
        )}

        {/* Global Modals */}
        <CountrySelectorModal
          isOpen={isCountryModalOpen}
          onClose={() => setIsCountryModalOpen(false)}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />

        <DesignComparisonModal
          isOpen={isBlueprintModalOpen}
          onClose={() => setIsBlueprintModalOpen(false)}
        />

        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectReportId={(id) => {
            const found = reports.find((r) => r.id === id);
            if (found) {
              setSelectedReport(found);
              navigateTo('report_detail');
            }
          }}
        />

        <PrivacySafetyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      </div>
    </DeviceFrameWrapper>
  );
}
