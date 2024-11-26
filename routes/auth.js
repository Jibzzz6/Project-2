const express = require('express');
const router = express.Router();
const { addUser, verifyUser, findUserByUsername } = require('../models/User');

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login form submission
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (verifyUser(username, password)) {
    req.session.user = { username };
    return res.redirect('/dashboard');
  }
  res.send('Invalid credentials. <a href="/login">Try again</a>');
});

// Register page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register form submission
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (findUserByUsername(username)) {
    return res.send('User already exists. <a href="/register">Try again</a>');
  }
  addUser(username, password);
  res.redirect('/login');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Middleware to protect routes
function requireAuth(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

module.exports = { router, requireAuth };
