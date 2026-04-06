const pool = require('../db');

// Get all collections (with bin location and worker name)
const getAllCollections = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, b.location AS bin_location, w.name AS worker_name
      FROM collection c
      JOIN bin b ON c.bin_id = b.bin_id
      JOIN worker w ON c.worker_id = w.worker_id
      ORDER BY c.collection_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Get collections error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new collection record
const addCollection = async (req, res) => {
  try {
    const { bin_id, worker_id, collection_date, status } = req.body;

    if (!bin_id || !worker_id) {
      return res.status(400).json({ error: 'bin_id and worker_id are required' });
    }

    const result = await pool.query(
      'INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [bin_id, worker_id, collection_date || new Date().toISOString().split('T')[0], status || 'Collected']
    );

    // Also update the bin's last_collected date and status
    await pool.query(
      'UPDATE bin SET last_collected = $1, status = $2 WHERE bin_id = $3',
      [collection_date || new Date().toISOString().split('T')[0], status === 'Collected' ? 'Empty' : 'Full', bin_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add collection error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllCollections, addCollection };
