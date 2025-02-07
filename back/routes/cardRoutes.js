const express = require('express');
const router = express.Router();
const LinkPage = require('../models/linkModel');
const Template = require('../models/template');
const multer = require('multer');
const storage = multer.memoryStorage();
const supabase = require('../config/supabaseClient');

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPG, PNG, and WEBP are allowed.'));
    }
    cb(null, true);
  },
});


// Create Card
router.post('/cards', upload.single('image'), async (req, res) => {
  let { title, bio, links, url, userId, template,imageUrl } = req.body;
  

  try {
    url = url.toLowerCase();
    const existingCard = await LinkPage.findOne({ url });
    if (existingCard) {
      return res.status(400).json({ message: 'Card with this URL already exists' });
    }

    // If an image is uploaded, upload it to Supabase Storage
    if (req.file) {
      const fileExt = req.file.mimetype.split('/')[1]; // Get file extension
      const fileName = `${Date.now()}-${userId}.${fileExt}`; // Unique file name
      const { data, error } = await supabase.storage.from('profile-images').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });

      if (error) throw error;

      // Get the public URL of the uploaded image
      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/profile-images/${fileName}`;
    }

    const card = new LinkPage({ title, bio, links, url, userId, template, imageUrl });
    await card.save();

    res.status(201).json({ message: 'Card created successfully', card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Update Card
router.put('/cards/:id', async (req, res) => {
  const { id } = req.params;
  let { title, bio, links, url, template, imageUrl } = req.body;
  try {
    url = url.toLowerCase();
    if (!id || !title || !url) {
      return res.status(400).json({ message: 'ID, title, and URL are required.' });
    }
    const existingCard = await LinkPage.findOne({ url, _id: { $ne: id } });
    if (existingCard) {
      return res.status(400).json({ message: 'Card with this URL already exists.' });
    }
    const updatedCard = await LinkPage.findByIdAndUpdate(
      id,
      { title, bio, links, url, template, imageUrl },
      { new: true, runValidators: true }
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

// Delete Card
router.delete('/cards/:id', async (req, res) => {
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

// Get Cards by User
router.get('/cards', async (req, res) => {
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

// Check URL Availability
router.get('/check-url-availability', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ available: false, message: 'URL is required' });
  }
  const existingCard = await LinkPage.findOne({ url });
  res.json({ available: !existingCard });
});

// Get Card by URL
router.get("/cards/:url", async (req, res) => {
  try {
    let url = req.params.url.toLowerCase();

    const card = await LinkPage.findOne({ url });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    const template = card.template
      ? await Template.findOne({ id: card.template })
      : null;

    res.json({card, template}); // Send an array containing both card and template
  } catch (err) {
    console.error("Error fetching card:", err);
    res.status(500).json({
      message: "Internal Server Error - Failed to fetch card",
      error: err.message,
    });
  }
});


module.exports = router;
