import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ManagerDashboard from './pages/ManagerDashboard';
import CitizenDashboard from './pages/CitizenDashboard';
import LandingPage from './pages/LandingPage';

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Dashboard({ user, handleLogout }) {
  return (
    <div className="app">
      <nav className="nav">
        <a href="/" className="nav-logo">
          <svg viewBox="0 0 36 36" fill="none" width="30" height="30">
            <circle cx="18" cy="18" r="16" fill="#edf5e4" />
            <path d="M13 20l-3 3 3 3" stroke="#3a6b22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 23h8a6 6 0 0 0 0-12h-2" stroke="#3a6b22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M23 16l3-3-3-3" stroke="#8bc34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 13h-8a6 6 0 0 0 0 12h2" stroke="#8bc34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          WasteWise
        </a>
        <div className="user-info">
          <span>{user.name} <span style={{ opacity: 0.6 }}>({user.role})</span></span>
          <button className="btn btn-secondary btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="content" data-aos="fade-up">
        <Routes>
          <Route path="/*" element={user.role === 'admin' ? <CitizenDashboard user={user} /> : <ManagerDashboard user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
        <Route path="/login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
