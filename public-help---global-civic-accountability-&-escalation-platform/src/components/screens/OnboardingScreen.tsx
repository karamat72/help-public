import React, { useState } from 'react';
import { ArrowRight, Globe, CheckCircle2 } from 'lucide-react';
import { AppLanguage } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/translations';

interface OnboardingScreenProps {
  onComplete: () => void;
  language: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
  language,
  onChangeLanguage
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: 'Together for Better Communities',
      description: 'Report local infrastructure, utility breakdowns, and public service failures in your neighborhood.',
      image: '/src/assets/images/onboarding_community_1792912361748.jpg',
      badge: 'Civic Reporting'
    },
    {
      title: 'Track Responsible Organizations',
      description: 'Automatically identify municipal councils, state departments, and national ombudsmen with verified complaint channels.',
      image: '/src/assets/images/onboarding_community_1792912361748.jpg',
      badge: 'Accountability'
    },
    {
      title: 'Multi-Level Escalation',
      description: 'If local authorities remain unresponsive, escalate through regional ministries to international awareness campaigns.',
      image: '/src/assets/images/onboarding_community_1792912361748.jpg',
      badge: 'Global Action'
    }
  ];

  const currentSlide = slides[slideIndex];

  return (
    <div className="min-h-full flex-1 flex flex-col justify-between bg-white text-slate-900 p-6 select-none">
      {/* Top Bar: Language & Skip */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs text-slate-700">
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as AppLanguage)}
            className="bg-transparent font-medium focus:outline-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name} ({l.nativeName})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onComplete}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="flex flex-col items-center text-center my-auto py-4">
        {/* Illustration Card */}
        <div className="relative w-full max-w-xs aspect-square rounded-3xl overflow-hidden mb-6 shadow-md border border-slate-100">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-teal-800 border border-teal-200">
            {currentSlide.badge}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2 max-w-xs">
          {currentSlide.title}
        </h2>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
          {currentSlide.description}
        </p>

        {/* Dots */}
        <div className="flex items-center gap-1.5 mt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === slideIndex ? 'w-6 bg-teal-600' : 'w-2 bg-slate-200'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="w-full space-y-2 pb-4">
        {slideIndex < slides.length - 1 ? (
          <button
            onClick={() => setSlideIndex((prev) => prev + 1)}
            className="w-full py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="w-full py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
