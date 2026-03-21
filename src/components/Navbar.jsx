import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import SOSButton from './SOSButton';

const Navbar = ({ onOpenSuraksha }) => {
  return (
    <nav className="h-20 w-full flex items-center justify-between px-8 z-50 animate-[slide-up-fade_1s_ease-out_forwards] opacity-0 relative">
      <Link to="/home" className="flex items-center gap-2 group transition-transform hover:scale-105">
        <Activity className="text-emerald-400 w-8 h-8 group-hover:animate-pulse" strokeWidth={2.5} />
        <span className="text-2xl font-black tracking-tighter text-white">
          Suraksha<span className="text-emerald-400">AI</span>
        </span>
      </Link>

      {/* SOS Button always centered in navbar */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <SOSButton />
      </div>

      <div className="flex gap-6 items-center">
        <button 
          onClick={onOpenSuraksha}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black transition-all hover:bg-emerald-500/20 group uppercase tracking-widest"
        >
          <div className="relative">
             <Activity className="w-4 h-4 animate-pulse" />
             <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
          Mrs. Suraksha
        </button>
        <Link to="/home" className="text-sm font-black text-emerald-50/60 hover:text-emerald-400 transition-colors uppercase tracking-widest">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
