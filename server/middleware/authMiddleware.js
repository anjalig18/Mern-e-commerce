module.exports = (req, res, next) => {
  // Mock admin user for development/testing
  req.user = {
    _id: 'admin-id',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active'
  };
  next();
}; 