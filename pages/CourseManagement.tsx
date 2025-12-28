
import React, { useState } from 'react';
import { 
  Plus, Video, Monitor, MapPin, Search, Users, 
  LayoutTemplate, ChevronRight, ChevronLeft, BookOpen, 
  Users2, FileText, CheckCircle2, ArrowRight,
  Save, Trash2, Edit3, MessageSquare, Award, FileEdit, UserCheck,
  Send, Star, Download, CheckCircle, AlertCircle, PlayCircle,
  PlusCircle, MoreVertical, GripVertical, PlusSquare, FilePlus, X,
  Filter, LayoutGrid, List as ListIcon, Sparkles
} from 'lucide-react';

// الأرقام الموحدة عبر المنصة لضمان التوافق
const SHARED_STATS = {
  trainees: "24,102",
  trainers: "184",
  content: "3,420",
  revenue: "SAR 3.4M"
};

const allCourses = [
  { 
    id: 1, 
    title: 'التحكيم التجاري المتقدم في العقود الدولية', 
    type: 'recorded', 
    category: 'القانون التجاري', 
    students: 1450, 
    instructor: 'د. خالد السديري', 
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&w=800&q=80', 
    description: 'دورة شاملة تتناول أسس التحكيم في العقود التجارية الدولية وفقاً للأنظمة السعودية والمعايير الدولية.' 
  },
  { 
    id: 2, 
    title: 'المرافعة أمام المحاكم العمالية (Zoom Live)', 
    type: 'virtual', 
    category: 'المهارات العملية', 
    students: 920, 
    instructor: 'أ. نورة العتيبي', 
    img: 'https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=800&q=80', 
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
  },
  { 
    id: 9, 
    title: 'مكافحة الجرائم المعلوماتية (Live Interactive)', 
    type: 'virtual', 
    category: 'القانون الجنائي', 
    students: 1120, 
    instructor: 'أ. ناصر الحربي', 
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', 
    description: 'تحليل لنظام مكافحة جرائم المعلوماتية السعودي وطرق الإثبات الرقمي أمام القضاء.' 
  },
  { 
    id: 10, 
    title: 'القانون الدولي الإنساني وتطبيقاته', 
    type: 'recorded', 
    category: 'القانون الدولي', 
    students: 630, 
    instructor: 'د. ليلى المالكي', 
    img: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&w=800&q=80', 
    description: 'مبادئ القانون الدولي الإنساني والاتفاقيات الدولية المنظمة للنزاعات المسلحة.' 
  },
  { 
    id: 11, 
    title: 'الأنظمة العقارية والنزاعات الثبوتية', 
    type: 'onsite', 
    category: 'الأنظمة العقارية', 
    students: 450, 
    instructor: 'أ. حمد الفوزان', 
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80', 
    description: 'دراسة إجراءات التملك والنزاعات العقارية أمام المحاكم المختصة ولجان النظر.' 
  },
  { 
    id: 12, 
    title: 'أخلاقيات مهنة المحاماة وقواعد السلوك', 
    type: 'recorded', 
    category: 'تأهيل مهني', 
    students: 2200, 
    instructor: 'لجنة الأخلاقيات المركزية', 
    img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80', 
    description: 'ميثاق سلوك المحامين والقواعد المهنية التي يجب الالتزام بها في ممارسة المهنة.' 
  }
];

const CourseManagement: React.FC<{onAction: (t: string, type?: 'success'|'info') => void}> = ({ onAction }) => {
  const [view, setView] = useState<'list' | 'details' | 'trainee_mgmt' | 'builder' | 'add'>('list');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [activeMgmtTab, setActiveMgmtTab] = useState<'grading' | 'assignments' | 'certificates' | 'chat'>('grading');
  const [filterType, setFilterType] = useState<'all' | 'recorded' | 'virtual' | 'onsite'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [builderModules, setBuilderModules] = useState([
    { id: 1, title: 'المقدمة والأساسيات', lessons: ['فيديو: مقدمة البرنامج', 'مقال: الأنظمة المرجعية'] },
    { id: 2, title: 'الجانب التطبيقي', lessons: ['فيديو: شرح الحالة العملية الأولى', 'اختبار: تقييم المفاهيم'] }
  ]);

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setView('details');
  };

  const filteredCourses = allCourses.filter(c => {
    const matchesFilter = filterType === 'all' || c.type === filterType;
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const TraineeMgmtView = () => (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-white p-7 rounded-2xl border-r-4 border-[#1b4d79] shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('details')} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#1b4d79]">مركز إدارة تجربة المتدرب</h1>
            <p className="text-xs text-slate-400 font-bold mt-1">{selectedCourse?.title}</p>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl">
          <div className="text-center">
            <p className="text-[9px] font-black text-slate-400 uppercase">المسجلين</p>
            <p className="text-sm font-black text-[#1b4d79]">{selectedCourse?.students}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit overflow-x-auto no-scrollbar">
        <TabButton active={activeMgmtTab === 'grading'} onClick={() => setActiveMgmtTab('grading')} label="تصحيح الاختبارات" icon={<FileEdit size={14}/>} />
        <TabButton active={activeMgmtTab === 'assignments'} onClick={() => setActiveMgmtTab('assignments')} label="الواجبات والمشاريع" icon={<FileText size={14}/>} />
        <TabButton active={activeMgmtTab === 'certificates'} onClick={() => setActiveMgmtTab('certificates')} label="إصدار الشهادات" icon={<Award size={14}/>} />
        <TabButton active={activeMgmtTab === 'chat'} onClick={() => setActiveMgmtTab('chat')} label="محادثة المتدربين" icon={<MessageSquare size={14}/>} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeMgmtTab === 'grading' && (
          <div className="sba-card overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-sm font-black text-[#1b4d79]">نظام التصحيح الآلي واليدوي</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1">مراجعة درجات المتدربين وتعديلها عند الحاجة.</p>
              </div>
              <button onClick={() => onAction('تم بدء التصحيح الآلي لكامل الدفعة', 'success')} className="px-5 py-2 bg-[#b38e44] text-white rounded-lg text-[10px] font-bold shadow-md">تصحيح آلي شامل</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase border-b border-slate-100">
                  <tr>
                    <th className="p-5">المتدرب</th>
                    <th className="p-5 text-center">الدرجة الآلية</th>
                    <th className="p-5 text-center">التعديل</th>
                    <th className="p-5 text-center">الحالة</th>
                    <th className="p-5 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'محمد العبدالله', score: 85, status: 'ناجح' },
                    { name: 'سارة خالد', score: 42, status: 'راسب' },
                    { name: 'فهد المنصور', score: 98, status: 'ناجح' },
                    { name: 'نورة السعد', score: 72, status: 'ناجح' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-5 text-xs font-bold text-slate-700">{row.name}</td>
                      <td className="p-5 text-center text-xs font-black text-[#1b4d79]">{row.score}/100</td>
                      <td className="p-5 text-center">
                        <input type="number" defaultValue={row.score} className="w-14 px-2 py-1 bg-white border border-slate-200 rounded text-center text-[11px] font-bold" />
                      </td>
                      <td className="p-5 text-center">
                        <span className={`px-2 py-0.5 rounded-[4px] text-[9px] font-black ${row.status === 'ناجح' ? 'bg-green-50 text-[#5c7c32]' : 'bg-red-50 text-red-500'}`}>{row.status}</span>
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => onAction(`تم تحديث درجة ${row.name}`, 'success')} className="p-2 text-slate-400 hover:text-[#b38e44]"><Save size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeMgmtTab === 'assignments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-black text-[#1b4d79] mb-4">طلبات مراجعة المشاريع</h3>
              {[
                { student: 'فيصل بن علي', project: 'صياغة مذكرة قانونية جنائية', date: 'منذ ساعتين' },
                { student: 'نورة السعد', project: 'تحليل بنود عقد توريد دولي', date: 'منذ 5 ساعات' },
              ].map((sub, i) => (
                <div key={i} className="sba-card p-6 flex flex-col md:flex-row justify-between items-center gap-4 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-[#1b4d79] rounded-xl flex items-center justify-center"><FileText size={20}/></div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">{sub.student}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">{sub.project} • {sub.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => onAction('جاري فتح مسودة المشروع...')} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-100 hover:bg-slate-100">فتح الملف</button>
                    <button onClick={() => onAction(`تم إرسال الملاحظات لـ ${sub.student}`, 'success')} className="px-4 py-2 bg-[#1b4d79] text-white rounded-lg text-[10px] font-bold">إضافة ملاحظات</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="sba-card p-6 bg-slate-50/50">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">مؤشرات المراجعة</h3>
              <div className="space-y-6">
                 <StatProgress label="تم تسليم المشاريع" val={42} total={50} color="#1b4d79" />
                 <StatProgress label="تمت المراجعة" val={34} total={42} color="#5c7c32" />
              </div>
            </div>
          </div>
        )}

        {activeMgmtTab === 'certificates' && (
          <div className="sba-card p-12 text-center space-y-8 max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#1b4d79] border-4 border-white shadow-xl"><Award size={48}/></div>
            <div>
              <h3 className="text-xl font-black text-[#1b4d79]">اعتماد وإصدار الشهادات</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-bold mt-2">يتحقق النظام آلياً من معايير الاستحقاق (الحضور + الدرجات) قبل الإصدار.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
               <div className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                  <span className="text-[11px] font-bold">المستحقون للإصدار الآلي</span>
                  <span className="text-lg font-black text-[#5c7c32]">114</span>
               </div>
               <div className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                  <span className="text-lg font-black text-[#b38e44]">29</span>
                  <span className="text-[11px] font-bold">شهادات قيد المراجعة</span>
               </div>
            </div>
            <button onClick={() => onAction('تم اعتماد وإصدار كافة الشهادات', 'success')} className="px-10 py-3.5 bg-[#1b4d79] text-white rounded-xl text-xs font-bold shadow-xl flex items-center justify-center gap-2 mx-auto"><UserCheck size={18}/> اعتماد وإصدار شهادات الدفعة</button>
          </div>
        )}

        {activeMgmtTab === 'chat' && (
          <div className="sba-card h-[600px] flex flex-col bg-white overflow-hidden shadow-2xl">
             <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-[#1b4d79] text-white">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md"><MessageSquare size={20} className="text-[#b38e44]"/></div>
                   <div>
                      <h4 className="text-xs font-black">غرفة التفاعل المباشر</h4>
                      <p className="text-[9px] text-blue-100/50 font-bold">تواصل مباشر مع المتدربين</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                   <span className="text-[9px] font-black text-green-100 uppercase">نشط الآن</span>
                </div>
             </div>
             <div className="flex-1 p-8 space-y-6 overflow-y-auto bg-slate-50/50">
                <ChatBubble role="student" name="فهد المنصور" time="10:42 ص" text="دكتور، هل مادة الاختبار النهائي تشمل الفصل الرابع؟" />
                <ChatBubble role="instructor" name="د. خالد السديري (المدرب)" time="10:45 ص" text="أهلاً فهد، نعم المادة تشمل كافة الفصول التي تم شرحها." />
                <ChatBubble role="student" name="سارة خالد" time="11:05 ص" text="شكراً للتوضيح دكتور." />
             </div>
             <div className="p-5 bg-white border-t border-slate-100 flex items-center gap-4">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (onAction('تم إرسال الرسالة'), setChatInput(''))}
                  placeholder="اكتب رسالتك للمتدربين هنا..." 
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-xs font-bold outline-none" 
                />
                <button 
                  onClick={() => { onAction('تم إرسال الرسالة'); setChatInput(''); }}
                  className="w-12 h-12 bg-[#1b4d79] text-white rounded-2xl flex items-center justify-center shadow-lg"
                >
                   <Send size={18} className="rotate-180" />
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );

  const ListView = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-2xl border-l-4 border-[#b38e44] shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#1b4d79]">أكاديمية التدريب القانوني</h1>
          <p className="text-slate-400 mt-1 text-sm font-bold">إدارة البرامج، مراقبة الأداء، واعتماد المخرجات التدريبية.</p>
        </div>
        <div className="flex flex-wrap gap-4">
           <div className="flex items-center gap-6 px-6 border-r border-slate-100">
              <div className="text-center">
                 <p className="text-[9px] font-black text-slate-400 uppercase">إجمالي المتدربين</p>
                 <p className="text-lg font-black text-[#1b4d79]">{SHARED_STATS.trainees}</p>
              </div>
           </div>
           <button onClick={() => setView('builder')} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-[11px] hover:bg-slate-50 transition-all shadow-sm">
             <LayoutTemplate size={16} className="text-[#b38e44]" /> باني الدروس
           </button>
           <button onClick={() => setView('add')} className="flex items-center gap-2 bg-[#1b4d79] text-white px-7 py-3 rounded-xl font-bold text-[11px] shadow-lg hover:bg-[#153a5c] transition-all">
             <PlusCircle size={18} /> إضافة برنامج جديد
           </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm sticky top-0 z-20 overflow-x-auto no-scrollbar">
         <div className="flex items-center gap-2 py-1">
            <FilterButton active={filterType === 'all'} onClick={() => setFilterType('all')} label="الكل" icon={<LayoutGrid size={14}/>} />
            <FilterButton active={filterType === 'recorded'} onClick={() => setFilterType('recorded')} label="مسجلة" icon={<Video size={14}/>} />
            <FilterButton active={filterType === 'virtual'} onClick={() => setFilterType('virtual')} label="عن بعد" icon={<Monitor size={14}/>} />
            <FilterButton active={filterType === 'onsite'} onClick={() => setFilterType('onsite')} label="حضوري" icon={<MapPin size={14}/>} />
         </div>
         <div className="relative hidden md:block w-72">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
            <input 
                type="text" 
                placeholder="ابحث عن دورة أو مدرب..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold outline-none focus:border-[#b38e44] transition-all" 
            />
         </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="sba-card p-24 text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6"><Search size={32} /></div>
           <h3 className="text-lg font-bold text-slate-400">لا توجد نتائج تطابق بحثك أو تصنيفك المختار.</h3>
           <button onClick={() => {setFilterType('all'); setSearchTerm('');}} className="mt-4 text-[11px] font-black text-[#1b4d79] hover:underline">إعادة ضبط البحث</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} onClick={() => handleCourseClick(course)} className="sba-card group overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-transparent hover:border-[#b38e44]/20 animate-in fade-in slide-in-from-bottom-2">
               <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img 
                    src={course.img} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3"><TypeBadge type={course.type} /></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b4d79]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                     <div className="flex items-center gap-1.5 text-white font-black text-[9px] uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <Sparkles size={12} className="text-[#b38e44]" /> عرض التفاصيل والإدارة
                     </div>
                  </div>
               </div>
               <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                     <span className="text-[9px] font-black text-[#5c7c32] bg-[#f4f7f2] px-2 py-1 rounded-md border border-[#e8f0e0] uppercase">{course.category}</span>
                  </div>
                  <h3 className="text-[12px] font-black text-slate-800 leading-relaxed mb-4 line-clamp-2 group-hover:text-[#1b4d79] transition-colors">{course.title}</h3>
                  <p className="text-[10px] text-slate-400 font-bold mb-4">{course.instructor}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <Users size={14} className="text-[#b38e44]" /> 
                        {course.students} متدرب
                     </div>
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#1b4d79] group-hover:text-white transition-all">
                        <ChevronRight size={16} />
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const DetailsView = () => (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => setView('list')} className="p-2.5 bg-white border border-slate-100 hover:bg-slate-50 rounded-xl transition-all text-slate-400 shadow-sm">
          <ArrowRight size={20} />
        </button>
        <span className="text-sm font-bold text-slate-400">العودة للأكاديمية</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="sba-card overflow-hidden">
             <div className="h-64 bg-slate-900 relative">
                <img src={selectedCourse.img} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <button className="w-16 h-16 bg-[#b38e44] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all"><Monitor size={32}/></button>
                </div>
             </div>
             <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                  <div className="space-y-4">
                    <span className="px-4 py-1.5 bg-blue-50 text-[#1b4d79] text-[10px] font-black rounded-full border border-blue-100 uppercase tracking-widest">{selectedCourse.category}</span>
                    <h1 className="text-2xl font-black text-[#1b4d79] leading-tight">{selectedCourse.title}</h1>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                       <span className="flex items-center gap-1.5"><Users size={14}/> {selectedCourse.students} متدرب</span>
                       <span className="flex items-center gap-1.5"><BookOpen size={14}/> {selectedCourse.instructor}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setView('trainee_mgmt')} className="px-6 py-3 bg-[#b38e44] text-white rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 hover:bg-[#a17c38] transition-all"><Users2 size={18}/> إدارة التجربة التعليمية</button>
                    <button onClick={() => setView('builder')} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 border border-slate-100 transition-all"><Edit3 size={18}/></button>
                  </div>
                </div>
                <div className="space-y-4 pt-8 border-t border-slate-50">
                   <h3 className="text-sm font-black text-slate-800">وصف البرنامج التدريبي</h3>
                   <p className="text-slate-500 text-sm leading-relaxed font-bold">{selectedCourse.description}</p>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="sba-card p-8">
              <h3 className="text-xs font-black text-[#1b4d79] uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">هيكل البرنامج</h3>
              <div className="space-y-4">
                 <LessonItem title="مقدمة في الأنظمة المقارنة" duration="45 دقيقة" completed />
                 <LessonItem title="تحليل العقود وصياغة البنود" duration="120 دقيقة" completed />
                 <LessonItem title="الاختبار النهائي للدورة" duration="90 دقيقة" active />
                 <LessonItem title="اعتماد الشهادة والتقييم" duration="-" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const BuilderView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500 pb-20">
       <div className="flex items-center justify-between bg-white p-7 rounded-2xl border-l-4 border-[#b38e44] shadow-sm">
          <div className="flex items-center gap-4">
             <button onClick={() => setView('list')} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all text-slate-400">
                <ArrowRight size={20} />
             </button>
             <div>
                <h1 className="text-xl font-black text-[#1b4d79]">باني الدروس الذكي</h1>
                <p className="text-xs text-slate-400 font-bold mt-1">تصميم هيكل الدورة والمحتوى التعليمي.</p>
             </div>
          </div>
          <button onClick={() => onAction('تم حفظ هيكل الدورة بنجاح', 'success')} className="px-8 py-3 bg-[#1b4d79] text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
             <Save size={16} /> حفظ المسودة
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
             {builderModules.map((module) => (
               <div key={module.id} className="sba-card overflow-hidden">
                  <div className="p-5 bg-slate-50 flex items-center justify-between border-b border-slate-100">
                     <div className="flex items-center gap-3">
                        <GripVertical className="text-slate-300 cursor-grab" size={18} />
                        <h3 className="text-sm font-black text-[#1b4d79]">{module.title}</h3>
                     </div>
                     <div className="flex gap-2">
                        <button className="p-2 text-slate-300 hover:text-[#b38e44]"><Edit3 size={14}/></button>
                        <button className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={14}/></button>
                     </div>
                  </div>
                  <div className="p-6 space-y-3">
                     {module.lessons.map((lesson, idx) => (
                       <div key={idx} className="p-4 bg-white border border-slate-100 rounded-xl flex items-center justify-between group hover:border-blue-100 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300"><PlayCircle size={16}/></div>
                             <span className="text-xs font-bold text-slate-600">{lesson}</span>
                          </div>
                          <button className="p-2 text-slate-200 group-hover:text-slate-400"><MoreVertical size={14}/></button>
                       </div>
                     ))}
                     <button onClick={() => onAction('إضافة درس جديد')} className="w-full py-3 border-2 border-dashed border-slate-100 rounded-xl text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all mt-4">
                        <PlusSquare size={14}/> إضافة درس أو اختبار للوحدة
                     </button>
                  </div>
               </div>
             ))}
             <button onClick={() => setBuilderModules([...builderModules, { id: Date.now(), title: 'وحدة تدريبية جديدة', lessons: [] }])} className="w-full py-4 bg-white border-2 border-[#1b4d79]/10 rounded-2xl text-xs font-black text-[#1b4d79] flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-sm">
                <PlusCircle size={20}/> إضافة وحدة تدريبية جديدة
             </button>
          </div>

          <div className="space-y-6">
             <div className="sba-card p-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">إعدادات المحتوى</h3>
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">نوع المحتوى الأساسي</label>
                      <select className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none">
                         <option>دروس مسجلة</option>
                         <option>بث مباشر (Zoom)</option>
                         <option>حضوري (مقر الهيئة)</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500">مدة الوصول للمحتوى</label>
                      <input type="text" defaultValue="90 يوم" className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none" />
                   </div>
                </div>
             </div>
             <div className="sba-card p-8 bg-[#b38e44] text-white">
                <h4 className="text-xs font-black mb-4 flex items-center gap-2"><Sparkles size={16}/> الذكاء الاصطناعي</h4>
                <p className="text-[10px] text-white/70 font-bold leading-relaxed mb-6">استخدم مساعدنا الذكي لإنشاء أسئلة اختبار بناءً على المادة العلمية المرفوعة.</p>
                <button onClick={() => onAction('جاري توليد الأسئلة...', 'info')} className="w-full py-3 bg-white text-[#b38e44] rounded-xl text-[10px] font-black shadow-lg">توليد اختبار ذكي</button>
             </div>
          </div>
       </div>
    </div>
  );

  const AddCourseView = () => (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-20">
       <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('list')} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400">
             <ArrowRight size={20} />
          </button>
          <h1 className="text-xl font-bold text-[#1b4d79]">إنشاء برنامج تدريبي جديد</h1>
       </div>

       <div className="sba-card p-10 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
             <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">عنوان البرنامج التدريبي</label>
                <input type="text" placeholder="مثلاً: صياغة العقود التجارية المتقدمة" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none" />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">التصنيف الأكاديمي</label>
                <select className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none">
                   <option>القانون التجاري</option>
                   <option>القانون الجنائي</option>
                   <option>تأهيل مهني</option>
                </select>
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المدرب الرئيسي</label>
                <input type="text" placeholder="اسم المدرب أو اللجنة المختصة" className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none" />
             </div>
             <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">وصف البرنامج وأهدافه</label>
                <textarea rows={4} placeholder="اشرح باختصار مخرجات التعلم..." className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:border-[#b38e44] outline-none"></textarea>
             </div>
          </div>

          <div className="p-10 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center space-y-4 group hover:bg-blue-50/50 transition-all cursor-pointer mb-10">
             <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-300 group-hover:text-[#1b4d79] transition-all"><FilePlus size={32} /></div>
             <div>
                <p className="text-sm font-bold text-slate-700">ارفع صورة الغلاف للبرنامج</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1">المقاس المفضل: 1200x630 بكسل</p>
             </div>
          </div>

          <div className="flex items-center justify-between pt-10 border-t border-slate-50">
             <button onClick={() => setView('list')} className="text-xs font-bold text-slate-400 hover:text-red-500">إلغاء</button>
             <button onClick={() => { onAction('تم إنشاء مسودة البرنامج بنجاح'); setView('builder'); }} className="px-10 py-3 bg-[#1b4d79] text-white rounded-xl text-xs font-bold shadow-xl flex items-center gap-2">
                حفظ والانتقال لباني الدروس <ChevronLeft size={16} />
             </button>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {view === 'list' && <ListView />}
      {view === 'details' && <DetailsView />}
      {view === 'trainee_mgmt' && <TraineeMgmtView />}
      {view === 'builder' && <BuilderView />}
      {view === 'add' && <AddCourseView />}
    </div>
  );
};

const TabButton = ({ active, onClick, label, icon }: any) => (
  <button onClick={onClick} className={`px-5 py-2.5 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 whitespace-nowrap ${
    active ? 'bg-[#1b4d79] text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
  }`}>
    {icon} {label}
  </button>
);

const FilterButton = ({ active, onClick, label, icon }: any) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 whitespace-nowrap border ${
    active ? 'bg-[#1b4d79] text-white border-[#1b4d79] shadow-sm' : 'bg-white text-slate-500 border-slate-100 hover:bg-slate-50'
  }`}>
    {icon} {label}
  </button>
);

const LessonItem = ({ title, duration, completed, active }: any) => (
  <div className={`p-4 rounded-xl flex items-center justify-between border ${
    active ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-50'
  }`}>
     <div className="flex items-center gap-3">
        {completed ? <CheckCircle2 size={16} className="text-[#5c7c32]"/> : <PlayCircle size={16} className={active ? 'text-[#b38e44]' : 'text-slate-300'}/>}
        <span className={`text-[11px] font-bold ${active ? 'text-[#b38e44]' : 'text-slate-600'}`}>{title}</span>
     </div>
     <span className="text-[9px] font-black text-slate-400">{duration}</span>
  </div>
);

const ChatBubble = ({ role, name, time, text }: any) => (
  <div className={`flex flex-col ${role === 'instructor' ? 'items-end' : 'items-start'}`}>
     <div className="flex items-center gap-2 mb-1.5 px-1">
        <span className="text-[9px] font-black text-slate-400">{time}</span>
        <span className={`text-[9px] font-black ${role === 'instructor' ? 'text-[#b38e44]' : 'text-[#1b4d79]'}`}>{name}</span>
     </div>
     <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-bold shadow-sm leading-relaxed ${
        role === 'instructor' 
          ? 'bg-[#1b4d79] text-white rounded-tr-none' 
          : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
     }`}>
        {text}
     </div>
  </div>
);

const StatProgress = ({ label, val, total, color }: any) => (
  <div className="space-y-1.5">
     <div className="flex justify-between text-[10px] font-black">
        <span className="text-slate-400">{label}</span>
        <span style={{ color }}>{val}/{total}</span>
     </div>
     <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${(val/total)*100}%`, backgroundColor: color }}></div>
     </div>
  </div>
);

const TypeBadge = ({ type }: any) => {
  const configs: any = {
    recorded: { icon: <Video size={10}/>, label: 'مسجلة', color: 'bg-blue-600' },
    virtual: { icon: <Monitor size={10}/>, label: 'بث مباشر', color: 'bg-[#5c7c32]' },
    onsite: { icon: <MapPin size={10}/>, label: 'حضوري', color: 'bg-[#b38e44]' }
  }
  const c = configs[type];
  return <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-white font-bold text-[9px] ${c.color} shadow-lg`}>{c.icon}<span>{c.label}</span></div>
}

export default CourseManagement;
