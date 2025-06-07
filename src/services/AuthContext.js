// medspasync-frontend-main/src/services/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import authService from './auth'; // Your auth service
import storageService from './storage'; // Your storage service
import toast from 'react-hot-toast'; // For notifications

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Initial loading state while checking authentication
    error: null
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };

        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload,
                isLoading: false,
                error: null
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false // Stop loading on error
            };

        case 'LOGOUT':
            return {
                ...initialState,
                isLoading: false // Already logged out, so not loading
            };

        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate(); // Get React Router's navigate function

    // --- Authentication Logic ---

    // Function to check current authentication status from local storage
    const checkAuthenticationStatus = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const token = storageService.getAuthToken();
            const userData = storageService.getUserData();
            const lastActivity = storageService.getLastActivity(); // Assuming you add this to storageService

            // Client-side session expiration check (24 hours)
            if (token && lastActivity) {
                const hoursSinceActivity = (Date.now() - parseInt(lastActivity)) / (1000 * 60 * 60);
                if (hoursSinceActivity > 24) {
                    console.warn('Session expired due to inactivity.');
                    throw new Error('Session expired. Please log in again.');
                }
            }

            if (authService.isAuthenticated() && userData) {
                // If token and user data are valid, set user directly
                dispatch({ type: 'SET_USER', payload: userData });
                // Update last activity to extend session
                storageService.setLastActivity(Date.now().toString());
            } else if (authService.isAuthenticated() && !userData) {
                // Token exists but user data is missing/corrupted, try to fetch profile
                const profileResponse = await authService.getProfile();
                dispatch({ type: 'SET_USER', payload: profileResponse.user });
                storageService.setLastActivity(Date.now().toString());
            } else {
                // No token or not authenticated
                storageService.clearAll(); // Ensure all auth-related data is cleared
                dispatch({ type: 'SET_USER', payload: null });
            }
        } catch (err) {
            console.error('Auth initialization error or session invalid:', err);
            toast.error(err.message || 'Your session has expired or is invalid. Please log in.');
            storageService.clearAll();
            dispatch({ type: 'SET_USER', payload: null }); // Ensure user is null
            dispatch({ type: 'SET_ERROR', payload: err.message });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // --- Effects for Initialization and Global Listeners ---

    useEffect(() => {
        // Run initial authentication check when AuthProvider mounts
        checkAuthenticationStatus();

        // Multi-tab synchronization: Listen for changes in localStorage
        const handleStorageChange = (e) => {
            // Only react to changes in our main auth token or if it's cleared
            if (e.key === storageService.STORAGE_KEYS.AUTH_TOKEN) {
                if (e.newValue) {
                    // Token appeared/changed, re-check authentication
                    checkAuthenticationStatus();
                } else {
                    // Token was removed (e.g., logout in another tab/expired), force logout local state
                    if (state.isAuthenticated) { // Only dispatch if we were previously authenticated
                        dispatch({ type: 'LOGOUT' });
                        toast.info('You have been logged out from another tab.');
                        // Optionally redirect to login if current route is protected
                        if (window.location.pathname.startsWith('/dashboard')) {
                            navigate('/login', { replace: true });
                        }
                    }
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [checkAuthenticationStatus, navigate, state.isAuthenticated]);

    // --- Authentication Actions (exposed via context) ---

    const login = useCallback(async (credentials) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null }); // Clear previous errors
        try {
            const response = await authService.login(credentials);
            dispatch({ type: 'SET_USER', payload: response.user });
            storageService.setLastActivity(Date.now().toString()); // Set initial activity
            toast.success(`Welcome back, ${response.user?.firstName || 'User'}!`);
            navigate('/dashboard', { replace: true }); // Navigate to dashboard after successful login
            document.title = `MedSpaSync Pro - Dashboard`;
            return response;
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.message || 'Login failed.';
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            toast.error(errorMessage);
            throw error; // Re-throw to allow LoginPage to handle if needed (e.g., reset form)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [navigate]);

    const register = useCallback(async (userData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        try {
            const response = await authService.register(userData);
            dispatch({ type: 'SET_LOADING', payload: false }); // Registration doesn't log in automatically
            toast.success('Registration successful! Please log in.');
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.message || 'Registration failed.';
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            toast.error(errorMessage);
            throw error;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const logout = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        try {
            await authService.logout();
            storageService.clearAll(); // Ensure storage is clear
            dispatch({ type: 'LOGOUT' });
            toast.success('You have been signed out.');
            navigate('/', { replace: true }); // Navigate to home after logout
            document.title = `MedSpaSync Pro - Home`;
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if logout API call fails, clear client-side state for security/consistency
            storageService.clearAll();
            dispatch({ type: 'LOGOUT' });
            toast.error('Logout failed, but you have been signed out locally.');
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [navigate]);

    const clearError = useCallback(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
    }, []);

    // Provide these values and functions to any component that consumes the AuthContext
    const value = {
        ...state,
        login,
        register,
        logout,
        clearError
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to consume the AuthContext easily
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};