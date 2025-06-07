// medspasync-frontend-main/src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import storageService from './storage';
import toast from 'react-hot-toast'; // Ensure react-hot-toast is installed

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000, // Increased timeout slightly
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // If your backend uses cookies for sessions/CSRF
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = storageService.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling and token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized) and attempt token refresh
        // Ensure this only happens once per request to avoid infinite loops
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = storageService.getRefreshToken();
            if (refreshToken) {
              // IMPORTANT: This call should NOT use `this.client` directly
              // to avoid triggering the interceptor again for the refresh call.
              // Create a separate instance or directly use axios for this specific call.
              // For simplicity in this example, I'll use axios directly for refresh call.
              const refreshResponse = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
                refreshToken
              });

              const { token } = refreshResponse.data;
              storageService.setAuthToken(token);

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest); // Re-run the original request with new token
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Refresh failed, clear all auth data and redirect to login
            storageService.clearAll();
            toast.error('Your session has expired. Please log in again.');
            window.location.href = '/login'; // Full reload to clear app state
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors (not 401 or refresh failed)
        if (!error.response) {
          // Network error (no response from server)
          toast.error('Network error. Please check your connection.');
        } else {
          // API error with response (e.g., 400, 403, 404, 500)
          const message = error.response.data?.message || error.message || 'An unexpected error occurred';
          // Avoid showing duplicate toasts if a specific component is handling an error already
          if (!originalRequest.hideToast) { // Add a flag to config to hide default toast
            toast.error(message);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Generic HTTP methods
  async get(url, config = {}) {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post(url, data = {}, config = {}) {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put(url, data = {}, config = {}) {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async patch(url, data = {}, config = {}) {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete(url, config = {}) {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

export default new ApiService();