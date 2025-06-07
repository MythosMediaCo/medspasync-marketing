import apiService from './api.js'; // Explicit .js
import { storageService } from './storage.js'; // NAMED IMPORT - IMPORTANT
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../utils/constants.js'; // Explicit .js

class AuthService {
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

  async register(userData) {
    try {
      const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async logout() {
    try {
      const refreshToken = storageService.getRefreshToken();
      if (refreshToken) {
        await apiService.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Backend logout error:', error);
    } finally {
      storageService.clearAll();
    }
  }

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
        storageService.setAuthToken(response.token);
      }
      return response;
    } catch (error) {
      storageService.clearAll();
      throw error;
    }
  }

  async getProfile() {
    try {
      const response = await apiService.get(API_ENDPOINTS.AUTH.PROFILE);
      if (response.user) {
        storageService.setUserData(response.user);
      }
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }

  isAuthenticated() {
    return storageService.isAuthenticated();
  }

  getCurrentUser() {
    return storageService.getUserData();
  }
}

export const authService = new AuthService(); // NAMED EXPORT
