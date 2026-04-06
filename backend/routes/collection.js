const express = require('express');
const router = express.Router();
const { getAllCollections, addCollection } = require('../controllers/collectionController');

// GET /api/collection
router.get('/', getAllCollections);

// POST /api/collection
router.post('/', addCollection);

module.exports = router;
