const express = require('express');
const router = express.Router();
const { getAllWorkers, addWorker, deleteWorker } = require('../controllers/workersController');

// GET /api/workers
router.get('/', getAllWorkers);

// POST /api/workers
router.post('/', addWorker);

// DELETE /api/workers/:id
router.delete('/:id', deleteWorker);

module.exports = router;
