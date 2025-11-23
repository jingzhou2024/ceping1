import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { AssessmentTask } from '../types';
import { MOCK_QUESTIONS, LIKERT_OPTIONS } from '../constants';
import { Button } from '../components/Button';

interface AssessmentRunnerProps {
  task: AssessmentTask;
  onClose: () => void;
  onSubmit: (answers: Record<string, number>) => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({ task, onClose, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const questions = MOCK_QUESTIONS; 
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleSelectOption = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    
    // Smooth auto-advance for better flow
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setShowSuccessToast(true);
    // Delay callback to let user see the success toast
    setTimeout(() => {
        onSubmit(answers);
    }, 1200);
  };

  return (
    <Layout className="bg-slate-50">
      {/* Header - Clean & Minimal */}
      <div className="pt-8 px-6 pb-4 bg-white sticky top-0 z-30 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
             <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                 <i className="fa-solid fa-xmark text-lg"></i>
             </button>
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Progress
                </span>
                <span className="text-sm font-bold text-brand-600">
                    {currentQuestionIndex + 1} <span className="text-gray-300">/</span> {questions.length}
                </span>
             </div>
        </div>
        
        {/* Sleek Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div 
                className="bg-gradient-to-r from-brand-500 to-accent-400 h-full rounded-full transition-all duration-500 ease-out relative" 
                style={{ width: `${progress}%` }}
            >
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-white/40 rounded-full blur-sm"></div>
            </div>
        </div>
      </div>

      {/* Question Card Area - Spacious */}
      <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar relative z-10">
        <div className="mb-10 animate-fade-in-up">
             <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                 {currentQuestion.text}
             </h2>
        </div>

        {/* Options - Large Touch Targets */}
        <div className="space-y-3 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            {LIKERT_OPTIONS.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => handleSelectOption(option.value)}
                        className={`w-full py-4 px-6 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center justify-between
                            ${isSelected 
                                ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-[1.02]' 
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 shadow-sm'
                            }
                        `}
                    >
                        <span className={isSelected ? 'font-bold' : ''}>{option.label}</span>
                        {isSelected ? (
                             <i className="fa-solid fa-circle-check text-lg text-accent-300"></i>
                        ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>
                        )}
                    </button>
                );
            })}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="p-6 bg-white border-t border-slate-100 flex space-x-4 sticky bottom-0 z-30 pb-8">
            <Button 
                variant="ghost" 
                className={`flex-1 ${currentQuestionIndex === 0 ? 'invisible' : ''}`}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
                上一题
            </Button>
            
            {currentQuestionIndex === questions.length - 1 ? (
                 <Button 
                    variant="primary" 
                    className="flex-[2] shadow-brand-500/40"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={!answers[currentQuestion.id]}
                >
                    提交评估
                </Button>
            ) : (
                <Button 
                    variant="primary" 
                    className="flex-[2] shadow-brand-500/40"
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    disabled={!answers[currentQuestion.id]}
                >
                    下一题
                </Button>
            )}
      </div>

      {/* Success Toast Overlay */}
      {showSuccessToast && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-6">
              <div className="bg-white text-center rounded-[2rem] p-10 shadow-2xl animate-fade-in-up w-full max-w-xs">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-400 to-brand-500 text-white flex items-center justify-center mb-6 mx-auto shadow-glow">
                      <i className="fa-solid fa-check text-3xl"></i>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl mb-2">提交成功!</h3>
                  <p className="text-sm text-slate-500">正在后台为您生成报告...</p>
              </div>
          </div>
      )}
    </Layout>
  );
};