import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { AssessmentTask, TaskStatus, ReportStatus, User } from '../types';
import { MOCK_TASKS } from '../constants';
import { Button } from '../components/Button';

interface DashboardProps {
  user: User;
  tasks: AssessmentTask[]; // Pass tasks from parent to reflect updates
  onSelectTask: (task: AssessmentTask) => void;
  onViewReports: () => void;
  onLogout: () => void;
  onChangePassword: () => void;
  notification?: { message: string; type: 'success' | 'info' } | null;
  onClearNotification: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
    user, 
    tasks, 
    onSelectTask, 
    onViewReports, 
    onLogout, 
    onChangePassword,
    notification,
    onClearNotification
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'mine'>('home');

  // Calculate Stats
  const completedCount = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
  const totalHours = tasks.reduce((acc, curr) => acc + (curr.status === TaskStatus.COMPLETED ? curr.durationMinutes : 0), 0) / 60;
  
  // Find Priority Task
  const priorityTask = tasks.find(t => t.status === TaskStatus.IN_PROGRESS) || tasks.find(t => t.status === TaskStatus.PENDING);
  const otherTasks = tasks.filter(t => t.id !== priorityTask?.id);

  const getStatusStyle = (status: TaskStatus) => {
      switch(status) {
          case TaskStatus.COMPLETED: return 'bg-accent-50 text-accent-600 border-accent-100';
          case TaskStatus.IN_PROGRESS: return 'bg-brand-50 text-brand-600 border-brand-100';
          default: return 'bg-slate-50 text-slate-500 border-slate-100';
      }
  };

  const getStatusLabel = (status: TaskStatus) => {
      switch(status) {
          case TaskStatus.COMPLETED: return '已完成';
          case TaskStatus.IN_PROGRESS: return '进行中';
          default: return '未开始';
      }
  };

  const renderTaskCard = (task: AssessmentTask, isFeatured = false) => {
    const isCompleted = task.status === TaskStatus.COMPLETED;
    const isGenerating = task.reportStatus === ReportStatus.GENERATING;
    const isReportReady = task.reportStatus === ReportStatus.READY;
    
    if (isFeatured) {
        return (
            <div key={task.id} onClick={() => !isCompleted && onSelectTask(task)} className="bg-gradient-to-br from-slate-800 to-brand-800 rounded-[2rem] p-7 shadow-2xl shadow-brand-900/20 text-white relative overflow-hidden group cursor-pointer transition-all duration-300 active:scale-[0.98]">
                {/* Animated Gradient background */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-5">
                        <span className="bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold px-3 py-1 rounded-full text-brand-100">
                            当前推荐
                        </span>
                        <span className="bg-white/10 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-brand-500 group-hover:border-brand-500 transition-colors">
                            <i className="fa-solid fa-play text-xs ml-0.5 text-white"></i>
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 leading-tight tracking-tight">{task.title}</h3>
                    <p className="text-slate-300 text-sm mb-8 line-clamp-2 leading-relaxed font-medium opacity-90">{task.description}</p>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
                            <span className="flex items-center"><i className="fa-regular fa-clock mr-2 opacity-70"></i> {task.durationMinutes}m</span>
                            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                            <span>{task.questionCount} Questions</span>
                        </div>
                        <button className="bg-white text-brand-900 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-brand-50 transition-colors">
                            {task.status === TaskStatus.IN_PROGRESS ? '继续测评' : '开始测评'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Standard List Item
    return (
      <div key={task.id} onClick={() => !isCompleted && onSelectTask(task)} className={`bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-soft mb-4 relative overflow-hidden transition-all active:scale-[0.99] ${!isCompleted ? 'cursor-pointer hover:border-brand-200 hover:shadow-md' : ''}`}>
        
        {/* Generating Animation Overlay */}
        {isGenerating && (
             <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-20 flex flex-col items-center justify-center">
                <div className="w-3/4 h-1.5 bg-gray-100 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-400 via-accent-400 to-brand-400 animate-shimmer"></div>
                </div>
                <p className="text-xs font-bold text-brand-600 mt-3 animate-pulse">
                    <i className="fa-solid fa-wand-magic-sparkles mr-1"></i> AI 正在生成报告...
                </p>
             </div>
        )}

        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 pr-4">
              <h3 className={`font-bold text-base leading-snug mb-1.5 ${isCompleted ? 'text-slate-500' : 'text-slate-800'}`}>{task.title}</h3>
              <div className="flex items-center gap-2 mt-3">
                {isReportReady ? (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-accent-50 text-accent-600 border border-accent-100 flex items-center animate-fade-in-up">
                        <i className="fa-solid fa-check-double mr-1"></i> 报告已生成
                    </span>
                ) : (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStatusStyle(task.status)}`}>
                        {getStatusLabel(task.status)}
                    </span>
                )}
                
                <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                    {task.durationMinutes} min
                </span>
              </div>
          </div>
          
          {/* Right Side Icon / Button */}
          <div className="shrink-0 z-10">
             {isReportReady ? (
                 <button onClick={(e) => { e.stopPropagation(); onViewReports(); }} className="w-10 h-10 rounded-full bg-accent-500 text-white shadow-lg shadow-accent-200 flex items-center justify-center hover:bg-accent-600 transition-colors">
                      <i className="fa-solid fa-file-arrow-down text-sm"></i>
                 </button>
             ) : isCompleted ? (
                <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center">
                    <i className="fa-solid fa-check text-lg"></i>
                </div>
             ) : (
                 <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <i className="fa-solid fa-chevron-right text-sm"></i>
                 </div>
             )}
          </div>
        </div>
      </div>
    );
  };

  const renderHomeTab = () => (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        {/* Greeting Section */}
        <div className="pt-14 px-6 mb-8">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">CloudEval Workspace</p>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Hello, <span className="text-brand-600">{user.name}</span>
                    </h1>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-md">
                    <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>

        <div className="px-6 space-y-8">
            {/* Priority Section */}
            {priorityTask && (
                <div className="animate-fade-in-up">
                    {renderTaskCard(priorityTask, true)}
                </div>
            )}

            {/* List Section */}
            <div className="animate-fade-in-up" style={{animationDelay: '0.15s'}}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight">全部任务</h3>
                    <span className="text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
                        {otherTasks.length} PENDING
                    </span>
                </div>
                <div className="space-y-2">
                    {otherTasks.map(task => renderTaskCard(task))}
                </div>
            </div>
        </div>
    </div>
  );

  const renderMineTab = () => (
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
          <div className="pt-14 px-6 mb-8 text-center">
               <div className="w-28 h-28 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-brand-500 to-accent-400 shadow-glow mb-5">
                   <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full object-cover border-[4px] border-white" />
               </div>
               <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
               <p className="text-slate-500 text-sm mt-1 font-medium tracking-wide">{user.phone}</p>
               <span className="inline-block mt-4 px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                   研发部 · 高级工程师
               </span>
          </div>

          {/* Stats Grid */}
          <div className="px-6 mb-8">
              <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-5 rounded-[1.25rem] shadow-soft border border-slate-50 flex flex-col items-center text-center">
                      <span className="text-2xl font-extrabold text-slate-900 mb-1">{completedCount}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Completed</span>
                  </div>
                  <div className="bg-white p-5 rounded-[1.25rem] shadow-soft border border-slate-50 flex flex-col items-center text-center">
                      <span className="text-2xl font-extrabold text-brand-600 mb-1">{totalHours.toFixed(0)}h</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hours</span>
                  </div>
                  <div className="bg-white p-5 rounded-[1.25rem] shadow-soft border border-slate-50 flex flex-col items-center text-center">
                      <span className="text-2xl font-extrabold text-accent-500 mb-1">A+</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rank</span>
                  </div>
              </div>
          </div>

          {/* Menu List */}
          <div className="px-6 space-y-4">
              <button onClick={onViewReports} className="w-full bg-white p-4 rounded-[1.25rem] shadow-sm border border-slate-50 flex items-center justify-between group active:scale-[0.99] transition-all hover:border-brand-100">
                  <div className="flex items-center">
                      <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-file-invoice"></i>
                      </div>
                      <div className="text-left">
                          <span className="block font-bold text-slate-800 text-sm">我的报告</span>
                          <span className="block text-xs text-slate-400 mt-1 font-medium">查看历史测评分析</span>
                      </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <i className="fa-solid fa-chevron-right text-slate-300 text-xs group-hover:text-slate-500"></i>
                  </div>
              </button>

              <button onClick={onChangePassword} className="w-full bg-white p-4 rounded-[1.25rem] shadow-sm border border-slate-50 flex items-center justify-between group active:scale-[0.99] transition-all hover:border-brand-100">
                  <div className="flex items-center">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-shield-halved"></i>
                      </div>
                      <div className="text-left">
                          <span className="block font-bold text-slate-800 text-sm">账号安全</span>
                          <span className="block text-xs text-slate-400 mt-1 font-medium">修改密码与隐私</span>
                      </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                      <i className="fa-solid fa-chevron-right text-slate-300 text-xs group-hover:text-slate-500"></i>
                  </div>
              </button>

               <button onClick={onLogout} className="w-full bg-white p-4 rounded-[1.25rem] shadow-sm border border-slate-50 flex items-center justify-between group active:scale-[0.99] transition-all hover:border-red-100 mt-8">
                  <div className="flex items-center">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      </div>
                      <div className="text-left">
                          <span className="block font-bold text-slate-800 text-sm">退出登录</span>
                      </div>
                  </div>
              </button>
          </div>
      </div>
  );

  return (
    <Layout>
      {/* Global Toast Notification */}
      {notification && (
        <div 
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm cursor-pointer animate-slide-down"
            onClick={() => {
                onClearNotification();
                if (notification.message.includes("报告")) onViewReports();
            }}
        >
            <div className="bg-slate-900/90 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center mr-3 shadow-lg shadow-accent-500/30">
                        <i className="fa-solid fa-check text-sm"></i>
                    </div>
                    <div>
                        <p className="text-sm font-bold">{notification.message}</p>
                        <p className="text-[10px] text-slate-300 mt-0.5">点击查看详情</p>
                    </div>
                </div>
                <i className="fa-solid fa-xmark text-slate-400 text-lg ml-4 hover:text-white" onClick={(e) => { e.stopPropagation(); onClearNotification(); }}></i>
            </div>
        </div>
      )}

      {activeTab === 'home' ? renderHomeTab() : renderMineTab()}

      {/* Floating Tab Bar */}
      <div className="absolute bottom-8 left-8 right-8 h-[4.5rem] glass-nav rounded-[2rem] flex justify-between items-center shadow-float z-20 px-2.5">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex-1 h-[3.5rem] flex items-center justify-center rounded-[1.5rem] transition-all duration-500 ${activeTab === 'home' ? 'bg-slate-900 shadow-lg shadow-slate-500/30' : 'hover:bg-slate-50'}`}
        >
          <div className={`flex items-center gap-2.5 ${activeTab === 'home' ? 'text-white' : 'text-slate-400'}`}>
             <i className={`fa-solid fa-house text-lg transition-transform duration-300 ${activeTab === 'home' ? 'scale-100' : 'scale-90'}`}></i>
             {activeTab === 'home' && <span className="text-xs font-bold animate-fade-in-up">首页</span>}
          </div>
        </button>
        
        <div className="w-px h-6 bg-slate-200 mx-1"></div>

        <button 
          onClick={() => setActiveTab('mine')}
          className={`flex-1 h-[3.5rem] flex items-center justify-center rounded-[1.5rem] transition-all duration-500 ${activeTab === 'mine' ? 'bg-slate-900 shadow-lg shadow-slate-500/30' : 'hover:bg-slate-50'}`}
        >
          <div className={`flex items-center gap-2.5 ${activeTab === 'mine' ? 'text-white' : 'text-slate-400'}`}>
            <i className={`fa-solid fa-user text-lg transition-transform duration-300 ${activeTab === 'mine' ? 'scale-100' : 'scale-90'}`}></i>
            {activeTab === 'mine' && <span className="text-xs font-bold animate-fade-in-up">我的</span>}
          </div>
        </button>
      </div>
    </Layout>
  );
};