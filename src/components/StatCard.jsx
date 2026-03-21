import React from 'react';

const StatCard = ({ icon, label, value, unit, trend, color = "emerald" }) => {
  const colorMap = {
    emerald: "from-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rose: "from-rose-500/10 text-rose-400 border-rose-500/20",
    blue: "from-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "from-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <div className={`p-6 rounded-[2rem] bg-linear-to-br ${colorMap[color]} to-transparent bg-white/5 border backdrop-blur-xl transition-all hover:scale-105 group`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] font-black uppercase tracking-widest opacity-50 px-2 py-1 rounded-full bg-white/5">
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-xs font-black uppercase tracking-[0.2em] opacity-40">{label}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black tracking-tighter text-white">{value}</span>
          <span className="text-sm font-bold opacity-40">{unit}</span>
        </div>
      </div>
      {/* Mini Pulse Indicator */}
      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-current w-1/3 animate-[pulse_2s_infinite]"></div>
      </div>
    </div>
  );
};

export default StatCard;
