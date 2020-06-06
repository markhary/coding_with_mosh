// eslint-disable-next-line consistent-return
module.exports = function admin(req, res, next) {
  // Forbidden means you do not have permission to access
  // Unauthorized means you passed a token, but it was invalid
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
};
