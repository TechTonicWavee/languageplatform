const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');
const { getMyProfile } = require('../controllers/adminController');

// GET /api/admins/me  — authenticated admins only
router.get('/me', protect, restrictTo('ADMIN'), getMyProfile);

module.exports = router;
