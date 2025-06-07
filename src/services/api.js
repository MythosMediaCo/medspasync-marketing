// medspasync-pro/src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants'; // Your API base URL
import storageService from './storage'; // Service for local storage interactions
import toast from 'react-hot-toast'; // For displaying global notifications

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000, // Request timeout in milliseconds
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Include cookies (if your backend uses them for sessions/CSRF)
    });

    this.setupInterceptors(); // Configure Axios request and response interceptors
  }

  setupInterceptors() {
    // Request Interceptor: Add Authorization token to headers
    this.client.interceptors.request.use(
      (config) => {
        const token = storageService.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error); // Pass request errors down the chain
      }
    );

    // Response Interceptor: Handle global errors, especially 401 Unauthorized for token refresh
    this.client.interceptors.response.use(
      (response) => response, // On successful response, just return it
      async (error) => {
        const originalRequest = error.config;

        // Check for 401 Unauthorized errors and if it's not a retry request
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Mark request as retried to prevent infinite loops

          try {
            const refreshToken = storageService.getRefreshToken();
            if (refreshToken) {
              // Attempt to refresh the token using a direct axios call to avoid recursion in interceptors
              const refreshResponse = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
                refreshToken
              });

              const { token } = refreshResponse.data;
              storageService.setAuthToken(token); // Store the new access token

              // Retry the original failed request with the new token
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest); // Re-run the original request
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // If refresh fails, clear all authentication data and redirect to login
            storageService.clearAll();
            toast.error('Your session has expired. Please log in again.');
            // Using window.location.href to force a full page reload and clear app state
            window.location.href = '/login'; 
            return Promise.reject(refreshError);
          }
        }

        // Handle other network or API errors
        if (!error.response) {
          // Network error (e.g., no internet connection, server down)
          toast.error('Network error. Please check your connection.');
        } else {
          // API error with a response (e.g., 400 Bad Request, 403 Forbidden, 500 Internal Server Error)
          const message = error.response.data?.message || error.message || 'An unexpected error occurred';
          // Prevent showing duplicate toasts if a specific component is handling an error already
          if (!originalRequest.hideToast) { // Custom flag to suppress global toast
            toast.error(message);
          }
        }

        return Promise.reject(error); // Re-throw the error for component-level handling
      }
    );
  }

  // --- Generic HTTP Methods ---

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