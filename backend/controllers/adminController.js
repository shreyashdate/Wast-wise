const pool = require('../db');

// Reset the database, either clear completely (keeping just the admin) or seed with sample data
const resetSystem = async (req, res) => {
  try {
    const { mode } = req.body; // 'clean' or 'seed'

    // Truncate all tables and restart identity
    await pool.query('TRUNCATE bin, worker, collection, complaint RESTART IDENTITY CASCADE');

    if (mode === 'seed') {
      // Insert default Admin
      await pool.query("INSERT INTO worker (name, phone, role) VALUES ('Admin User', '0000000000', 'admin')");
      
      // Insert Default Workers
      await pool.query("INSERT INTO worker (name, phone, role) VALUES ('Rahul Sharma', '9876543210', 'worker')");
      await pool.query("INSERT INTO worker (name, phone, role) VALUES ('Priya Patel', '9876543211', 'worker')");
      await pool.query("INSERT INTO worker (name, phone, role) VALUES ('Amit Kumar', '9876543212', 'worker')");

      // Insert Bins
      await pool.query("INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('MG Road - Sector 5', 'Full', '2026-03-20', 2)");
      await pool.query("INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('City Park Entrance', 'Empty', '2026-03-22', 2)");
      await pool.query("INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('Railway Station - Platform 1', 'Full', '2026-03-18', 3)");
      await pool.query("INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('Market Square', 'Empty', '2026-03-23', 3)");
      await pool.query("INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('School Road Junction', 'Full', '2026-03-15', 4)");
      await pool.query("INSERT INTO bin (location, status, last_collected, assigned_worker_id) VALUES ('Hospital Lane', 'Empty', '2026-03-21', NULL)");

      // Collections
      await pool.query("INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (1, 2, '2026-03-20', 'Collected')");
      await pool.query("INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (2, 2, '2026-03-22', 'Collected')");
      await pool.query("INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (3, 3, '2026-03-18', 'Collected')");
      await pool.query("INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (4, 3, '2026-03-23', 'Collected')");
      await pool.query("INSERT INTO collection (bin_id, worker_id, collection_date, status) VALUES (5, 4, '2026-03-15', 'Not Collected')");

      // Complaints
      await pool.query("INSERT INTO complaint (location, description, status) VALUES ('MG Road - Sector 5', 'Bin overflowing for 3 days, bad smell in area.', 'Pending')");
      await pool.query("INSERT INTO complaint (location, description, status) VALUES ('Railway Station - Platform 1', 'Bin is damaged and waste is spilling out.', 'Pending')");
      await pool.query("INSERT INTO complaint (location, description, status) VALUES ('Market Square', 'No bin available near the vegetable market.', 'Resolved')");
    } else {
      // Even in clean mode, we need the admin user otherwise we cannot login to dashboard!
      await pool.query("INSERT INTO worker (name, phone, role) VALUES ('Admin User', '0000000000', 'admin')");
    }

    res.json({ message: `System reset successful (Mode: ${mode || 'clean'})` });
  } catch (err) {
    console.error('Reset error:', err.message);
    res.status(500).json({ error: 'Server error during database reset' });
  }
};

module.exports = { resetSystem };
