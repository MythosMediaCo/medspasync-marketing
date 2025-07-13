import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './components/auth/PublicRoute.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import TierGuard from './components/auth/TierGuard.jsx';
import LoadingScreen from './components/Common/LoadingScreen.jsx';

// Convert remaining static imports to lazy loading
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));
const SupportPage = lazy(() => import('./pages/SupportPage.jsx'));
const DocsPage = lazy(() => import('./pages/DocsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const TestLogin = lazy(() => import('./pages/TestLogin.jsx'));
const NewLogin = lazy(() => import('./pages/NewLogin.jsx'));
const ReconciliationAI = lazy(() => import('./pages/ReconciliationAI/index.jsx'));
const MatchDetails = lazy(() => import('./pages/ReconciliationAI/MatchDetails.jsx'));

const DashboardPage = lazy(() => import('./pages/Dashboard.jsx'));
const ClientsPage = lazy(() => import('./pages/ClientsPage.jsx'));
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const DemoReconciliation = lazy(() => import('./pages/DemoReconciliation.jsx'));
const DemoPage = lazy(() => import('./pages/DemoPage.jsx'));
const ReconciliationDashboardPage = lazy(() => import('./pages/ReconciliationDashboard.jsx'));
const ReconciliationWorkflowPage = lazy(() => import('./pages/reconciliation/index.jsx'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <LandingPage />
          </Suspense>
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <LoginPage />
          </Suspense>
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <RegisterPage />
          </Suspense>
        </PublicRoute>
      } />
      <Route path="/support" element={
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <SupportPage />
          </Suspense>
        </PublicRoute>
      } />
      <Route path="/docs" element={
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <DocsPage />
          </Suspense>
        </PublicRoute>
      } />
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
        path="/demo/roi"
        element={
          <PublicRoute>
            <Suspense fallback={<LoadingScreen />}>
              <DemoPage />
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
        path="/reconciliation"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <ReconciliationWorkflowPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reconciliation-dashboard"
        element={
          <ProtectedRoute>
            <Suspense fallback={<LoadingScreen />}>
              <ReconciliationDashboardPage />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-review"
        element={
          <ProtectedRoute requiredRoles={[ 'admin', 'staff' ]}>
            <TierGuard allowedTiers={['professional']}>
              <Suspense fallback={<LoadingScreen />}>
                <ReconciliationAI />
              </Suspense>
            </TierGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-review/:id"
        element={
          <ProtectedRoute requiredRoles={[ 'admin', 'staff' ]}>
            <TierGuard allowedTiers={['professional']}>
              <Suspense fallback={<LoadingScreen />}>
                <MatchDetails />
              </Suspense>
            </TierGuard>
          </ProtectedRoute>
        }
      />
      <Route path="/testlogin" element={
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <TestLogin />
          </Suspense>
        </PublicRoute>
      } />
      <Route path="/newlogin" element={
        <PublicRoute>
          <Suspense fallback={<LoadingScreen />}>
            <NewLogin />
          </Suspense>
        </PublicRoute>
      } />
      <Route path="*" element={
        <Suspense fallback={<LoadingScreen />}>
          <NotFoundPage />
        </Suspense>
      } />
    </Routes>
  );
}
