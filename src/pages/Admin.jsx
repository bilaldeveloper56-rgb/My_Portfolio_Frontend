import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import axios from 'axios';
import { Lock, Mail, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';

const Admin = () => {
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect to dashboard immediately
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      if (response.data.success) {
        login(response.data.token, response.data.admin.email);
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(response.data.error || 'Authentication failed.');
      }
    } catch (err) {
      console.error('Admin Login Error:', err);
      setError(err.response?.data?.error || 'Invalid credentials or connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg relative p-4">
      <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold rounded-md border border-card-border text-text-secondary hover:text-text-main hover:border-primary hover:-translate-x-0.5 transition-all duration-150 glass z-10">
        <ArrowLeft size={16} /> Back to Portfolio
      </Link>

      <div className="w-full max-w-[400px]">
        <form className="p-6 sm:p-10 border border-card-border rounded-xl bg-card shadow-md flex flex-col gap-4 glass" onSubmit={handleSubmit}>
          <div className="text-center mb-4 flex flex-col items-center gap-1.5">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary-light text-primary mb-1">
              <ShieldCheck size={28} />
            </div>
            <h1 className="text-xl font-extrabold text-text-main">Admin Portal</h1>
            <p className="text-xs text-text-secondary">Sign in to manage visitor inquiries</p>
          </div>

          {error && (
            <div className="bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] text-danger p-3 rounded-md text-xs font-medium text-left">
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="email" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center w-full">
              <Mail size={16} className="absolute left-4 text-text-muted pointer-events-none" />
              <input
                type="email"
                id="email"
                required
                placeholder="admin@bilalkhan.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-md border border-card-border bg-bg text-text-main text-sm transition-all duration-150 focus:border-primary focus:shadow-glow focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="password" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Password</label>
            <div className="relative flex items-center w-full">
              <Lock size={16} className="absolute left-4 text-text-muted pointer-events-none" />
              <input
                type="password"
                id="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-md border border-card-border bg-bg text-text-main text-sm transition-all duration-150 focus:border-primary focus:shadow-glow focus:outline-none"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-1 w-full py-3 cursor-pointer disabled:opacity-50" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" /> Authenticating...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
