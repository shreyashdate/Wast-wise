const express = require('express');
const router = express.Router();
const { getAllBins, getBinsByWorker, addBin, assignWorker, updateBinStatus } = require('../controllers/binsController');

// GET /api/bins
router.get('/', getAllBins);

// GET /api/bins/worker/:workerId
router.get('/worker/:workerId', getBinsByWorker);

// POST /api/bins
router.post('/', addBin);

// PUT /api/bins/:binId/assign
router.put('/:binId/assign', assignWorker);

// PUT /api/bins/:binId/status
router.put('/:binId/status', updateBinStatus);

module.exports = router;
