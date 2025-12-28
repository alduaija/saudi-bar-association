
import React, { useState } from 'react';
import { 
  Search, FileText, Download, Bookmark, Scale, BookOpen, 
  Clock, BookText, ShoppingBag, ArrowRight, ShoppingCart, 
  CreditCard, Star, Info, Upload, Send, ShieldCheck, 
  FileSignature, PlusCircle
} from 'lucide-react';

const allDocs = [
  { id: 'SBA-REG-24-01', title: 'نظام المعاملات المدنية المحدث ولائحته التنفيذية', type: 'الأنظمة واللوائح', date: '12 مايو 2024', status: 'محدث' },
  { id: 'SBA-REG-24-05', title: 'ميثاق وقواعد السلوك المهني للمحامين السعوديين', type: 'الأنظمة واللوائح', date: '24 أبريل 2024', status: 'جديد' },
  { id: 'SBA-GUIDE-23', title: 'الدليل الإرشادي لإجراءات التحكيم في العقود التجارية', type: 'الأدلة الإرشادية', date: '05 يناير 2024', status: 'أصيل' },
  { id: 'SBA-REP-23-Q4', title: 'التقرير السنوي لإنجازات الهيئة لعام 2023', type: 'التقارير السنوية', date: '15 يناير 2024', status: 'معتمد' }
];

const legalBooks = [
  { id: 1, title: 'شرح الأنظمة القضائية السعودية', author: 'د. خالد السديري', price: 150, img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80', rating: 4.9 },
  { id: 2, title: 'الوسيط في القانون التجاري', author: 'أ. نورة العتيبي', price: 220, img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80', rating: 4.8 }
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
           <button onClick={() => setView('publish_request')} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[11px] font-bold hover:bg-slate-50">طلبات النشر</button>
           <button onClick={() => setView('store')} className="px-6 py-2.5 bg-[#5c7c32] text-white rounded-lg text-[11px] font-bold shadow-md flex items-center gap-2">
             <ShoppingBag size={14} /> متجر الكتب
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="space-y-6">
            <div className="sba-card p-6">
               <h3 className="text-sm font-bold text-[#1b4d79] mb-6 flex items-center gap-2"><Search size={16} /> البحث</h3>
               <input 
                 type="text" 
                 placeholder="ابحث هنا..." 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold outline-none"
               />
               <div className="space-y-2 mt-6">
                  {['الكل', 'الأنظمة واللوائح', 'التقارير السنوية'].map(cat => (
                    <div key={cat} onClick={() => setActiveCat(cat)} className={`p-2.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${activeCat === cat ? 'bg-[#1b4d79] text-white' : 'hover:bg-slate-50 text-slate-500'}`}>
                      {cat}
                    </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="lg:col-span-2">
            <div className="sba-card overflow-hidden h-full flex flex-col">
               <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/30">
                  <h3 className="text-sm font-bold text-[#1b4d79]">قائمة المنشورات</h3>
               </div>
               <div className="divide-y divide-slate-50">
                  {filteredDocs.map((doc) => (
                    <div key={doc.id} className="px-6 py-5 flex items-center justify-between hover:bg-slate-50/50">
                       <div className="flex items-center gap-4">
                          <FileText size={20} className="text-slate-300" />
                          <div>
                             <h5 className="text-[13px] font-bold text-slate-700">{doc.title}</h5>
                             <p className="text-[9px] font-bold text-slate-400 mt-1">{doc.id} • {doc.date}</p>
                          </div>
                       </div>
                       <button onClick={() => onAction(`جاري التحميل...`)} className="p-2 text-slate-400 hover:text-[#5c7c32]"><Download size={16}/></button>
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
             <button onClick={() => setView('list')} className="p-2.5 bg-slate-50 rounded-xl"><ArrowRight size={18} /></button>
             <h1 className="text-xl font-black text-[#1b4d79]">متجر الإصدارات</h1>
          </div>
          <button className="px-6 py-2.5 bg-[#1b4d79] text-white rounded-xl text-[11px] font-bold shadow-lg flex items-center gap-2">
             <ShoppingCart size={14} /> سلة الشراء
          </button>
       </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {legalBooks.map((book) => (
            <div key={book.id} className="sba-card overflow-hidden group">
               <div className="relative h-56">
                  <img src={book.img} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button onClick={() => onAction('تمت الإضافة')} className="w-full py-2 bg-[#b38e44] text-white rounded-lg text-[10px] font-bold">أضف للسلة</button>
                  </div>
               </div>
               <div className="p-5">
                  <h4 className="text-[13px] font-bold text-[#1b4d79] mb-1">{book.title}</h4>
                  <p className="text-[10px] text-slate-400 mb-4">{book.author}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                     <span className="text-sm font-black text-[#5c7c32]">{book.price} ر.س</span>
                     <Info size={16} className="text-slate-300" />
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  return (
    <div className="min-h-screen">
       {view === 'list' && <ListView />}
       {view === 'store' && <StoreView />}
       {view === 'publish_request' && (
         <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-12">
            <button onClick={() => setView('list')} className="mb-6 text-slate-400 font-bold text-xs"><ArrowRight size={16}/> العودة</button>
            <div className="sba-card p-10 bg-white">
               <h2 className="text-xl font-bold text-[#1b4d79] mb-8">طلب نشر منشور قانوني</h2>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase">عنوان المنشور</label>
                     <input type="text" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#b38e44]" />
                  </div>
                  <div className="p-10 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center space-y-4">
                     <Upload size={28} className="text-slate-300" />
                     <p className="text-sm font-bold text-slate-700">ارفق المسودة (PDF)</p>
                  </div>
               </div>
               <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                  <button onClick={() => setView('list')} className="text-xs font-bold text-slate-400">إلغاء</button>
                  <button onClick={() => { onAction('تم تقديم الطلب'); setView('list'); }} className="px-10 py-3 bg-[#1b4d79] text-white rounded-xl text-xs font-bold shadow-xl">تقديم الطلب</button>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

export default LegalPortal;
