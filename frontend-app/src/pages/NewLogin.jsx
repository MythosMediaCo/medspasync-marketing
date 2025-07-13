import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NewLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      if (formData.email && formData.password) {
        if (onLogin) onLogin();
      } else {
        setError('Invalid email or password.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">
      <div className="w-full max-w-sm mx-auto">
        
        {/* TINY Logo */}
        <div className="text-center mb-6">
          <h1 className="text-sm font-medium text-white/90 mb-1">
            MedSpaSync Pro
          </h1>
          <p className="text-white/70 text-xs">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-md bg-white/8 border border-white/10 shadow-xl rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-white/90 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-300 text-sm mb-4">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded transition-all duration-200"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-white/70 hover:text-white text-sm transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Register */}
          <div className="mt-6 p-3 bg-white/5 rounded border border-white/10">
            <div className="text-center">
              <h3 className="text-white/90 text-sm font-medium mb-1">New to MedSpaSync Pro?</h3>
              <p className="text-white/70 text-xs mb-3">Join thousands of medical spas</p>
              <Link
                to="/register"
                className="inline-block w-full px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded border border-white/20 transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* OR Divider */}
        <div className="mt-6 mb-4 flex items-center">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-3 text-white/60 text-xs">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Demo Section */}
        <div className="text-center">
          <div className="p-3 bg-white/5 rounded border border-white/10">
            <h3 className="text-white/90 text-sm font-medium mb-1">Try Before You Buy</h3>
            <p className="text-white/70 text-xs mb-3">Explore with sample data</p>
            <button
              onClick={() => window.location.href = '/demo'}
              className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2 px-3 rounded transition-all"
            >
              Start Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLogin;