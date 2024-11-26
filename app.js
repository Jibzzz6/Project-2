const express = require('express');
const session = require('express-session');
const path = require('path');
const { router: authRoutes, requireAuth } = require('./routes/auth');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session setup
app.use(
  session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
  })
);

// Use auth routes
app.use(authRoutes);

// Pass session data to views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Public route
app.get('/', (req, res) => {
  res.render('index');
});

// Protected route
app.get('/dashboard', requireAuth, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
