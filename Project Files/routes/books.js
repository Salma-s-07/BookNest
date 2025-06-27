const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { isLoggedIn, isSeller,isAdmin } = require('../middleware/auth');

// View all books
router.get('/', isLoggedIn, async (req, res) => {
  const books = await Book.find().populate('sellerId');
  const safeBooks = books.filter(book => book.sellerId !== null);
  res.render('books', {
    books: safeBooks,
    user: req.session.user // ✅ Must include this
  });
});

// Show add book form (seller only)
router.get('/add', isLoggedIn, isSeller, (req, res) => {
  res.render('addBook');
});
router.get('/', isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    const books = await Book.find().populate('sellerId');
    res.render('adminDashboard', { users, books });
  } catch (err) {
    console.error('Admin dashboard error:', err);
    res.status(500).send('Server error');
  }
});

// Add book
router.post('/add', isLoggedIn, isSeller, async (req, res) => {
  const { title, author, price, description, imageUrl } = req.body;
  await Book.create({
    title,
    author,
    price,
    description,
    imageUrl,
    sellerId: req.session.user.id
  });
  res.redirect('/books');
});
module.exports = router;
