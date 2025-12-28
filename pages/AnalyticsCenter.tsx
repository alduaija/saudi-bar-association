
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import { 
  Download, Filter, Calendar, TrendingUp, Users, BookOpen, 
  DollarSign, Target, Award, PieChart as PieIcon, FileText, 
  ChevronDown, RefreshCw, Zap, ShieldCheck, Wallet, CreditCard,
  Briefcase, GraduationCap, CheckCircle2, TrendingDown
} from 'lucide-react';

const revenueData = [
  { month: 'يناير', revenue: 450000, targets: 400000 },
  { month: 'فبراير', revenue: 520000, targets: 400000 },
  { month: 'مارس', revenue: 480000, targets: 450000 },
  { month: 'أبريل', revenue: 610000, targets: 500000 },
  { month: 'مايو', revenue: 590000, targets: 500000 },
  { month: 'يونيو', revenue: 750000, targets: 600000 },
];

const categoryData = [
  { name: 'القانون التجاري', value: 400, color: '#1b4d79' },
  { name: 'القانون الجنائي', value: 300, color: '#b38e44' },
  { name: 'المهارات العملية', value: 300, color: '#5c7c32' },
  { name: 'تأهيل مهني', value: 200, color: '#94a3b8' },
];

const financialBreakdown = [
  { name: 'دورات تدريبية', value: 2400000, color: '#1b4d79' },
  { name: 'مبيعات كتب', value: 450000, color: '#b38e44' },
  { name: 'عضويات مهنية', value: 350000, color: '#5c7c32' },
  { name: 'خدمات استشارية', value: 200000, color: '#94a3b8' },
];

const academicPerformance = [
  { category: 'التجاري', completed: 85, pending: 15 },
  { category: 'الجنائي', completed: 70, pending: 30 },
  { category: 'الإداري', completed: 92, pending: 8 },
  { category: 'المهاري', completed: 65, pending: 35 },
];

const vision2030Stats = [
  { label: 'التحول الرقمي للخدمات', progress: 92, target: 100 },
  { label: 'تمكين الكوادر القانونية الشابة', progress: 78, target: 85 },
  { label: 'توطين المعرفة القانونية', progress: 65, target: 80 },
];

const AnalyticsCenter: React.FC<{onAction: (t: string, type?: 'success' | 'info') => void}> = ({ onAction }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'academic' | 'vision'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onAction('تم تحديث البيانات من خوادم الهيئة اللحظية');
    }, 1000);
  };

  const Overview = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المبيعات" value="3.4M SAR" change="+12.5%" icon={<DollarSign size={20}/>} color="navy" />
        <StatCard title="المتدربين الكلي" value="24,102" change="+8.2%" icon={<Users size={20}/>} color="gold" />
        <StatCard title="الكتب المبيعة" value="4,850" change="+24%" icon={<BookOpen size={20}/>} color="green" />
        <StatCard title="معدل الرضا" value="98.2%" change="+1.4%" icon={<Award size={20}/>} color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 sba-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-black text-[#1b4d79] flex items-center gap-2">
              <TrendingUp size={20} className="text-[#b38e44]" /> أداء الإيرادات مقابل المستهدف
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1b4d79]"></div>
                <span className="text-[10px] font-bold text-slate-400">الإيراد الفعلي</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <span className="text-[10px] font-bold text-slate-400">المستهدف</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#1b4d79" fill="#1b4d79" fillOpacity={0.05} strokeWidth={3} />
                <Area type="monotone" dataKey="targets" stroke="#e2e8f0" fill="#f8fafc" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="sba-card p-8">
          <h3 className="text-base font-black text-[#1b4d79] mb-8 flex items-center gap-2">
            <PieIcon size={20} className="text-[#5c7c32]" /> توزيع الاهتمام المعرفي
          </h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-slate-500">{item.name}</span>
                </div>
                <span className="text-[#1b4d79]">{item.value} طلب</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const FinancialView = () => (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard title="الإيراد التشغيلي" value="SAR 3,400,000" subValue="+15% عن العام الماضي" icon={<Wallet className="text-[#1b4d79]" />} />
        <KPICard title="متوسط قيمة الطلب" value="SAR 450" subValue="مستقر" icon={<CreditCard className="text-[#b38e44]" />} />
        <KPICard title="العائد على الاستثمار" value="28.4%" subValue="+4.2% تحسن كفاءة" icon={<TrendingUp className="text-[#5c7c32]" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="sba-card p-8">
          <h3 className="text-base font-black text-[#1b4d79] mb-8 flex items-center gap-2">تحليل قنوات الدخل</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={financialBreakdown} cx="50%" cy="50%" innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="value">
                  {financialBreakdown.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value: number) => `SAR ${value.toLocaleString()}`} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="sba-card p-8">
          <h3 className="text-base font-black text-[#1b4d79] mb-6 flex items-center justify-between">
            سجل التدفقات المالية اللحظية
            <button className="text-[10px] font-black text-[#b38e44] hover:underline">عرض الكل</button>
          </h3>
          <div className="space-y-4">
            {[
              { label: 'رسوم تدريب: التحكيم التجاري', amount: '+ 2,450', type: 'in', date: 'اليوم، 10:45 ص' },
              { label: 'مبيعات متجر: شرح الأنظمة', amount: '+ 150', type: 'in', date: 'اليوم، 09:20 ص' },
              { label: 'دفعات SAP: رسوم تراخيص', amount: '- 12,000', type: 'out', date: 'أمس، 04:00 م' },
              { label: 'عمولات: برنامج التسويق', amount: '- 450', type: 'out', date: 'أمس، 02:15 م' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.type === 'in' ? 'bg-green-50 text-[#5c7c32]' : 'bg-red-50 text-red-500'}`}>
                    {item.type === 'in' ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">{item.label}</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">{item.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-black ${item.type === 'in' ? 'text-[#5c7c32]' : 'text-red-500'}`}>
                  {item.amount} ر.س
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AcademicView = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SmallStat icon={<GraduationCap/>} label="إجمالي المتدربين" value="24,102" color="navy" />
        <SmallStat icon={<Award/>} label="شهادات صادرة" value="8,450" color="gold" />
        <SmallStat icon={<CheckCircle2/>} label="نسبة النجاح" value="89.2%" color="green" />
        <SmallStat icon={<Users/>} label="المدربين النشطين" value="184" color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 sba-card p-8">
          <h3 className="text-base font-black text-[#1b4d79] mb-8">كفاءة الإنجاز التعليمي حسب المسار</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={academicPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="completed" stackId="a" fill="#1b4d79" radius={[0, 4, 4, 0]} barSize={20} name="مكتمل" />
                <Bar dataKey="pending" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} name="قيد الدراسة" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="sba-card p-8">
          <h3 className="text-base font-black text-[#1b4d79] mb-6">أعلى البرامج تقييماً</h3>
          <div className="space-y-6">
            {[
              { title: 'التحكيم التجاري المتقدم', rating: 4.9, students: 1450 },
              { title: 'صياغة المذكرات القضائية', rating: 4.8, students: 4200 },
              { title: 'نظام الإفلاس المحدث', rating: 4.7, students: 950 },
              { title: 'مبادئ المرافعة العمالية', rating: 4.6, students: 1100 },
            ].map((course, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-slate-700 line-clamp-1">{course.title}</p>
                  <div className="flex items-center gap-1">
                    <Star size={10} className="text-[#b38e44] fill-[#b38e44]"/>
                    <span className="text-[10px] font-black">{course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
                  <span>{course.students} متدرب</span>
                  <span>98% رضا</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#b38e44]" style={{width: `${course.rating * 20}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Vision2030View = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="sba-card p-10 bg-gradient-to-br from-[#1b4d79] to-[#0f2d47] text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20"><Zap size={24} className="text-[#b38e44]" /></div>
              <h2 className="text-2xl font-black">مؤشرات المساهمة في رؤية المملكة 2030</h2>
            </div>
            <p className="text-blue-100/70 text-sm leading-relaxed font-bold">تلتزم الهيئة السعودية للمحامين برفع كفاءة المنظومة العدلية من خلال تمكين الممارسين وتطوير المحتوى القانوني الرقمي بما يتماشى مع مستهدفات الرؤية.</p>
          </div>
          <div className="w-48 h-48 bg-white/5 rounded-full border border-white/10 flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-bold text-blue-200">الإنجاز التراكمي</p>
            <h4 className="text-4xl font-black mt-1">84%</h4>
            <p className="text-[9px] text-green-400 mt-1">متوافق مع المستهدف</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-20 -translate-y-10 scale-150">
          <ShieldCheck size={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {vision2030Stats.map((stat, i) => (
          <div key={i} className="sba-card p-8 hover:border-[#b38e44]/20 transition-all">
            <h4 className="text-xs font-black text-slate-700 mb-6">{stat.label}</h4>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-black text-[#1b4d79]">{stat.progress}%</span>
              <span className="text-[10px] font-bold text-slate-400">المستهدف: {stat.target}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#b38e44]" style={{width: `${stat.progress}%`}}></div>
            </div>
            <p className="text-[9px] text-slate-400 mt-4 font-bold flex items-center gap-2"><CheckCircle size={10} className="text-[#5c7c32]" /> بيانات معتمدة من وحدة التحول الرقمي</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white p-7 rounded-2xl border-l-4 border-[#1b4d79] shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner">
            <PieIcon className="text-[#b38e44]" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1b4d79]">مركز التقارير والذكاء القانوني</h1>
            <p className="text-slate-400 mt-1 font-medium text-xs">تحليل البيانات الضخمة لاتخاذ قرارات استراتيجية مبنية على الأرقام.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleRefresh}
            className={`px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-50 transition-all flex items-center gap-2 ${isRefreshing ? 'animate-pulse' : ''}`}
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} /> تحديث البيانات
          </button>
          <button onClick={() => onAction('جاري تحضير ملف التقرير السنوي الشامل...', 'info')} className="px-6 py-2.5 bg-[#1b4d79] text-white rounded-lg text-[11px] font-bold shadow-md hover:bg-[#153a5c] transition-all flex items-center gap-2">
            <Download size={14} /> تصدير تقرير PDF
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="ملخص تنفيذي" />
        <TabButton active={activeTab === 'financial'} onClick={() => setActiveTab('financial')} label="الأداء المالي" />
        <TabButton active={activeTab === 'academic'} onClick={() => setActiveTab('academic')} label="المخرجات التدريبية" />
        <TabButton active={activeTab === 'vision'} onClick={() => setActiveTab('vision')} label="مؤشرات رؤية 2030" />
      </div>

      {activeTab === 'overview' && <Overview />}
      {activeTab === 'financial' && <FinancialView />}
      {activeTab === 'academic' && <AcademicView />}
      {activeTab === 'vision' && <Vision2030View />}
    </div>
  );
};

const TabButton = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`px-6 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
    active ? 'bg-[#1b4d79] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
  }`}>
    {label}
  </button>
);

const StatCard = ({ title, value, change, icon, color }: any) => {
  const colors: any = {
    navy: 'bg-blue-50 text-[#1b4d79]',
    gold: 'bg-orange-50 text-[#b38e44]',
    green: 'bg-green-50 text-[#5c7c32]'
  };
  return (
    <div className="sba-card p-6 flex flex-col items-center text-center">
      <div className={`p-3 rounded-xl mb-4 ${colors[color]}`}>{icon}</div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h4 className="text-xl font-black text-slate-800 mt-1">{value}</h4>
      <span className="text-[10px] font-bold text-[#5c7c32] mt-2">{change} مقارنة بالشهر السابق</span>
    </div>
  );
};

const KPICard = ({ title, value, subValue, icon }: any) => (
  <div className="sba-card p-6 bg-white border-r-4 border-[#1b4d79]">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">{icon}</div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
    </div>
    <h4 className="text-xl font-black text-[#1b4d79]">{value}</h4>
    <p className="text-[9px] font-bold text-slate-400 mt-2">{subValue}</p>
  </div>
);

const SmallStat = ({ icon, label, value, color }: any) => {
  const colors: any = {
    navy: 'text-[#1b4d79] bg-blue-50',
    gold: 'text-[#b38e44] bg-orange-50',
    green: 'text-[#5c7c32] bg-green-50'
  };
  return (
    <div className="sba-card p-5 flex items-center gap-4 border-none shadow-sm">
      <div className={`p-2.5 rounded-lg ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase">{label}</p>
        <p className="text-base font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
};

const Star = ({ size, className, fill }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckCircle = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

export default AnalyticsCenter;
