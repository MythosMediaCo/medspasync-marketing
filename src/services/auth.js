// src/services/auth.js
import apiService from './api.js';
import { storageService } from './storageService.js';
import { API_ENDPOINTS } from '../utils/constants.js';

class AuthService {
    async login(credentials) {
        try {
            const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
            
            // Store tokens and user data
            if (response.token) {
                storageService.setAuthToken(response.token);
            }
            if (response.refreshToken) {
                storageService.setRefreshToken(response.refreshToken);
            }
            if (response.user) {
                storageService.setUserData(response.user);
            }
            
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error(error.response?.data?.message || error.message || 'Login failed');
        }
    }

    async register(userData) {
        try {
            const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
            
            // Optionally auto-login after registration
            if (response.token) {
                storageService.setAuthToken(response.token);
                if (response.user) {
                    storageService.setUserData(response.user);
                }
            }
            
            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error(error.response?.data?.message || error.message || 'Registration failed');
        }
    }

    async logout() {
        try {
            // Call logout endpoint if available
            await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout API call failed:', error);
            // Continue with local logout even if API call fails
        } finally {
            // Always clear local storage
            storageService.clearAll();
        }
    }

    async getProfile() {
        try {
            const response = await apiService.get(API_ENDPOINTS.AUTH.PROFILE);
            
            // Update stored user data
            if (response.user) {
                storageService.setUserData(response.user);
            }
            
            return response;
        } catch (error) {
            console.error('Get profile failed:', error);
            throw new Error(error.response?.data?.message || error.message || 'Failed to get user profile');
        }
    }

    async refreshToken() {
        try {
            const refreshToken = storageService.getRefreshToken();
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await apiService.post(API_ENDPOINTS.AUTH.REFRESH, {
                refreshToken
            });

            if (response.token) {
                storageService.setAuthToken(response.token);
            }
            if (response.refreshToken) {
                storageService.setRefreshToken(response.refreshToken);
            }

            return response;
        } catch (error) {
            console.error('Token refresh failed:', error);
            if (error.response?.status === 401) {
                storageService.clearAll();
            }
            throw new Error(error.response?.data?.message || error.message || 'Token refresh failed');
        }
    }

    async demoLogin() {
        try {
            const response = await apiService.post('/api/auth/demo');
            
            // Store tokens and user data
            if (response.token) {
                storageService.setAuthToken(response.token);
            }
            if (response.user) {
                storageService.setUserData(response.user);
            }
            
            return response;
        } catch (error) {
            console.error('Demo login failed:', error);
            throw new Error(error.response?.data?.message || error.message || 'Demo login failed');
        }
    }

    isAuthenticated() {
        return storageService.isAuthenticated();
    }

    getCurrentUser() {
        return storageService.getUserData();
    }

    getToken() {
        return storageService.getAuthToken();
    }
}

export const authService = new AuthService();