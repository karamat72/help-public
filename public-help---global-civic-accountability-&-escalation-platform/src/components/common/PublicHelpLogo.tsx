import React from 'react';

interface PublicHelpLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const PublicHelpLogo: React.FC<PublicHelpLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  textColor = 'text-slate-900'
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        {/* Glow / background backing */}
        <circle cx="50" cy="50" r="46" fill="#047857" fillOpacity="0.08" />
        
        {/* Earth sphere */}
        <circle cx="50" cy="46" r="32" fill="#0D9488" />
        
        {/* Continents (Stylized Green landmasses) */}
        <path
          d="M32 36C35 30 44 28 52 30C58 31 64 36 62 42C60 47 52 46 47 50C43 54 36 52 33 46C31 42 30 39 32 36Z"
          fill="#10B981"
        />
        <path
          d="M48 54C54 52 64 56 68 50C70 47 72 41 74 46C76 52 70 60 62 62C55 64 50 60 48 54Z"
          fill="#059669"
        />

        {/* Location Pin Head and Point at Center */}
        <g filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.25))">
          <path
            d="M50 14C43.3726 14 38 19.3726 38 26C38 34.5 50 46 50 46C50 46 62 34.5 62 26C62 19.3726 56.6274 14 50 14Z"
            fill="#0F172A"
          />
          <circle cx="50" cy="25" r="4.5" fill="#38BDF8" />
        </g>

        {/* Cradling Protective Hands in Deep Navy Blue */}
        <path
          d="M20 54C20 54 26 58 32 64C36 68 42 74 50 75C58 74 64 68 68 64C74 58 80 54 80 54C80 54 78 72 66 82C58 88 42 88 34 82C22 72 20 54 20 54Z"
          fill="#0F172A"
        />
        <path
          d="M23 58C26 64 34 76 50 78C66 76 74 64 77 58C73 66 63 80 50 81C37 80 27 66 23 58Z"
          fill="#1E293B"
        />
      </svg>
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold tracking-tight text-lg leading-tight ${textColor}`}>
            Public <span className="text-teal-600">Help</span>
          </span>
          <span className="text-[10px] text-slate-500 font-medium tracking-wide">
            Civic Escalation
          </span>
        </div>
      )}
    </div>
  );
};
