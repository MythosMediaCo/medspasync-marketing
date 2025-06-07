// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppState } from './hooks/useAppState';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/Common/LoadingScreen';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Main App Component
function App() {
    const appState = useAppState();
    const {
        isAuthenticated,
        loading,
        user,
        error,
        navigate, // This 'navigate' will now handle internal page state, not full routing
        login,
        logout,
        register,
        clearError
    } = appState;

    // Show a global loading screen during initial app load or for global loading states
    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <ErrorBoundary>
            <Router>
                <div className="App min-h-screen bg-gray-50">
                    <Routes>
                        {/* Public Routes */}
                        <Route
                            path="/"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/dashboard" replace />
                                ) : (
                                    <LandingPage navigate={navigate} loading={loading} />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/dashboard" replace />
                                ) : (
                                    <LoginPage
                                        navigate={navigate}
                                        onLogin={login}
                                        loading={loading}
                                        error={error}
                                        clearError={clearError}
                                    />
                                )
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/dashboard" replace />
                                ) : (
                                    <RegisterPage
                                        navigate={navigate}
                                        onRegister={register}
                                        loading={loading}
                                    />
                                )
                            }
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                isAuthenticated ? (
                                    <DashboardPage
                                        navigate={navigate}
                                        onLogout={logout}
                                        user={user}
                                    />
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                        {/* Add other protected routes here later, e.g.: */}
                        {/* <Route path="/appointments" element={isAuthenticated ? <AppointmentsPage /> : <Navigate to="/login" replace />} /> */}
                        {/* <Route path="/clients" element={isAuthenticated ? <ClientsPage /> : <Navigate to="/login" replace />} /> */}

                        {/* 404 Fallback */}
                        <Route path="*" element={<NotFoundPage isAuthenticated={isAuthenticated} navigate={navigate} />} />
                    </Routes>
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default App;