import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-gray-900">We'd Love to Hear From You</h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">Whether you have a question about listings, need assistance with buying or selling, or want to explore partnership opportunities, our team is ready to help.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 space-y-4 text-xs">
          <h2 className="font-semibold text-sm text-gray-800">Send Us a Message</h2>
          {sent && <p className="text-emerald-700 font-medium">Thank you! Your message has been sent.</p>}
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="First Name" className="border border-gray-200 rounded-lg p-2.5" />
            <input required placeholder="Last Name" className="border border-gray-200 rounded-lg p-2.5" />
          </div>
          <input required type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-lg p-2.5" />
          <input required placeholder="Phone Number" className="w-full border border-gray-200 rounded-lg p-2.5" />
          <textarea required rows={4} placeholder="Your Message..." className="w-full border border-gray-200 rounded-lg p-2.5" />
          <button className="bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium">Send Message</button>
        </form>

        <div className="space-y-4 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-1">Visit Our Office</h3>
            <p className="text-gray-500">100 Feet Road, Indiranagar, Bangalore 560038</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-1">Call or Email Us</h3>
            <p className="text-gray-500">+91 80 4567 8900</p>
            <p className="text-gray-500">support@realestate.in</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
            <p className="text-gray-500">Mon - Sat: 9:00 AM - 7:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;