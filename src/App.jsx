import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Common/ErrorBoundary.jsx';
import LoadingScreen from './components/Common/LoadingScreen.jsx';

// Auth Components & Context
import { AuthProvider, useAuth } from './services/AuthContext.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import PublicRoute from './components/auth/PublicRoute.jsx';

// UI Components
import Toast from './components/Ui/Toast.jsx';

// Page Components
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/Dashboard.jsx'; // Dashboard is now in its own file
import ClientsPage from './pages/ClientsPage.jsx'; // New client management page
import AppointmentsPage from './pages/AppointmentsPage.jsx'; // New appointments page
import ServicesPage from './pages/ServicesPage.jsx'; // New services page
import NotFoundPage from './pages/NotFoundPage.jsx';

function AppContent() {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen message="Initializing application, please wait..." />;
    }

    return (
        <div className="App min-h-screen bg-gray-50">
            <Toast />
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
                <Route
                    path="/clients"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager', 'receptionist']}><ClientsPage /></ProtectedRoute>}
                />
                <Route
                    path="/appointments"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager', 'staff', 'receptionist']}><AppointmentsPage /></ProtectedRoute>}
                />
                <Route
                    path="/services"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager']}><ServicesPage /></ProtectedRoute>}
                />
                {/* Add other protected routes here */}

                {/* 404 Fallback Route */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

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