import { useState, useEffect } from 'react';
import { getWorkers, deleteWorker } from '../api';

function WorkerTable() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getWorkers();
        setWorkers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p>Loading workers...</p>;

  return (
    <div className="card">
      <h3>All Workers</h3>
      {workers.length === 0 ? (
        <div className="empty-state">No workers added yet.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((w) => (
                <tr key={w.worker_id}>
                  <td>{w.worker_id}</td>
                  <td>{w.name}</td>
                  <td>{w.phone}</td>
                  <td>
                    <button 
                      style={{ backgroundColor: '#ff4444', color: 'white', padding: '0.25rem 0.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      onClick={async () => {
                        if (!window.confirm('Are you sure you want to remove this worker?')) return;
                        try {
                          await deleteWorker(w.worker_id);
                          setWorkers(workers.filter(worker => worker.worker_id !== w.worker_id));
                        } catch (err) {
                          console.error('Error deleting worker', err);
                          alert('Failed to delete worker');
                        }
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WorkerTable;
