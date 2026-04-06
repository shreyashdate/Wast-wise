import { useState } from 'react';
import { addComplaint } from '../api';

function ComplaintForm({ onAdded }) {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComplaint({ location, description });
      setMessage('Complaint submitted successfully');
      setLocation('');
      setDescription('');
      onAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="card">
      <h3>File a Complaint</h3>
      {message && (
        <div className={`alert ${message.startsWith('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0 }}>
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g. Market Square"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;
