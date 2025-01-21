const mongoose = require('mongoose');

const linkPageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  url: { type: String, required: true, trim: true }, // Original URL for display
 
  title: { type: String, required: true, trim: true }, // Title of the link
  bio: { type: String, required: false, trim: true }, // Description of the link
  links: [
    {
      title: { type: String, required: false, trim: true }, // Title for the individual link
      url: { type: String, required: false, trim: true },  // URL for the individual link
    },
  ],
  template: {
    type: String, 
    ref: 'Template',
  },
}, {
  timestamps: true,
});

// Use existing model if it exists, otherwise create a new one
const LinkPage = mongoose.models.LinkPage || mongoose.model('LinkPage', linkPageSchema);

module.exports = LinkPage;
