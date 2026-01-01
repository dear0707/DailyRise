
import React, { useState } from 'react';
import { Task, TaskCategory } from '../types';

interface TaskManagerProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onAdd: (title: string, category: TaskCategory) => void;
  onRevive?: (id: string) => void;
}

const DECAY_THRESHOLD_DAYS = 3;

const TaskManager: React.FC<TaskManagerProps> = ({ tasks, onToggle, onAdd, onRevive }) => {
  const [newTitle, setNewTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('Personal');

  const categories: TaskCategory[] = ['Health', 'Work', 'Learning', 'Personal'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAdd(newTitle, category);
    setNewTitle('');
  };

  const getTaskAge = (createdAt: number) => {
    const diffMs = Date.now() - createdAt;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-gray-800">Daily To-Do</h2>
        <p className="text-gray-500">Uncompleted tasks decay after {DECAY_THRESHOLD_DAYS} days of inactivity.</p>
      </header>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-3 focus:ring-2 focus:ring-[#D1B0FF] transition-all"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
          className="bg-gray-50 border-none rounded-2xl px-6 py-3 focus:ring-2 focus:ring-[#D1B0FF] transition-all cursor-pointer"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button 
          type="submit"
          className="lavender-bg text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all active:scale-95"
        >
          Add
        </button>
      </form>

      {/* Task Lists Grouped by Category */}
      <div className="space-y-6">
        {categories.map(cat => {
          const catTasks = tasks.filter(t => t.category === cat);
          if (catTasks.length === 0) return null;
          
          // Sort decayed tasks to the bottom of the category
          const sortedTasks = [...catTasks].sort((a, b) => {
            const aDecayed = !a.completed && getTaskAge(a.createdAt) >= DECAY_THRESHOLD_DAYS;
            const bDecayed = !b.completed && getTaskAge(b.createdAt) >= DECAY_THRESHOLD_DAYS;
            if (aDecayed && !bDecayed) return 1;
            if (!aDecayed && bDecayed) return -1;
            return b.createdAt - a.createdAt;
          });
          
          return (
            <div key={cat} className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 px-2">{cat}</h3>
              <div className="space-y-2">
                {sortedTasks.map(task => {
                  const age = getTaskAge(task.createdAt);
                  const isDecayed = !task.completed && age >= DECAY_THRESHOLD_DAYS;

                  return (
                    <div 
                      key={task.id}
                      onClick={() => onToggle(task.id)}
                      className={`group bg-white p-4 rounded-2xl shadow-sm border transition-all duration-300 flex items-center gap-4 cursor-pointer hover:shadow-md ${
                        task.completed 
                          ? 'border-gray-100 opacity-60 bg-gray-50/50 scale-[0.99]' 
                          : isDecayed
                            ? 'border-red-100 opacity-50 grayscale bg-gray-50/20'
                            : 'border-gray-100 hover:border-[#D1B0FF] animate-pop'
                      }`}
                    >
                      {/* Animated Checkbox Container */}
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative ${
                        task.completed 
                          ? 'lavender-bg border-[#D1B0FF] rotate-[360deg]' 
                          : isDecayed
                            ? 'border-gray-300'
                            : 'border-gray-200 group-hover:border-[#D1B0FF]'
                      }`}>
                        {task.completed && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={3.5} 
                              d="M5 13l4 4L19 7" 
                              className="animate-draw-check"
                            />
                          </svg>
                        )}
                        {isDecayed && (
                           <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                        )}
                      </div>

                      {/* Task Title with Strikethrough Animation */}
                      <div className="flex-1 relative overflow-hidden py-1">
                        <span className={`block font-semibold transition-all duration-500 ${
                          task.completed ? 'text-gray-400 translate-x-1' : isDecayed ? 'text-gray-400 italic' : 'text-gray-700'
                        }`}>
                          {task.title}
                        </span>
                        {/* Smooth CSS strikethrough */}
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] lavender-bg transition-all duration-500 ease-in-out pointer-events-none rounded-full ${
                          task.completed ? 'w-full opacity-40' : 'w-0 opacity-0'
                        }`} />
                      </div>

                      {/* Right-side Indicators (Decay Badge or Revive button) */}
                      <div className="flex items-center gap-2">
                        {isDecayed && (
                          <>
                            <span className="text-[10px] font-bold uppercase tracking-tighter text-red-400 bg-red-50 px-2 py-0.5 rounded-full">
                              Stale ({age}d)
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onRevive) onRevive(task.id);
                              }}
                              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-teal-500 transition-colors"
                              title="Revive Task"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                          </>
                        )}
                        {task.completed && (
                          <span className="text-[10px] font-bold uppercase tracking-tighter lavender-text bg-lavender-100/30 px-2 py-0.5 rounded-full animate-in fade-in zoom-in duration-500">
                            Done
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="text-center py-20 animate-in fade-in duration-700">
            <div className="text-5xl mb-4 opacity-30 transform hover:scale-110 transition-transform">📭</div>
            <p className="text-gray-400 font-medium">Your day is a blank canvas. Add a task!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
