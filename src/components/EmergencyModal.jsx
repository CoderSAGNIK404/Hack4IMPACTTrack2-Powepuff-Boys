import { AlertTriangle, X } from 'lucide-react';

const EmergencyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Persistent pulsing red background overlay */}
      <div className="fixed inset-0 z-[190] bg-red-950/90 backdrop-blur-2xl animate-[custom-pulse_1.5s_infinite] pointer-events-none transition-all duration-500"></div>
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="bg-black/60 backdrop-blur-3xl rounded-[3rem] w-full max-w-sm overflow-hidden animate-[scale-in-modal_0.4s_ease-out_forwards] shadow-[0_0_100px_rgba(239,68,68,0.3)] border border-red-500/20 relative">
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="bg-red-500/10 p-10 flex flex-col items-center border-b border-red-500/10 relative">
            <div className="bg-red-500/20 p-6 rounded-full text-red-500 animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-16 h-16" />
            </div>
          </div>
          
          {/* Body */}
          <div className="p-10 text-center space-y-4">
            <h2 className="text-3xl font-black text-white tracking-tighter">SOS Active</h2>
            <p className="text-emerald-50/50 font-medium leading-relaxed">
              Medical emergency triggered. Help is on the way. Please remain at your location.
            </p>
            <button 
              onClick={onClose}
              className="w-full mt-6 py-5 bg-red-600 hover:bg-red-500 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-red-600/40 uppercase tracking-widest text-xs active:scale-[0.98]"
            >
              Acknowledge Alert
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default EmergencyModal;
