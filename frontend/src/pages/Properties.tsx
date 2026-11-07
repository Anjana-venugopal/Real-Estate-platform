import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../context/AuthContext';
import { Property } from '../types';

const Properties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [propertyType, setPropertyType] = useState('');
  const [listingType, setListingType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await api.get('/properties', {
        params: {
          location: location || undefined,
          propertyType: propertyType || undefined,
          listingType: listingType || undefined,
          maxPrice: maxPrice || undefined,
          minArea: minArea || undefined,
        },
      });
      setProperties(res.data);
    } catch (err) {
      console.error('Failed to load properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Browse Properties</h1>
        <p className="text-xs text-gray-500">Filter verified properties by location, type, price, and area.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-6 gap-3 text-xs">
        <input
          placeholder="City or Locality..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2"
        />
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2"
        >
          <option value="">All Property Types</option>
          <option value="Flat">Flat</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
        <select
          value={listingType}
          onChange={(e) => setListingType(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2"
        >
          <option value="">Sale & Rent</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>
        <input
          type="number"
          placeholder="Max Price (₹)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2"
        />
        <input
          type="number"
          placeholder="Min Area (sq.ft)"
          value={minArea}
          onChange={(e) => setMinArea(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2"
        />
        <button
          onClick={fetchProperties}
          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium py-2"
        >
          Apply Filters
        </button>
      </div>

      {/* Property Grid */}
      {loading ? (
        <div className="p-10 text-center text-sm text-gray-500">Loading properties...</div>
      ) : properties.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center text-xs text-gray-500">
          No properties found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Link
              to={`/properties/${p._id}`}
              key={p._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition"
            >
              <img
                src={p.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600'}
                alt={p.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-1.5">
                <span className="text-[10px] uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                  {p.propertyType} • {p.listingType}
                </span>
                <h3 className="font-semibold text-sm text-gray-900 truncate">{p.title}</h3>
                <p className="text-xs text-gray-500">{p.location}</p>
                <p className="text-sm font-bold text-emerald-800 pt-1">
                  ₹{p.price.toLocaleString('en-IN')} • {p.areaSqFt} sq.ft
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;