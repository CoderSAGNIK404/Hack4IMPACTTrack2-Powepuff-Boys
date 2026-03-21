import React from 'react';

const HealthRing = ({ percentage = 85, status = "Excellent" }) => {
  const strokeWidth = 10;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center p-8 glass-card">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-emerald-500 transition-all duration-1000 ease-out"
            style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-black text-white">{percentage}%</span>
            <span className="text-[10px] uppercase font-black tracking-tighter text-emerald-400">Score</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="text-xs uppercase font-black tracking-[0.3em] text-emerald-500/40 mb-1">Status</div>
        <div className="text-xl font-black text-white tracking-tight">{status}</div>
      </div>
    </div>
  );
};

export default HealthRing;
