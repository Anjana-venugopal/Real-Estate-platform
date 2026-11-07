import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Building } from 'lucide-react';

const Home: React.FC = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div
        className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-10 md:p-16 min-h-[520px] flex flex-col justify-between bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10, 25, 20, 0.88), rgba(10, 25, 20, 0.35)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80')`,
        }}
      >
        <div className="max-w-xl space-y-5">
          <span className="inline-block text-xs uppercase tracking-widest bg-emerald-900/70 text-emerald-300 px-3 py-1 rounded-full border border-emerald-700">
            • AI-Powered Property Discovery
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            A better way <br /> to find your <br />
            <span className="italic font-light text-emerald-200">next address.</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Search verified homes across India with live market data, clear insights, and AI recommendations built around your life.
          </p>

          <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl flex items-center gap-2 max-w-lg shadow-lg">
            <Search size={18} className="text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search city, locality or project..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 text-gray-800 text-sm focus:outline-none px-2"
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium px-5 py-3 rounded-lg"
            >
              Find Homes
            </button>
          </form>

          <div className="flex flex-wrap gap-2 text-xs text-gray-300 pt-1">
            <span>Popular:</span>
            {['Mumbai', 'Bangalore', 'Gurgaon', 'Hyderabad', 'Pune'].map((city) => (
              <button
                key={city}
                onClick={() => navigate(`/properties?location=${city}`)}
                className="hover:text-white underline"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-8">
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/ai-hub')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 border border-white/20"
            >
              <Sparkles size={14} className="text-emerald-400" /> Try AI Property Hub
            </button>
            <button
              onClick={() => navigate('/list-property')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 border border-white/20"
            >
              <Building size={14} /> List Your Property
            </button>
          </div>

          <div className="bg-white text-gray-900 px-5 py-3 rounded-2xl shadow-lg text-xs">
            <p className="text-gray-500">Verified Listings</p>
            <p className="font-bold text-base text-emerald-800">2,400+ Active Homes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;