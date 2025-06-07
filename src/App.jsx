import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Common/ErrorBoundary.jsx'; // .jsx
import LoadingScreen from './components/Common/LoadingScreen.jsx'; // .jsx

// Auth Components & Context
import { AuthProvider, useAuth } from './services/AuthContext.js'; // This remains .js
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';   // .jsx
import PublicRoute from './components/auth/PublicRoute.jsx';     // .jsx

// UI Components
import Toast from './components/Ui/Toast.jsx'; // .jsx

// Page Components
import LandingPage from './pages/LandingPage.jsx'; // .jsx
import LoginPage from './pages/LoginPage.jsx';     // .jsx
import RegisterPage from './pages/RegisterPage.jsx'; // .jsx
import DashboardPage from './pages/DashboardPage.jsx'; // .jsx
import NotFoundPage from './pages/NotFoundPage.jsx'; // .jsx

function AppContent() {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <LoadingScreen message="Initializing application, please wait..." />;
    }

    return (
        <div className="App min-h-screen bg-gray-50">
            <Toast />
            <Routes>
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
                <Route
                    path="/dashboard"
                    element={<ProtectedRoute requiredRoles={['admin', 'manager', 'staff', 'receptionist']}><DashboardPage /></ProtectedRoute>}
                />
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