// medspasync-pro/src/components/auth/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext'; // Using the unified AuthContext
import { Loader2 } from 'lucide-react'; // Make sure you have lucide-react installed

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
    const { isAuthenticated, isLoading } = useAuth(); // Use isLoading from AuthContext

    // Show loading spinner while AuthContext is checking authentication status
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading authentication status...</p>
                </div>
            </div>
        );
    }

    // Redirect to specified path (default: /dashboard) if already authenticated
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // If not authenticated, render the children (public page)
    return children;
};

export default PublicRoute;