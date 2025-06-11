import React, { useCallback, useEffect, useState, useContext } from 'react';
import { AuthContext } from '../services/AuthContext.jsx';

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn('JWT decode failed:', error);
    return null;
  }
};

const LandingPage = React.memo(() => {
  const handleGetStarted = useCallback(() => {
    window.location.href = '/register';
  }, []);

  const handleSignIn = useCallback(() => {
    window.location.href = '/login';
  }, []);

  const { user: contextUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState('');
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeJWT(token);
      const exp = decoded?.exp;
      const now = Date.now() / 1000;

      if (exp && exp > now) {
        window.location.href = '/dashboard';
      }
    }
  }, []);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const decoded = decodeJWT(token);
        setUserName(decoded?.name || decoded?.username || '');
      } else if (contextUser?.name) {
        setUserName(contextUser.name);
      }
    } catch (error) {
      console.warn('Token decode failed:', error);
      setUserName('');
    }
  }, [contextUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 text-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <div className="h-9 w-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-bold text-md">M</span>
            </div>
            <span className="ml-3 text-lg font-semibold tracking-tight">
              MedSpaSync Pro
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-sm px-3 py-1 border rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              onClick={handleSignIn}
              className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition font-medium"
            >
              Sign In
            </button>
            <button
              onClick={handleGetStarted}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {userName ? `Welcome back, ${userName}` : 'Welcome to MedSpaSync Pro'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {userName
                ? 'Ready to reconcile your latest data?'
                : 'Streamlined, accurate, and effortless reconciliation.'}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition shadow-lg"
            >
              Sign In to Dashboard
            </button>
            <button
              onClick={handleGetStarted}
              className="w-full border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
            >
              Register
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <a href="/demo" className="hover:text-indigo-600 hover:underline transition">
                Try Demo
              </a>
              <a href="/support" className="hover:text-indigo-600 hover:underline transition">
                Support
              </a>
              <a href="/docs" className="hover:text-indigo-600 hover:underline transition">
                Documentation
              </a>
            </nav>
          </div>

          {/* Real Uptime Badge */}
          <div className="mt-6 flex justify-center">
            <a
              href="https://stats.uptimerobot.com/YOUR_STATUS_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow"
            >
              <img
                src="https://status.uptimerobot.com/api/badge/YOUR_BADGE_KEY.svg"
                alt="Uptime status"
                className="h-4"
              />
              <span>Status</span>
            </a>
          </div>

          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Version {version}
          </div>
        </div>
      </main>
    </div>
  );
});

export default LandingPage;
