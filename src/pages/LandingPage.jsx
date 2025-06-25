import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoadingScreen from '../components/Common/LoadingScreen.jsx';
import UptimeStatusBadge from '../components/Common/UptimeStatusBadge.jsx';
import Header from '../components/Header.jsx';

const LandingPage = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';

  const { firstName, isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const from = location.state?.from;
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      const cookie = document.cookie
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith('lastVisitedPage='));
      const lastVisited = cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
      if (lastVisited) {
        navigate(lastVisited, { replace: true });
        return;
      }

      if (role) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, location, navigate, role]);




  if (isLoading) {
    return <LoadingScreen message="Loading user session..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 text-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {firstName ? `Welcome back, ${firstName}` : 'Welcome to MedSpaSync Pro'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {firstName
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

          <div className="mt-6 flex justify-center">
            <UptimeStatusBadge statusPageId="9mEaClE07F" />
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
