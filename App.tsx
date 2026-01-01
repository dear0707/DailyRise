
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TaskManager from './components/TaskManager';
import AIChat from './components/AIChat';
import Reports from './components/Reports';
import AuthModal from './components/AuthModal';
import Profile from './components/Profile';
import { Task, DailySnapshot, UserProfile } from './types';
import { getDailyQuote } from './services/geminiService';

const STORAGE_KEY_TASKS = 'dailyrise_tasks';
const STORAGE_KEY_HISTORY = 'dailyrise_history';
const STORAGE_KEY_USER = 'dailyrise_user';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [history, setHistory] = useState<DailySnapshot[]>([]);
  const [quote, setQuote] = useState("Rise every day, better than before.");

  // Initialize data
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY_USER);
    const savedTasks = localStorage.getItem(STORAGE_KEY_TASKS);
    const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const fetchQuote = async () => {
      const q = await getDailyQuote();
      setQuote(q);
    };
    fetchQuote();
  }, []);

  // Check for inactivity
  useEffect(() => {
    if (user) {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      const lastActive = user.lastActive;
      const now = Date.now();
      
      if (now - lastActive > thirtyDays) {
        console.warn("User has been inactive for 30 days. Triggering analysis.");
      }

      // We only update lastActive in localStorage, not in state to prevent infinite loops
      // but we update it periodically or on tab changes.
    }
  }, [user?.email, activeTab]);

  // Persistent storage sync
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem(STORAGE_KEY_TASKS)) {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    if (history.length > 0 || localStorage.getItem(STORAGE_KEY_HISTORY)) {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    }
  }, [history]);

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(u));
    // If it's a completely new user (no tasks), we might want to switch to tasks tab
    if (tasks.length === 0) {
      setActiveTab('tasks');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    // Optionally clear other data or keep it for the next user on this device
    // localStorage.removeItem(STORAGE_KEY_TASKS);
    // localStorage.removeItem(STORAGE_KEY_HISTORY);
  };

  const handleTaskToggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    updateHistory();
  };

  const handleTaskRevive = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, createdAt: Date.now() } : t));
  };

  const handleAddTask = (title: string, category: Task['category']) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      category,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateUser = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates, lastActive: Date.now() };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
  };

  const updateHistory = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const completedCount = tasks.filter(t => t.completed).length;
    const totalCount = tasks.length;
    const rate = totalCount === 0 ? 0 : completedCount / totalCount;
    
    setHistory(prev => {
      const existingIndex = prev.findIndex(h => h.date === today);
      const newSnapshot = { 
        date: today, 
        completionRate: rate, 
        score: Math.round(rate * 100) 
      };
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = newSnapshot;
        return updated;
      }
      return [...prev, newSnapshot];
    });
  }, [tasks]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard tasks={tasks} history={history} quote={quote} />;
      case 'tasks':
        return <TaskManager tasks={tasks} onToggle={handleTaskToggle} onAdd={handleAddTask} onRevive={handleTaskRevive} />;
      case 'chat':
        return <AIChat />;
      case 'reports':
        return <Reports history={history} tasks={tasks} user={user} />;
      case 'profile':
        return user ? <Profile user={user} onUpdate={handleUpdateUser} onLogout={handleLogout} /> : null;
      default:
        return <Dashboard tasks={tasks} history={history} quote={quote} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-900 selection:bg-lavender-200">
      {!user ? (
        <AuthModal onLogin={handleLogin} />
      ) : (
        <Layout activeTab={activeTab} setActiveTab={setActiveTab} user={user}>
          {renderContent()}
        </Layout>
      )}
    </div>
  );
};

export default App;
