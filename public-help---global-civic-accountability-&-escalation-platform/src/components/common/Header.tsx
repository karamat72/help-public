import React from 'react';
import { PublicHelpLogo } from './PublicHelpLogo';
import { ActiveScreen, AppLanguage, UserAccount } from '../../types';
import { CountryData } from '../../data/countries';
import { Globe, Bell, Shield, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  selectedCountry: CountryData;
  onOpenCountryModal: () => void;
  language: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
  currentUser: UserAccount;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  title?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  selectedCountry,
  onOpenCountryModal,
  language,
  onChangeLanguage,
  currentUser,
  unreadNotificationsCount,
  onOpenNotifications,
  title,
  showBack = false
}) => {
  const isHome = activeScreen === 'home';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left slot: Back arrow or Logo */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={() => onNavigate('home')}
              className="p-2 -ml-1 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Go back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-left group"
            >
              <PublicHelpLogo size={32} />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  Public <span className="text-teal-600">Help</span>
                </span>
              </div>
            </button>
          )}

          {title && !isHome && (
            <span className="font-semibold text-slate-900 text-sm truncate max-w-[160px] sm:max-w-xs">
              {title}
            </span>
          )}
        </div>

        {/* Right slot: Country selector, Language toggle, Notification bell, Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Country Selector */}
          <button
            onClick={onOpenCountryModal}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-full border border-slate-200 transition-colors"
            title="Change active country"
          >
            <span className="text-sm">{selectedCountry.flag}</span>
            <span className="hidden sm:inline font-medium text-slate-800">{selectedCountry.code}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative group">
            <button
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors flex items-center"
              aria-label="Change Language"
            >
              <Globe className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex flex-col bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-32 z-50">
              <button
                onClick={() => onChangeLanguage('en')}
                className={`px-3 py-1.5 text-left text-xs ${language === 'en' ? 'font-bold text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                English
              </button>
              <button
                onClick={() => onChangeLanguage('ur')}
                className={`px-3 py-1.5 text-left text-xs ${language === 'ur' ? 'font-bold text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                اردو (Urdu)
              </button>
              <button
                onClick={() => onChangeLanguage('ar')}
                className={`px-3 py-1.5 text-left text-xs ${language === 'ar' ? 'font-bold text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                العربية (Arabic)
              </button>
              <button
                onClick={() => onChangeLanguage('es')}
                className={`px-3 py-1.5 text-left text-xs ${language === 'es' ? 'font-bold text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Español
              </button>
              <button
                onClick={() => onChangeLanguage('fr')}
                className={`px-3 py-1.5 text-left text-xs ${language === 'fr' ? 'font-bold text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Français
              </button>
              <button
                onClick={() => onChangeLanguage('hi')}
                className={`px-3 py-1.5 text-left text-xs ${language === 'hi' ? 'font-bold text-teal-600 bg-teal-50' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* User profile avatar / pill */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Go to profile"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-teal-500/30">
              {currentUser.name.slice(0, 1)}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
