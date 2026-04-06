import { useState, useEffect } from 'react';
import { getCollections } from '../api';

function CollectionTable() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCollections();
        setCollections(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p>Loading collection history...</p>;

  return (
    <div className="card">
      <h3>Collection History</h3>
      {collections.length === 0 ? (
        <div className="empty-state">No collection records yet.</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Bin Location</th>
                <th>Worker</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((c) => (
                <tr key={c.collection_id}>
                  <td>{c.collection_id}</td>
                  <td>{c.bin_location}</td>
                  <td>{c.worker_name}</td>
                  <td>{new Date(c.collection_date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge badge-${c.status
                        .toLowerCase()
                        .replace(' ', '-')}`}
                    >
                      {c.status}
                    </span>
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

export default CollectionTable;
