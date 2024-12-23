require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./passport'); // Import the passport config

const app = express();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173', // Correct frontend URL
  credentials: true, // Allow cookies and credentials
}));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dsjfh3278dgde', // Use an environment variable for security
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      secure: process.env.NODE_ENV === 'production', // True in production
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
    res.redirect('http://localhost:5173/dashboard'); // Frontend dashboard
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
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('http://localhost:5173/'); // Correct frontend home URL
    });
  });
});

app.get('/user', (req, res) => {
  res.send(req.user || null);
});

// Start Server
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
