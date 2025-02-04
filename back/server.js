require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const session = require('./config/session');
const passport = require('./config/passport');

// Routes
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
const templateRoutes = require('./routes/templateRoutes');

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.set('trust proxy', 1);
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://cardly-seven.vercel.app' : 'http://localhost:5173',
  credentials: true,
}));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);
app.use(cardRoutes);
app.use(templateRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
