const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('./models/UserModel'); // Import your User model

const connectDB = require('./db');

// Connect to the database
connectDB();

// Serialize user ID into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session (this is updated to use async/await)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Using async/await here
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://cardly-1.onrender.com/auth/google/callback', // Ensure this matches the URL in Google Cloud Console
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in DB by Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            pfp: profile.photos[0].value,
            // Add any additional fields needed
          });

          // Save the new user to DB
          await user.save();
        }

        // Return the user object to the done callback
        done(null, user);
      } catch (err) {
        done(err, null); // Handle errors
      }
    }
  )
);

module.exports = passport;