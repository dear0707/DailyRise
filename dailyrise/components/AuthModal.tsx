
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  onLogin: (user: UserProfile) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin({
        name: isSignUp ? name : (name || email.split('@')[0]),
        email: email,
        lastActive: Date.now(),
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/70 backdrop-blur-xl p-4 transition-all duration-500">
      <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-700 border border-gray-100">
        
        {/* Brand Header */}
        <div className="lavender-bg p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full -ml-12 -mb-12 blur-xl"></div>
          
          <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center shadow-2xl mx-auto mb-6 transform hover:rotate-6 transition-transform">
            <span className="text-4xl font-black lavender-text">R</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            {isSignUp ? 'Join DailyRise' : 'Welcome Back'}
          </h2>
          <p className="text-white/80 mt-2 font-medium">
            {isSignUp ? 'Your productivity journey begins here.' : 'Ready to rise and shine again?'}
          </p>
        </div>

        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
             <div className="space-y-4">
               {isSignUp && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-lavender-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                    />
                  </div>
               )}
               <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-lavender-400 focus:bg-white rounded-2xl px-6 py-4 outline-none transition-all"
                  />
               </div>
             </div>

             <button 
              type="submit"
              className="w-full lavender-bg text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-lavender-500/20 hover:shadow-lavender-500/40 transition-all active:scale-95"
             >
               {isSignUp ? 'Create My Account' : 'Sign In Now'}
             </button>

             <div className="text-center pt-4 border-t border-gray-50">
               <p className="text-sm text-gray-500 font-medium">
                {isSignUp ? 'Already have an account?' : 'New to DailyRise?'}
                <button 
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 lavender-text font-bold hover:underline"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up Free'}
                </button>
              </p>
             </div>
          </form>

          {/* Feature Badges (only for Sign Up) */}
          {isSignUp && (
            <div className="mt-8 grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <div className="p-3 bg-gray-50 rounded-2xl text-[10px] text-gray-500 font-bold flex items-center gap-2">
                <span className="w-5 h-5 lavender-bg rounded-lg flex items-center justify-center text-white text-[8px]">AI</span>
                Smart Coaching
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl text-[10px] text-gray-500 font-bold flex items-center gap-2">
                <span className="w-5 h-5 teal-bg rounded-lg flex items-center justify-center text-white text-[8px]">📈</span>
                Growth Reports
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-[10px] uppercase font-black tracking-widest text-gray-300">
            Secure Local Authentication
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
