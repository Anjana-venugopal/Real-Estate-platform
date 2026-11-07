import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, useAuth } from '../context/AuthContext';
import { Property } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState<Property[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    api.get('/properties/my-listings').then((res) => setMyListings(res.data));
    api.get('/appointments/my').then((res) => setAppointments(res.data));
  }, []);

  const cancelAppointment = async (id: string) => {
    await api.patch(`/appointments/${id}/cancel`);
    setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status: 'cancelled' } : a)));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Welcome back, {user?.name || 'RealEstate'}</h1>
        <p className="text-xs text-gray-500">Manage your property listings and scheduled appointments.</p>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-lg font-bold">{myListings.length}</p>
          <p className="text-xs text-gray-500">My Listings</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-lg font-bold">{appointments.length}</p>
          <p className="text-xs text-gray-500">Total Appointments</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-lg font-bold">
            {appointments.filter((a) => a.status === 'pending').length}
          </p>
          <p className="text-xs text-gray-500">Pending Visits</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-lg font-bold text-emerald-700">Active</p>
          <p className="text-xs text-gray-500">Account Status</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link
          to="/list-property"
          className="bg-emerald-700 text-white text-xs font-medium px-4 py-2 rounded-full"
        >
          + List a Property
        </Link>
        <Link
          to="/properties"
          className="border border-gray-200 text-gray-700 text-xs font-medium px-4 py-2 rounded-full"
        >
          Browse Properties
        </Link>
      </div>

      {/* Appointments Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">My Appointments</h2>
        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center space-y-3">
            <p className="text-xs text-gray-500">Appointments you book on properties will appear here.</p>
            <Link
              to="/properties"
              className="inline-block bg-emerald-700 text-white text-xs px-4 py-2 rounded-full"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {appointments.map((apt) => (
              <div
                key={apt._id}
                className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-gray-900">{apt.property?.title || 'Property Viewing'}</p>
                  <p className="text-gray-500">
                    {new Date(apt.date).toLocaleDateString()} at {apt.time} — Status:{' '}
                    <span className="capitalize font-medium">{apt.status}</span>
                  </p>
                </div>
                {apt.status !== 'cancelled' && (
                  <button
                    onClick={() => cancelAppointment(apt._id)}
                    className="text-red-600 hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;