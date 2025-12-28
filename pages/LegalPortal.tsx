
import React, { useState } from 'react';
import { 
  Search, FileText, Download, Bookmark, Scale, BookOpen, 
  Clock, BookText, ShoppingBag, ArrowRight, ShoppingCart, 
  CreditCard, Star, ChevronLeft, Info, Upload, Send, ShieldCheck, 
  ClipboardCheck, FileSignature
} from 'lucide-react';

const allDocs = [
  { id: 'SBA-REG-24-01', title: 'نظام المعاملات المدنية المحدث ولائحته التنفيذية', type: 'الأنظمة واللوائح', date: '12 مايو 2024', status: 'محدث' },
  { id: 'SBA-REG-24-05', title: 'ميثاق وقواعد السلوك المهني للمحامين السعوديين', type: 'الأنظمة واللوائح', date: '24 أبريل 2024', status: 'جديد' },
  { id: 'SBA-GUIDE-23', title: 'الدليل الإرشادي لإجراءات التحكيم في العقود التجارية', type: 'الأدلة الإرشادية', date: '05 يناير 2024', status: 'أصيل' },
  { id: 'SBA-REP-23-Q4', title: 'التقرير السنوي لإنجازات الهيئة لعام 2023', type: 'التقارير السنوية', date: '15 يناير 2024', status: 'معتمد' },
  { id: 'SBA-POL-24', title: 'سياسات الأمن السيبراني لمكاتب المحاماة', type: 'الأنظمة واللوائح', date: '02 مارس 2024', status: 'هام' },
  { id: 'SBA-LAW-09', title: 'نظام الإفلاس وتعديلاته الأخيرة 1445هـ', type: 'الأنظمة واللوائح', date: '19 فبراير 2024', status: 'محدث' },
  { id: 'SBA-GUIDE-IP', title: 'دليل حماية حقوق الملكية الفكرية والابتكار', type: 'الأدلة الإرشادية', date: '10 نوفمبر 2023', status: 'أصيل' },
  { id: 'SBA-REP-Q1', title: 'تقرير أداء التدريب القانوني الربع الأول 2024', type: 'التقارير السنوية', date: '01 أبريل 2024', status: 'جديد' },
];

const legalBooks = [
  { id: 1, title: 'شرح الأنظمة القضائية السعودية', author: 'د. خالد السديري', price: 150, img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
  { id: 2, title: 'الوسيط في القانون التجاري', author: 'أ. نورة العتيبي', price: 220, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80', rating: 4.8 },
  { id: 3, title: 'مبادئ التحكيم الدولي', author: 'لجنة البحوث المركزية', price: 180, img: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=400&q=80', rating: 4.7 },
  { id: 4, title: 'موسوعة التشريعات الجنائية', author: 'د. علي القحطاني', price: 350, img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80', rating: 5.0 },
  { id: 5, title: 'أخلاقيات المهنة وآداب القضاء', author: 'أ. محمد بن راشد', price: 95, img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
  { id: 6, title: 'دليل الصياغة القانونية الرصينة', author: 'د. سارة الدوسري', price: 130, img: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80', rating: 4.6 },
];

const LegalPortal: React.FC<{onAction: (t: string, type?: 'success' | 'info') => void}> = ({ onAction }) => {
  const [view, setView] = useState<'list' | 'store' | 'publish_request'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCat, setActiveCat] = useState('الكل');

  const filteredDocs = allDocs.filter(doc => {
    const matchesSearch = doc.title.includes(searchTerm) || doc.id.includes(searchTerm);
    const matchesCat = activeCat === 'الكل' || doc.type === activeCat;
    return matchesSearch && matchesCat;
  });

  const ListView = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white p-7 rounded-2xl border-l-4 border-[#1b4d79] shadow-sm">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 shadow-inner">
              <Scale className="text-[#b38e44]" size={28} />
           </div>
           <div>
              <h1 className="text-xl font-bold text-[#1b4d79]">مركز المنشورات القانونية</h1>
              <p className="text-slate-400 mt-1 font-medium text-xs">المرجع الرقمي للأنظمة واللوائح المعتمدة.</p>
           </div>
        </div>
        <div className="flex gap-2">
           <button onClick={() => { setView('publish_request'); onAction('جاري فتح نموذج طلبات النشر...', 'info'); }} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-50 transition-all">طلبات النشر</button>
           <button onClick={() => { setView('store'); onAction('جاري فتح متجر الكتب القانونية...', 'info'); }} className="px-6 py-2.5 bg-[#5c7c32] text-white rounded-lg text-[11px] font-bold shadow-md hover:bg-[#4a6328] transition-all flex items-center gap-2">
             <ShoppingBag size={14} /> شراء الكتب القانونية
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="space-y-6">
            <div className="sba-card p-6">
               <h3 className="text-sm font-bold text-[#1b4d79] mb-6 flex items-center gap-2"><Search size={16} /> البحث المتقدم</h3>
               <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="رقم النظام أو الموضوع..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold outline-none focus:border-[#b38e44] transition-all"
                  />
                  <div className="space-y-2 pt-2 border-t border-slate-50">
                     {['الكل', 'الأنظمة واللوائح', 'التقارير السنوية', 'الأدلة الإرشادية'].map(cat => (
                       <div key={cat} onClick={() => setActiveCat(cat)} className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all ${
                         activeCat === cat ? 'bg-blue-50/50 text-[#1b4d79] border border-blue-50' : 'hover:bg-slate-50 text-slate-500'
                       }`}>
                          <span className="text-[11px] font-bold">{cat}</span>
                          <div className={`w-3 h-3 rounded-full border ${activeCat === cat ? 'bg-[#b38e44] border-[#b38e44]' : 'border-slate-200 bg-white'}`}></div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-[#1b4d79] p-7 rounded-2xl text-white shadow-xl relative overflow-hidden group">
               <div className="relative z-10">
                  <BookText className="text-[#b38e44] mb-5" size={32} />
                  <h4 className="text-base font-bold mb-2">طلبات الكتب المجانية</h4>
                  <p className="text-[10px] text-blue-100/60 leading-relaxed mb-6 font-bold">للمحامين الممارسين، يمكن الحصول على النسخ المطبوعة مجاناً.</p>
                  <button onClick={() => onAction('تم إرسال طلب الكتاب المجاني بنجاح')} className="w-full py-3 bg-[#b38e44] text-white rounded-lg text-[11px] font-bold shadow-md hover:bg-[#a17c38] transition-all">تقديم طلب جديد</button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-2">
            <div className="sba-card overflow-hidden h-full flex flex-col">
               <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                  <h3 className="text-sm font-bold text-[#1b4d79] flex items-center gap-2">
                    <BookOpen size={16} className="text-[#b38e44]" /> قائمة المنشورات ({filteredDocs.length})
                  </h3>
               </div>
               <div className="divide-y divide-slate-50 overflow-y-auto max-h-[600px] no-scrollbar">
                  {filteredDocs.map((doc, i) => (
                    <div key={i} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-300 group-hover:text-[#1b4d79] transition-all shrink-0"><FileText size={20} /></div>
                          <div>
                             <h5 className="text-[13px] font-bold text-slate-700 line-clamp-1">{doc.title}</h5>
                             <div className="flex items-center gap-3 mt-1.5 text-[9px] font-bold text-slate-400">
                                <span>{doc.id}</span>
                                <div className="flex items-center gap-1"><Clock size={10} /> <span>{doc.date}</span></div>
                                <span className="text-[#5c7c32] bg-[#f4f7f2] px-1.5 py-0.5 rounded border border-[#e8f0e0]">{doc.status}</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <button onClick={() => onAction(`جاري تحميل: ${doc.title}`)} className="p-2 text-slate-400 hover:text-[#5c7c32] hover:bg-slate-100 rounded-lg transition-all"><Download size={16}/></button>
                          <button onClick={() => onAction(`تمت إضافة ${doc.title} للمفضلة`)} className="p-2 text-slate-400 hover:text-[#b38e44] hover:bg-slate-100 rounded-lg transition-all"><Bookmark size={16}/></button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const StoreView = () => (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
       <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
             <button onClick={() => setView('list')} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                <ArrowRight size={18} />
             </button>
             <div>
                <h1 className="text-xl font-black text-[#1b4d79]">متجر الإصدارات القانونية</h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">SBA Book Store - Printed Editions</p>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="relative p-2.5 bg-slate-50 rounded-xl text-slate-500 hover:text-[#1b4d79] cursor-pointer transition-all">
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b38e44] text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">0</span>
             </div>
             <button onClick={() => onAction('جاري الانتقال لإتمام الدفع...')} className="px-6 py-2.5 bg-[#1b4d79] text-white rounded-xl text-[11px] font-bold shadow-lg hover:bg-[#153a5c] transition-all flex items-center gap-2">
                <CreditCard size={14} /> سلة الشراء
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {legalBooks.map((book) => (
            <div key={book.id} className="sba-card group overflow-hidden flex flex-col hover:-translate-y-1 transition-all">
               <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                     <button onClick={() => onAction(`تم إضافة "${book.title}" إلى سلة الشراء`)} className="w-full py-2 bg-[#b38e44] text-white rounded-lg text-[10px] font-bold shadow-lg flex items-center justify-center gap-2">
                        <PlusCircle size={14} /> أضف للسلة
                     </button>
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm">
                     <Star size={10} className="text-[#b38e44] fill-[#b38e44]" />
                     <span className="text-[10px] font-black text-slate-800">{book.rating}</span>
                  </div>
               </div>
               <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-[13px] font-bold text-[#1b4d79] leading-relaxed mb-1 line-clamp-1">{book.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold mb-4">{book.author}</p>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">السعر</span>
                        <span className="text-sm font-black text-[#5c7c32]">{book.price} ر.س</span>
                     </div>
                     <button onClick={() => onAction(`عرض تفاصيل الكتاب: ${book.title}`, 'info')} className="p-2 text-slate-300 hover:text-[#1b4d79] transition-all">
                        <Info size={16} />
                     </button>
                  </div>
               </div>
            </div>
          ))}
       </div>

       <div className="sba-card p-10 bg-slate-50/50 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-[#b38e44]"><ShoppingCart size={32} /></div>
          <div>
             <h3 className="text-lg font-bold text-[#1b4d79]">هل تبحث عن إصدار قديم؟</h3>
             <p className="text-sm text-slate-500 max-w-md mx-auto mt-2">يمكنك طلب البحث في أرشيف الهيئة للإصدارات التي لم تعد مطبوعة حالياً وسنقوم بتوفيرها لك بنسخة رقمية أو مطبوعة حسب الطلب.</p>
          </div>
          <button onClick={() => onAction('جاري فتح نموذج طلب أرشيف...', 'info')} className="px-8 py-3 bg-white border border-slate-200 text-[#1b4d79] rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">طلب من الأرشيف</button>
       </div>
    </div>
  );

  const PublishRequestView = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
          <ArrowRight size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#1b4d79]">تقديم طلب نشر منشور قانوني</h1>
      </div>

      <div className="sba-card p-10 bg-white border-t-8 border-[#b38e44]">
        <div className="flex items-start gap-6 mb-10 pb-10 border-b border-slate-100">
           <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1b4d79] shadow-inner"><FileSignature size={32} /></div>
           <div>
              <h2 className="text-lg font-black text-[#1b4d79]">سياسة النشر والتحكيم العلمي</h2>
              <p className="text-xs text-slate-500 font-bold mt-1 leading-relaxed">تخضع كافة المواد المقدمة للنشر في مركز المنشورات لتحكيم اللجنة العلمية بالهيئة السعودية للمحامين لضمان جودة المحتوى ومطابقته للأنظمة المرعية.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">عنوان المنشور المقترح</label>
             <input type="text" placeholder="مثلاً: دراسة حول نظام الإفلاس المحدث" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none" />
          </div>
          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تصنيف المادة العلمية</label>
             <select className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none">
                <option>بحث قانوني أصيل</option>
                <option>تعليق على حكم قضائي</option>
                <option>دليل إرشادي مهني</option>
                <option>ترجمة لنظام دولي</option>
             </select>
          </div>
          <div className="md:col-span-2 space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ملخص البحث (Abstract)</label>
             <textarea rows={4} placeholder="اكتب ملخصاً موجزاً يوضح أهمية المنشور والأهداف المرجوة منه..." className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none"></textarea>
          </div>
        </div>

        <div className="p-10 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center text-center space-y-4 group hover:bg-white hover:border-[#b38e44]/20 transition-all cursor-pointer mb-10">
           <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-300 group-hover:text-[#b38e44] transition-all"><Upload size={28} /></div>
           <div>
              <p className="text-sm font-bold text-slate-700">ارفق مسودة المنشور (PDF)</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1">يجب ألا يتجاوز حجم الملف 20 ميجابايت</p>
           </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4 mb-10">
           <ShieldCheck className="text-[#5c7c32]" size={24} />
           <p className="text-[10px] font-bold text-slate-500 leading-relaxed">بإرسالك لهذا الطلب، أنت تقر بملكية المادة العلمية وتوافق على منح الهيئة السعودية للمحامين حقوق النشر والتوزيع في حال قبولها.</p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-10 border-t border-slate-50">
           <button onClick={() => setView('list')} className="text-xs font-bold text-slate-400 hover:text-[#1b4d79] transition-all">إلغاء الطلب</button>
           <button onClick={() => { onAction('تم إرسال طلب النشر للجنة العلمية بنجاح'); setView('list'); }} className="px-10 py-3 bg-[#1b4d79] text-white rounded-xl text-xs font-bold shadow-xl hover:bg-[#153a5c] flex items-center gap-2">
              <Send size={16} className="rotate-180" /> تقديم الطلب للمراجعة
           </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
       {view === 'list' && <ListView />}
       {view === 'store' && <StoreView />}
       {view === 'publish_request' && <PublishRequestView />}
    </div>
  );
};

const PlusCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);

export default LegalPortal;
