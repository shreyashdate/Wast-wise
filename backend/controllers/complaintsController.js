const pool = require('../db');

// Get all complaints
const getAllComplaints = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM complaint ORDER BY complaint_id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get complaints error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new complaint
const addComplaint = async (req, res) => {
  try {
    const { location, description } = req.body;

    if (!location || location.trim() === '' || !description || description.trim() === '') {
      return res.status(400).json({ error: 'Valid location and description are required' });
    }

    const result = await pool.query(
      'INSERT INTO complaint (location, description) VALUES ($1, $2) RETURNING *',
      [location.trim(), description.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add complaint error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update complaint status
const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = await pool.query(
      'UPDATE complaint SET status = $1 WHERE complaint_id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Update complaint error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllComplaints, addComplaint, updateComplaintStatus };
