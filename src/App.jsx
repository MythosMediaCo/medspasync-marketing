// ========================================
// File: src/App.jsx
// Main Application with Enhanced Routing and Error Boundaries
// ========================================

import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, BarChart3, Home, Settings, Bell, User } from 'lucide-react';
import { QueryProvider } from './components/QueryProvider';
import ErrorBoundary from './components/ui/ErrorBoundary';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ClientsPage = React.lazy(() => import('./pages/ClientsPage'));
const AppointmentsPage = React.lazy(() => import('./pages/AppointmentsPage'));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="xl" />
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

// Navigation Component
const Navigation = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              MedSpaSync Pro
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/clients"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Users className="w-4 h-4 mr-2" />
                Clients
              </Link>
              <Link
                to="/appointments"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Appointments
              </Link>
              <Link
                to="/analytics"
                className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border w-80 z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-600">No new notifications</p>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">User</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border w-48 z-50">
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                    <hr className="my-1" />
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Analytics Page Placeholder
const AnalyticsPage = () => (
  <div className="max-w-7xl mx-auto p-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
      <p className="text-gray-600 mt-1">Business insights and performance metrics</p>
    </div>
    
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
      <p className="text-gray-600 mb-6">
        Detailed analytics and reporting features coming soon. 
        Track revenue, client retention, service performance, and more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Revenue Analytics</h4>
          <p className="text-sm text-gray-600">Track daily, weekly, and monthly revenue trends</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Client Insights</h4>
          <p className="text-sm text-gray-600">Analyze client behavior and retention rates</p>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Service Performance</h4>
          <p className="text-sm text-gray-600">Monitor which services are most popular</p>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navigation />
            
            <main className="pb-8">
              <Suspense fallback={<PageLoader />}>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/appointments" element={<AppointmentsPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </ErrorBoundary>
              </Suspense>
            </main>
          </div>
        </Router>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default App;