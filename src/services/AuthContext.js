// medspasync-pro/src/services/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirects
import authService from './auth'; // Your authentication service
import storageService from './storage'; // Your local storage service
import toast from 'react-hot-toast'; // For displaying notifications

const AuthContext = createContext();

// Initial state for the authentication reducer
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Indicates if the initial auth check is in progress
    error: null      // Stores any authentication-related errors
};

// Reducer function to manage authentication state transitions
const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };

        case 'SET_USER':
            // Sets user data and updates isAuthenticated status
            return {
                ...state,
                user: action.payload,
                isAuthenticated: !!action.payload, // True if user is not null, false otherwise
                isLoading: false, // Loading is complete once user is set
                error: null       // Clear any previous errors
            };

        case 'SET_ERROR':
            // Sets an error message and stops loading
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };

        case 'LOGOUT':
            // Resets state to initial (logged out) status
            return {
                ...initialState,
                isLoading: false // No longer loading after logout
            };

        default:
            return state; // Return current state for unknown actions
    }
};

// AuthProvider component wraps the application to provide auth context
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const navigate = useNavigate(); // Get React Router's navigate function for redirects

    // --- Authentication Logic Functions ---

    // Function to check current authentication status from local storage and backend
    const checkAuthenticationStatus = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true }); // Start loading
        try {
            const token = storageService.getAuthToken();
            const userData = storageService.getUserData();
            const lastActivity = storageService.getLastActivity();

            // Client-side session expiration check (e.g., 24 hours of inactivity)
            if (token && lastActivity) {
                const hoursSinceActivity = (Date.now() - parseInt(lastActivity)) / (1000 * 60 * 60);
                if (hoursSinceActivity > 24) {
                    console.warn('Session expired due to inactivity.');
                    // If session expired, clear data and force re-login
                    storageService.clearAll();
                    dispatch({ type: 'SET_ERROR', payload: 'Your session has expired due to inactivity. Please log in again.' });
                    dispatch({ type: 'SET_USER', payload: null });
                    return; // Stop further checks
                }
            }

            if (authService.isAuthenticated()) {
                // If a token exists, try to get user data (either from cache or API profile)
                if (userData) {
                    dispatch({ type: 'SET_USER', payload: userData });
                } else {
                    // Token exists but user data is missing/corrupted, try to fetch profile from backend
                    const profileResponse = await authService.getProfile();
                    dispatch({ type: 'SET_USER', payload: profileResponse.user });
                }
                // Update last activity to extend the session
                storageService.setLastActivity(Date.now().toString());
            } else {
                // No token, ensure user is logged out
                storageService.clearAll();
                dispatch({ type: 'SET_USER', payload: null });
            }
        } catch (err) {
            console.error('Auth initialization error or session invalid:', err);
            // On any error during auth check (e.g., token invalid, network issue), force logout
            storageService.clearAll();
            dispatch({ type: 'SET_ERROR', payload: err.message || 'Authentication session invalid. Please log in.' });
            dispatch({ type: 'SET_USER', payload: null }); // Ensure user is null
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false }); // Stop loading regardless of outcome
        }
    }, []);

    // --- Effects for Initialization and Global Listeners ---

    useEffect(() => {
        // Run initial authentication check when AuthProvider mounts
        checkAuthenticationStatus();

        // Multi-tab synchronization: Listen for changes in localStorage from other tabs/windows
        const handleStorageChange = (e) => {
            // Only react to changes in our main auth token key
            if (e.key === storageService.STORAGE_KEYS.AUTH_TOKEN) {
                if (e.newValue) {
                    // Token appeared/changed (e.g., login in another tab), re-check authentication
                    checkAuthenticationStatus();
                } else {
                    // Token was removed (e.g., logout in another tab or forced expiry), force local logout
                    if (state.isAuthenticated) { // Only dispatch if we were previously authenticated
                        dispatch({ type: 'LOGOUT' });
                        toast.info('You have been logged out from another browser tab or window.');
                        // If the user was on a protected route, redirect to login
                        if (window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/app')) {
                            navigate('/login', { replace: true });
                        }
                    }
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            // Cleanup: remove event listener when component unmounts
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [checkAuthenticationStatus, navigate, state.isAuthenticated]); // Added state.isAuthenticated to dependencies for `handleStorageChange`

    // --- Authentication Actions (exposed via context) ---

    // Handles user login
    const login = useCallback(async (credentials) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null }); // Clear previous errors
        try {
            const response = await authService.login(credentials);
            dispatch({ type: 'SET_USER', payload: response.user });
            storageService.setLastActivity(Date.now().toString()); // Set initial activity timestamp
            toast.success(`Welcome back, ${response.user?.firstName || 'User'}!`);
            navigate('/dashboard', { replace: true }); // Redirect to dashboard after successful login
            document.title = `MedSpaSync Pro - Dashboard`; // Update browser tab title
            return response;
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.message || 'Login failed. Please check your credentials.';
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            // Error is already toasted by api.js interceptor or handled here, so no re-throw needed for component-level toast
            throw error; // Re-throw to allow Login/Register page to handle local form state (e.g., disable button)
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [navigate]);

    // Handles user registration
    const register = useCallback(async (userData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        try {
            const response = await authService.register(userData);
            // Registration typically doesn't auto-login; user is redirected to login page
            dispatch({ type: 'SET_LOADING', payload: false });
            toast.success('Registration successful! Please log in with your new account.');
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.message || 'Registration failed. Please try again.';
            dispatch({ type: 'SET_ERROR', payload: errorMessage });
            throw error;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    // Handles user logout
    const logout = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        dispatch({ type: 'SET_ERROR', payload: null });
        try {
            await authService.logout(); // Call backend logout
            storageService.clearAll(); // Clear all client-side auth data
            dispatch({ type: 'LOGOUT' }); // Update global state
            toast.success('You have been successfully signed out.');
            navigate('/', { replace: true }); // Redirect to home page
            document.title = `MedSpaSync Pro - Home`;
        } catch (error) {
            console.error('Logout failed:', error);
            // Even if backend logout fails, force client-side logout for security/consistency
            storageService.clearAll();
            dispatch({ type: 'LOGOUT' });
            toast.error('Logout failed, but you have been signed out locally.');
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [navigate]);

    // Clears any current authentication error message
    const clearError = useCallback(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
    }, []);

    // The value provided by the AuthContext to consuming components
    const value = {
        ...state, // user, isAuthenticated, isLoading, error
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