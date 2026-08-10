/**
 * Middleware factory: restricts access to users with one of the allowed roles.
 * Must be used AFTER the `protect` middleware (which sets req.user).
 *
 * Usage:
 *   router.get('/me', protect, restrictTo('STUDENT'), studentController.getMyProfile);
 */
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied — required role: ${allowedRoles.join(' or ')}.` });
    }
    next();
  };
};

module.exports = { restrictTo };
