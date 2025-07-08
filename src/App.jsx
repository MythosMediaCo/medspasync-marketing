import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import pages
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LandingPage from './pages/LandingPage.jsx';

// Import components
import Header from './components/Header.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

// Import analytics
import { initializeAnalytics, trackPageView } from './utils/analytics';

// Import design system
import './components/VibrantDesignSystem.css';

// Fallback icons if lucide-react is not available
const Home = ({ className }) => <span className={className}>🏠</span>;
const Users = ({ className }) => <span className={className}>👥</span>;
const Calendar = ({ className }) => <span className={className}>📅</span>;
const BarChart = ({ className }) => <span className={className}>📊</span>;
const Settings = ({ className }) => <span className={className}>⚙️</span>;
const LogOut = ({ className }) => <span className={className}>🚪</span>;

// Try to import from lucide-react, fallback to our simple icons
let LucideIcons = { Home, Users, Calendar, BarChart, Settings, LogOut };
try {
  LucideIcons = require('lucide-react');
} catch (e) {
  console.warn('lucide-react not available, using fallback icons');
}

// Analytics wrapper component
function AnalyticsWrapper({ children }) {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return children;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('app'); // 'app' or 'marketing'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize analytics on app load
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Mock authentication state
  const mockAuth = {
    isAuthenticated: isAuthenticated,
    login: () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 1500);
    },
    logout: () => {
      setIsAuthenticated(false);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LucideIcons.Home },
    { name: 'Patients', href: '/patients', icon: LucideIcons.Users },
    { name: 'Appointments', href: '/appointments', icon: LucideIcons.Calendar },
    { name: 'Reports', href: '/reports', icon: LucideIcons.BarChart },
    { name: 'Settings', href: '/settings', icon: LucideIcons.Settings },
  ];

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Marketing site view
  if (currentView === 'marketing') {
    return (
      <Router>
        <AnalyticsWrapper>
          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AnalyticsWrapper>
      </Router>
    );
  }

  // Main application view
  return (
    <Router>
      <AnalyticsWrapper>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          
          {isAuthenticated ? (
            <div className="flex">
              {/* Sidebar Navigation */}
              <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-gradient-blue-to-teal rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">MedSpaSync</h1>
                      <p className="text-sm text-gray-600">Pro</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={mockAuth.logout}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                    >
                      <LucideIcons.LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <Header 
                  onViewChange={(view) => setCurrentView(view)}
                  currentView={currentView}
                />
                
                <Routes>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/patients" element={<div className="p-8"><h2 className="text-2xl font-bold">Patients</h2></div>} />
                  <Route path="/appointments" element={<div className="p-8"><h2 className="text-2xl font-bold">Appointments</h2></div>} />
                  <Route path="/reports" element={<div className="p-8"><h2 className="text-2xl font-bold">Reports</h2></div>} />
                  <Route path="/settings" element={<div className="p-8"><h2 className="text-2xl font-bold">Settings</h2></div>} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={mockAuth.login} />} />
              <Route path="/register" element={<RegisterPage onRegister={mockAuth.login} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </div>
      </AnalyticsWrapper>
    </Router>
  );
}

export default App;
