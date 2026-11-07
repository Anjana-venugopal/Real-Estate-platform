import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, useAuth } from '../context/AuthContext';
import { Property } from '../types';

const PropertyDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [booking, setBooking] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '10:00 AM',
  });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.get(`/properties/${id}`).then((res) => {
      setProperty(res.data);
      if (res.data.images?.length > 0) {
        setActiveImage(res.data.images[0]);
      }
    });
  }, [id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = user ? '/appointments' : '/appointments/guest';
      await api.post(endpoint, { ...booking, propertyId: id });
      setMsg('Viewing scheduled successfully!');
    } catch (err: any) {
      setMsg(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!property) {
    return <div className="p-10 text-center text-sm">Loading property...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Gallery, Details, Amenities & Location */}
      <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-gray-100">
        {activeImage && (
          <div className="space-y-2">
            <img src={activeImage} alt={property.title} className="w-full h-80 object-cover rounded-xl" />
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {property.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${property.title} ${i + 1}`}
                    onClick={() => setActiveImage(img)}
                    className={`h-16 w-full object-cover rounded-lg cursor-pointer border-2 ${
                      activeImage === img ? 'border-emerald-600' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          <span className="text-[10px] uppercase bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
            {property.propertyType} • {property.listingType}
          </span>
          <h1 className="text-2xl font-serif font-bold mt-2">{property.title}</h1>
          <p className="text-xs text-gray-500 mt-1">
            {property.bedrooms} BHK • {property.bathrooms} Baths • {property.areaSqFt} sq.ft
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold border-l-2 border-emerald-700 pl-2 mb-2">About The Property</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{property.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold border-l-2 border-emerald-700 pl-2 mb-3">Key Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {property.amenities.map((a) => (
              <div key={a} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-xs text-gray-700">
                ✓ {a}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold border-l-2 border-emerald-700 pl-2 mb-2">Location</h3>
          <p className="text-xs text-gray-600">{property.location}</p>
        </div>
      </div>

      {/* Right Column: Schedule a Viewing Card */}
      <div className="bg-[#231f1e] text-white p-6 rounded-2xl h-fit space-y-4">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-gray-400">Listed Price</span>
          <p className="text-2xl font-serif font-bold text-emerald-400">
            ₹{(property.price / 10000000).toFixed(2)} Cr
          </p>
        </div>

        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 pt-2">Schedule a Viewing</h4>
        {msg && <p className="text-xs text-emerald-400">{msg}</p>}

        <form onSubmit={handleBook} className="space-y-3 text-xs">
          <input
            required
            placeholder="Full Name"
            value={booking.fullName}
            onChange={(e) => setBooking({ ...booking, fullName: e.target.value })}
            className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 text-white"
          />
          <input
            required
            type="email"
            placeholder="Email Address"
            value={booking.email}
            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
            className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 text-white"
          />
          <input
            required
            placeholder="Phone Number"
            value={booking.phone}
            onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
            className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2.5 text-white"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              required
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              className="bg-white/10 border border-white/15 rounded-lg px-2 py-2 text-white"
            />
            <select
              value={booking.time}
              onChange={(e) => setBooking({ ...booking, time: e.target.value })}
              className="bg-white/10 border border-white/15 rounded-lg px-2 py-2 text-white"
            >
              <option className="text-black">10:00 AM</option>
              <option className="text-black">02:00 PM</option>
              <option className="text-black">05:00 PM</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg mt-2"
          >
            Schedule Visit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetail;