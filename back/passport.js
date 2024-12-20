const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config();
const connectDB = require('./db')

connectDB();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback", // Updated callback URL
    },
    (accessToken, refreshToken, profile, done) => {
      // Logic to find or create a user in your database
      done(null, profile); // Proceed with the profile info
    }
  )
);

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
