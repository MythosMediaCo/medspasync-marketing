// medspasync-pro/src/utils/constants.js

// Base URL for your API. Uses environment variable REACT_APP_API_URL if set, otherwise defaults to localhost.
// IMPORTANT: Update this for production deployments!
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Centralized API Endpoints for better management and less magic strings
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
        SEARCH: '/api/clients/search' // Example search endpoint
    },
    APPOINTMENTS: {
        LIST: '/api/appointments',
        CREATE: '/api/appointments',
        UPDATE: '/api/appointments',
        DELETE: '/api/appointments',
        TODAY: '/api/appointments/today' // Example endpoint for today's appointments
    },
    PAYMENTS: {
        LIST: '/api/payments',
        CREATE: '/api/payments',
        PROCESS: '/api/payments/process',
        RECONCILE: '/api/payments/reconcile' // Example reconciliation endpoint
    },
    DASHBOARD: {
        STATS: '/api/dashboard/stats',
        RECENT_ACTIVITY: '/api/dashboard/recent'
    }
};

// Keys used for storing data in localStorage. Centralized to prevent typos.
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'medspasync_auth_token',
    REFRESH_TOKEN: 'medspasync_refresh_token',
    USER_DATA: 'medspasync_user_data',
    LAST_ACTIVITY: 'medspasync_last_activity', // For client-side session tracking
    THEME: 'medspasync_theme',
    SETTINGS: 'medspasync_settings'
};

// Defined user roles for role-based access control
export const USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    STAFF: 'staff',
    RECEPTIONIST: 'receptionist'
};

// Defined statuses for appointments
export const APPOINTMENT_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    NO_SHOW: 'no-show'
};

// Defined statuses for payments
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded'
};

// Defined statuses for clients
export const CLIENT_STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    VIP: 'vip',
    BLOCKED: 'blocked'
};