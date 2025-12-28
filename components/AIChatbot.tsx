
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'أهلاً بك في المساعد الذكي لهيئة المحامين. أنا هنا لدعمك في استفساراتك القانونية أو إدارة رحلتك التدريبية. كيف يمكنني خدمتك؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "أنت المساعد الذكي للهيئة السعودية للمحامين. أجب باحترافية وبوقار، واستخدم مصطلحات قانونية بسيطة ومحفزة. الهوية البصرية هي الأزرق النيلي والذهبي."
        }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || 'عذراً، يرجى إعادة المحاولة.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'نواجه ضغطاً تقنياً، يرجى المحاولة لاحقاً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button - Elegant Style */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-16 h-16 bg-[#1b4d79] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-105 transition-all z-50 group border border-white/10"
      >
        <Bot size={28} className="group-hover:rotate-6 transition-transform" />
        <span className="absolute top-3 right-3 w-3 h-3 bg-[#b38e44] rounded-full border-2 border-white animate-pulse"></span>
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-28 left-8 w-[360px] h-[580px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-10">
          <div className="p-6 bg-[#1b4d79] text-white relative">
            <div className="flex items-center gap-4 relative z-10">
               <div className="w-11 h-11 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/20">
                  <Sparkles size={22} className="text-[#b38e44]" />
               </div>
               <div>
                  <h4 className="text-sm font-bold">المستشار الذكي</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                     <span className="w-2 h-2 bg-[#5c7c32] rounded-full"></span>
                     <span className="text-[9px] text-blue-100/50 font-black uppercase tracking-widest">Counselor AI</span>
                  </div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="absolute top-6 left-6 p-2 hover:bg-white/10 rounded-lg">
               <X size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                 <div className={`max-w-[85%] p-4 rounded-xl text-[12px] leading-relaxed shadow-sm font-bold ${
                   msg.role === 'user' 
                     ? 'bg-[#1b4d79] text-white rounded-tr-none' 
                     : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                 }`}>
                   {msg.text}
                 </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                 <div className="bg-white px-5 py-3 rounded-xl rounded-tl-none border border-slate-100 flex gap-1 items-center">
                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                 </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100 flex flex-col gap-4">
             <div className="flex items-center gap-2">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="كيف يمكنني مساعدتك؟"
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[11px] font-bold focus:outline-none focus:border-[#b38e44]"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-12 h-12 bg-[#1b4d79] text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-[#153a5c] transition-all disabled:opacity-50"
                >
                   <Send size={18} className="rotate-180" />
                </button>
             </div>
             <div className="flex items-center justify-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                <ShieldCheck size={12} className="text-[#5c7c32]" />
                <span>نظام مشفر وفق معايير الأمن السيبراني للهيئة</span>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
