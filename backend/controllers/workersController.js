const pool = require('../db');

// Get all workers (excluding admins)
const getAllWorkers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM worker WHERE role = 'worker' ORDER BY worker_id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get workers error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new worker
const addWorker = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || name.trim() === '' || !phone || phone.trim() === '') {
      return res.status(400).json({ error: 'Valid name and phone are required' });
    }
    
    // Check for duplicate phone
    const existing = await pool.query('SELECT worker_id FROM worker WHERE phone = $1', [phone.trim()]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'A worker with this phone number already exists' });
    }

    const result = await pool.query(
      "INSERT INTO worker (name, phone, role) VALUES ($1, $2, 'worker') RETURNING *",
      [name.trim(), phone.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add worker error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove a worker
const deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, unassign this worker from any bins
    await pool.query('UPDATE bin SET assigned_worker_id = NULL WHERE assigned_worker_id = $1', [id]);
    
    // Then, delete the worker
    const result = await pool.query('DELETE FROM worker WHERE worker_id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    
    res.json({ message: 'Worker removed successfully', deleted: result.rows[0] });
  } catch (err) {
    console.error('Delete worker error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllWorkers, addWorker, deleteWorker };
