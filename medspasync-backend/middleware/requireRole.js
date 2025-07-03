const User = require('../models/User');

/**
 * Role-based access control middleware.
 * @param {...string} roles Required roles
 */
module.exports = function requireRole(...roles) {
  // Normalize role arguments to lowercase for comparison
  const allowed = roles.map(r => r.toLowerCase());
  return async function (req, res, next) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Role may come from JWT payload (role or type field)
      let userRole = req.user.role || req.user.type;

      // Fallback: fetch user role from database using id
      if (!userRole && req.user.id) {
        const user = await User.findById(req.user.id).select('role');
        userRole = user && user.role;
      }

      if (!userRole) {
        return res.status(403).json({ message: 'Role not found' });
      }

      if (!allowed.includes(String(userRole).toLowerCase())) {
        return res.status(403).json({ message: 'Access denied: insufficient role' });
      }

      next();
    } catch (err) {
      console.error('[ROLE_MIDDLEWARE]', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
