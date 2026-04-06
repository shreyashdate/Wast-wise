const express = require('express');
const router = express.Router();
const { getAllComplaints, addComplaint, updateComplaintStatus } = require('../controllers/complaintsController');

// GET /api/complaints
router.get('/', getAllComplaints);

// POST /api/complaints
router.post('/', addComplaint);

// PUT /api/complaints/:id
router.put('/:id', updateComplaintStatus);

module.exports = router;
