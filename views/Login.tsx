import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('18159048729');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <Layout className="bg-white/80">
      <div className="flex-1 flex flex-col px-8 justify-center relative z-10">
        
        <div className="mb-12 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-[2rem] mx-auto mb-8 shadow-glow flex items-center justify-center transform -rotate-3 group hover:rotate-0 transition-transform duration-500">
                <i className="fa-solid fa-chart-simple text-4xl text-white opacity-90"></i>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">CloudEval</h1>
            <p className="text-brand-600 font-medium text-sm tracking-wide uppercase opacity-80">Intelligent Assessment Platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.15s'}}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">手机号</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa-solid fa-mobile-screen text-gray-400 group-focus-within:text-brand-500 transition-colors"></i>
                </div>
                <input 
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-gray-50/80 border border-transparent text-gray-900 rounded-2xl focus:ring-2 focus:ring-brand-500/20 focus:bg-white focus:border-brand-200 transition-all outline-none font-semibold"
                placeholder="请输入手机号"
                />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-wider">密码</label>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fa-solid fa-lock text-gray-400 group-focus-within:text-brand-500 transition-colors"></i>
                </div>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-gray-50/80 border border-transparent text-gray-900 rounded-2xl focus:ring-2 focus:ring-brand-500/20 focus:bg-white focus:border-brand-200 transition-all outline-none font-semibold"
                placeholder="请输入密码"
                />
            </div>
          </div>

          <div className="pt-6">
            <Button type="submit" fullWidth isLoading={loading} className="shadow-brand-500/30 h-14 text-lg">
              立即登录 <i className="fa-solid fa-arrow-right ml-2 opacity-80 text-sm"></i>
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};