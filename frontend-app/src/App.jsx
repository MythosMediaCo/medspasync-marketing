import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from './components/Toast';
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart, 
  Settings, 
  LogOut, 
  Target, 
  TrendingUp, 
  HardDrive 
} from 'lucide-react';

// Import pages
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ReconciliationDashboard from './pages/ReconciliationDashboard.jsx';
import AnalyticsDashboard from './pages/AnalyticsDashboard.jsx';
import TestUI from './pages/TestUI';

// Import components
import Header from './components/Header.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ErrorBoundary from './components/Ui/ErrorBoundary.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';

// Import new management components
import { TenantManagement } from './components/TenantManagement';
import { BackupManagement } from './components/BackupManagement';

// Import analytics
import { initializeAnalytics, trackPageView } from './utils/analytics';

// Analytics wrapper component
function AnalyticsWrapper({ children }) {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return children;
}

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('app'); // 'app' or 'marketing'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize analytics on app load
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Handle navigation when authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard when user becomes authenticated
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Mock authentication state
  const mockAuth = {
    isAuthenticated: isAuthenticated,
    login: () => {
      setIsLoading(true);
      // Reduced delay for better E2E test performance while maintaining loading state
      setTimeout(() => {
        setIsLoading(false);  // Clear loading first
        setIsAuthenticated(true);  // Then set authenticated
      }, 100);
    },
    logout: () => {
      setIsAuthenticated(false);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Reconciliation', href: '/reconciliation', icon: Target },
    { name: 'Analytics', href: '/analytics', icon: BarChart },
    { name: 'Reports', href: '/reports', icon: TrendingUp },
    { name: 'Tenants', href: '/tenants', icon: Users },
    { name: 'Backups', href: '/backups', icon: HardDrive },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  if (isLoading) {
    return (
      <ErrorBoundary>
        <LoadingScreen />
      </ErrorBoundary>
    );
  }

  // Marketing site view
  if (currentView === 'marketing') {
    return (
      <ErrorBoundary>
        <AnalyticsWrapper>
          <div className="min-h-screen bg-gray-50">
            <ToastContainer position="top-right" />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AnalyticsWrapper>
      </ErrorBoundary>
    );
  }

  // Main application view
  return (
    <ErrorBoundary>
      <AnalyticsWrapper>
        <div className="min-h-screen bg-gray-50">
          <ToastContainer position="top-right" />
          
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={
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
                            <Link
                              key={item.name}
                              to={item.href}
                              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={mockAuth.logout}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                            data-testid="logout-button"
                          >
                            <LogOut className="w-5 h-5" />
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
                      <DashboardPage />
                    </div>
                  </div>
                } />
                <Route path="/reconciliation" element={
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
                            <Link
                              key={item.name}
                              to={item.href}
                              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={mockAuth.logout}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                            data-testid="logout-button"
                          >
                            <LogOut className="w-5 h-5" />
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
                      <ReconciliationDashboard />
                    </div>
                  </div>
                } />
                <Route path="/analytics" element={
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
                            <Link
                              key={item.name}
                              to={item.href}
                              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={mockAuth.logout}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                            data-testid="logout-button"
                          >
                            <LogOut className="w-5 h-5" />
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
                      <AnalyticsDashboard />
                    </div>
                  </div>
                } />
                <Route path="/reports" element={
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
                            <Link
                              key={item.name}
                              to={item.href}
                              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={mockAuth.logout}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                            data-testid="logout-button"
                          >
                            <LogOut className="w-5 h-5" />
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
                      <div className="p-8"><h2 className="text-2xl font-bold">Reports</h2><p className="text-gray-600">Custom reconciliation reports and exports.</p></div>
                    </div>
                  </div>
                } />
                <Route path="/tenants" element={
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
                            <Link
                              key={item.name}
                              to={item.href}
                              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={mockAuth.logout}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                            data-testid="logout-button"
                          >
                            <LogOut className="w-5 h-5" />
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
                      <TenantManagement />
                    </div>
                  </div>
                } />
                <Route path="/backups" element={
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
                            <Link
                              key={item.name}
                              to={item.href}
                              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={mockAuth.logout}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                            data-testid="logout-button"
                          >
                            <LogOut className="w-5 h-5" />
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
                      <BackupManagement />
                    </div>
                  </div>
                } />
                <Route path="/settings" element={
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
                            <Link
                              key={item.name}
                              to={item.href}
                              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                              <item.icon className="w-5 h-5" />
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <button
                            onClick={mockAuth.logout}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                            data-testid="logout-button"
                          >
                            <LogOut className="w-5 h-5" />
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
                      <div className="p-8"><h2 className="text-2xl font-bold">Settings</h2><p className="text-gray-600">Configure AI matching rules and system preferences.</p></div>
                    </div>
                  </div>
                } />
                <Route path="/test-ui" element={<TestUI />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginPage onLogin={mockAuth.login} />} />
                <Route path="/register" element={<RegisterPage onRegister={mockAuth.login} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </div>
      </AnalyticsWrapper>
    </ErrorBoundary>
  );
}

export default App;
