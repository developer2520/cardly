const mongoose = require('mongoose');

const linkPageSchema = new mongoose.Schema({
    url: { type: String, required: true }, // URL for the link
    title: { type: String, required: true }, // Title of the link
    description: { type: String }, // Description of the link
    
    userId: { type: String, required: true }, // Storing googleId as a string
});

const LinkPage = mongoose.models.LinkPage || mongoose.model('LinkPage', linkPageSchema);

module.exports = LinkPage;
