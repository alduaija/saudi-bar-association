
import React, { useState } from 'react';
import { 
  Plus, Video, Monitor, MapPin, Search, Users, 
  LayoutTemplate, ChevronRight, ChevronLeft, BookOpen, 
  Users2, FileText, CheckCircle2, ArrowRight,
  Save, Trash2, Edit3, MessageSquare, Award, FileEdit, UserCheck,
  Send, PlayCircle, PlusCircle, MoreVertical, GripVertical, PlusSquare, FilePlus,
  Filter, LayoutGrid, Sparkles
} from 'lucide-react';

const allCourses = [
  { 
    id: 1, 
    title: 'التحكيم التجاري المتقدم في العقود الدولية', 
    type: 'recorded', 
    category: 'القانون التجاري', 
    students: 1450, 
    instructor: 'د. خالد السديري', 
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80', 
    description: 'دورة شاملة تتناول أسس التحكيم في العقود التجارية الدولية وفقاً للأنظمة السعودية والمعايير الدولية.' 
  },
  { 
    id: 2, 
    title: 'المرافعة أمام المحاكم العمالية (Zoom Live)', 
    type: 'virtual', 
    category: 'المهارات العملية', 
    students: 920, 
    instructor: 'أ. نورة العتيبي', 
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&w=800&q=80', 
    description: 'تدريب عملي على إجراءات التقاضي في القضايا العمالية وصياغة مذكرات الدفاع.' 
  },
  { 
    id: 3, 
    title: 'تأهيل المحامين المستجدين - دفعة 2024', 
    type: 'onsite', 
    category: 'تأهيل مهني', 
    students: 3100, 
    instructor: 'لجنة التدريب المركزية', 
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', 
    description: 'البرنامج التدريبي الإلزامي للمحامين تحت التدريب لتطوير المهارات القانونية الأساسية.' 
  },
  { 
    id: 4, 
    title: 'صياغة المذكرات القانونية واللوائح القضائية', 
    type: 'recorded', 
    category: 'القانون الجنائي', 
    students: 4200, 
    instructor: 'د. علي القحطاني', 
    img: 'https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&w=800&q=80', 
    description: 'تعلم فنون الصياغة القانونية الرصينة للمذكرات واللوائح أمام المحاكم.' 
  },
  { 
    id: 5, 
    title: 'حقوق الملكية الفكرية في النظام السعودي', 
    type: 'recorded', 
    category: 'الأنظمة واللوائح', 
    students: 750, 
    instructor: 'أ. سارة الدوسري', 
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', 
    description: 'دراسة متعمقة لنظام حماية حقوق المؤلف وبراءات الاختراع والعلامات التجارية.' 
  },
  { 
    id: 6, 
    title: 'ورشة عمل: صياغة العقود التجارية (مقر الهيئة)', 
    type: 'onsite', 
    category: 'المهارات العملية', 
    students: 120, 
    instructor: 'د. فهد الشمري', 
    img: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80', 
    description: 'تدريب مكثف وجهاً لوجه على فنون التفاوض وصياغة بنود العقود التجارية المعقدة.' 
  },
  { 
    id: 7, 
    title: 'نظام الإفلاس وتطبيقاته القضائية (بث مباشر)', 
    type: 'virtual', 
    category: 'القانون التجاري', 
    students: 540, 
    instructor: 'أ. محمد بن راشد', 
    img: 'https://images.unsplash.com/photo-1554224155-1d10a2111d0b?auto=format&fit=crop&w=800&q=80', 
    description: 'شرح متكامل لنظام الإفلاس السعودي الجديد وحالات التصفية وإعادة التنظيم المالي.' 
  },
  { 
    id: 8, 
    title: 'إدارة مكاتب المحاماة والتحول الرقمي', 
    type: 'recorded', 
    category: 'إدارة مهنية', 
    students: 1800, 
    instructor: 'أ. عبدالعزيز الفايز', 
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', 
    description: 'كيفية بناء مكاتب محاماة حديثة تعتمد على التقنيات الرقمية في إدارة القضايا والعملاء.' 
  }
];

const CourseManagement: React.FC<{onAction: (t: string, type?: 'success'|'info') => void}> = ({ onAction }) => {
  const [view, setView] = useState<'list' | 'details' | 'trainee_mgmt' | 'builder' | 'add'>('list');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [activeMgmtTab, setActiveMgmtTab] = useState<'grading' | 'assignments' | 'certificates' | 'chat'>('grading');
  const [filterType, setFilterType] = useState<'all' | 'recorded' | 'virtual' | 'onsite'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setView('details');
  };

  const filteredCourses = allCourses.filter(c => {
    const matchesFilter = filterType === 'all' || c.type === filterType;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const ListView = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-2xl border-l-4 border-[#b38e44] shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#1b4d79]">أكاديمية التدريب القانوني</h1>
          <p className="text-slate-400 mt-1 text-sm font-bold">إدارة البرامج ومراقبة الأداء.</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setView('add')} className="flex items-center gap-2 bg-[#1b4d79] text-white px-7 py-3 rounded-xl font-bold text-[11px] shadow-lg">
             <PlusCircle size={18} /> إضافة برنامج جديد
           </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-0 z-20">
         <div className="flex items-center gap-2">
            <button onClick={() => setFilterType('all')} className={`px-4 py-2 rounded-xl text-[10px] font-black border ${filterType === 'all' ? 'bg-[#1b4d79] text-white' : 'bg-white text-slate-500 border-slate-100'}`}>الكل</button>
            <button onClick={() => setFilterType('recorded')} className={`px-4 py-2 rounded-xl text-[10px] font-black border ${filterType === 'recorded' ? 'bg-[#1b4d79] text-white' : 'bg-white text-slate-500 border-slate-100'}`}>مسجلة</button>
         </div>
         <div className="relative w-72">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input 
                type="text" 
                placeholder="ابحث عن دورة..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold outline-none" 
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} onClick={() => handleCourseClick(course)} className="sba-card group overflow-hidden flex flex-col hover:-translate-y-2 transition-all cursor-pointer border border-transparent hover:border-[#b38e44]/20">
             <div className="relative h-44 overflow-hidden bg-slate-100">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-white font-bold text-[9px] bg-[#b38e44] shadow-lg uppercase">{course.type}</div>
             </div>
             <div className="p-6 flex-1 flex flex-col">
                <span className="text-[9px] font-black text-[#5c7c32] bg-[#f4f7f2] px-2 py-1 rounded-md border border-[#e8f0e0] w-fit mb-3">{course.category}</span>
                <h3 className="text-[12px] font-black text-slate-800 leading-relaxed mb-4 line-clamp-2">{course.title}</h3>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500"><Users size={14} className="text-[#b38e44]" /> {course.students} متدرب</div>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#1b4d79] group-hover:text-white transition-all"><ChevronRight size={16} /></div>
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
      {view === 'details' && (
        <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
          <button onClick={() => setView('list')} className="p-2.5 bg-white border border-slate-100 rounded-xl transition-all text-slate-400 shadow-sm flex items-center gap-2 text-xs font-bold">
            <ArrowRight size={18} /> العودة للأكاديمية
          </button>
          <div className="sba-card p-10 bg-white">
            <div className="flex flex-col md:flex-row gap-10">
              <img src={selectedCourse.img} className="w-full md:w-80 h-52 object-cover rounded-2xl shadow-lg" />
              <div className="space-y-4">
                <h1 className="text-2xl font-black text-[#1b4d79]">{selectedCourse.title}</h1>
                <p className="text-sm font-bold text-slate-500 leading-relaxed">{selectedCourse.description}</p>
                <div className="flex gap-3 pt-6">
                  <button onClick={() => setView('trainee_mgmt')} className="px-6 py-3 bg-[#b38e44] text-white rounded-xl text-xs font-bold">إدارة التجربة التعليمية</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {view === 'add' && (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
           <button onClick={() => setView('list')} className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs"><ArrowRight size={16}/> العودة</button>
           <div className="sba-card p-10 bg-white">
              <h2 className="text-xl font-bold text-[#1b4d79] mb-8">إضافة برنامج جديد</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400">اسم البرنامج</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400">التصنيف</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none">
                       <option>قانون تجاري</option>
                       <option>تأهيل مهني</option>
                    </select>
                 </div>
              </div>
              <div className="flex justify-end gap-4 pt-8 border-t border-slate-50">
                 <button onClick={() => setView('list')} className="text-xs font-bold text-slate-400">إلغاء</button>
                 <button onClick={() => onAction('تم حفظ المسودة بنجاح')} className="px-8 py-3 bg-[#1b4d79] text-white rounded-xl text-xs font-bold">حفظ كمسودة</button>
              </div>
           </div>
        </div>
      )}
      {view === 'trainee_mgmt' && (
         <div className="space-y-8 animate-in slide-in-from-left-4 duration-500 pb-20">
            <div className="flex items-center justify-between bg-white p-7 rounded-2xl border-r-4 border-[#1b4d79] shadow-sm">
              <div className="flex items-center gap-4">
                <button onClick={() => setView('details')} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-400"><ArrowRight size={20} /></button>
                <h1 className="text-xl font-black text-[#1b4d79]">مركز إدارة تجربة المتدرب</h1>
              </div>
            </div>
            <div className="sba-card p-12 text-center space-y-8">
               <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#1b4d79] border-4 border-white shadow-xl"><Award size={48}/></div>
               <h3 className="text-xl font-black text-[#1b4d79]">اعتماد وإصدار الشهادات</h3>
               <button onClick={() => onAction('تم اعتماد الشهادات')} className="px-10 py-3.5 bg-[#1b4d79] text-white rounded-xl text-xs font-bold mx-auto">اعتماد وإصدار شهادات الدفعة</button>
            </div>
         </div>
      )}
    </div>
  );
};

export default CourseManagement;
