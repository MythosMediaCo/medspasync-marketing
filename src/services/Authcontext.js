import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './auth';
import { storageService } from './storage'; # IMPORTANT: This is the named import
import toast from 'react-hot-toast';

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
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
                isLoading: false
            };

        case 'LOGOUT':
            return {
                ...initialState,
                isLoading: false
            };

        default:
                return state;
        }
    };

    export const AuthProvider = ({ children }) => {
        const [state, dispatch] = useReducer(authReducer, initialState);
        const navigate = useNavigate();

        const checkAuthenticationStatus = useCallback(async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const token = storageService.getAuthToken();
                const userData = storageService.getUserData();
                const lastActivity = storageService.getLastActivity();

                if (token && lastActivity) {
                    const hoursSinceActivity = (Date.now() - parseInt(lastActivity)) / (1000 * 60 * 60);
                    if (hoursSinceActivity > 24) {
                        console.warn('Session expired due to inactivity.');
                        storageService.clearAll();
                        dispatch({ type: 'SET_ERROR', payload: 'Your session has expired due to inactivity. Please log in again.' });
                        dispatch({ type: 'SET_USER', payload: null });
                        return;
                    }
                }

                if (authService.isAuthenticated()) {
                    if (userData) {
                        dispatch({ type: 'SET_USER', payload: userData });
                    } else {
                        const profileResponse = await authService.getProfile();
                        dispatch({ type: 'SET_USER', payload: profileResponse.user });
                    }
                    storageService.setLastActivity(Date.now().toString());
                } else {
                    storageService.clearAll();
                    dispatch({ type: 'SET_USER', payload: null });
                }
            } catch (err) {
                console.error('Auth initialization error or session invalid:', err);
                storageService.clearAll();
                dispatch({ type: 'SET_ERROR', payload: err.message || 'Authentication session invalid. Please log in.' });
                dispatch({ type: 'SET_USER', payload: null });
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        }, []);

        useEffect(() => {
            checkAuthenticationStatus();

            const handleStorageChange = (e) => {
                if (e.key === storageService.STORAGE_KEYS.AUTH_TOKEN) {
                    if (e.newValue) {
                        checkAuthenticationStatus();
                    } else {
                        if (state.isAuthenticated) {
                            dispatch({ type: 'LOGOUT' });
                            toast.info('You have been logged out from another browser tab or window.');
                            if (window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/app')) {
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

        const login = useCallback(async (credentials) => {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });
            try {
                const response = await authService.login(credentials);
                dispatch({ type: 'SET_USER', payload: response.user });
                storageService.setLastActivity(Date.now().toString());
                toast.success(`Welcome back, ${response.user?.firstName || 'User'}!`);
                navigate('/dashboard', { replace: true });
                document.title = `MedSpaSync Pro - Dashboard`;
                return response;
            } catch (error) {
                console.error('Login error:', error);
                const errorMessage = error.message || 'Login failed. Please check your credentials.';
                dispatch({ type: 'SET_ERROR', payload: errorMessage });
                throw error;
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        }, [navigate]);

        const register = useCallback(async (userData) => {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });
            try {
                const response = await authService.register(userData);
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

        const logout = useCallback(async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            dispatch({ type: 'SET_ERROR', payload: null });
            try {
                await authService.logout();
                storageService.clearAll();
                dispatch({ type: 'LOGOUT' });
                toast.success('You have been successfully signed out.');
                navigate('/', { replace: true });
                document.title = `MedSpaSync Pro - Home`;
            } catch (error) {
                console.error('Logout failed:', error);
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

    export const useAuth = () => {
        const context = useContext(AuthContext);
        if (!context) {
            throw new Error('useAuth must be used within an AuthProvider');
        }
        return context;
    };
EOF