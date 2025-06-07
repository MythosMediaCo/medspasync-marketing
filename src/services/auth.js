// medspasync-pro/src/services/auth.js
import apiService from './api'; // Your API client
import storageService from './storage'; // Your local storage service
import { API_ENDPOINTS } from '../utils/constants'; // API endpoint constants

class AuthService {
  // Handles user login
  async login(credentials) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

      // Store tokens and user data upon successful login
      if (response.token) {
        storageService.setAuthToken(response.token);
        if (response.refreshToken) {
          storageService.setRefreshToken(response.refreshToken);
        }
        if (response.user) {
          storageService.setUserData(response.user);
        }
      }
      return response;
    } catch (error) {
      // Re-throw specific error message for handling in UI (e.g., incorrect credentials)
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Handles user registration
  async register(userData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response;
    } catch (error) {
      // Re-throw specific error message for handling in UI
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Handles user logout
  async logout() {
    try {
      const refreshToken = storageService.getRefreshToken();
      if (refreshToken) {
        // Send refresh token to backend to invalidate it
        await apiService.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Backend logout error:', error);
      // Even if backend logout fails, clear client-side storage for security
    } finally {
      storageService.clearAll(); // Always clear client-side data on logout attempt
    }
  }

  // Attempts to refresh the access token using the refresh token
  async refreshToken() {
    try {
      const refreshToken = storageService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available. User must re-authenticate.');
      }

      const response = await apiService.post(API_ENDPOINTS.AUTH.REFRESH, {
        refreshToken
      });

      if (response.token) {
        storageService.setAuthToken(response.token); // Store the new access token
      }
      return response;
    } catch (error) {
      // If refresh fails, clear all auth data to force re-login
      storageService.clearAll();
      throw error;
    }
  }

  // Fetches the authenticated user's profile from the backend
  async getProfile() {
    try {
      const response = await apiService.get(API_ENDPOINTS.AUTH.PROFILE);
      if (response.user) {
        storageService.setUserData(response.user); // Update cached user data
      }
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  // Checks if a user is currently authenticated based on token presence
  isAuthenticated() {
    return storageService.isAuthenticated();
  }

  // Gets the currently stored user data
  getCurrentUser() {
    return storageService.getUserData();
  }
}

export default new AuthService();