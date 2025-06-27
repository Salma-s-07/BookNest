const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Mongo Connected"));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'booknest_secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.render('home', { user: req.session.user || null });
});

// const adminRoutes = require('./routes/admin');
// app.use('/admin', adminRoutes);

//Routes
app.use('/', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/admin', require('./routes/admin'));
app.use('/orders', require('./routes/order'));

app.listen(3000);
