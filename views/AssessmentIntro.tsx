import React from 'react';
import { Layout } from '../components/Layout';
import { AssessmentTask } from '../types';
import { Button } from '../components/Button';

interface AssessmentIntroProps {
  task: AssessmentTask;
  onBack: () => void;
  onStart: () => void;
}

export const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ task, onBack, onStart }) => {
  return (
    <Layout className="bg-white">
      <div className="flex flex-col h-full">
        {/* Modern Header with Ocean Pattern */}
        <div className="relative bg-gradient-to-br from-slate-900 to-brand-700 text-white p-6 pt-12 pb-16 rounded-b-[2.5rem] shadow-2xl overflow-hidden shrink-0 z-10">
             {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

            <div className="flex justify-between items-center relative z-20">
                <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md">
                    <i className="fa-solid fa-arrow-left text-sm"></i>
                </button>
            </div>
            
            <div className="mt-6 text-center relative z-10">
                 <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mx-auto mb-5 flex items-center justify-center text-2xl shadow-inner border border-white/20">
                    <i className="fa-solid fa-clipboard-question text-accent-400"></i>
                 </div>
                <h1 className="text-xl font-bold leading-relaxed px-4 tracking-tight">
                    {task.title}
                </h1>
                <div className="flex justify-center mt-4 gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/10 text-gray-200">
                        {task.tags?.[0] || '综合测评'}
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/10 text-gray-200">
                        {task.durationMinutes} 分钟
                    </span>
                </div>
            </div>
        </div>

        {/* Floating Content Card */}
        <div className="flex-1 -mt-10 px-6 overflow-y-auto no-scrollbar pb-8 relative z-20">
            <div className="bg-white rounded-[2rem] p-8 shadow-float space-y-8 border border-gray-50">
                
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-brand-600 uppercase tracking-wider flex items-center">
                        <span className="w-1 h-4 bg-brand-500 rounded-full mr-2"></span>
                        测评简介
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm font-medium">
                        {task.description}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <i className="fa-regular fa-clock text-brand-600 mb-3 block text-xl"></i>
                        <span className="block text-xs text-gray-400 font-medium mb-0.5">预计用时</span>
                        <span className="font-bold text-slate-800 text-lg">{task.durationMinutes} min</span>
                     </div>
                     <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <i className="fa-solid fa-list-ol text-accent-500 mb-3 block text-xl"></i>
                        <span className="block text-xs text-gray-400 font-medium mb-0.5">题目数量</span>
                        <span className="font-bold text-slate-800 text-lg">{task.questionCount} 题</span>
                     </div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-brand-600 uppercase tracking-wider flex items-center">
                         <span className="w-1 h-4 bg-brand-500 rounded-full mr-2"></span>
                         注意事项
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex items-start text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <i className="fa-solid fa-check-circle text-accent-500 mt-0.5 mr-3 text-sm"></i>
                            <span>请保持环境安静，集中注意力</span>
                        </li>
                        <li className="flex items-start text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <i className="fa-solid fa-check-circle text-accent-500 mt-0.5 mr-3 text-sm"></i>
                            <span>中途退出可自动保存进度</span>
                        </li>
                         <li className="flex items-start text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                            <i className="fa-solid fa-check-circle text-accent-500 mt-0.5 mr-3 text-sm"></i>
                            <span>提交后系统将自动生成 AI 分析报告</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 pb-8 sticky bottom-0 z-30">
            <Button fullWidth onClick={onStart} className="shadow-brand-500/40 text-lg py-4">
                开始测评
            </Button>
        </div>
      </div>
    </Layout>
  );
};