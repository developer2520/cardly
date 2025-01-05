require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const passport = require('./passport');
const LinkPage = require('./models/linkModel');
const connectDB = require('./db');

// Connect to the database
connectDB();

const app = express();

// Trust proxy - required for environments like Render
app.set('trust proxy', 1);

// Middleware
app.use(express.json());

// CORS Middleware
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true, // Allow cookies (credentials) to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the required HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Allow necessary headers
  exposedHeaders: ['Set-Cookie'], // Expose cookies to the frontend
};
app.use(cors(corsOptions));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my-secret-key',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60, // 1 day
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax', // Allow cross-origin for localhost
      secure: false, // Disable for local development (HTTP)
      httpOnly: true, // Prevent client-side JavaScript access
    },
    name: 'sessionId',
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Google Authentication Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173/home'); // Adjust URL for production
  }
);

// Logout Route
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
      res.clearCookie('sessionId', {
        sameSite: 'lax',
        secure: false,
        httpOnly: true,
      });
      res.redirect('http://localhost:5173/'); // Adjust URL for production
    });
  });
});

// User Route
app.get('/user', (req, res) => {
  console.log('Session:', req.session); // Debugging session
  console.log('User:', req.user); // Debugging user

  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

// Create Card Route
app.post('/cards', async (req, res) => {
  const { title, description, link, url, userId } = req.body;

  try {
    const existingCard = await LinkPage.findOne({ link });
    if (existingCard) {
      return res.status(400).json({ error: 'Card already exists' });
    }

    const card = new LinkPage({ title, description, link, url, userId });
    await card.save();
    res.status(201).json({ message: 'Card created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Cards Route
app.get('/cards', async (req, res) => {
  const { googleId } = req.query;

  if (!googleId || googleId.trim() === '') {
    return res.status(400).json({ message: 'googleId is required and cannot be empty' });
  }

  try {
    const cards = await LinkPage.find({ userId: googleId });
    res.json(cards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cards', error: err });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
