import { useState } from 'react';
import { login } from '../api';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(name, phone);
      onLogin(user);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card" data-aos="zoom-in-up">
        <svg viewBox="0 0 36 36" fill="none" width="48" height="48" style={{ marginBottom: 12 }}>
          <circle cx="18" cy="18" r="16" fill="#edf5e4" />
          <path d="M13 20l-3 3 3 3" stroke="#3a6b22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 23h8a6 6 0 0 0 0-12h-2" stroke="#3a6b22" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 16l3-3-3-3" stroke="#8bc34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 13h-8a6 6 0 0 0 0 12h2" stroke="#8bc34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2>WasteWise Portal</h2>
        <p className="subtitle">Login to coordinate collection tracking</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center" style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '0.78rem', color: '#999' }}>
            <strong>Demo accounts:</strong><br />
            Citizen — Name: <em>Admin User</em>, Phone: <em>0000000000</em><br />
            Manager — Name: <em>Rahul Sharma</em>, Phone: <em>9876543210</em>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
