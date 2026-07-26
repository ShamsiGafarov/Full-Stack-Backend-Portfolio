const express = require('express');
const router = express.Router();
const Reference = require('../models/Reference');

router.get('/', async (req, res) => {
  try {
    const references = await Reference.find();
    res.json(references);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.post('/', async (req, res) => {
  try {
    const reference = new Reference(req.body);
    const newReference = await reference.save();
    res.status(201).json(newReference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
