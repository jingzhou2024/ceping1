import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

interface ChangePasswordProps {
  onBack: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onBack();
      alert("密码修改成功");
    }, 1000);
  };

  return (
    <Layout className="bg-white">
      <div className="p-6 pt-12">
        <div className="flex items-center mb-8">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <h1 className="text-xl font-bold ml-4 text-gray-900">修改密码</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
           <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 ml-1">当前密码</label>
            <input 
              type="password"
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:border-brand-300 focus:bg-white outline-none transition-all"
              placeholder="请输入当前密码"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 ml-1">新密码</label>
            <input 
              type="password"
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:border-brand-300 focus:bg-white outline-none transition-all"
              placeholder="请输入新密码"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 ml-1">确认新密码</label>
            <input 
              type="password"
              className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:border-brand-300 focus:bg-white outline-none transition-all"
              placeholder="再次输入新密码"
            />
          </div>

          <div className="pt-8">
             <Button type="submit" fullWidth isLoading={loading}>
                 确认修改
             </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};