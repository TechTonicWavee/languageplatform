const express = require('express');
const router = express.Router();
const { registerStudent, registerTeacher, registerAdmin, login } = require('../controllers/authController');

// POST /api/auth/register/student
router.post('/register/student', registerStudent);

// POST /api/auth/register/teacher
router.post('/register/teacher', registerTeacher);

// POST /api/auth/register/admin
router.post('/register/admin', registerAdmin);

// POST /api/auth/login  (all roles)
router.post('/login', login);

module.exports = router;
