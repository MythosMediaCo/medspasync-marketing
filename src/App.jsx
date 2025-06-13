import React from 'react';
import { useAuth } from './services/AuthContext.jsx';
import LoadingScreen from './components/Common/LoadingScreen.jsx';
import Toast from './components/Ui/Toast.jsx';
import AppRoutes from './routes.jsx';

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Initializing application, please wait..." />;
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      <Toast />
      <AppRoutes />
    </div>
  );
}

export default AppContent;
