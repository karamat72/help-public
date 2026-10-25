import React, { useState } from 'react';
import { PublicHelpLogo } from '../common/PublicHelpLogo';
import { UserAccount } from '../../types';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, CheckCircle } from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: (user: UserAccount) => void;
  onContinueAsGuest: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onContinueAsGuest }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('Alex Johnson');

  const demoAccounts: UserAccount[] = [
    {
      id: 'user_alex',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      country: 'United States',
      role: 'citizen',
      submittedReportIds: ['PH-7842'],
      supportedReportIds: ['PH-4219', 'PH-9031'],
      notificationsCount: 3
    },
    {
      id: 'user_advocate',
      name: 'Fatima Al-Hassan',
      email: 'advocacy@civicaction.org',
      country: 'Pakistan',
      role: 'civic_advocate',
      submittedReportIds: ['PH-4219'],
      supportedReportIds: ['PH-7842', 'PH-1104'],
      notificationsCount: 5
    },
    {
      id: 'user_inspector',
      name: 'David Miller',
      email: 'dmiller@nycdot.gov',
      country: 'United States',
      role: 'municipal_inspector',
      submittedReportIds: [],
      supportedReportIds: ['PH-7842'],
      notificationsCount: 2
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = demoAccounts.find(a => a.email.toLowerCase() === email.toLowerCase()) || {
      id: `user_${Date.now()}`,
      name: fullName || 'Citizen User',
      email: email || 'user@publichelp.org',
      country: 'United States',
      role: 'citizen',
      submittedReportIds: [],
      supportedReportIds: [],
      notificationsCount: 1
    };
    onLoginSuccess(matched);
  };

  return (
    <div className="min-h-full flex-1 flex flex-col justify-center items-center bg-white text-slate-900 p-6">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <PublicHelpLogo size={64} />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {isSignUp ? 'Create Civic Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-500">
            {isSignUp ? 'Join global citizens taking local action' : 'Sign in to track reports & escalate issues'}
          </p>
        </div>

        {/* Preset Demo Personas */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <span className="text-[11px] font-semibold text-slate-700 block mb-2">
            Quick Demo Login:
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {demoAccounts.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => onLoginSuccess(acc)}
                className="p-1.5 bg-white border border-slate-200 rounded-lg text-left hover:border-teal-500 hover:bg-teal-50/50 transition-colors"
              >
                <div className="text-[11px] font-bold text-slate-900 truncate">{acc.name.split(' ')[0]}</div>
                <div className="text-[9px] text-teal-700 capitalize truncate">{acc.role.replace('_', ' ')}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isSignUp && (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-900"
                required
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Email or Phone Number</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-900"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              {!isSignUp && (
                <button type="button" className="text-[11px] text-teal-700 hover:underline">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-slate-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center space-y-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-medium text-slate-600 hover:text-teal-700"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'New here? Create an account'}
          </button>

          <div>
            <button
              onClick={onContinueAsGuest}
              className="text-[11px] text-slate-400 hover:text-slate-700 underline"
            >
              Continue as Guest / Anonymous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
