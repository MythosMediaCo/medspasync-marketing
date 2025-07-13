import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Loader2 } from 'lucide-react';

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
    const { isAuthenticated, isLoading } = useAuth();

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

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

export default PublicRoute;