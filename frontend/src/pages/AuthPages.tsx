import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-gray-100">
      <h1 className="text-xl font-serif font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5" />
        <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5" />
        <button className="w-full bg-emerald-700 text-white py-2.5 rounded-lg font-medium">Sign In</button>
      </form>
      <p className="text-xs text-gray-500 mt-4">No account? <Link to="/register" className="text-emerald-700 underline">Sign Up</Link></p>
    </div>
  );
};

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-gray-100">
      <h1 className="text-xl font-serif font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <input required placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5" />
        <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5" />
        <input required type="password" placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2.5" />
        <button className="w-full bg-emerald-700 text-white py-2.5 rounded-lg font-medium">Register</button>
      </form>
    </div>
  );
};