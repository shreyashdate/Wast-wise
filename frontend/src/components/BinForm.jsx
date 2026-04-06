import { useState } from 'react';
import { addBin } from '../api';

function BinForm({ onAdded }) {
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('Empty');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBin({ location, status });
      setMessage('Bin added successfully');
      setLocation('');
      setStatus('Empty');
      onAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="card">
      <h3>Add New Bin</h3>
      {message && (
        <div className={`alert ${message.startsWith('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
          <label>Location</label>
          <input
            type="text"
            placeholder="e.g. MG Road - Sector 3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ width: '140px', marginBottom: 0 }}>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Empty">Empty</option>
            <option value="Full">Full</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Add Bin
        </button>
      </form>
    </div>
  );
}

export default BinForm;
