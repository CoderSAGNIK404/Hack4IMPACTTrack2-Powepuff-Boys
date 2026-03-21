import React from 'react';
import { X } from 'lucide-react';

const GlassModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-[fade-in-modal_0.3s_ease-out]">
      <div className="absolute inset-0 bg-[#070a0d]/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white/5 border border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col animate-[scale-up_0.4s_ease-out]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-8 border-b border-white/5">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white tracking-tight">{title}</h3>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500/60 transition-all">Secure Biological Connection</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/40 hover:text-white transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlassModal;
