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
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <div className="h-9 w-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow">
              <span className="text-white font-bold text-md">M</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900 tracking-tight">MedSpaSync Pro</span>
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
              Try Demo
            </button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Welcome to Clarity.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            You’re here because reconciliation is messy. We fixed it. Upload, review, export — without the chaos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition"
            >
              Try the Demo
            </button>
            <button
              onClick={handleSignIn}
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition"
            >
              Already Have Access?
            </button>
          </div>

          <div className="text-sm text-gray-400">
            MedSpaSync Pro is built by operators — not marketers. No fluff. Just clean, functional automation.
          </div>
        </div>
      </main>
    </div>
  );
});

export default LandingPage;
