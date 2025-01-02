require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');
const LinkPage = require('./models/linkModel');
const mongoose = require('mongoose');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-frontend.onrender.com'], // Adjust these origins as needed
  credentials: true, // Allow cookies (credentials) to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the required HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Allow necessary headers
};

app.use(cors(corsOptions)); // Use CORS middleware

// Session Middleware
app.use(
  session({
    secret: 'Abboskhonow252020202020434hhff',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'None', // Required for cross-origin cookies
      secure: false, // Ensure cookies are secure in production (https)
      httpOnly: true, // Cookie is not accessible via JavaScript
    },
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173/home'); // Update if deploying frontend
  }
);

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.redirect('http://localhost:5173/'); // Update if deploying frontend
    });
  });
});

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

// Other routes as before...

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
