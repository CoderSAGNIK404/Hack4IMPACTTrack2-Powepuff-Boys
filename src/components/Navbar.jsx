import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import SOSButton from './SOSButton';

const Navbar = () => {
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

      <div className="flex gap-8 items-center">
        <Link to="/home" className="text-sm font-black text-emerald-50/60 hover:text-emerald-400 transition-colors uppercase tracking-widest">Dashboard</Link>
        <Link to="/form" className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 px-6 py-2 rounded-full text-xs font-black transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] uppercase tracking-widest">
          Start Assessment
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
