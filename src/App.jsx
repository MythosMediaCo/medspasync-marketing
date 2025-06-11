import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './services/AuthContext.jsx';
import LoadingScreen from './components/Common/LoadingScreen.jsx';
import PublicRoute from './components/Auth/PublicRoute.jsx';
import Toast from './components/Common/Toast.jsx';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import DocsPage from './pages/DocsPage.jsx';

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
        {/* Additional authenticated/private routes can be added below */}
      </Routes>
    </div>
  );
}

export default AppContent;
