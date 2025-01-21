const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  theme: { type: String, required: true },
  styles: {
    backgroundColor: { type: String, required: true },
    bioColor: { type: String, required: true },
    textColor: { type: String, required: true },
    linkStyles: {
      backgroundColor: { type: String, required: true },
      borderRadius: { type: String, required: true },
      border: { type: String, required: true },
      hoverBackgroundColor: { type: String, required: false },
      hoverTextColor: { type: String, required: false },
      hoverBorder: { type: String, required: false },
      transform: { type: String, required: false } // Add this to support transform property
    },
  },
});

module.exports = mongoose.model('Template', templateSchema);
