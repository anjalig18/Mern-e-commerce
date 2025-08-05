const User = require('../models/User');

// Remove generateToken and jwt import

// Login without JWT
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  await user.updateLastLogin();
  res.json({ user: user.getPublicProfile() });
};

// Update profile for logged-in user (no JWT)
exports.updateProfile = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (name) user.name = name;
    if (password) user.password = password;
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register a new user (no JWT)
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin login (only for users with role 'admin')
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // First check if user exists with admin role
    const user = await User.findOne({ email, role: 'admin' }).select('+password');
    
    if (!user) {
      return res.status(400).json({ message: 'Admin not found or not authorized' });
    }
    
    // Check password
    const isMatch = await user.matchPassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Update last login
    await user.updateLastLogin();
    
    // Get public profile
    const publicProfile = user.getPublicProfile();
    
    res.json({ user: publicProfile });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 