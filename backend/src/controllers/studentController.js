const prisma = require('../config/db');

/**
 * GET /api/students/me
 * Returns the authenticated student's profile.
 */
const getMyProfile = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.userId },
      include: { user: { select: { id: true, name: true, email: true, createdAt: true } } },
    });

    if (!student) return res.status(404).json({ message: 'Student profile not found.' });

    return res.status(200).json({ student });
  } catch (err) {
    console.error('getMyProfile (student) error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getMyProfile };
