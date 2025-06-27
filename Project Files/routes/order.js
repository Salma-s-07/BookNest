const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Book = require('../models/Book');
const { isLoggedIn } = require('../middleware/auth');

// Place a new order
router.post('/buy/:bookId', isLoggedIn, async (req, res) => {
  const bookId = req.params.bookId;
  await Order.create({
    userId: req.session.user.id,
    bookId
  });
  res.redirect('/orders');
});

// View user's own orders
router.get('/', isLoggedIn, async (req, res) => {
  const orders = await Order.find({ userId: req.session.user.id }).populate('bookId');
  res.render('order', { orders });
});

module.exports = router;
