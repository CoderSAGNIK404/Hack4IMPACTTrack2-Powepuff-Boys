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
        <div className="fixed inset-0 pointer-events-none -z-20 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.05),transparent_50%)]"></div>
        </div>
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
