import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, Heart, ShieldAlert, Scale, Ruler, Coffee, Zap } from 'lucide-react';
import FormCard from '../components/FormCard';

const HealthFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    sleep: '',
    activity: 'Medium',
    smoking: 'No',
    alcohol: 'None',
    stress: 'Moderate',
    conditions: []
  });

  const conditionsList = ['Diabetes', 'Hypertension', 'Heart Disease', 'High Cholesterol', 'None'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCondition = (condition) => {
    setFormData(prev => {
      if (condition === 'None') return { ...prev, conditions: ['None'] };
      const newConditions = prev.conditions.filter(c => c !== 'None');
      if (newConditions.includes(condition)) {
        return { ...prev, conditions: newConditions.filter(c => c !== condition) };
      }
      return { ...prev, conditions: [...newConditions, condition] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.age || !formData.height || !formData.weight) return;
    navigate('/result', { state: formData });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-transparent text-white">
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden animate-[slide-up-fade_0.8s_ease-out]">
        
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="mb-10 text-center space-y-3">
          <h2 className="text-4xl font-black tracking-tighter text-white">System Diagnostics</h2>
          <p className="text-emerald-50/50 font-medium">Provide clinical metrics for AI biological risk synthesis.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Section 1: Personal Biometrics */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60 flex items-center gap-3">
              <User className="w-3.5 h-3.5" /> 01. Personal Biometrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-emerald-50/40 ml-1 uppercase tracking-widest">Age</label>
                <input type="number" name="age" required value={formData.age} onChange={handleChange} placeholder="e.g. 25" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-emerald-50/40 ml-1 uppercase tracking-widest">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none appearance-none font-bold">
                  <option className="bg-emerald-950">Male</option>
                  <option className="bg-emerald-950">Female</option>
                  <option className="bg-emerald-950">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-emerald-50/40 ml-1 uppercase tracking-widest">Height (cm)</label>
                <input type="number" name="height" required value={formData.height} onChange={handleChange} placeholder="e.g. 175" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-emerald-50/40 ml-1 uppercase tracking-widest">Weight (kg)</label>
                <input type="number" name="weight" required value={formData.weight} onChange={handleChange} placeholder="e.g. 70" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none font-bold" />
              </div>
            </div>
          </div>

          {/* Section 2: Lifestyle Markers */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60 flex items-center gap-3">
              <Activity className="w-3.5 h-3.5" /> 02. Lifestyle Habits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-emerald-50/40 ml-1 uppercase tracking-widest">Daily Sleep</label>
                <input type="number" name="sleep" required value={formData.sleep} onChange={handleChange} placeholder="e.g. 7" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-emerald-50/40 ml-1 uppercase tracking-widest">Activity</label>
                <select name="activity" value={formData.activity} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white transition-all outline-none appearance-none font-bold">
                  <option value="Low" className="bg-emerald-950">Low (Sedentary)</option>
                  <option value="Medium" className="bg-emerald-950">Medium (Moderate)</option>
                  <option value="High" className="bg-emerald-950">High (Active)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="text-[11px] font-bold text-emerald-50/40 ml-1 uppercase tracking-widest">Do you smoke?</label>
              <div className="flex gap-4">
                {['No', 'Yes'].map(opt => (
                  <button key={opt} type="button" onClick={() => setFormData(p => ({...p, smoking: opt}))} className={`flex-1 py-4 rounded-2xl font-black transition-all border ${formData.smoking === opt ? 'bg-emerald-600 border-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Medical History */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60 flex items-center gap-3">
              <Heart className="w-3.5 h-3.5" /> 03. Medical History
            </h3>
            <div className="flex flex-wrap gap-2">
              {conditionsList.map(cond => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => toggleCondition(cond)}
                  className={`px-4 py-2.5 rounded-xl text-[10px] font-black transition-all border uppercase tracking-widest ${
                    formData.conditions.includes(cond)
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                      : 'bg-white/5 border-white/5 text-white/30 hover:bg-white/10'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 rounded-[2rem] transition-all shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-3 text-lg group active:scale-[0.98]"
          >
            Synthesize Diagnostics
            <Zap className="w-5 h-5 group-hover:animate-pulse" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HealthFormPage;
