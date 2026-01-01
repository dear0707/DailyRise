
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Task, DailySnapshot } from '../types';
import { COLORS } from '../constants';

interface DashboardProps {
  tasks: Task[];
  history: DailySnapshot[];
  quote: string;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, history, quote }) => {
  const completedToday = tasks.filter(t => t.completed).length;
  const totalToday = tasks.length;
  const progressPercent = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  // Fake decay visualization logic: if history is empty, show a flat line
  const chartData = history.length > 0 ? history.slice(-7) : [
    { date: 'Mon', score: 0 },
    { date: 'Tue', score: 0 },
    { date: 'Wed', score: 0 },
    { date: 'Thu', score: 0 },
    { date: 'Fri', score: 0 },
    { date: 'Sat', score: 0 },
    { date: 'Sun', score: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Quote */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl lavender-bg flex items-center justify-center text-white text-3xl shrink-0">
          ✨
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1 italic">"{quote}"</h2>
          <p className="text-sm text-gray-500">Your daily motivation to keep rising.</p>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Today's Progress</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold lavender-text">{progressPercent}%</h3>
            <p className="text-sm text-gray-400 mb-1">{completedToday}/{totalToday} Tasks</p>
          </div>
          <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full lavender-bg transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Weekly Average</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold teal-text">
              {history.length > 0 
                ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / history.length) 
                : 0}%
            </h3>
            <p className="text-sm text-gray-400 mb-1">Score</p>
          </div>
          <p className="mt-3 text-xs text-gray-400">Consistency is key to mental clarity.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Streak</p>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-bold text-orange-400">0 Days</h3>
            <p className="text-sm text-gray-400 mb-1">Active</p>
          </div>
          <p className="mt-3 text-xs text-gray-400">Tasks decay if not active!</p>
        </div>
      </div>

      {/* Progress Chart */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Performance Trend</h2>
            <p className="text-sm text-gray-500">Your task completion score over the last 7 days.</p>
          </div>
          <div className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-semibold text-gray-400 uppercase tracking-wider">
            7-Day History
          </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dx={-10} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                cursor={{ stroke: COLORS.accent, strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke={COLORS.primary} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
