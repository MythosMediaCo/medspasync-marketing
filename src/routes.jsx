import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './components/auth/PublicRoute.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import TierGuard from './components/auth/TierGuard.jsx';
import LoadingScreen from './components/Common/LoadingScreen.jsx';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import DocsPage from './pages/DocsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ReconciliationAI from './pages/ReconciliationAI/index.jsx';
import MatchDetails from './pages/ReconciliationAI/MatchDetails.jsx';

const DashboardPage = lazy(() => import('./pages/Dashboard.jsx'));
const ClientsPage = lazy(() => import('./pages/ClientsPage.jsx'));
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const DemoReconciliation = lazy(() => import('./pages/DemoReconciliation.jsx'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/support" element={<PublicRoute><SupportPage /></PublicRoute>} />
      <Route path="/docs" element={<PublicRoute><DocsPage /></PublicRoute>} />
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
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <DashboardPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <ClientsPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <AppointmentsPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <ServicesPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-review"
        element={
          <ProtectedRoute requiredRoles={[ 'admin', 'staff' ]}>
            <TierGuard allowedTiers={['professional']}>
              <ReconciliationAI />
            </TierGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-review/:id"
        element={
          <ProtectedRoute requiredRoles={[ 'admin', 'staff' ]}>
            <TierGuard allowedTiers={['professional']}>
              <MatchDetails />
            </TierGuard>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
