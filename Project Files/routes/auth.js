const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Show login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Show signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.send('Signup Error: ' + err.message);
  }
});

// Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('User not found');
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.send('Incorrect password');

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    
    req.session.user = { id: user._id, role: user.role, name: user.name };

    if (user.role === 'admin') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/books');
    }

  } catch (err) {
    res.send('Login Error: ' + err.message);
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
