// src/utils/constants.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.medspasyncpro.com';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    PROFILE: '/api/auth/profile'
  },
  CLIENTS: {
    LIST: '/api/clients',
    CREATE: '/api/clients',
    UPDATE: '/api/clients',
    DELETE: '/api/clients',
    SEARCH: '/api/clients/search'
  },
  APPOINTMENTS: {
    LIST: '/api/appointments',
    CREATE: '/api/appointments',
    UPDATE: '/api/appointments',
    DELETE: '/api/appointments',
    TODAY: '/api/appointments/today'
  },
  PAYMENTS: {
    LIST: '/api/payments',
    CREATE: '/api/payments',
    PROCESS: '/api/payments/process',
    RECONCILE: '/api/payments/reconcile'
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    RECENT_ACTIVITY: '/api/dashboard/recent'
  }
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'medspasync_auth_token',
  REFRESH_TOKEN: 'medspasync_refresh_token',
  USER_DATA: 'medspasync_user_data',
  THEME: 'medspasync_theme',
  SETTINGS: 'medspasync_settings'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  RECEPTIONIST: 'receptionist'
};

export const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const CLIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  VIP: 'vip',
  BLOCKED: 'blocked'
};
