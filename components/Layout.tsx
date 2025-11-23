import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen w-full bg-slate-100 flex justify-center items-center overflow-hidden font-sans selection:bg-brand-200">
      {/* Decorative Background Blobs - Ocean Tech Theme */}
      <div className="fixed top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-blue-100 blur-[120px] opacity-50 pointer-events-none animate-pulse-slow"></div>
      <div className="fixed bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-teal-100 blur-[120px] opacity-50 pointer-events-none animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>

      <div className={`w-full max-w-md bg-white/70 sm:bg-white shadow-2xl sm:rounded-[2.5rem] relative flex flex-col h-[100dvh] sm:h-[90dvh] sm:max-h-[850px] overflow-hidden backdrop-blur-lg sm:border sm:border-white/60 transition-all duration-500 ${className}`}>
        {children}
      </div>
    </div>
  );
};