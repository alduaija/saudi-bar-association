
import React, { useState } from 'react';
import { 
  Target, TrendingUp, CreditCard, Apple, Percent, ShoppingBag, 
  Zap, Share2, BarChart, ChevronLeft, ArrowRight, Plus, 
  Search, Users, DollarSign, Calendar, Copy, ExternalLink, 
  Award, Trash2, Edit3, CheckCircle2
} from 'lucide-react';

const MarketingSales: React.FC<{onAction: (t: string, type?: 'success' | 'info') => void}> = ({ onAction }) => {
  const [view, setView] = useState<'main' | 'vouchers' | 'affiliate'>('main');

  const vouchersData = [
    { code: 'NATIONAL94', discount: '20%', usage: 1450, status: 'نشط', expiry: '2024-12-31' },
    { code: 'LAWYER20', discount: '15%', usage: 820, status: 'نشط', expiry: '2024-10-15' },
    { code: 'WELCOME_SBA', discount: '10%', usage: 3100, status: 'منتهي', expiry: '2024-01-01' },
  ];

  const affiliatesData = [
    { name: 'د. فيصل بن عبدالله', code: 'FAISAL_SBA', conversions: 42, earnings: 12500, rating: 4.9 },
    { name: 'أ. جاسم الشمري', code: 'JASSIM_99', conversions: 28, earnings: 8400, rating: 4.7 },
    { name: 'مكتب الرائد للمحاماة', code: 'RAID_LAW', conversions: 115, earnings: 42000, rating: 5.0 },
  ];

  const MainView = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-7 rounded-2xl border-r-4 border-[#1b4d79] shadow-sm">
        <div className="flex items-center gap-5">
           <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[#b38e44]"><TrendingUp size={24} /></div>
           <div>
              <h1 className="text-xl font-bold text-[#1b4d79]">مركز النمو والمبيعات</h1>
              <p className="text-slate-400 mt-1 text-xs font-medium">تتبع الأداء التسويقي وبوابات الدفع والنمو الرقمي.</p>
           </div>
        </div>
        {/* الزر تم حذفه بناءً على الطلب */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <div className="sba-card p-8">
               <h3 className="text-base font-bold text-[#1b4d79] flex items-center gap-2 mb-8"><TrendingUp className="text-[#b38e44]" size={18} /> قمع المبيعات والتحول</h3>
               <div className="space-y-8">
                  <Campaign name="حملة المحامي الممارس" val={85} conv="14.2%" color="#1b4d79" />
                  <Campaign name="خصم اليوم الوطني" val={92} conv="28.5%" color="#b38e44" />
                  <Campaign name="باقة المكاتب الاستشارية" val={42} conv="5.8%" color="#5c7c32" />
               </div>
               <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-50">
                  <StatCard 
                    title="قسائم الخصم" 
                    icon={<Percent size={20}/>} 
                    onClick={() => { setView('vouchers'); onAction('فتح إدارة قسائم الخصم', 'info'); }} 
                  />
                  <StatCard 
                    title="التسويق بالعمولة" 
                    icon={<Share2 size={20}/>} 
                    onClick={() => { setView('affiliate'); onAction('فتح برنامج المؤثرين القانونيين', 'info'); }} 
                  />
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div className="sba-card p-7">
               <h3 className="text-sm font-bold text-[#1b4d79] mb-6 flex items-center gap-2"><CreditCard size={18} className="text-[#b38e44]" /> بوابات الدفع</h3>
               <div className="space-y-3">
                  <PaymentRow name="Apple Pay" icon={<Apple size={14}/>} color="bg-black" onClick={() => onAction('تعديل إعدادات Apple Pay', 'info')} />
                  <PaymentRow name="تابي / Tabby" icon={<Zap size={14}/>} color="bg-[#00c9ff]" onClick={() => onAction('تعديل إعدادات Tabby', 'info')} />
                  <PaymentRow name="تمارا / Tamara" icon={<ShoppingBag size={14}/>} color="bg-[#ff55cc]" onClick={() => onAction('تعديل إعدادات Tamara', 'info')} />
               </div>
               <button onClick={() => onAction('جاري مزامنة الفواتير مع SAP...', 'info')} className="w-full mt-8 py-3 bg-[#1b4d79] text-white rounded-xl font-bold text-[11px] shadow-md transition-all">إعدادات الربط المالي (SAP)</button>
            </div>
         </div>
      </div>
    </div>
  );

  const VouchersView = () => (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
       <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
             <button onClick={() => setView('main')} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                <ArrowRight size={18} />
             </button>
             <div>
                <h1 className="text-xl font-black text-[#1b4d79]">إدارة قسائم الخصم</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Voucher & Coupon Management</p>
             </div>
          </div>
          <button onClick={() => onAction('جاري إنشاء كود خصم جديد...', 'info')} className="px-6 py-2.5 bg-[#1b4d79] text-white rounded-xl text-[11px] font-bold shadow-lg hover:bg-[#153a5c] transition-all flex items-center gap-2">
             <Plus size={14} /> إنشاء قسيمة جديدة
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 sba-card overflow-hidden">
             <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-4">
                <div className="relative flex-1">
                   <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                   <input type="text" placeholder="البحث عن كود..." className="w-full pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none focus:border-[#b38e44]" />
                </div>
             </div>
             <div className="divide-y divide-slate-50">
                {vouchersData.map((v, i) => (
                  <div key={i} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                     <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-blue-50 text-[#1b4d79] rounded-xl flex items-center justify-center font-black text-xs">{v.code[0]}</div>
                        <div>
                           <div className="flex items-center gap-2">
                              <h5 className="text-xs font-black text-slate-700 tracking-wider">{v.code}</h5>
                              <button onClick={() => { navigator.clipboard.writeText(v.code); onAction('تم نسخ الكود'); }} className="text-slate-300 hover:text-[#b38e44]"><Copy size={12}/></button>
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold mt-1">خصم: <span className="text-[#5c7c32]">{v.discount}</span> • ينتهي في: {v.expiry}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-10">
                        <div className="text-center">
                           <p className="text-[9px] text-slate-400 font-bold uppercase">الاستخدام</p>
                           <p className="text-xs font-black text-[#1b4d79]">{v.usage}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                          v.status === 'نشط' ? 'bg-green-50 text-[#5c7c32] border-green-100' : 'bg-red-50 text-red-500 border-red-100'
                        }`}>{v.status}</span>
                        <div className="flex items-center gap-2">
                           <button className="p-2 text-slate-300 hover:text-[#1b4d79]"><Edit3 size={16}/></button>
                           <button className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="space-y-6">
             <div className="sba-card p-6 bg-[#b38e44] text-white">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4">ملخص الأداء</h3>
                <div className="space-y-4">
                   <div>
                      <p className="text-[10px] text-white/60 font-bold mb-1">إجمالي التوفير للمشتركين</p>
                      <p className="text-lg font-black tracking-tighter">SAR 124,500</p>
                   </div>
                   <div className="pt-4 border-t border-white/10">
                      <p className="text-[10px] text-white/60 font-bold mb-1">أعلى كود استخداماً</p>
                      <p className="text-xs font-black">NATIONAL94</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const AffiliateView = () => (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
       <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
             <button onClick={() => setView('main')} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                <ArrowRight size={18} />
             </button>
             <div>
                <h1 className="text-xl font-black text-[#1b4d79]">مركز الشركاء والمؤثرين</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SBA Affiliate & Influencer Portal</p>
             </div>
          </div>
          <button onClick={() => onAction('إرسال دعوة لشريك جديد...', 'info')} className="px-6 py-2.5 bg-[#5c7c32] text-white rounded-xl text-[11px] font-bold shadow-lg hover:bg-[#4a6328] transition-all flex items-center gap-2">
             <Users size={14} /> إضافة شريك جديد
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPIMiniCard title="إجمالي التحويلات" value="3,124" icon={<ExternalLink size={16}/>} color="navy" />
          <KPIMiniCard title="المبيعات عبر الشركاء" value="SAR 450K" icon={<DollarSign size={16}/>} color="gold" />
          <KPIMiniCard title="العمولات المستحقة" value="SAR 12,400" icon={<CheckCircle2 size={16}/>} color="green" />
       </div>

       <div className="sba-card overflow-hidden">
          <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
             <h3 className="text-sm font-black text-[#1b4d79]">قائمة الشركاء النشطين</h3>
          </div>
          <div className="divide-y divide-slate-50">
             {affiliatesData.map((aff, i) => (
               <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/20 transition-all">
                  <div className="flex items-center gap-5">
                     <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-[#1b4d79] border-2 border-white shadow-sm overflow-hidden font-black">
                        {aff.name[0]}
                     </div>
                     <div>
                        <h5 className="text-xs font-black text-slate-700">{aff.name}</h5>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="text-[9px] font-bold text-slate-400">كود التتبع:</span>
                           <span className="text-[9px] font-black text-[#b38e44] bg-[#b38e44]/5 px-1.5 py-0.5 rounded">{aff.code}</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-center gap-12">
                     <div className="text-center">
                        <p className="text-[9px] text-slate-400 font-bold uppercase">التحويلات</p>
                        <p className="text-xs font-black text-[#1b4d79]">{aff.conversions}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[9px] text-slate-400 font-bold uppercase">صافي المبيعات</p>
                        <p className="text-xs font-black text-[#5c7c32]">{aff.earnings.toLocaleString()} ر.س</p>
                     </div>
                     <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Award size={12} className="text-[#b38e44]" />
                        <span className="text-[10px] font-black text-slate-700">{aff.rating}</span>
                     </div>
                     <button onClick={() => onAction(`عرض تقرير الشريك: ${aff.name}`, 'info')} className="p-2 text-slate-300 hover:text-[#1b4d79] transition-all">
                        <BarChart size={18} />
                     </button>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen">
       {view === 'main' && <MainView />}
       {view === 'vouchers' && <VouchersView />}
       {view === 'affiliate' && <AffiliateView />}
    </div>
  );
};

const Campaign = ({ name, val, conv, color }: any) => (
  <div className="space-y-2">
     <div className="flex justify-between text-[11px] font-bold text-slate-600">
        <span>{name}</span>
        <span className="text-[#5c7c32] font-black">{conv}</span>
     </div>
     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full" style={{ width: `${val}%`, backgroundColor: color }}></div>
     </div>
  </div>
);

const StatCard = ({ title, icon, onClick }: any) => (
  <div onClick={onClick} className="p-5 bg-slate-50 rounded-xl border border-slate-50 hover:bg-white hover:border-[#b38e44]/20 transition-all cursor-pointer flex flex-col items-center">
     <div className="p-3 bg-white rounded-lg shadow-sm text-[#1b4d79] mb-2">{icon}</div>
     <span className="text-[10px] font-bold text-slate-700">{title}</span>
  </div>
);

const PaymentRow = ({ name, icon, color, onClick }: any) => (
  <div onClick={onClick} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-50 cursor-pointer hover:bg-white transition-all">
     <div className="flex items-center gap-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white ${color}`}>{icon}</div>
        <span className="text-[11px] font-bold text-slate-600">{name}</span>
     </div>
     <div className="w-2 h-2 rounded-full bg-[#5c7c32]"></div>
  </div>
);

const KPIMiniCard = ({ title, value, icon, color }: any) => {
  const colors: any = {
    navy: 'bg-blue-50 text-[#1b4d79] border-blue-100',
    gold: 'bg-orange-50 text-[#b38e44] border-orange-100',
    green: 'bg-green-50 text-[#5c7c32] border-green-100'
  };
  return (
    <div className="sba-card p-5 border-none shadow-sm flex items-center justify-between">
       <div>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <h4 className="text-lg font-black text-slate-800 mt-1">{value}</h4>
       </div>
       <div className={`p-2.5 rounded-xl ${colors[color]} border`}>{icon}</div>
    </div>
  );
};

export default MarketingSales;
