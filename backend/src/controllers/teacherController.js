const prisma = require('../config/db');

/**
 * GET /api/teachers/me
 * Returns the authenticated teacher's profile.
 */
const getMyProfile = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { userId: req.user.userId },
      include: { user: { select: { id: true, name: true, email: true, createdAt: true } } },
    });

    if (!teacher) return res.status(404).json({ message: 'Teacher profile not found.' });

    return res.status(200).json({ teacher });
  } catch (err) {
    console.error('getMyProfile (teacher) error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getMyProfile };
