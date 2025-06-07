import apiService from './api.js'; // Explicit .js extension
import { storageService } from './storage.js'; // Explicit .js extension, named import
import toast from 'react-hot-toast'; // For displaying notifications
import { API_ENDPOINTS } from '../utils/constants.js'; // Explicit .js extension, named import

class AuthService {
  /**
   * Handles user login by sending credentials to the API.
   * Stores tokens and user data upon successful authentication.
   * @param {object} credentials - User's email and password.
   * @returns {Promise<object>} Response from the API.
   * @throws {Error} If login fails.
   */
  async login(credentials) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

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
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  /**
   * Handles user registration by sending user data to the API.
   * @param {object} userData - User registration details.
   * @returns {Promise<object>} Response from the API.
   * @throws {Error} If registration fails.
   */
  async register(userData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  /**
   * Handles user logout, optionally invalidating refresh token on the backend.
   * Clears all client-side authentication data regardless of backend response.
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      const refreshToken = storageService.getRefreshToken();
      if (refreshToken) {
        // Send refresh token to backend to invalidate it, but don't await/fail on error
        await apiService.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Backend logout error:', error);
      // Continue to clear client-side data even if backend call fails
    } finally {
      storageService.clearAll(); // Always clear client-side data on logout attempt
    }
  }

  /**
   * Attempts to refresh the access token using the refresh token.
   * @returns {Promise<object>} New access token.
   * @throws {Error} If refresh fails or no refresh token is available.
   */
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

  /**
   * Fetches the authenticated user's profile from the backend.
   * Updates cached user data if successful.
   * @returns {Promise<object>} User profile data.
   * @throws {Error} If fetching profile fails.
   */
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

  /**
   * Checks if a user is currently authenticated based on the presence of an auth token.
   * @returns {boolean} True if authenticated, false otherwise.
   */
  isAuthenticated() {
    return storageService.isAuthenticated();
  }

  /**
   * Gets the currently stored user data from local storage.
   * @returns {object|null} The user data object or null if not found.
   */
  getCurrentUser() {
    return storageService.getUserData();
  }
}

// Export a singleton instance of AuthService
export const authService = new AuthService();