const express = require('express');
const router = express.Router();
const { resetSystem } = require('../controllers/adminController');

// POST /api/admin/reset
router.post('/reset', resetSystem);

module.exports = router;
