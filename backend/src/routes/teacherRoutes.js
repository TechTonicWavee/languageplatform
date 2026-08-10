const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { restrictTo } = require('../middleware/roleMiddleware');
const { getMyProfile } = require('../controllers/teacherController');

// GET /api/teachers/me  — authenticated teachers only
router.get('/me', protect, restrictTo('TEACHER'), getMyProfile);

module.exports = router;
