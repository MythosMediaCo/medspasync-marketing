// src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants.js';
import { storageService } from './storageService.js';
import { toast } from 'react-hot-toast';

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
      // Remove withCredentials to avoid CORS issues with GitHub Codespaces
      // withCredentials: true,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = storageService.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
      },
      async (error) => {
        console.error('API Error:', error.response?.status, error.config?.url, error.message);
        
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = storageService.getRefreshToken();
            if (refreshToken) {
              const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                refreshToken
              });

              const { token } = refreshResponse.data;
              storageService.setAuthToken(token);

              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            storageService.clearAll();
            toast.error('Your session has expired. Please log in again.');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        if (!error.response) {
          toast.error('Network error. Please check your connection.');
        } else {
          const message = error.response.data?.message || error.message || 'An unexpected error occurred';
          if (!originalRequest.hideToast) {
            toast.error(message);
          }
        }

        return Promise.reject(error);
      }
    );
  }

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