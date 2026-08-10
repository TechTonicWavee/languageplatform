const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');
const { getMyProfile } = require('../controllers/studentController');

// GET /api/students/me  — authenticated students only
router.get('/me', protect, restrictTo('STUDENT'), getMyProfile);

module.exports = router;
