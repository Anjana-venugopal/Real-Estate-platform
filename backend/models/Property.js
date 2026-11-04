const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  propertyType: { type: String, enum: ['Flat', 'Villa', 'Plot', 'Commercial'], default: 'Flat' },
  listingType: { type: String, enum: ['For Sale', 'For Rent'], default: 'For Sale' },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  areaSqFt: { type: Number, required: true },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  description: { type: String, required: true },
  contactPhone: { type: String, required: true },
  googleMapsLink: { type: String },
  amenities: [{ type: String }],
  images: {
    type: [String],
    validate: [arr => arr.length <= 4, 'Maximum 4 images allowed']
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);