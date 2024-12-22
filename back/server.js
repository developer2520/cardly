const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const helmet = require('helmet');
require('dotenv').config();
require("./passport");  // Assuming you are importing passport.js

const app = express();
app.use(helmet());

// Set up content security policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],   
      imgSrc: ["'self'", "*"],  // Allow images from any source (for testing)
      scriptSrc: ["'self'", "https://apis.google.com"],  // Allow Google scripts
      styleSrc: ["'self'", "'unsafe-inline'"],  // Allow inline styles
      connectSrc: ["'self'", "https://accounts.google.com"],  // Allow connections to Google
    }
  })
);

// Middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",  // Your frontend URL
    credentials: true,
  })
);



// Google login route (should specify the scope here)
app.get("/auth/google", passport.authenticate("google", { 
  scope: ["profile", "email"]  // This is the correct place to specify scope
}));

// Google callback route (no need to specify scope here)
app.get(
  "/auth/google/callback",  // Correct the route to "/auth/google/callback"
  passport.authenticate("google", { 
    failureRedirect: "/", 
  }),
  (req, res) => {
    // Successful login
    res.redirect("http://localhost:5173/dashboard"); // Redirect to frontend after successful login
  }
);

app.get('/favicon.ico', (req, res) => res.status(204)); // Prevents the favicon request from causing issues

// Start the server
app.listen(4000, () => {
  console.log("Server is running on http://localhost:5000");
});
