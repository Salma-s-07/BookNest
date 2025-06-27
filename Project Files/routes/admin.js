const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

// Admin Dashboard - View all users and books
router.get('/', isLoggedIn, isAdmin, async (req, res) => {
  const users = await User.find();
  const books = await Book.find().populate('sellerId', 'name');
  res.render('adminDashboard', { users, books });
});
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    const books = await Book.find().populate('sellerId');

    // Filter books where sellerId is not null
    const safeBooks = books.filter(book => book.sellerId !== null);

    res.render('adminDashboard', { users, books: safeBooks });
  } catch (err) {
    res.send('Error loading dashboard: ' + err.message);
  }
});
// Delete a user
router.post('/delete-user/:id', isLoggedIn, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

// Delete a book
router.post('/delete-book/:id', isLoggedIn, isAdmin, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
});

module.exports = router;
