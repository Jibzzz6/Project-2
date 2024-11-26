const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
  })
);

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/authDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/', authRoutes);

// Protecting Routes
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Main pages
app.get('/', (req, res) => res.render('index', { user: req.session.user }));
app.get('/dashboard', isAuthenticated, (req, res) => res.render('dashboard', { user: req.session.user }));

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
