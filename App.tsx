import React, { useState, useEffect } from 'react';
import { ViewState, User, AssessmentTask, TaskStatus, ReportStatus } from './types';
import { MOCK_USER, MOCK_TASKS } from './constants';
import { Login } from './views/Login';
import { Dashboard } from './views/Dashboard';
import { AssessmentIntro } from './views/AssessmentIntro';
import { AssessmentRunner } from './views/AssessmentRunner';
import { Reports } from './views/Reports';
import { ChangePassword } from './views/ChangePassword';
import { generateAssessmentAnalysis } from './services/gemini';
import { Button } from './components/Button';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.LOGIN);
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<AssessmentTask[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<AssessmentTask | null>(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  
  // Notification State
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const handleLogin = () => {
    setUser(MOCK_USER);
    setView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setView(ViewState.LOGIN);
  };

  const handleSelectTask = (task: AssessmentTask) => {
    setSelectedTask(task);
    setView(ViewState.TASK_DETAIL);
  };

  const handleStartTask = () => {
    setView(ViewState.ASSESSMENT);
  };

  // Simulate Report Generation Polling
  const pollForReport = (taskId: string) => {
    // In a real app, this would be a setInterval querying an API
    // Here we simulate a 5-second delay
    setTimeout(() => {
        setTasks(prevTasks => prevTasks.map(t => {
            if (t.id === taskId) {
                return { ...t, reportStatus: ReportStatus.READY };
            }
            return t;
        }));
        
        // Show Toast Notification
        setNotification({
            message: "测评报告已生成完毕",
            type: "success"
        });
        
        // Auto hide notification after 4 seconds
        setTimeout(() => setNotification(null), 4000);

    }, 5000); 
  };

  const handleSubmitAssessment = async (answers: Record<string, number>) => {
    if (!selectedTask) return;

    // 1. Update Task Status locally immediately
    const updatedTasks = tasks.map(t => 
        t.id === selectedTask.id 
        ? { ...t, status: TaskStatus.COMPLETED, reportStatus: ReportStatus.GENERATING } 
        : t
    );
    setTasks(updatedTasks);
    
    // 2. Trigger AI Analysis (Visual feedback)
    setAnalyzing(true);
    setView(ViewState.DASHBOARD); 
    
    // Don't show modal automatically if we want a cleaner flow, 
    // just show a toast saying "Submitted". 
    // BUT, current requirement asks for analysis. Let's keep it but make it quick.
    // For UX, maybe better to just notify success and let background handle it?
    // Let's show a quick success toast instead of full modal blocking.
    
    // 3. Start Polling for PDF
    pollForReport(selectedTask.id);

    // Optional: Still fetch Gemimi analysis for the "My Reports" detail view later
    // For now, we assume submission is successful immediately.
    setNotification({
        message: "提交成功！AI正在分析中...",
        type: "info"
    });
    setTimeout(() => setNotification(null), 3000);
    setAnalyzing(false);
  };

  const renderView = () => {
    switch (view) {
      case ViewState.LOGIN:
        return <Login onLogin={handleLogin} />;
      
      case ViewState.DASHBOARD:
        return user ? (
          <Dashboard 
            user={user} 
            tasks={tasks}
            onSelectTask={handleSelectTask} 
            onViewReports={() => setView(ViewState.REPORTS)}
            onLogout={handleLogout}
            onChangePassword={() => setView(ViewState.CHANGE_PASSWORD)}
            notification={notification}
            onClearNotification={() => setNotification(null)}
          />
        ) : null;
      
      case ViewState.TASK_DETAIL:
        return selectedTask ? (
          <AssessmentIntro 
            task={selectedTask} 
            onBack={() => setView(ViewState.DASHBOARD)}
            onStart={handleStartTask}
          />
        ) : null;
      
      case ViewState.ASSESSMENT:
        return selectedTask ? (
          <AssessmentRunner 
            task={selectedTask} 
            onClose={() => setView(ViewState.DASHBOARD)} 
            onSubmit={handleSubmitAssessment}
          />
        ) : null;

      case ViewState.REPORTS:
        return <Reports onBack={() => setView(ViewState.DASHBOARD)} />;
      
      case ViewState.CHANGE_PASSWORD:
        return <ChangePassword onBack={() => setView(ViewState.DASHBOARD)} />;
      
      default:
        return <div>Error: Unknown View</div>;
    }
  };

  return (
    <>
      {renderView()}
    </>
  );
}