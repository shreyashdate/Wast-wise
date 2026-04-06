const pool = require('../db');

// Login - match name and phone
const login = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const result = await pool.query(
      'SELECT worker_id, name, phone, role FROM worker WHERE name = $1 AND phone = $2',
      [name, phone]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    res.json({
      id: user.worker_id,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { login };
