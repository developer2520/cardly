const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Unique identifier for the template
  name: { type: String, required: true },
  theme: { type: String, required: true }, // e.g., 'dark' or 'light'
  styles: {
    backgroundColor: { type: String, required: true },
    textColor: { type: String, required: true },
    linkStyles: {
      backgroundColor: { type: String, required: true },
      borderRadius: { type: String, required: true },
      border: { type: String, required: true },
    },
  },
});

module.exports = mongoose.model('Template', templateSchema);
