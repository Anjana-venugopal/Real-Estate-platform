import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../context/AuthContext';
import { Property } from '../types';

const Properties: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [propertyType, setPropertyType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProperties = () => {
    api.get('/properties', { params: { location, propertyType, maxPrice } }).then((res) => setProperties(res.data));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-serif font-bold">Browse Properties</h1>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <input placeholder="Location (e.g. Bangalore)" value={location} onChange={(e) => setLocation(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2" />
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2">
          <option value="">All Property Types</option>
          <option>Flat</option>
          <option>Villa</option>
          <option>Plot</option>
          <option>Commercial</option>
        </select>
        <input type="number" placeholder="Max Price (₹)" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2" />
        <button onClick={fetchProperties} className="bg-emerald-700 text-white rounded-lg font-medium py-2">Apply Filters</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((p) => (
          <Link to={`/properties/${p._id}`} key={p._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition">
            <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600'} alt={p.title} className="h-48 w-full object-cover" />
            <div className="p-4 space-y-1">
              <span className="text-[10px] uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">{p.propertyType} • {p.listingType}</span>
              <h3 className="font-semibold text-sm text-gray-900 truncate">{p.title}</h3>
              <p className="text-xs text-gray-500">{p.location}</p>
              <p className="text-sm font-bold text-emerald-800 pt-1">₹{p.price.toLocaleString('en-IN')} • {p.areaSqFt} sq.ft</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Properties;