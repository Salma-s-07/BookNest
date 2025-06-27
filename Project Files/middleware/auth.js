// middleware/auth.js

// Check if user is logged in
exports.isLoggedIn = (req, res, next) => {
  if (req.session.user) return next();
  return res.redirect('/login');
};

// Check if user is a Seller
exports.isSeller = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'seller') return next();
  return res.status(403).send('Access Denied: Sellers only');
};

// Check if user is an Admin
exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') return next();
  return res.status(403).send('Access Denied: Admins only');
};

// Optional: Check if user is a regular buyer/user
exports.isUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'user') return next();
  return res.status(403).send('Access Denied: Users only');
};
