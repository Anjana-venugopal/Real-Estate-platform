const express = require('express');
const Property = require('../models/Property');
const { protect } = require('../middleware/auth');
const { imagekit, upload } = require('../utils/imagekit');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { location, propertyType, listingType, minPrice, maxPrice, minArea } = req.query;
    const query = {};
    if (location) query.location = { $regex: location, $options: 'i' };
    if (propertyType) query.propertyType = propertyType;
    if (listingType) query.listingType = listingType;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minArea) query.areaSqFt = { $gte: Number(minArea) };

    const properties = await Property.find(query).populate('owner', 'name email').sort('-createdAt');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/my-listings', protect, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id }).sort('-createdAt');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, upload.array('images', 4), async (req, res) => {
  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files.slice(0, 4)) {
        const uploaded = await imagekit.upload({
          file: file.buffer.toString('base64'),
          fileName: `${Date.now()}-${file.originalname}`,
          folder: '/realestate/properties',
        });
        imageUrls.push(uploaded.url);
      }
    } else if (req.body.imageUrls) {
      imageUrls = typeof req.body.imageUrls === 'string' ? JSON.parse(req.body.imageUrls) : req.body.imageUrls;
    }

    const amenities = typeof req.body.amenities === 'string' ? JSON.parse(req.body.amenities) : req.body.amenities || [];
    const property = await Property.create({
      ...req.body,
      amenities,
      images: imageUrls.slice(0, 4),
      owner: req.user._id,
    });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this property' });
    }
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }
    await property.deleteOne();
    res.json({ message: 'Property removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;