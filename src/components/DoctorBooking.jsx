import { useState } from 'react';
import { doctors } from '../data/doctors';
import { Calendar, Clock, Star, CheckCircle2, AlertCircle, ChevronRight, MapPin, ExternalLink } from 'lucide-react';

const DoctorBooking = ({ recommendedType, isHighRisk }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  const filteredDoctors = doctors.filter(doc => 
    recommendedType === 'Any' || doc.specialty === recommendedType || (recommendedType === 'Wellness' && doc.specialty === 'Wellness Expert')
  );

  const handleBook = () => {
    if (selectedDoctor && selectedSlot) {
      setBooked(true);
    }
  };

  if (booked) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-[slide-up-fade_0.6s_ease-out]">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Your session with <span className="font-semibold text-emerald-700">{selectedDoctor.name}</span> is scheduled for <span className="font-semibold text-emerald-700">{selectedSlot}</span> today.
        </p>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 w-full max-w-xs text-sm text-emerald-800">
          <p>Please arrive 10 minutes before your slot.</p>
        </div>
        <button 
          onClick={() => setBooked(false)}
          className="mt-8 text-emerald-600 font-medium hover:underline text-sm"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-[slide-up-fade_0.8s_ease-out] text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tighter text-white">Select Specialist</h2>
          <p className="text-emerald-50/50 font-medium">
            {isHighRisk 
              ? "Emergency priority: Immediate clinical slots reserved." 
              : `Recommended: ${recommendedType} expertise for diagnostics.`}
          </p>
        </div>
        {isHighRisk && (
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-500/10 text-red-400 rounded-full text-[10px] font-black border border-red-500/20 animate-pulse tracking-widest uppercase">
            <AlertCircle className="w-4 h-4" />
            Priority Bypass Active
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredDoctors.map((doc) => (
          <div 
            key={doc.id}
            onClick={() => setSelectedDoctor(doc)}
            className={`group relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-[3rem] border-2 transition-all p-8 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)] cursor-pointer ${
              selectedDoctor?.id === doc.id 
                ? 'border-emerald-500 bg-emerald-500/5' 
                : isHighRisk && doc.specialty === 'Cardiologist'
                  ? 'border-red-500/30 bg-red-500/5'
                  : 'border-white/5 hover:border-white/10'
            }`}
          >
            <div className="flex gap-6">
              <div className="relative shrink-0">
                <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-3xl object-cover bg-white/10" />
                <div className="absolute -bottom-2 -right-2 bg-black rounded-full p-1.5 border border-white/10">
                  <div className="flex items-center gap-1 px-1.5 bg-yellow-400 rounded-full text-[10px] font-black text-black">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {doc.rating}
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-black text-white truncate tracking-tight">{doc.name}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">{doc.specialty}</p>
                </div>
                <div className="flex items-center gap-2 mt-3 text-emerald-50/40 group-hover:text-emerald-400 transition-colors">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold truncate tracking-wide">{doc.hospital}</span>
                </div>
              </div>
              <a 
                href={`https://www.google.com/maps/search/${encodeURIComponent(doc.name + ' ' + doc.hospital)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl text-white/30 hover:bg-emerald-500 hover:text-white transition-all border border-white/5"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" /> Clinical Slots
              </p>
              <div className="flex flex-wrap gap-2">
                {doc.slots.map(slot => (
                  <button
                    key={slot}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDoctor(doc);
                      setSelectedSlot(slot);
                    }}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all border ${
                      selectedDoctor?.id === doc.id && selectedSlot === slot
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {selectedDoctor?.id === doc.id && selectedSlot && (
              <button
                onClick={handleBook}
                className="w-full mt-8 py-5 bg-emerald-600 text-white rounded-[2rem] text-sm font-black shadow-2xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 animate-[slide-up-fade_0.3s_ease-out] uppercase tracking-widest"
              >
                Confirm Booking
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {isHighRisk && doc.specialty === 'Cardiologist' && !selectedDoctor && (
              <div className="absolute top-4 right-4 text-[9px] font-black text-red-400 uppercase tracking-[0.2em] bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                AI Suggestion
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorBooking;
