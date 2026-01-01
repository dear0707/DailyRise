
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (updates: Partial<UserProfile>) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [parentEmail, setParentEmail] = useState(user.parentEmail || '');
  const [parentWhatsapp, setParentWhatsapp] = useState(user.parentWhatsapp || '');
  const [autoReport, setAutoReport] = useState(user.autoReportEnabled || false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      parentEmail,
      parentWhatsapp,
      autoReportEnabled: autoReport,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header>
        <h2 className="text-3xl font-bold text-gray-800">Profile Settings</h2>
        <p className="text-gray-500">Manage your personal and guardian contact information.</p>
      </header>

      {/* User Basic Info Card */}
      <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-6">
        <div className="shrink-0 relative">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="w-20 h-20 rounded-3xl object-cover ring-4 ring-[#D1B0FF]/20" />
          ) : (
            <div className="w-20 h-20 rounded-3xl lavender-bg flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.[0]}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 border-4 border-white rounded-full"></div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-gray-500 font-medium">{user.email}</p>
          <div className="mt-2 flex gap-2">
            <span className="px-3 py-1 bg-lavender-100/50 text-[#D1B0FF] text-[10px] font-bold uppercase tracking-wider rounded-full">Standard User</span>
            <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-wider rounded-full">Secure Connection</span>
          </div>
        </div>
      </section>

      {/* Parent/Guardian Details Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-50 rounded-xl teal-text">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 1 1 0 5.292M15 21H3v-1a6 6 0 0 1 12 0v1zm0 0h6v-1a6 6 0 0 0-9-5.197M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Guardian Contact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">Parent's Email Address</label>
              <input
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="guardian@example.com"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#D1B0FF] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">Parent's WhatsApp Number</label>
              <input
                type="tel"
                value={parentWhatsapp}
                onChange={(e) => setParentWhatsapp(e.target.value)}
                placeholder="+1 234 567 890"
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#D1B0FF] focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <h4 className="font-bold text-gray-800">Auto-Weekly Reports</h4>
                <p className="text-xs text-gray-500">Automatically send reports every Sunday night.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={autoReport} 
                  onChange={(e) => setAutoReport(e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D1B0FF]"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="lavender-bg text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-lavender-500/20 transition-all active:scale-95"
          >
            Save Changes
          </button>
          {showSuccess && (
            <span className="text-green-500 font-bold animate-in fade-in slide-in-from-left-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Settings Updated
            </span>
          )}
        </div>
      </form>

      {/* Account Security & Logout */}
      <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-50 rounded-xl text-red-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Account Security</h3>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-red-50/30 rounded-2xl border border-red-50">
          <div>
            <h4 className="font-bold text-gray-800">Session Management</h4>
            <p className="text-xs text-gray-500 max-w-sm">Sign out of your account to end your current session and protect your data.</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white text-red-500 border-2 border-red-100 rounded-2xl font-bold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
