import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Common/ErrorBoundary.jsxx'; // Explicit .jsx extension
import LoadingScreen from './components/Common/LoadingScreen.jsxx'; // Explicit .jsx extension

// Auth Components & Context
import { AuthProvider, useAuth } from './services/AuthContext.jsxx'; // Explicit .jsx extension
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';   // Explicit .jsx extension
import PublicRoute from './components/auth/PublicRoute.jsx';     // Explicit .jsx extension

// UI Components
import Toast from './components/Ui/Toast.jsx'; // Explicit .jsx extension

// Page Components
import LandingPage from './pages/LandingPage.jsx';     // Explicit .jsx extension
import LoginPage from './pages/LoginPage.jsx';         // Explicit .jsx extension
import RegisterPage from './pages/RegisterPage.jsx';   // Explicit .jsx extension
import DashboardPage from './pages/DashboardPage.jsx'; // Explicit .jsx extension
import NotFoundPage from './pages/NotFoundPage.jsx';   // Explicit .jsx extension

// AppContent component handles rendering based on authentication state
// It uses the useAuth hook provided by AuthProvider
function AppContent() {
    const { isLoading } = useAuth(); // Access global loading state from AuthContext

    // Display a global loading screen while the authentication status is being determined
    if (isLoading) {
        return <LoadingScreen message="Initializing application, please wait..." />;
    }

    return (
        <div className="App min-h-screen bg-gray-50">
            <Toast /> {/* Component for displaying global toast notifications */}
            <Routes>
                {/* Public Routes: Accessible to all users.
                    Wrapped in PublicRoute to redirect authenticated users away from these pages. */}
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

                {/* Protected Routes: Require user authentication and potentially specific roles.
                    Wrapped in ProtectedRoute to enforce access control. */}
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager', 'staff', 'receptionist']}><DashboardPage /></ProtectedRoute>}
                />
                {/* Example of how to add other protected routes: */}
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

                {/* Fallback Route: Catches any undefined or unmatched paths, displaying a 404 page. */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

// Main App component: Sets up the routing infrastructure, error boundary, and authentication context.
function App() {
    return (
        // ErrorBoundary catches and displays errors occurring anywhere in its child component tree.
        <ErrorBoundary>
            {/* BrowserRouter enables client-side routing using clean URLs. */}
            <Router>
                {/* AuthProvider makes authentication state and functions available throughout the app. */}
                <AuthProvider>
                    {/* AppContent renders the main application UI after authentication initialization. */}
                    <AppContent />
                </AuthProvider>
            </Router>
        </ErrorBoundary>
    );
}

export default App;