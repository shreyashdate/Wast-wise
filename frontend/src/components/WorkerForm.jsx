import { useState } from 'react';
import { addWorker } from '../api';

function WorkerForm({ onAdded }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addWorker({ name, phone });
      setMessage('Worker added successfully');
      setName('');
      setPhone('');
      onAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="card">
      <h3>Add New Worker</h3>
      {message && (
        <div className={`alert ${message.startsWith('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: 1, minWidth: '180px', marginBottom: 0 }}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Worker name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ flex: 1, minWidth: '160px', marginBottom: 0 }}>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Worker
        </button>
      </form>
    </div>
  );
}

export default WorkerForm;
