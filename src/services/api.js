// ========================================
// File: src/services/api.js
// Enhanced API Client with Error Handling
// ========================================

import axios from 'axios';
// Use the correct path to the storage service utilities
import storageService from './storageService.js';
import toast from 'react-hot-toast'; // For displaying notifications

// Auto-detect backend URL based on environment
const getBackendUrl = () => {
  // Check if we're in GitHub Codespaces (for frontend dev server)
  if (window.location.hostname.includes('app.github.dev') && window.location.port === '5173') {
    // Replace frontend's port (5173) with backend's port (5000)
    return window.location.origin.replace('-5173', '-5000');
  }
  // Production environment (Netlify uses process.env.VITE_API_BASE_URL via Vite)
  if (import.meta.env.VITE_API_BASE_URL) { // Correct Vite env variable access
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Local development fallback
  return 'http://localhost:5000';
};

const API_BASE_URL = getBackendUrl();

// Create an Axios instance for API communication
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`, // All API routes start with /api
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Request timeout in milliseconds
  withCredentials: true, // Crucial for CORS if backend uses cookies/sessions
});

// Request interceptor - Add Authorization token to headers
api.interceptors.request.use(
  (config) => {
    const token = storageService.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development environment for debugging
    if (import.meta.env.MODE === 'development') { // Vite's way to check dev mode
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally and trigger token refresh
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.MODE === 'development') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error) => {
    console.error('API Error:', error);
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors and attempt token refresh
    // Ensure this only happens once per request to avoid infinite loops
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      try {
        const refreshToken = storageService.getRefreshToken();
        if (refreshToken) {
          // Attempt to refresh the token using a direct axios call (bypassing this interceptor)
          const refreshResponse = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken
          });

          const { token } = refreshResponse.data;
          storageService.setAuthToken(token); // Store the new access token

          // Retry the original failed request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest); // Use the 'api' instance to retry
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // If refresh fails, clear all authentication data and redirect to login
        storageService.clearAll();
        toast.error('Your session has expired. Please log in again.');
        window.location.href = '/login'; // Force full reload
        return Promise.reject(refreshError);
      }
    }

    // Handle other network or API errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
    } else {
      const message = error.response.data?.message || error.message || 'An unexpected error occurred';
      // Prevent showing duplicate toasts if a specific component is handling an error already
      if (!originalRequest.hideToast) { // Custom flag on request config
        toast.error(message);
      }
    }

    return Promise.reject(error); // Re-throw for component-level handling
  }
);

// ========================================
// API Functions (Exported as named exports)
// ========================================

// Health Check API
export const healthAPI = {
  check: () => api.get('/health'),
};

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }), // Added refresh token param
  me: () => api.get('/auth/me'),
};

// Clients API
export const clientsAPI = {
  getAll: (params = {}) => api.get('/clients', { params }),
  getById: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post('/clients', data),
  update: (id, data) => api.put(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
  getHistory: (id) => api.get(`/clients/${id}/history`), // Assuming this endpoint exists
  updateStatus: (id, status) => api.patch(`/clients/${id}/status`, { status }), // Assuming this endpoint exists
};

// Appointments API
export const appointmentsAPI = {
  getAll: (params = {}) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  getAvailability: (params) => api.get('/appointments/availability', { params }), // Assuming this endpoint exists
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }), // Assuming this endpoint exists
  getByDateRange: (startDate, endDate) => api.get('/appointments/range', { // Assuming this endpoint exists
    params: { startDate, endDate }
  }),
};

// Services API
export const servicesAPI = {
  getAll: (params = {}) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
  updateStatus: (id, active) => api.patch(`/services/${id}/status`, { active }), // Assuming this endpoint exists
};

// Staff API (Placeholder)
export const staffAPI = {
    getAll: (params = {}) => api.get('/staff', {params}),
    getById: (id) => api.get(`/staff/${id}`),
    create: (data) => api.post('/staff', data),
    update: (id, data) => api.put(`/staff/${id}`, data),
    delete: (id) => api.delete(`/staff/${id}`),
    getSchedule: (id, date) => api.get(`/staff/${id}/schedule`, { params: { date } }),
};

// Analytics API (Placeholder)
export const analyticsAPI = {
    getDashboard: (params = {}) => api.get('/analytics/dashboard', {params}),
    getRevenue: (params = {}) => api.get('/analytics/revenue', {params}),
    getClientStats: (params = {}) => api.get('/analytics/clients', {params}),
    getServiceStats: (params = {}) => api.get('/analytics/services', {params}),
};

// Export the Axios instance itself as a default export if needed for specific use cases (e.g., direct download)
// If you explicitly need the raw axios instance, you might use `export default api;`
// However, it's generally cleaner to use the named API objects (clientsAPI, authAPI, etc.).
// For now, we'll export the axios instance as the default for hooks like useAPI
// that expect a default export.
export default api;
