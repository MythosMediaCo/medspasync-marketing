import apiService from './api.js';
import { storageService } from './storage.js';
import toast from 'react-hot-toast';

class AuthService {
  async login(credentials) {
    try {
      const response = await apiService.post(AuthService.API_ENDPOINTS.AUTH.LOGIN, credentials); // Note: Should use API_ENDPOINTS from constants, not AuthService.API_ENDPOINTS
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
      const response = await apiService.post(AuthService.API_ENDPOINTS.AUTH.REGISTER, userData); // Note: Should use API_ENDPOINTS from constants
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async logout() {
    try {
      const refreshToken = storageService.getRefreshToken();
      if (refreshToken) {
        await apiService.post(AuthService.API_ENDPOINTS.AUTH.LOGOUT, { refreshToken }); // Note: Should use API_ENDPOINTS from constants
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

      const response = await apiService.post(AuthService.API_ENDPOINTS.AUTH.REFRESH, { // Note: Should use API_ENDPOINTS from constants
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
      const response = await apiService.get(AuthService.API_ENDPOINTS.AUTH.PROFILE); // Note: Should use API_ENDPOINTS from constants
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

// This line needs to be clearly after the class definition
export const authService = new AuthService();