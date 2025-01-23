const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  styles: {
    backgroundColor: { type: String, required: true },
    bioColor: { type: String, required: true },
    textColor: { type: String, required: true },
    fontFamily: { type: String, required: false }, // New: Font family for text
    fontSize: { type: String, required: false }, // New: Font size for text
    linkStyles: {
      backgroundColor: { type: String, required: true },
      textColor: { type: String, required: false }, // New: Link text color
      fontWeight: { type: String, required: false }, // New: Font weight for links
      borderRadius: { type: String, required: true },
      border: { type: String, required: true },
      hoverBackgroundColor: { type: String, required: false },
      hoverTextColor: { type: String, required: false },
      hoverBorder: { type: String, required: false },
      hoverTransform: { type: String, required: false }, // Updated: More descriptive hover property
      transition: { type: String, required: false }, // New: Transition effect for smooth animations
    },
  },
});

module.exports = mongoose.model('Template', templateSchema);
