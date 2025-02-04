const express = require('express');
const Template = require('../models/template');

const router = express.Router();

// Create a new template
router.post('/templates', async (req, res) => {
  const { name, design } = req.body;
  try {
    const newTemplate = new Template({ name, design });
    await newTemplate.save();
    res.status(201).json({ message: 'Template created successfully!', template: newTemplate });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get a single template by ID
router.get('/templates/:id', async (req, res) => {
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

// Update a template by ID
router.put('/templates/:id', async (req, res) => {
  const { name, design } = req.body;
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { name, design },
      { new: true, runValidators: true }
    );
    if (!updatedTemplate) return res.status(404).json({ message: 'Template not found.' });
    res.status(200).json({ message: 'Template updated successfully!', template: updatedTemplate });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a template by ID
router.delete('/templates/:id', async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);
    if (!deletedTemplate) return res.status(404).json({ message: 'Template not found.' });
    res.status(200).json({ message: 'Template deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;