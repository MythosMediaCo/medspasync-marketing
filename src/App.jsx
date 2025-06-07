import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Common/ErrorBoundary.js'; // Ensure .js extension
import LoadingScreen from './components/Common/LoadingScreen.js'; // Ensure .js extension

// Auth Components & Context
import { AuthProvider, useAuth } from './services/AuthContext.js'; // Ensure .js extension
import ProtectedRoute from './components/auth/ProtectedRoute.js';   // Ensure .js extension
import PublicRoute from './components/auth/PublicRoute.js';     // Ensure .js extension

// UI Components
import Toast from './components/Ui/Toast.js'; // Ensure .js extension

// Page Components
import LandingPage from './pages/LandingPage.js'; // Ensure .js extension
import LoginPage from './pages/LoginPage.js';     // Ensure .js extension
import RegisterPage from './pages/RegisterPage.js'; // Ensure .js extension
import DashboardPage from './pages/DashboardPage.js'; // Ensure .js extension
import NotFoundPage from './pages/NotFoundPage.js'; // Ensure .js extension

// AppContent handles rendering after AuthProvider is ready
function AppContent() {
    const { isLoading } = useAuth(); // Global loading state from AuthContext

    // Show a global loading screen during initial authentication check
    if (isLoading) {
        return <LoadingScreen message="Initializing application, please wait..." />;
    }

    return (
        <div className="App min-h-screen bg-gray-50">
            <Toast /> {/* Global toast notification container */}
            <Routes>
                {/* Public Routes - Accessible to all, but redirects authenticated users */}
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

                {/* Protected Routes - Requires authentication and optionally specific roles */}
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

                {/* 404 Fallback Route - Catches all undefined paths */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

// Main App component: Sets up Router, ErrorBoundary, and AuthProvider
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