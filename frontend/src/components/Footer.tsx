import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer className="bg-[#18222f] text-gray-300 py-12 mt-16 text-xs">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-white font-serif font-bold text-base mb-2">RealEstate</h3>
        <p className="text-gray-400">Find verified properties across India with clear insights and seamless viewing bookings.</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-2">Quick Links</h4>
        <ul className="space-y-1.5">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/properties">Properties</Link></li>
          <li><Link to="/ai-hub">AI Property Hub</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-2">Contact Info</h4>
        <p>Indiranagar, Bangalore, India</p>
        <p>support@realestate.in</p>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
        <input placeholder="Enter your email" className="w-full bg-white/10 rounded-lg px-3 py-2 mb-2 text-white" />
        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium">Subscribe</button>
      </div>
    </div>
  </footer>
);