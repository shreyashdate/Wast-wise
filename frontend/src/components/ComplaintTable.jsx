import { useState, useEffect } from 'react';
import { getComplaints, updateComplaintStatus } from '../api';

function ComplaintTable({ isManager = true }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleToggleStatus = async (complaint) => {
    const newStatus = complaint.status === 'Pending' ? 'Resolved' : 'Pending';
    try {
      await updateComplaintStatus(complaint.complaint_id, newStatus);
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div className="card">
      <h3>Complaints</h3>
      {complaints.length === 0 ? (
        <div className="empty-state">No complaints filed yet.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Description</th>
                <th>Status</th>
                {isManager && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.complaint_id}>
                  <td>{c.complaint_id}</td>
                  <td>{c.location}</td>
                  <td>{c.description}</td>
                  <td>
                    <span className={`badge badge-${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                  </td>
                  {isManager && (
                    <td>
                      <button
                        className={`btn btn-sm ${
                          c.status === 'Pending' ? 'btn-success' : 'btn-secondary'
                        }`}
                        onClick={() => handleToggleStatus(c)}
                      >
                        {c.status === 'Pending' ? 'Resolve' : 'Reopen'}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComplaintTable;
