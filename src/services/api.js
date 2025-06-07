// ========================================
// File: src/services/api.js
// Enhanced API Client with Error Handling
// ========================================

import axios from 'axios';

// Auto-detect backend URL
const getBackendUrl = () => {
  // Check if we're in GitHub Codespaces
  if (window.location.hostname.includes('app.github.dev')) {
    return window.location.origin.replace('-5173', '-5000');
  }
  // Production environment
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Local development
  return 'http://localhost:5000';
};

const API_BASE_URL = getBackendUrl();

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
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

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle different error types
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.error('Access forbidden');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error');
    }
    
    return Promise.reject(error);
  }
);

// ========================================
// API Functions
// ========================================

// Health Check
export const healthAPI = {
  check: () => api.get('/health'),
};

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  me: () => api.get('/auth/me'),
};

// Clients API
export const clientsAPI = {
  getAll: (params = {}) => api.get('/clients', { params }),
  getById: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post('/clients', data),
  update: (id, data) => api.put(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
  getHistory: (id) => api.get(`/clients/${id}/history`),
  updateStatus: (id, status) => api.patch(`/clients/${id}/status`, { status }),
};

// Appointments API
export const appointmentsAPI = {
  getAll: (params = {}) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  getAvailability: (params) => api.get('/appointments/availability', { params }),
  updateStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  getByDateRange: (startDate, endDate) => api.get('/appointments/range', { 
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
  updateStatus: (id, active) => api.patch(`/services/${id}/status`, { active }),
};

// Staff API
export const staffAPI = {
  getAll: (params = {}) => api.get('/staff', { params }),
  getById: (id) => api.get(`/staff/${id}`),
  create: (data) => api.post('/staff', data),
  update: (id, data) => api.put(`/staff/${id}`, data),
  delete: (id) => api.delete(`/staff/${id}`),
  getSchedule: (id, date) => api.get(`/staff/${id}/schedule`, { params: { date } }),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params = {}) => api.get('/analytics/dashboard', { params }),
  getRevenue: (params = {}) => api.get('/analytics/revenue', { params }),
  getClientStats: (params = {}) => api.get('/analytics/clients', { params }),
  getServiceStats: (params = {}) => api.get('/analytics/services', { params }),
};

export default api;