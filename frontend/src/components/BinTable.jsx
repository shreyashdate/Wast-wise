import { useState, useEffect } from 'react';
import { getBins, getWorkers, assignWorkerToBin } from '../api';

function BinTable({ isManager = true }) {
  const [bins, setBins] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [binsData, workersData] = await Promise.all([getBins(), getWorkers()]);
      setBins(binsData);
      setWorkers(workersData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (binId, workerId) => {
    try {
      await assignWorkerToBin(binId, workerId);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading bins...</p>;

  return (
    <div className="card">
      <h3>All Bins</h3>
      {bins.length === 0 ? (
        <div className="empty-state">No bins added yet.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Status</th>
                <th>Last Collected</th>
                <th>Assigned Worker</th>
              </tr>
            </thead>
            <tbody>
              {bins.map((bin) => (
                <tr key={bin.bin_id}>
                  <td>{bin.bin_id}</td>
                  <td>{bin.location}</td>
                  <td>
                    <span className={`badge badge-${bin.status.toLowerCase()}`}>
                      {bin.status}
                    </span>
                  </td>
                  <td>
                    {bin.last_collected
                      ? new Date(bin.last_collected).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    {isManager ? (
                      <select
                        className="inline-select"
                        value={bin.assigned_worker_id || ''}
                        onChange={(e) => handleAssign(bin.bin_id, e.target.value)}
                      >
                        <option value="">Unassigned</option>
                        {workers.map((w) => (
                          <option key={w.worker_id} value={w.worker_id}>
                            {w.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span style={{ color: bin.worker_name ? 'inherit' : '#999' }}>
                        {bin.worker_name || 'Unassigned'}
                      </span>
                    )}
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

export default BinTable;
