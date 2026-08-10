const jwt = require('jsonwebtoken');

/**
 * Middleware: verifies the Bearer JWT in the Authorization header.
 * On success, attaches decoded payload to req.user = { userId, role }.
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized — no token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized — token invalid or expired.' });
  }
};

module.exports = { protect };
