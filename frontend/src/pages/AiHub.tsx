import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../context/AuthContext';

const AiHub: React.FC = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('firecrawl_key') || '');
  const [city, setCity] = useState('Bangalore');
  const [query, setQuery] = useState('2BHK Flat');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('firecrawl_key', apiKey);
    setLoading(true);
    try {
      const res = await api.post('/ai/search', { query, city }, { headers: { 'x-firecrawl-key': apiKey } });
      setResults(res.data.results);
    } catch (err: any) {
      alert(err.response?.data?.message || 'AI Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-[#2a1f1a] text-white py-16 px-6 text-center space-y-4">
        <span className="text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">• AI-Powered Feature</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold">AI Property Hub</h1>
        <p className="text-xs text-gray-300 max-w-xl mx-auto">
          Search live flats, villas, and apartments across India using AI. Enter your Firecrawl key to scrape and rank live listings.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link to="/properties" className="border border-white/20 text-xs px-4 py-2 rounded-lg">Browse Properties →</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4 text-xs">
          <input
            placeholder="Your Firecrawl API Key (fc-...)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full border border-gray-200 rounded-lg p-2.5"
          />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="City (e.g. Bangalore)" value={city} onChange={(e) => setCity(e.target.value)} className="border border-gray-200 rounded-lg p-2.5" />
            <input placeholder="Requirement (e.g. 2BHK Flat)" value={query} onChange={(e) => setQuery(e.target.value)} className="border border-gray-200 rounded-lg p-2.5" />
          </div>
          <button disabled={loading} className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium">
            {loading ? 'Searching Live Portals...' : 'Search with AI'}
          </button>
        </form>

        <div className="space-y-3">
          {results.map((item, idx) => (
            <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="block bg-white p-4 rounded-xl border border-gray-100 hover:border-emerald-600 text-xs space-y-1">
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">Rank #{idx + 1}</span>
              <h3 className="font-semibold text-sm text-gray-900">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiHub;