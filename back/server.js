require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')
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
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cardly-uz-website.onrender.com',
    'https://cardly-1.onrender.com'
  ],
  credentials: true, // Required to include cookies in requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true
    },
    name: 'sessionId'
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Debugging Middleware (Optional)
app.use((req, res, next) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});

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
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : 'localhost'
      });
      res.redirect('http://localhost:5173/'); // Adjust URL for production
    });
  });
});

// User Route
app.get('/user', (req, res) => {
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

// Get Card by URL Route
app.get('/cards/:url', async (req, res) => {
  try {
    const { url } = req.params;
    const card = await LinkPage.findOne({ url });
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.json(card);
  } catch (err) {
    console.error('Error fetching card:', err);
    res.status(500).json({
      message: 'Internal Server Error - Failed to fetch card',
      error: err.message
    });
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
