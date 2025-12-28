
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Gavel, 
  Users, 
  BarChart3, 
  CreditCard,
  Bell,
  Menu,
  X,
  LogOut,
  Search,
  UserCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import CourseManagement from './pages/CourseManagement';
import LegalPortal from './pages/LegalPortal';
import MarketingSales from './pages/MarketingSales';
import UserManagement from './pages/UserManagement';
import AnalyticsCenter from './pages/AnalyticsCenter';
import AIChatbot from './components/AIChatbot';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState<{id: number, text: string, type: 'success' | 'info'}[]>([]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const menuItems = [
    { id: 'dashboard', label: 'الرئيسية والمؤشرات', icon: LayoutDashboard },
    { id: 'courses', label: 'أكاديمية التدريب', icon: BookOpen },
    { id: 'legal', label: 'المكتبة القانونية', icon: Gavel },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'marketing', label: 'النمو والمبيعات', icon: CreditCard },
    { id: 'analytics', label: 'مركز التقارير', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7f9]" dir="rtl">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-[280px]' : 'w-20'} transition-all duration-300 ease-in-out bg-[#1b4d79] text-white flex flex-col z-50 shadow-xl`}>
        <div className="h-24 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-inner">
                <Gavel className="text-[#1b4d79] w-5 h-5" />
             </div>
             {isSidebarOpen && (
               <div className="flex flex-col whitespace-nowrap">
                  <span className="font-bold text-base">هيئة المحامين</span>
                  <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">Saudi Bar Association</span>
               </div>
             )}
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                  isActive ? 'bg-white/10 text-white border border-white/10 shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-[#b38e44]' : 'text-white/40 group-hover:text-white'} />
                {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
                {isActive && isSidebarOpen && <div className="absolute left-3 w-1.5 h-1.5 bg-[#b38e44] rounded-full"></div>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-6">
             <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-[#1b4d79] transition-all">
               {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => showToast('تم تسجيل الخروج بنجاح')} className="flex items-center gap-2 px-4 py-2 bg-[#1b4d79] text-white rounded-lg font-bold text-[11px] shadow-sm hover:bg-[#153a5c] transition-all">
                <LogOut size={12} />
                <span>الخروج</span>
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8">
           <div className="max-w-7xl mx-auto space-y-8 pb-10">
             {activeTab === 'dashboard' && <Dashboard onAction={showToast} />}
             {activeTab === 'courses' && <CourseManagement onAction={showToast} />}
             {activeTab === 'legal' && <LegalPortal onAction={showToast} />}
             {activeTab === 'marketing' && <MarketingSales onAction={showToast} />}
             {activeTab === 'users' && <UserManagement onAction={showToast} />}
             {activeTab === 'analytics' && <AnalyticsCenter onAction={showToast} />}
           </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  );
};

export default App;
