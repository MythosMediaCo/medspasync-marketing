// src/services/auth.js
import apiService from './api';
import storageService from './storage';
import { API_ENDPOINTS } from '../utils/constants';

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
      console.error('Logout error:', error);
    } finally {
      storageService.clearAll();
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
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  isAuthenticated() {
    return storageService.isAuthenticated();
  }

  getCurrentUser() {
    return storageService.getUserData();
  }
}

export default new AuthService();