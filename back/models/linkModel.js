const mongoose = require('mongoose');

const linkPageSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  url: { type: String, required: true, trim: true }, // URL for the link

  title: { type: String, required: true, trim: true }, // Title of the link
  bio: { type: String, required: true, trim: true }, // Description of the link
  links: [
    {
      title: { type: String, required: true, trim: true }, // Title for the individual link
      url: { type: String, required: true, trim: true },  // URL for the individual link
    },
  ],
}, {
  timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

// Use existing model if it exists, otherwise create a new one
const LinkPage = mongoose.models.LinkPage || mongoose.model('LinkPage', linkPageSchema);

module.exports = LinkPage;
