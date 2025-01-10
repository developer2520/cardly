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
app.use(express.json());

// Trust proxy - required for environments like Render
app.set('trust proxy', 1);

// Middleware
app.use(express.json());

// CORS Middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
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
  

  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

// Create Card Route
app.post('/cards', async (req, res) => {
  const { title, bio,  links, url, userId } = req.body; 

  try {
    const existingCard = await LinkPage.findOne({ url });
    if (existingCard) {
      return res.status(400).json({ error: 'Card already exists' });
    }

    const card = new LinkPage({ title,  bio, links, url, userId });
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




// Global Error Handler

// Start Server
const PORT = process.env.PORT || 4000; // Default to port 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
