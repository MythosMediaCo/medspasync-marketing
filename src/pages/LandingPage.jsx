import React, { useCallback } from 'react';

const LandingPage = React.memo(() => {
  const handleGetStarted = useCallback(() => {
    window.location.href = '/register';
  }, []);

  const handleSignIn = useCallback(() => {
    window.location.href = '/login';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <div className="h-9 w-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-bold text-md">M</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900 tracking-tight">
              MedSpaSync Pro
            </span>
          </div>
          <div className="space-x-4">
            <button
              onClick={handleSignIn}
              className="text-gray-700 hover:text-indigo-600 transition font-medium"
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

      {/* Main Content - Clean App Entry */}
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="text-white font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to MedSpaSync Pro
            </h1>
            <p className="text-gray-600">
              Access your reconciliation dashboard
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition shadow-lg"
            >
              Sign In to Dashboard
            </button>
            
            <button
              onClick={handleGetStarted}
              className="w-full border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition"
            >
              Create Account
            </button>
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="/demo" className="hover:text-indigo-600 transition">
                Try Demo
              </a>
              <a href="/support" className="hover:text-indigo-600 transition">
                Support
              </a>
              <a href="/docs" className="hover:text-indigo-600 transition">
                Documentation
              </a>
            </div>
          </div>

          {/* Status/Version Info */}
          <div className="mt-6 text-xs text-gray-400">
            Version 1.0 • All systems operational
          </div>
        </div>
      </main>
    </div>
  );
});

export default LandingPage;
