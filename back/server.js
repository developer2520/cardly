require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');
const LinkPage = require('./models/linkModel');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// CORS Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Local frontend URL for development
    'https://cardly-uz-website.onrender.com', // Replace with your production frontend URL
  ], 
  credentials: true, // Allow cookies (credentials) to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the required HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
}));

// Session Middleware
app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'None', // Required for cross-origin cookies
      secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
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

app.post('/cards', async (req, res) => {
  const { title, description, link, url, userId } = req.body;

  try {
    const existingCard = await LinkPage.findOne({ link });
    if (existingCard) {
      return res.status(400).json({ error: 'Card already exists' });
    }

    const Card = new LinkPage({ title, description, link, url, userId });
    await Card.save();
    res.status(201).json({ message: 'Card created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/cards', (req, res) => {
  const { googleId } = req.query; // Expecting googleId in the query parameters

  if (!googleId || googleId.trim() === '') {
    return res.status(400).json({ message: 'googleId is required and cannot be empty' });
  }

  // Proceed to find the cards with the provided googleId
  LinkPage.find({ userId: googleId })
    .then(cards => {
      res.json(cards);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error fetching cards', error: err });
    });
});

app.get("/cards/:url", async (req, res) => {
  try {
    const { url } = req.params;
    const card = await LinkPage.findOne({ url });
    if (!card) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(card);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({
      message: 'Internal Server Error - Failed to fetch user',
      error: err.message,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
