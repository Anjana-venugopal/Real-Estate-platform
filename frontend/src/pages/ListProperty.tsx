import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext';

const AMENITIES_LIST = [
  'Parking', 'Swimming Pool', 'Gym',
  'Security', 'Power Backup', 'Lift',
  'Garden', 'Clubhouse', 'CCTV',
  'Intercom', 'Rainwater Harvesting', '24x7 Water Supply',
  'Children Play Area', 'WiFi / Internet', 'Gated Community',
];

const ListProperty: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Flat',
    listingType: 'For Sale',
    location: '',
    price: '',
    areaSqFt: '',
    bedrooms: '2',
    bathrooms: '2',
    description: '',
    contactPhone: '',
    googleMapsLink: '',
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const addImageUrl = () => {
    if (imageUrlInput.trim() && imageUrls.length < 4) {
      setImageUrls([...imageUrls, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      data.append('amenities', JSON.stringify(selectedAmenities));

      if (files && files.length > 0) {
        Array.from(files).slice(0, 4).forEach((file) => data.append('images', file));
      } else {
        data.append('imageUrls', JSON.stringify(imageUrls));
      }

      await api.post('/properties', data);
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error listing property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-serif font-bold text-gray-900">List Your Property</h1>
      <p className="text-xs text-gray-500 mb-6">Fill in the details below to list your property on RealEstate platform.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="font-semibold text-sm text-gray-800">Basic Information</h2>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Property Title *</label>
            <input
              required
              placeholder="e.g. Modern 3BHK Apartment in Indiranagar"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Property Type *</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              >
                <option>Flat</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Commercial</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Listing Type *</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={formData.listingType}
                onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
              >
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Full Address / Location *</label>
            <input
              required
              placeholder="e.g. Whitefield, Bangalore, Karnataka"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        {/* Pricing & Details */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="font-semibold text-sm text-gray-800">Pricing & Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Price (₹) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 12000000"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Area (sq.ft) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 1650"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={formData.areaSqFt}
                onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Bedrooms</label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Bathrooms</label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Description & Contact */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="font-semibold text-sm text-gray-800">Description & Contact</h2>
          <textarea
            rows={3}
            required
            placeholder="Describe the property, key highlights, nearby landmarks..."
            className="w-full border border-gray-200 rounded-lg p-3 text-sm"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              placeholder="Contact Phone * (+91 9876543210)"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
            />
            <input
              placeholder="Google Maps Link (Optional)"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={formData.googleMapsLink}
              onChange={(e) => setFormData({ ...formData, googleMapsLink: e.target.value })}
            />
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <h2 className="font-semibold text-sm text-gray-800">Amenities</h2>
          <div className="grid grid-cols-3 gap-2.5">
            {AMENITIES_LIST.map((item) => (
              <label
                key={item}
                className={`flex items-center gap-2 text-xs p-2.5 rounded-lg border cursor-pointer ${
                  selectedAmenities.includes(item)
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(item)}
                  onChange={() => toggleAmenity(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Images (Up to 4 via Upload or URL) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
          <h2 className="font-semibold text-sm text-gray-800">Images (Max 4) *</h2>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="text-xs text-gray-600"
          />
          <div className="flex gap-2 pt-2">
            <input
              placeholder="Or paste Image URL..."
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-xs"
            />
            <button
              type="button"
              onClick={addImageUrl}
              className="border border-gray-300 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50"
            >
              + Add Image URL
            </button>
          </div>
          {imageUrls.length > 0 && (
            <p className="text-xs text-emerald-700">{imageUrls.length} URL(s) added</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3 rounded-xl text-sm"
        >
          {loading ? 'Submitting...' : 'Publish Property Listing'}
        </button>
      </form>
    </div>
  );
};

export default ListProperty;