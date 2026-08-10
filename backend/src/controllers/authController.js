const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

// ─── Helpers ────────────────────────────────────────────────────────────────

const signToken = (userId, role) =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ─── Register ───────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register/student
 * Body: { name, email, password, languageToLearn, proficiencyLevel? }
 */
const registerStudent = async (req, res) => {
  try {
    const { name, email, password, languageToLearn, proficiencyLevel = 'beginner' } = req.body;

    if (!name || !email || !password || !languageToLearn) {
      return res.status(400).json({ message: 'name, email, password, and languageToLearn are required.' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use.' });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'STUDENT',
        student: { create: { languageToLearn, proficiencyLevel } },
      },
      include: { student: true },
    });

    const token = signToken(user.id, user.role);
    return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('registerStudent error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * POST /api/auth/register/teacher
 * Body: { name, email, password, experienceType }
 */
const registerTeacher = async (req, res) => {
  try {
    const { name, email, password, experienceType } = req.body;

    if (!name || !email || !password || !experienceType) {
      return res.status(400).json({ message: 'name, email, password, and experienceType are required.' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use.' });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'TEACHER',
        teacher: { create: { experienceType, status: 'pending' } },
      },
      include: { teacher: true },
    });

    const token = signToken(user.id, user.role);
    return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('registerTeacher error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * POST /api/auth/register/admin
 * Body: { name, email, password }
 */
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, and password are required.' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already in use.' });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'ADMIN',
        admin: { create: {} },
      },
      include: { admin: true },
    });

    const token = signToken(user.id, user.role);
    return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('registerAdmin error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// ─── Login ───────────────────────────────────────────────────────────────────

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = signToken(user.id, user.role);
    return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { registerStudent, registerTeacher, registerAdmin, login };
