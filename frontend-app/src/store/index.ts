// Central export point for all Zustand stores
export { useAuthStore, type User, type AuthState } from './authStore';
export { useUIStore, type UIState, type ToastMessage, type ModalState } from './uiStore';
export { useAnalyticsStore, type AnalyticsState, type MetricData, type ChartDataPoint, type AnalyticsFilters } from './analyticsStore';

// Re-export zustand for convenience
export { create } from 'zustand';