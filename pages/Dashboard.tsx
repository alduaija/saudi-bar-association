
import React, { useState } from 'react';
import { 
  Users, UserCheck, BookOpen, TrendingUp, DollarSign, Target, Layers, Award, ArrowUpRight, Clock, Star, Download
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// البيانات الموحدة عبر المنصة
const SHARED_STATS = {
  trainees: "24,102",
  trainers: "184",
  content: "3,420",
  revenue: "SAR 3.4M",
  marketingGrowth: "14.2%",
  visionProgress: "84%"
};

const growthData = [
  { name: 'يناير', sales: 4200, marketing: 2400 },
  { name: 'فبراير', sales: 5800, marketing: 3100 },
  { name: 'مارس', sales: 5100, marketing: 2800 },
  { name: 'أبريل', sales: 7900, marketing: 4200 },
  { name: 'مايو', sales: 7200, marketing: 3900 },
  { name: 'يونيو', sales: 9400, marketing: 4800 },
];

const contentDistribution = [
  { name: 'مرئي', value: 45, color: '#1b4d79' },
  { name: 'نصي', value: 30, color: '#b38e44' },
  { name: 'صوتي', value: 15, color: '#5c7c32' },
  { name: 'ملفات', value: 10, color: '#94a3b8' },
];

const trainers = [
  { name: 'د. خالد السديري', specialty: 'القانون التجاري', courses: 12, rating: 4.9 },
  { name: 'أ. نورة العتيبي', specialty: 'المهارات العملية', courses: 8, rating: 4.8 },
  { name: 'د. علي القحطاني', specialty: 'القانون الجنائي', courses: 15, rating: 4.7 },
  { name: 'أ. فهد الشمري', specialty: 'الأنظمة الدولية', courses: 6, rating: 4.9 },
  { name: 'د. سارة الدوسري', specialty: 'قانون العمل', courses: 9, rating: 4.8 },
  { name: 'أ. محمد بن راشد', specialty: 'المرافعات الشرعية', courses: 11, rating: 4.6 },
];

const Dashboard: React.FC<{onAction: (t: string, type?: 'success'|'info') => void}> = ({ onAction }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onAction('تم تصدير التقرير السنوي بصيغة PDF بنجاح');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-2xl border-r-4 border-[#b38e44] shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#1b4d79]">لوحة التحكم الشاملة</h1>
          <p className="text-slate-400 text-sm font-bold mt-1">مؤشرات الأداء اللحظية الموحدة لعام 2024.</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#1b4d79] text-white rounded-lg text-[11px] font-bold shadow-md hover:bg-[#153a5c] transition-all disabled:opacity-50"
        >
          {isExporting ? 'جاري التصدير...' : <><Download size={14}/> تصدير التقرير</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
         <KPICard title="المتدربين" value={SHARED_STATS.trainees} change="+8%" icon={<Users size={18}/>} color="navy" />
         <KPICard title="المدربين" value={SHARED_STATS.trainers} change="+2%" icon={<UserCheck size={18}/>} color="green" />
         <KPICard title="المحتوى" value={SHARED_STATS.content} change="+12%" icon={<BookOpen size={18}/>} color="gold" />
         <KPICard title="التسويق" value={SHARED_STATS.marketingGrowth} change="+3.5%" icon={<Target size={18}/>} color="navy" />
         <KPICard title="المبيعات" value={SHARED_STATS.revenue} change="+15%" icon={<DollarSign size={18}/>} color="gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 sba-card p-8">
            <h3 className="text-base font-black text-[#1b4d79] flex items-center gap-2 mb-8">
               <TrendingUp className="text-[#b38e44]" size={20} />
               مؤشرات النمو والمبيعات
            </h3>
            <div className="h-[320px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                     <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1b4d79" stopOpacity={0.1}/><stop offset="95%" stopColor="#1b4d79" stopOpacity={0}/></linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                     <Tooltip contentStyle={{borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', fontFamily: 'Cairo'}} />
                     <Area type="monotone" dataKey="sales" stroke="#1b4d79" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="sba-card p-8 flex flex-col">
            <h3 className="text-base font-black text-[#1b4d79] mb-8 flex items-center gap-2">
               <Layers className="text-[#5c7c32]" size={20} />
               توزيع المحتوى
            </h3>
            <div className="space-y-6 flex-1">
               {contentDistribution.map((item, idx) => (
                 <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-bold">
                       <span className="text-slate-500">{item.name}</span>
                       <span className="text-[#1b4d79]">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                       <div className="h-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="sba-card p-8">
            <h3 className="text-base font-black text-[#1b4d79] flex items-center gap-2 mb-8">
               <Award className="text-[#b38e44]" size={20} />
               المدربين الأكثر تفاعلاً
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
               {trainers.map((t, idx) => (
                 <TrainerRow key={idx} {...t} onAction={onAction} />
               ))}
            </div>
         </div>

         <div className="sba-card p-8 bg-[#1b4d79] text-white">
            <h3 className="text-base font-black flex items-center gap-2 mb-8">
               <Target size={20} className="text-[#b38e44]" />
               فعالية القنوات التسويقية
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <MarketingBox label="البريد الإلكتروني" val="28%" color="green" onAction={onAction} />
               <MarketingBox label="رسائل SMS" val="94%" color="gold" onAction={onAction} />
               <MarketingBox label="الإعلانات" val="12.5%" color="navy" onAction={onAction} />
               <MarketingBox label="العمولة" val="4.2%" color="green" onAction={onAction} />
            </div>
            <button onClick={() => onAction('جاري فتح إعدادات الحملات...', 'info')} className="w-full mt-8 py-3 bg-[#b38e44] text-white rounded-xl font-bold text-xs shadow-lg">إدارة الحملات الإعلانية</button>
         </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, change, icon, color }: any) => {
  const styles: any = {
    navy: 'bg-blue-50 text-[#1b4d79] border-blue-100',
    green: 'bg-[#f4f7f2] text-[#5c7c32] border-[#e8f0e0]',
    gold: 'bg-orange-50 text-[#b38e44] border-orange-100',
  };
  return (
    <div className="sba-card p-6 border-none shadow-sm">
       <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-lg ${styles[color]} border`}>{icon}</div>
          <span className="text-[9px] font-black text-[#5c7c32] bg-[#f4f7f2] px-2 py-1 rounded-md border border-[#e8f0e0] flex items-center gap-1">
             <ArrowUpRight size={10}/> {change}
          </span>
       </div>
       <p className="text-slate-400 text-[10px] font-black uppercase tracking-wider">{title}</p>
       <h4 className="text-xl font-black text-[#1b4d79] mt-1">{value}</h4>
    </div>
  );
};

const TrainerRow = ({ name, specialty, courses, rating, onAction }: any) => (
  <div onClick={() => onAction(`عرض ملف المدرب: ${name}`, 'info')} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-50 hover:bg-white hover:border-slate-200 transition-all cursor-pointer">
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#1b4d79] text-white flex items-center justify-center font-black text-xs">{name[0]}</div>
        <div>
           <h5 className="text-xs font-bold text-slate-700">{name}</h5>
           <p className="text-[9px] text-slate-400 font-bold uppercase">{specialty}</p>
        </div>
     </div>
     <div className="flex items-center gap-4">
        <div className="text-center">
           <p className="text-[9px] text-slate-300 font-bold uppercase">البرامج</p>
           <p className="text-xs font-black text-[#1b4d79]">{courses}</p>
        </div>
        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100">
           <Star size={10} className="text-[#b38e44] fill-[#b38e44]" />
           <span className="text-[10px] font-black text-slate-700">{rating}</span>
        </div>
     </div>
  </div>
);

const MarketingBox = ({ label, val }: any) => (
  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
     <p className="text-[10px] font-bold text-blue-200/50 uppercase mb-1">{label}</p>
     <h4 className="text-xl font-black">{val}</h4>
  </div>
);

export default Dashboard;
