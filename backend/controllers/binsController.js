const pool = require('../db');

// Get all bins (with assigned worker name)
const getAllBins = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, w.name AS worker_name
      FROM bin b
      LEFT JOIN worker w ON b.assigned_worker_id = w.worker_id
      ORDER BY b.bin_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Get bins error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get bins assigned to a specific worker
const getBinsByWorker = async (req, res) => {
  try {
    const { workerId } = req.params;
    const result = await pool.query(
      'SELECT * FROM bin WHERE assigned_worker_id = $1 ORDER BY bin_id',
      [workerId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get worker bins error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new bin
const addBin = async (req, res) => {
  try {
    const { location, status } = req.body;

    if (!location || location.trim() === '') {
      return res.status(400).json({ error: 'Location cannot be empty' });
    }
    
    // Check for duplicate location
    const existing = await pool.query('SELECT bin_id FROM bin WHERE location = $1', [location.trim()]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'A bin at this location already exists' });
    }

    const result = await pool.query(
      'INSERT INTO bin (location, status) VALUES ($1, $2) RETURNING *',
      [location.trim(), status || 'Empty']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add bin error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Assign a worker to a bin
const assignWorker = async (req, res) => {
  try {
    const { binId } = req.params;
    const { workerId } = req.body;

    const result = await pool.query(
      'UPDATE bin SET assigned_worker_id = $1 WHERE bin_id = $2 RETURNING *',
      [workerId || null, binId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bin not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Assign worker error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update bin status (for workers)
const updateBinStatus = async (req, res) => {
  try {
    const { binId } = req.params;
    const { status, last_collected } = req.body;

    const result = await pool.query(
      'UPDATE bin SET status = $1, last_collected = $2 WHERE bin_id = $3 RETURNING *',
      [status, last_collected || new Date().toISOString().split('T')[0], binId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bin not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update bin status error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllBins, getBinsByWorker, addBin, assignWorker, updateBinStatus };
