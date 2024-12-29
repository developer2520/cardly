require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport');
const LinkPage = require('./models/linkModel');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow credentials
}));
app.use(express.json()); // Parse JSON request bodies

// Session Middleware
app.use(
  session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'Lax',
      secure: false,
      httpOnly: true,
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
    res.redirect('http://localhost:5173/dashboard');
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
      res.redirect('http://localhost:5173/');
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
  LinkPage.find({ userId: googleId }) // Use googleId directly as a string
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
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
