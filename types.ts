export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum ReportStatus {
  NONE = 'NONE',
  GENERATING = 'GENERATING',
  READY = 'READY',
}

export interface User {
  id: string;
  phone: string;
  name: string;
  avatar?: string;
  department?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'LIKERT' | 'CHOICE'; // Likert scale or Multiple Choice
  options?: string[]; // Custom options if not standard Likert
}

export interface AssessmentTask {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  status: TaskStatus;
  createdAt: string;
  completedAt?: string;
  questionCount: number;
  tags?: string[];
  reportStatus: ReportStatus; 
}

export interface AssessmentResult {
  taskId: string;
  answers: Record<string, number>; // QuestionID -> Option Index
  aiSummary?: string;
}

export interface Report {
  id: string;
  taskId: string;
  taskTitle: string;
  generatedAt: string;
  fileSize: string;
  downloadUrl: string;
}

export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  TASK_DETAIL = 'TASK_DETAIL',
  ASSESSMENT = 'ASSESSMENT',
  REPORTS = 'REPORTS',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
}