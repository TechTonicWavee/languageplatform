const prisma = require('../config/db');

/**
 * GET /api/admins/me
 * Returns the authenticated admin's profile.
 */
const getMyProfile = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { userId: req.user.userId },
      include: { user: { select: { id: true, name: true, email: true, createdAt: true } } },
    });

    if (!admin) return res.status(404).json({ message: 'Admin profile not found.' });

    return res.status(200).json({ admin });
  } catch (err) {
    console.error('getMyProfile (admin) error:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = { getMyProfile };
