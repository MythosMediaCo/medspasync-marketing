// src/hooks/useAppState.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useAppState = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Get React Router's navigate function

    // Clear authentication data from localStorage
    const clearAuthData = useCallback(() => {
        localStorage.removeItem('medspasync_auth_token');
        localStorage.removeItem('medspasync_user_data');
        localStorage.removeItem('medspasync_last_activity');
    }, []);

    // Enhanced authentication check with error recovery
    const checkAuthentication = useCallback(() => {
        try {
            const token = localStorage.getItem('medspasync_auth_token');
            const userData = localStorage.getItem('medspasync_user_data');
            const lastActivity = localStorage.getItem('medspasync_last_activity');

            // Check token expiration (24 hours)
            if (token && lastActivity) {
                const hoursSinceActivity = (Date.now() - parseInt(lastActivity)) / (1000 * 60 * 60);
                if (hoursSinceActivity > 24) {
                    throw new Error('Session expired. Please log in again.');
                }
            }

            if (token && userData) {
                setIsAuthenticated(true);
                setUser(JSON.parse(userData));
                localStorage.setItem('medspasync_last_activity', Date.now().toString());
                // No direct navigation here; App.js handles routing based on isAuthenticated
            } else {
                // If no token or user data, ensure unauthenticated state
                clearAuthData(); // Clean up any partial data
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (err) {
            console.error('Authentication check failed:', err); // Log for debugging
            setError(err.message || 'Authentication session invalid.'); // Set user-friendly error
            clearAuthData();
            setIsAuthenticated(false);
            setUser(null);
        }
    }, [clearAuthData]); // Added clearAuthData to dependencies

    // Initialize app state and set up event listeners
    useEffect(() => {
        const initializeApp = async () => {
            setLoading(true);
            // Simulate app initialization delay
            await new Promise(resolve => setTimeout(resolve, 800));
            checkAuthentication();
            setLoading(false);
        };

        initializeApp();

        // Multi-tab synchronization: Listen for changes in localStorage
        const handleStorageChange = (e) => {
            // Only react to changes in our auth token
            if (e.key === 'medspasync_auth_token') {
                if (e.newValue) {
                    checkAuthentication(); // Re-check auth if token appears
                } else {
                    // If token is removed (e.g., logout in another tab), clear state
                    setIsAuthenticated(false);
                    setUser(null);
                    setError(null); // Clear any existing errors
                    // Optionally, navigate to home if the current page requires auth
                    if (window.location.pathname.startsWith('/dashboard')) {
                        navigate('/login'); // Redirect to login, not home, if attempting to access protected route
                    }
                }
            }
        };

        // Popstate for browser navigation (React Router handles most of this implicitly)
        // This specific listener is now largely redundant with React Router's internal handling,
        // but can be kept if you have very specific non-React Router related popstate needs.
        // For standard app routing, React Router manages history API.
        // I'll keep it here but comment on its reduced necessity.
        const handlePopState = () => {
             // React Router primarily handles this. Your components will re-render based on URL.
             // This can be simplified or removed if React Router covers all cases.
             // If you need to react to specific URL changes outside of component renders,
             // you'd use React Router's useLocation hook in components.
             console.log('Popstate event detected, React Router handles this automatically for route changes.');
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('popstate', handlePopState); // Keep for general awareness, though less critical with RRD

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [checkAuthentication, navigate]); // Removed isAuthenticated dependency as it's not needed for effect setup

    // Enhanced login with validation (still simulated)
    const login = useCallback(async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call with realistic timing
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Demo authentication
            if (credentials.email === 'admin@medspasync.com' && credentials.password === 'admin123') {
                const userData = {
                    id: 'user_12345',
                    firstName: 'Dr. Sarah',
                    lastName: 'Johnson',
                    email: credentials.email,
                    role: 'admin',
                    spaName: 'Elite Medical Spa',
                    avatar: null
                };

                const token = `medspasync_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

                localStorage.setItem('medspasync_auth_token', token);
                localStorage.setItem('medspasync_user_data', JSON.stringify(userData));
                localStorage.setItem('medspasync_last_activity', Date.now().toString());

                setIsAuthenticated(true);
                setUser(userData);
                navigate('/dashboard'); // Use React Router's navigate
                document.title = `MedSpaSync Pro - Dashboard`; // Update title here

                return { success: true, user: userData };
            } else {
                throw new Error('Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError(err.message);
            throw err; // Re-throw to allow component to handle locally if needed
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // Enhanced logout with confirmation (will use custom modal)
    const logout = useCallback(async () => {
        // Assume modal confirmation happens in the component, then `onLogout(true)` is called
        setLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate logout API call
            clearAuthData();
            setIsAuthenticated(false);
            setUser(null);
            navigate('/'); // Use React Router's navigate to home
            document.title = `MedSpaSync Pro - Home`; // Update title
        } catch (err) {
            setError(err.message || 'Failed to logout.');
            console.error('Logout error:', err);
        } finally {
            setLoading(false);
        }
    }, [clearAuthData, navigate]);

    // Enhanced registration (still simulated)
    const register = useCallback(async (userData) => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate success
            console.log('Registered user data:', userData);
            return { success: true, message: 'Account created successfully!' };
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        isAuthenticated,
        user,
        loading,
        error,
        navigate, // Export React Router's navigate for use in components
        login,
        logout,
        register,
        clearError: () => setError(null)
    };
};

export { useAppState };