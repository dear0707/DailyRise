
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: TaskCategory;
  createdAt: number;
}

export type TaskCategory = 'Health' | 'Work' | 'Learning' | 'Personal';

export interface DailySnapshot {
  date: string; // YYYY-MM-DD
  completionRate: number; // 0 to 1
  score: number; // 0 to 100
}

export interface UserProfile {
  name: string;
  email: string;
  lastActive: number;
  picture?: string;
  parentEmail?: string;
  parentWhatsapp?: string;
  autoReportEnabled?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
