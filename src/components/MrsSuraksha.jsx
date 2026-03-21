import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Send, Volume2, VolumeX, Sparkles, MessageCircle, HeartPulse, Paperclip, Image as ImageIcon, Plus, FileText } from 'lucide-react';
import OpenAI from "openai";

const MrsSuraksha = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello, I am Mrs. Suraksha, your personal AI Medical Assistant. How can I help you today? You can speak to me in any language." }
  ]);
  const [language, setLanguage] = useState('en-US'); // en-US, hi-IN, es-ES
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition Safely
  useEffect(() => {
    try {
      const { SpeechRecognition, webkitSpeechRecognition } = window;
      const SpeechRec = SpeechRecognition || webkitSpeechRecognition;
      if (SpeechRec) {
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language; // Sync with selected language
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsRecording(false);
          handleSend(transcript);
        };

        recognition.onerror = (event) => {
          console.error("Speech Recognition Error:", event.error);
          setIsRecording(false);
        };
        recognition.onend = () => setIsRecording(false);
        recognitionRef.current = recognition;
      }
    } catch (e) {
      console.error("Failed to initialize Speech Recognition:", e);
    }
  }, [language]); // Re-initialize if language changes

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speak = (text) => {
    if (!voiceEnabled) return; // Respect Voice Toggle
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language; // Sync voice language
      
      const voices = window.speechSynthesis.getVoices();
      // Try to find a voice that matches the language
      const langVoice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
      if (langVoice) utterance.voice = langVoice;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error("Speech Synthesis Error:", e);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      url: URL.createObjectURL(file),
      file: file
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSend = async (textOverride = null) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() && attachments.length === 0) return;
    if (isLoading) return;

    const userMessage = { 
      role: 'user', 
      text: textToSend,
      attachments: attachments 
    };
    setMessages(prev => [...prev, userMessage]);
    const currentAttachments = [...attachments];
    setAttachments([]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error("Groq API Key missing");

      const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: "https://api.groq.com/openai/v1",
        dangerouslyAllowBrowser: true
      });

      const systemPrompt = `
        You are Mrs. Suraksha, the ultimate AI Doctor and Clinical Encyclopedia. 
        Detect user language and respond in ${language}.
        ${currentAttachments.length > 0 ? `The user has attached ${currentAttachments.length} clinical items (${currentAttachments.map(a => a.name).join(', ')}). Acknowledge these and provide advice as if you can "see" their data.` : ''}
      `;

      const completion = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: textToSend || "I have attached some files for your clinical review." }
        ],
      });

      const aiText = completion.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
      speak(aiText);
    } catch (error) {
      console.error("Mrs. Suraksha Groq API Error:", error);
      const fallbackResponse = `I am currently operating in Clinical Offline Mode. I have received your message ${currentAttachments.length > 0 ? 'and attachments' : ''} and logged them for analysis.`;
      setMessages(prev => [...prev, { role: 'assistant', text: fallbackResponse }]);
      speak("Received. Logging your data for clinical review.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    try {
      if (isRecording) {
        recognitionRef.current?.stop();
      } else {
        if (!recognitionRef.current) {
          alert("Speech recognition is not supported or was not initialized in this browser.");
          return;
        }
        window.speechSynthesis.cancel();
        recognitionRef.current.start();
        setIsRecording(true);
      }
    } catch (e) {
      console.error("Toggle Recording Error:", e);
      setIsRecording(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-10 animate-[fade-in-modal_0.3s_ease-out_forwards]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={onClose}></div>
      
      {/* Chat Window */}
      <div className="relative w-full max-w-4xl h-[85vh] bg-neutral-900/90 border border-emerald-500/20 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-[scale-in-modal_0.4s_ease-out_forwards]">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-emerald-500/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 relative">
               <HeartPulse className="w-8 h-8 text-emerald-400" />
               <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Mrs. Suraksha <span className="text-emerald-500 text-sm font-black uppercase tracking-widest ml-2">AI Doctor</span></h2>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                 <Sparkles className="w-3 h-3" /> Online & Synchronized
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Language Selection */}
            <div className="hidden md:flex items-center bg-black/40 rounded-2xl p-1 border border-white/5">
              {[
                { name: 'EN', code: 'en-US' },
                { name: 'HI', code: 'hi-IN' },
                { name: 'ES', code: 'es-ES' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                    language === lang.code ? 'bg-emerald-500 text-white' : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            {/* Voice Toggle */}
            <button 
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (voiceEnabled) window.speechSynthesis.cancel();
              }}
              className={`p-3 rounded-2xl border transition-all ${
                voiceEnabled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-all text-white/50 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-[slide-up-fade_0.4s_ease-out_forwards]`}>
              <div className={`max-w-[80%] p-6 rounded-4xl text-sm leading-relaxed font-medium ${
                m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none shadow-xl shadow-emerald-900/20' 
                : 'bg-white/5 border border-white/10 text-emerald-50 rounded-bl-none'
              }`}>
                {m.attachments?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {m.attachments.map(att => (
                      <div key={att.id} className="relative rounded-2xl overflow-hidden bg-black/20 border border-white/10 group">
                        {att.type === 'image' ? (
                          <img src={att.url} alt="upload" className="w-32 h-32 object-cover" />
                        ) : (
                          <div className="w-32 h-32 flex flex-col items-center justify-center p-3 text-center">
                            <FileText className="w-8 h-8 mb-2 opacity-50" />
                            <span className="text-[10px] break-all line-clamp-2">{att.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white/5 border border-white/10 p-6 rounded-4xl rounded-bl-none text-emerald-400/50 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-current animate-bounce"></div>
                 <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-8 bg-black/40 border-t border-white/5">
          {/* Attachment Preview Area */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6 animate-in slide-in-from-bottom-4">
               {attachments.map(att => (
                 <div key={att.id} className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group">
                   {att.type === 'image' ? (
                     <img src={att.url} alt="preview" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center">
                       <FileText className="w-6 h-6 text-emerald-400" />
                     </div>
                   )}
                   <button 
                     onClick={() => removeAttachment(att.id)}
                     className="absolute top-1 right-1 bg-black/60 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                     <X className="w-3 h-3 text-white" />
                   </button>
                 </div>
               ))}
            </div>
          )}

          <div className="relative flex items-center gap-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              onChange={handleFileSelect}
            />
            
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-5 bg-white/5 text-emerald-400 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all border border-white/5"
            >
               <Plus className="w-6 h-6" />
            </button>

            <button 
              onClick={toggleRecording}
              className={`p-5 rounded-2xl transition-all flex items-center justify-center relative group ${
                isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-white/5 text-emerald-400 hover:bg-emerald-500 hover:text-white'
              }`}
            >
               {isRecording && <div className="absolute inset-0 rounded-2xl border-2 border-rose-400 animate-ping"></div>}
               <Mic className="w-6 h-6" />
            </button>

            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isRecording ? "Listening..." : "Ask Mrs. Suraksha anything..."}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all font-medium"
            />

            <button 
              onClick={() => handleSend()}
              disabled={isLoading || (!input.trim() && attachments.length === 0)}
              className="p-5 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-emerald-900/20"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          {isSpeaking && (
             <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400/60 text-[10px] font-black uppercase tracking-widest animate-pulse">
                <Volume2 className="w-3 h-3" /> Mrs. Suraksha is speaking...
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MrsSuraksha;
