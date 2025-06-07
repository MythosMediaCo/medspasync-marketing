// medspasync-frontend-main/src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Common/ErrorBoundary';
import LoadingScreen from './components/Common/LoadingScreen';

// Auth Components & Context
import { AuthProvider, useAuth } from './services/AuthContext'; // Updated import path
import ProtectedRoute from './components/auth/ProtectedRoute'; // Using the robust one
import PublicRoute from './components/auth/PublicRoute';     // Using the robust one

// UI Components
import Toast from './components/Ui/Toast'; // Global toast notifications

// Page Components
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Component that renders the main app content after auth context is ready
function AppContent() {
    const { isLoading, isAuthenticated, user, logout } = useAuth();

    // Set page title dynamically (optional, can be done per-page too)
    // Removed previous navigate prop from App.js for better routing management
    // Individual pages now use useNavigate from react-router-dom directly.

    // Show a global loading screen during initial authentication check
    if (isLoading) {
        return <LoadingScreen message="Initializing application, please wait..." />;
    }

    return (
        <div className="App min-h-screen bg-gray-50">
            <Toast /> {/* Global toast container */}
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={<PublicRoute><LandingPage /></PublicRoute>}
                />
                <Route
                    path="/login"
                    element={<PublicRoute><LoginPage /></PublicRoute>}
                />
                <Route
                    path="/register"
                    element={<PublicRoute><RegisterPage /></PublicRoute>}
                />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager', 'staff', 'receptionist']}><DashboardPage /></ProtectedRoute>}
                />
                {/* Example of other protected routes with role-based access */}
                {/* <Route
                    path="/appointments"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager', 'staff']}><AppointmentsPage /></ProtectedRoute>}
                />
                <Route
                    path="/clients"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager', 'receptionist']}><ClientsPage /></ProtectedRoute>}
                />
                <Route
                    path="/settings"
                    element={<ProtectedRoute requiredRoles={['admin']}><SettingsPage /></ProtectedRoute>}
                /> */}

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

// Main App Component with Router and AuthProvider
function App() {
    return (
        <ErrorBoundary>
            <Router>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </Router>
        </ErrorBoundary>
    );
}

export default App;