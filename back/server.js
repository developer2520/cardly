require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const passport = require('./passport');
const LinkPage = require('./models/linkModel');
const Template = require('./models/template');
const connectDB = require('./db');

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

// Trust proxy - required for environments like Render
app.set('trust proxy', 1);

// CORS Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://cardly-seven.vercel.app'  // Deployed URL
    : 'http://localhost:5173',            // Local development URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
};

app.use(cors(corsOptions));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my-secret-key',
    resave: false, // Prevent unnecessary session saves
    saveUninitialized: false, // Only create sessions when necessary
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 24 * 60 * 60, // 1 day
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin
      secure: process.env.NODE_ENV === 'production', // HTTPS-only in production
      httpOnly: true, // Prevent client-side access
    },
    
    name: 'sessionId', // Custom cookie name
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
    // Use environment variable for frontend URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; // Fallback to localhost if not set
    res.redirect(`${frontendUrl}/home`);
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
        secure: process.env.NODE_ENV === 'production',  // Ensure secure cookies in production
        httpOnly: true,
      });
      console.log('Session destroyed and cookie cleared.');
      // Redirect using frontend URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'; // Fallback to localhost if not set
      res.redirect(`${frontendUrl}/`);
    });
  });
});

// User Route
app.get('/user', (req, res) => {
  
  res.json(req.isAuthenticated() ? req.user : { error: 'User not authenticated' });
});


// Create Card Route
app.post('/cards', async (req, res) => {
  let { title, bio, links, url, userId, template } = req.body;

  try {

    url = url.toLowerCase()
    // Check if a card with the same normalized URL already exists
    const existingCard = await LinkPage.findOne({url});
    if (existingCard) {
      return res.status(400).json({ message: 'Card with this URL already exists' });
    }
    

    // Create the card
    const card = new LinkPage({
      title,
      bio,
      links,
      url,
      userId,
      template,
    });

    await card.save();
    res.status(201).json({ message: 'Card created successfully', card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/cards/:id', async (req, res) => {
  const { id } = req.params; // Get ID from the URL
  let { title, bio, links, url, template } = req.body; // Get other data from the request body

  try {
    // Validate inputs
    url = url.toLowerCase(); // Ensure URLs are lowercase
    if (!id || !title || !url) {
      return res.status(400).json({ message: 'ID, title, and URL are required.' });
    }

    // Check for existing card with the same URL, excluding the current card
    const existingCard = await LinkPage.findOne({ url, _id: { $ne: id } });
    if (existingCard) {
      return res.status(400).json({ message: 'Card with this URL already exists.' });
    }

    // Update the card in the database
    const updatedCard = await LinkPage.findByIdAndUpdate(
      id, // Use the ID from the URL
      { title, bio, links, url, template },
      { new: true, runValidators: true } // Return the updated document and run validations
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found.' });
    }

    res.status(200).json({ message: 'Card updated successfully!', card: updatedCard });
  } catch (error) {
    console.error('Error updating card:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


app.delete('/cards/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedCard = await LinkPage.findByIdAndDelete(id);

      if (!deletedCard) {
          return res.status(404).json({ message: 'Card not found.' });
      }

      res.status(200).json({ message: 'Card deleted successfully!' });
  } catch (error) {
      console.error('Error deleting card:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

// Assuming you're using Express
app.get('/templates/:id', async (req, res) => {
  try {
    // Convert the templateId to a number
    const templateId = Number(req.params.id);
     // Log the converted template ID
    const template = await Template.findOne({ id: templateId });
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const seedTemplates = async () => {
  try {
    // Get existing template IDs
    const existingTemplates = await Template.find({});
    const existingIds = existingTemplates.map(template => template.id);

    // Filter out templates that already exist
    const newTemplates = templates.filter(template => !existingIds.includes(template.id));

    if (newTemplates.length > 0) {
      await Template.insertMany(newTemplates);
      console.log(`Successfully added ${newTemplates.length} new templates`);
    } else {
      console.log('No new templates to add');
    }
  } catch (err) {
    console.error('Error seeding templates:', err);
  } finally {
    
    console.log('Database connection closed');
  }
};

// seedTemplates()

app.get('/templates', async (req, res) => {
  try {
    const templates = await Template.find({});
    res.status(200).json(templates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching templates', error: err });
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
    let url = req.params.url.toLowerCase();
    
  
    

    const card = await LinkPage.findOne({ url });
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const template = card.template
      ? await Template.findOne({ id: card.template })
      : null;

    res.json({ card, template });
  } catch (err) {
    console.error("Error fetching card:", err);
    res.status(500).json({
      message: "Internal Server Error - Failed to fetch card",
      error: err.message,
    });
  }
});





// Global Error Handler

// Start Server
const PORT = process.env.PORT || 4000; // Default to port 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
