import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { MOCK_REPORTS } from '../constants';
import { Button } from '../components/Button';

interface ReportsProps {
  onBack: () => void;
}

export const Reports: React.FC<ReportsProps> = ({ onBack }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
        setDownloadingId(null);
        alert('报告已下载到本地');
    }, 2000);
  };

  return (
    <Layout className="bg-slate-50">
        <div className="bg-white p-6 pt-12 pb-6 shadow-sm sticky top-0 z-20">
            <div className="flex items-center">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="text-xl font-bold ml-4 text-slate-900">我的报告文档</h1>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar z-10">
            {MOCK_REPORTS.map((report) => (
                <div key={report.id} className="bg-white p-5 rounded-3xl shadow-soft border border-slate-100 flex flex-col group hover:border-brand-200 transition-all">
                    <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 text-red-500 shadow-sm group-hover:scale-105 transition-transform">
                             <i className="fa-solid fa-file-pdf text-xl"></i>
                        </div>
                        <div className="flex-1 min-w-0 py-0.5">
                            <h3 className="text-slate-900 font-bold text-sm truncate leading-tight">
                                {report.taskTitle}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1.5 font-bold bg-slate-50 inline-block px-2 py-0.5 rounded-md uppercase tracking-wide">
                                PDF · {report.fileSize}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-1">
                        <span className="text-xs text-slate-400 flex items-center font-medium">
                            <i className="fa-regular fa-clock mr-1.5"></i>
                            {report.generatedAt}
                        </span>
                        
                        <Button 
                            variant="secondary" 
                            className="py-2 px-4 text-xs h-8 border-slate-200"
                            onClick={() => handleDownload(report.id)}
                            isLoading={downloadingId === report.id}
                        >
                            {downloadingId === report.id ? '下载中' : '下载 PDF'}
                        </Button>
                    </div>
                </div>
            ))}

            {MOCK_REPORTS.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-20 text-slate-300">
                    <div className="w-24 h-24 bg-slate-100 rounded-[2rem] flex items-center justify-center mb-6 animate-pulse">
                        <i className="fa-solid fa-folder-open text-3xl opacity-50"></i>
                    </div>
                    <p className="text-sm font-bold">暂无报告文档</p>
                    <p className="text-xs mt-1 opacity-70">完成测评后将自动生成</p>
                </div>
            )}
        </div>
    </Layout>
  );
};