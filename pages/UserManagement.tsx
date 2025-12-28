
import React, { useState } from 'react';
import { 
  Shield, Lock, UserPlus, Fingerprint, ShieldAlert, Check, Activity, 
  ArrowRight, Mail, User, Briefcase, Building, Save, Clock, 
  AlertTriangle, CheckCircle, Search, Filter, Database, Smartphone,
  Key, History, ShieldCheck
} from 'lucide-react';

const roles = [
  { name: 'مدير النظام', count: 2, desc: 'تحكم شامل' },
  { name: 'مدير برنامج', count: 6, desc: 'إدارة الأكاديمية' },
  { name: 'مدير محتوى', count: 12, desc: 'إدارة المنشورات' },
  { name: 'محاسب مالي', count: 4, desc: 'إدارة SAP' },
  { name: 'مدرب معتمد', count: 165, desc: 'إدارة الطلاب' },
];

const permissions = [
  'إنشاء وتعديل البرامج التدريبية المركزية',
  'إصدار الشهادات الإلكترونية واعتماد الباركود',
  'إدارة واجهات المنصة وبناء الصفحات',
  'الوصول لبيانات المبيعات والربط مع SAP',
  'إضافة وتعديل المنشورات القانونية',
  'تغيير لغة المنصة والترجمة الذكية',
];

const mockLogs = [
  { id: 1, action: 'تغيير صلاحيات دور', user: 'أحمد المحمد', target: 'مدير محتوى', time: 'منذ دقيقتين', status: 'warning' },
  { id: 2, action: 'محاولة تسجيل دخول فاشلة', user: 'غير معروف', target: 'نظام الإدارة', time: 'منذ 15 دقيقة', status: 'critical' },
  { id: 3, action: 'تحديث مصفوفة الأمان', user: 'د. خالد السديري', target: 'الأمان العام', time: 'منذ ساعة', status: 'success' },
  { id: 4, action: 'تصدير تقرير مالي', user: 'سارة العتيبي', target: 'وحدة SAP', time: 'منذ ساعتين', status: 'info' },
];

const UserManagement: React.FC<{onAction: (t: string, type?: 'success' | 'info') => void}> = ({ onAction }) => {
  const [view, setView] = useState<'list' | 'add_user' | 'security_logs' | 'nafath_details' | 'audit_details'>('list');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onAction('تم حفظ مصفوفة الصلاحيات المحدثة بنجاح');
    }, 1500);
  };

  const MainListView = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-7 rounded-2xl border-l-4 border-[#b38e44] shadow-sm">
         <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#1b4d79]"><Shield size={24} /></div>
            <div>
               <h1 className="text-xl font-bold text-[#1b4d79]">إدارة الأدوار والصلاحيات</h1>
               <p className="text-slate-400 text-xs font-medium mt-1">نظام تخصيص مستويات الوصول لجميع الفئات.</p>
            </div>
         </div>
         <button onClick={() => { setView('add_user'); onAction('فتح نموذج إنشاء حساب جديد', 'info'); }} className="bg-[#1b4d79] text-white px-6 py-2.5 rounded-xl font-bold text-[11px] shadow-lg hover:bg-[#153a5c] transition-all flex items-center gap-2"><UserPlus size={14} /> إضافة حساب</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         {roles.map((role, i) => (
           <div key={i} onClick={() => onAction(`تعديل صلاحيات ${role.name}`, 'info')} className="sba-card p-5 hover:border-[#b38e44]/20 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                 <div className="p-2 bg-slate-50 rounded-lg text-slate-300 group-hover:text-[#b38e44]"><Shield size={18} /></div>
                 <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{role.count}</span>
              </div>
              <h4 className="text-[13px] font-bold text-slate-700">{role.name}</h4>
              <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-tight">{role.desc}</p>
           </div>
         ))}
      </div>

      <div className="sba-card overflow-hidden">
         <div className="px-8 py-6 bg-slate-50/30 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <h3 className="text-base font-bold text-[#1b4d79] flex items-center gap-2"><Lock size={20} className="text-[#b38e44]" /> مصفوفة صلاحيات الوصول</h3>
            <div className="flex gap-2">
               <button onClick={() => { setView('security_logs'); onAction('جاري عرض سجل الأمان...', 'info'); }} className="px-5 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 flex items-center gap-2"><Activity size={12} /> سجل الأمان</button>
               <button onClick={handleSave} disabled={isSaving} className="px-6 py-2 bg-[#1b4d79] text-white rounded-lg text-[11px] font-bold shadow-md disabled:opacity-50">{isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</button>
            </div>
         </div>

         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-right border-collapse min-w-[800px]">
               <thead>
                  <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 bg-slate-50/20">
                     <th className="py-5 px-8 text-right">المهمة / الصلاحية</th>
                     {roles.map((r, i) => <th key={i} className="py-5 text-center px-4 font-bold">{r.name}</th>)}
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {permissions.map((action, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-all">
                       <td className="py-4 px-8 font-bold text-slate-700 text-xs">{action}</td>
                       {roles.map((_, ri) => (
                         <td key={ri} className="py-4 text-center px-4">
                            <input type="checkbox" defaultChecked={ri === 0 || (ri === 1 && i < 3)} className="w-4 h-4 rounded border-slate-200 text-[#1b4d79] cursor-pointer" />
                         </td>
                       ))}
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <SecurityItem 
            title="المصادقة الثنائية (نفاذ)" 
            icon={<Fingerprint size={28}/>} 
            color="navy" 
            onAction={() => { setView('nafath_details'); onAction('عرض تفاصيل نفاذ', 'info'); }} 
         />
         <SecurityItem 
            title="سجلات التدقيق الكاملة" 
            icon={<ShieldAlert size={28}/>} 
            color="gold" 
            onAction={() => { setView('audit_details'); onAction('عرض سجلات التدقيق', 'info'); }} 
         />
      </div>
    </div>
  );

  const AddUserView = () => (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-left-4 duration-500">
       <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
             <ArrowRight size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#1b4d79]">إضافة حساب موظف جديد</h1>
       </div>

       <div className="sba-card p-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={12}/> الاسم الرباعي</label>
                <input type="text" placeholder="أدخل الاسم الكامل" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none" />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Mail size={12}/> البريد الرسمي</label>
                <input type="email" placeholder="example@sba.sa" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none" />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Briefcase size={12}/> الدور الوظيفي</label>
                <select className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none">
                   {roles.map(r => <option key={r.name}>{r.name}</option>)}
                </select>
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Building size={12}/> الإدارة / القسم</label>
                <input type="text" placeholder="مثلاً: وحدة التدريب" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none" />
             </div>
          </div>

          <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 mb-10 flex items-start gap-4">
             <Shield className="text-[#1b4d79] shrink-0" size={24} />
             <div>
                <p className="text-xs font-bold text-[#1b4d79]">تلقائياً، سيتم إرسال دعوة التحقق عبر نفاذ</p>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">سيتم ربط الحساب برقم الهوية الوطنية المسجل بمجرد قبول الموظف للدعوة.</p>
             </div>
          </div>

          <div className="flex items-center justify-between pt-10 border-t border-slate-50">
             <button onClick={() => setView('list')} className="text-xs font-bold text-slate-400 hover:text-[#1b4d79]">إلغاء</button>
             <button onClick={() => { onAction('تم إنشاء الحساب وإرسال دعوة التحقق'); setView('list'); }} className="px-10 py-3 bg-[#1b4d79] text-white rounded-xl text-xs font-bold shadow-xl hover:bg-[#153a5c] flex items-center gap-2">
                <Save size={16} /> حفظ وإنشاء الحساب
             </button>
          </div>
       </div>
    </div>
  );

  const LogsView = ({ title }: { title: string }) => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={() => setView('list')} className="p-2 hover:bg-white rounded-full transition-all text-slate-400">
                <ArrowRight size={20} />
             </button>
             <h1 className="text-xl font-bold text-[#1b4d79]">{title}</h1>
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 flex items-center gap-2"><Filter size={14} /> تصفية</button>
             <button onClick={() => onAction('جاري تصدير السجل بصيغة Excel...')} className="px-4 py-2 bg-[#5c7c32] text-white rounded-lg text-[10px] font-bold flex items-center gap-2">تصدير التقرير</button>
          </div>
       </div>

       <div className="sba-card overflow-hidden">
          <div className="divide-y divide-slate-50">
             {mockLogs.map(log => (
               <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                  <div className="flex items-center gap-5">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        log.status === 'critical' ? 'bg-red-50 border-red-100 text-red-500' :
                        log.status === 'warning' ? 'bg-orange-50 border-orange-100 text-orange-500' :
                        log.status === 'success' ? 'bg-green-50 border-green-100 text-[#5c7c32]' : 'bg-blue-50 border-blue-100 text-blue-500'
                     }`}>
                        {log.status === 'critical' ? <AlertTriangle size={18} /> : <History size={18} />}
                     </div>
                     <div>
                        <h5 className="text-xs font-bold text-slate-700">{log.action}</h5>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">بواسطة: <span className="text-[#1b4d79] font-bold">{log.user}</span> • المستهدف: {log.target}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1"><Clock size={12} /> {log.time}</span>
                     <button className="p-2 text-slate-300 hover:text-[#1b4d79] opacity-0 group-hover:opacity-100 transition-all"><Database size={16} /></button>
                  </div>
               </div>
             ))}
          </div>
          <div className="p-4 bg-slate-50 text-center">
             <button className="text-[10px] font-bold text-slate-500 hover:text-[#1b4d79]">عرض المزيد من السجلات</button>
          </div>
       </div>
    </div>
  );

  const NafathDetailsView = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-12">
       <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('list')} className="p-2 hover:bg-white rounded-full transition-all text-slate-400">
             <ArrowRight size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#1b4d79]">تفاصيل الربط مع نفاذ (IAM)</h1>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="sba-card p-6 bg-[#5c7c32] text-white">
             <p className="text-[10px] font-bold text-white/60 uppercase">حالة الربط</p>
             <h3 className="text-lg font-black mt-1 flex items-center gap-2">متصل ونشط <ShieldCheck size={20} /></h3>
          </div>
          <div className="sba-card p-6">
             <p className="text-[10px] font-black text-slate-400 uppercase">عمليات التحقق اليوم</p>
             <h3 className="text-lg font-black text-[#1b4d79] mt-1">1,420 عملية</h3>
          </div>
          <div className="sba-card p-6">
             <p className="text-[10px] font-black text-slate-400 uppercase">متوسط سرعة الاستجابة</p>
             <h3 className="text-lg font-black text-[#1b4d79] mt-1">0.4 ثانية</h3>
          </div>
       </div>

       <div className="sba-card p-8 bg-white">
          <h3 className="text-sm font-bold text-[#1b4d79] mb-8 flex items-center gap-2"><Smartphone size={18} className="text-[#b38e44]" /> إعدادات التحقق المتقدمة</h3>
          <div className="space-y-6">
             <SettingsToggle label="إلزامية تسجيل الدخول عبر نفاذ لكافة الإداريين" desc="لن يتمكن أي موظف إداري من الدخول بكلمة السر التقليدية فقط." defaultChecked />
             <SettingsToggle label="طلب إعادة التحقق عند إجراء عمليات حساسة" desc="مثل حذف البرامج التدريبية أو تعديل البيانات المالية." defaultChecked />
             <SettingsToggle label="ربط الأجهزة الموثوقة (Browser Binding)" desc="التحقق من بصمة المتصفح والجهاز المستخدم لكل حساب." />
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end">
             <button onClick={() => onAction('تم تحديث إعدادات الأمان بنجاح')} className="px-8 py-3 bg-[#1b4d79] text-white rounded-xl text-xs font-bold shadow-lg">حفظ الإعدادات</button>
          </div>
       </div>
    </div>
  );

  const SettingsToggle = ({ label, desc, defaultChecked }: any) => (
    <div className="flex items-center justify-between gap-6">
       <div>
          <h5 className="text-xs font-bold text-slate-700">{label}</h5>
          <p className="text-[10px] text-slate-400 mt-1">{desc}</p>
       </div>
       <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5c7c32]"></div>
       </label>
    </div>
  );

  return (
    <div className="min-h-screen">
       {view === 'list' && <MainListView />}
       {view === 'add_user' && <AddUserView />}
       {view === 'security_logs' && <LogsView title="سجل الأمان الشامل" />}
       {view === 'audit_details' && <LogsView title="سجلات التدقيق الكاملة" />}
       {view === 'nafath_details' && <NafathDetailsView />}
    </div>
  );
};

const SecurityItem = ({ title, icon, color, onAction }: any) => (
  <div className="sba-card p-8 flex items-start gap-6 group hover:border-[#1b4d79]/20 transition-all">
     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
       color === 'navy' ? 'bg-blue-50 text-[#1b4d79]' : 'bg-orange-50 text-[#b38e44]'
     }`}>{icon}</div>
     <div>
        <h4 className="text-sm font-bold text-slate-800 mb-2">{title}</h4>
        <p className="text-[11px] text-slate-400 font-bold leading-relaxed">نظام تشفير وحماية متقدم وفق المعايير الوطنية السعودية.</p>
        <button onClick={onAction} className="mt-4 text-[10px] font-black flex items-center gap-1.5 hover:underline">عرض التفاصيل <Check size={12}/></button>
     </div>
  </div>
);

export default UserManagement;
