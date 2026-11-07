import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Plus } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const enableAiHub = import.meta.env.VITE_ENABLE_AI_HUB === 'true';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif font-bold text-lg text-gray-900">
          <div className="bg-emerald-700 text-white p-1.5 rounded-md"><Building2 size={18} /></div>
          RealEstate
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <Link to="/properties" className="hover:text-emerald-700">Properties</Link>
          {enableAiHub && <Link to="/ai-hub" className="hover:text-emerald-700">AI Hub</Link>}
          <Link to="/contact" className="hover:text-emerald-700">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/list-property" className="bg-emerald-700 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1">
                <Plus size={14} /> List Property
              </Link>
              <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-emerald-700">{user.name}</Link>
              <button onClick={logout} className="text-xs text-gray-500 hover:text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700">Sign In</Link>
              <Link to="/register" className="bg-emerald-700 text-white text-xs font-medium px-4 py-2 rounded-full">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};