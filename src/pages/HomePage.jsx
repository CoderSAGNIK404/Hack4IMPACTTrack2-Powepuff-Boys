import { Activity, Shield, Heart, Zap, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import DNAModel from '../components/DNAModel';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        <div className="flex-1 space-y-8 animate-[slide-up-fade_1s_ease-out_forwards]">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-[0.2em]">
            <Shield className="w-4 h-4" /> Your Health, Secured
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black text-white leading-tight tracking-tighter">
            Suraksha<span className="text-emerald-500">AI</span>
          </h1>
          
          <p className="text-xl text-emerald-50/60 max-w-xl leading-relaxed font-medium">
            Leveraging <span className="text-emerald-400">Gemini Pro AI</span> to assess your health risks in real-time. 
            Get preventive insights and instant clinic discovery at your fingertips.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/form" 
              className="px-8 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 group"
            >
              Start Diagnostic Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full h-[500px] relative animate-[spin-fade_1.5s_ease-out_forwards]">
          <DNAModel />
          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%) pointer-events-none"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-7xl px-8 py-24 border-t border-white/5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Heart className="w-8 h-8 text-rose-500" />, 
              title: "Cardio Metrics", 
              desc: "Deep analysis of heart biomarkers using advanced AI neural models." ,
              bg: "from-rose-500/10 to-transparent"
            },
            { 
              icon: <Zap className="w-8 h-8 text-emerald-400" />, 
              title: "Instant Results", 
              desc: "Get your biological risk score and clinical suggestions in seconds.",
              bg: "from-emerald-500/10 to-transparent"
            },
            { 
              icon: <MapPin className="w-8 h-8 text-blue-400" />, 
              title: "Clinic Connect", 
              desc: "Instantly find and book top-rated specialists via Google Maps.",
              bg: "from-blue-500/10 to-transparent"
            }
          ].map((feature, i) => (
            <div key={i} className={`group p-10 rounded-[3rem] bg-gradient-to-br ${feature.bg} bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all hover:-translate-y-2`}>
              <div className="mb-6 p-4 bg-white/5 rounded-2xl inline-block group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-emerald-50/50 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-emerald-950/20 py-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-12 text-center">
          {[
            { val: "94.2%", label: "AI Accuracy" },
            { val: "50k+", label: "Lives Analyzed" },
            { val: "2.5s", label: "Diagnostic Speed" }
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <div className="text-5xl font-black text-white tracking-tighter">{stat.val}</div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
