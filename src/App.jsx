import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HealthFormPage from './pages/HealthFormPage';
import ResultPage from './pages/ResultPage';
import MrsSuraksha from './components/MrsSuraksha';

function AppContent() {
  const location = useLocation();
  const [showSuraksha, setShowSuraksha] = useState(false);
  const isLandingOrLogin = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Decorative global background... */}
      {!isLandingOrLogin && (
        <div className="fixed inset-0 pointer-events-none -z-20 bg-black">
          <div className="absolute inset-0 bg-radial-[at_top_right] from-emerald-500/15 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-[at_bottom_left] from-emerald-500/5 to-transparent"></div>
        </div>
      )}
      
      {!isLandingOrLogin && <Navbar onOpenSuraksha={() => setShowSuraksha(true)} />}

      <main className="grow w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/form" element={<HealthFormPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </main>

      <MrsSuraksha isOpen={showSuraksha} onClose={() => setShowSuraksha(false)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
