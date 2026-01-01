
import React from 'react';
import { ICONS } from '../constants';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile | null;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, user }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Dashboard },
    { id: 'tasks', label: 'Tasks', icon: ICONS.Task },
    { id: 'chat', label: 'AI Coach', icon: ICONS.Chat },
    { id: 'reports', label: 'Reports', icon: ICONS.Report },
    { id: 'profile', label: 'Profile', icon: ICONS.Profile },
  ];

  return (
    <div className="flex h-screen bg-[#F5F3F7] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8">
          <h1 className="text-2xl font-bold lavender-text tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl lavender-bg flex items-center justify-center text-white shadow-lg shadow-lavender-500/30">R</span>
            DailyRise
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                activeTab === tab.id 
                ? 'lavender-bg text-white shadow-lg shadow-lavender-500/20' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <tab.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            {user?.picture ? (
              <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#D1B0FF] transition-all" />
            ) : (
              <div className="w-10 h-10 rounded-full teal-bg flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'U'}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-800 truncate">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'Sign in for more features'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 md:hidden">
            <h1 className="text-xl font-bold lavender-text">DailyRise</h1>
            {user?.picture && (
              <img 
                src={user.picture} 
                alt={user.name} 
                className="w-8 h-8 rounded-full cursor-pointer" 
                onClick={() => setActiveTab('profile')}
              />
            )}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
