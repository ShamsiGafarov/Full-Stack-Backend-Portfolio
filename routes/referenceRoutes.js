const express = require('express');
const router = express.Router();
const Reference = require('../models/Reference');
const { protect } = require('../middleware/auth');

// GET all references - Public
router.get('/', async (req, res) => {
  try {
    const references = await Reference.find().sort({ createdAt: -1 });
    res.json(references);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single reference - Public
router.get('/:id', async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    res.json(reference);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE reference - PROTECTED
router.post('/', protect, async (req, res) => {
  try {
    const reference = new Reference(req.body);
    const newReference = await reference.save();
    res.status(201).json(newReference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE reference - PROTECTED
router.put('/:id', protect, async (req, res) => {
  try {
    const reference = await Reference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    res.json(reference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE reference - PROTECTED
router.delete('/:id', protect, async (req, res) => {
  try {
    const reference = await Reference.findByIdAndDelete(req.params.id);
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    res.json({ message: 'Reference deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;