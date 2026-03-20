import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HealthFormPage from './pages/HealthFormPage';
import ResultPage from './pages/ResultPage';

function AppContent() {
  const location = useLocation();
  const isLandingOrLogin = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Decorative global background Elements hidden on the login/landing page */}
      {!isLandingOrLogin && (
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-emerald-100/50 via-background to-background"></div>
      )}
      
      {!isLandingOrLogin && <Navbar />}

      <main className="grow w-full">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/form" element={<HealthFormPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </main>
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
