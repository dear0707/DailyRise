
import React, { useState } from 'react';
import { DailySnapshot, Task, UserProfile } from '../types';
import { predictUserState } from '../services/geminiService';

interface ReportsProps {
  history: DailySnapshot[];
  tasks: Task[];
  user: UserProfile | null;
}

const Reports: React.FC<ReportsProps> = ({ history, tasks, user }) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePredictState = async () => {
    setIsAnalyzing(true);
    const result = await predictUserState(history);
    setPrediction(result);
    setIsAnalyzing(false);
  };

  const getReportSummary = () => {
    return `Weekly Report for DailyRise:\nCompleted tasks this week: ${tasks.filter(t => t.completed).length}\nOverall progress: ${history.length > 0 ? history[history.length - 1].score : 0}%`;
  };

  const shareViaWhatsApp = () => {
    const text = getReportSummary();
    const phone = user?.parentWhatsapp ? user.parentWhatsapp.replace(/\D/g, '') : '';
    const url = phone 
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = "DailyRise Weekly Progress Report";
    const body = `Hello,\n\nHere is the progress report for this week:\n- Tasks Completed: ${tasks.filter(t => t.completed).length}\n- Average Score: ${history.length > 0 ? history[history.length - 1].score : 0}%\n\nBest regards,\nDailyRise App`;
    const mailTo = user?.parentEmail ? `mailto:${user.parentEmail}` : 'mailto:';
    window.location.href = `${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-gray-800">Growth Reports</h2>
        <p className="text-gray-500">Analyze your performance and share results.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* State Analysis Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">AI Well-being Analysis</h3>
            <p className="text-sm text-gray-500 mb-6">
              Our AI analyzes your task patterns to predict your current state of mind and potential burnout risks.
            </p>
            {prediction && (
              <div className="bg-gray-50 p-4 rounded-2xl text-sm text-gray-700 leading-relaxed mb-6 border border-gray-100">
                {prediction}
              </div>
            )}
          </div>
          <button 
            onClick={handlePredictState}
            disabled={isAnalyzing}
            className="w-full py-4 bg-[#73A8B5] text-white rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {isAnalyzing ? "Analyzing Patterns..." : "Run Analysis"}
          </button>
        </div>

        {/* Sharing Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Share with Guardians</h3>
          <p className="text-sm text-gray-500 mb-6">
            Keep your support system updated. 
            {user?.parentEmail || user?.parentWhatsapp ? (
              <span className="block mt-1 font-semibold teal-text">
                Sending to: {user.parentEmail || user.parentWhatsapp}
              </span>
            ) : (
              <span className="block mt-1 italic text-gray-400">
                No guardian set. Configure in Profile.
              </span>
            )}
          </p>
          <div className="space-y-4">
            <button 
              onClick={shareViaWhatsApp}
              className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Share via WhatsApp
            </button>
            <button 
              onClick={shareViaEmail}
              className="w-full py-4 bg-gray-800 text-white rounded-2xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Share via Email
            </button>
          </div>
          {user?.autoReportEnabled && (
            <div className="mt-4 p-3 bg-lavender-50 rounded-xl text-[10px] font-bold lavender-text uppercase tracking-widest text-center border border-lavender-100 animate-pulse">
              Auto-Reporting Enabled
            </div>
          )}
        </div>
      </div>

      {/* Psychology Alert Simulation */}
      <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
        <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Inactivity Alert System
        </h3>
        <p className="text-sm text-red-500 mb-4">
          If our monitor detects 30+ days of total inactivity, an automatic alert is dispatched to our support team of psychologists for a proactive wellness check-in.
        </p>
        <div className="bg-white/50 px-4 py-2 rounded-xl text-xs font-mono text-red-400">
          Monitoring: ACTIVE | Status: STABLE
        </div>
      </section>
    </div>
  );
};

export default Reports;
