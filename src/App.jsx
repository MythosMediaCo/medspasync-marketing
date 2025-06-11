import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/Ui/ErrorBoundary.jsx';
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
import NotFoundPage from './pages/NotFoundPage.jsx';

const DashboardPage = lazy(() => import('./pages/Dashboard.jsx'));
const ClientsPage = lazy(() => import('./pages/ClientsPage.jsx'));
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const DemoReconciliation = lazy(() => import('./pages/DemoReconciliation.jsx'));
const ReconciliationRunner = lazy(() => import('./components/ReconciliationRunner.jsx'));

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
        <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route
          path="/demo"
          element={
            <PublicRoute>
              <Suspense fallback={<LoadingScreen />}>
                <DemoReconciliation />
              </Suspense>
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager', 'staff', 'receptionist']}>
              <Suspense fallback={<LoadingScreen />}>
                <DashboardPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager', 'receptionist']}>
              <Suspense fallback={<LoadingScreen />}>
                <ClientsPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager', 'staff', 'receptionist']}>
              <Suspense fallback={<LoadingScreen />}>
                <AppointmentsPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <Suspense fallback={<LoadingScreen />}>
                <ServicesPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reconciliation"
          element={
            <ProtectedRoute requiredRoles={['admin', 'manager']}>
              <Suspense fallback={<LoadingScreen />}>
                <ReconciliationRunner />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
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
