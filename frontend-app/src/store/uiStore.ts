import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
  duration?: number;
  dismissible?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closable?: boolean;
}

export interface UIState {
  // Theme management
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  
  // Toast notifications
  toasts: ToastMessage[];
  
  // Modal management
  modal: ModalState;
  
  // Loading states
  loadingStates: Record<string, boolean>;
  
  // Form states
  formErrors: Record<string, string[]>;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Toast actions
  addToast: (toast: Omit<ToastMessage, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  
  // Modal actions
  openModal: (modal: Omit<ModalState, 'isOpen'>) => void;
  closeModal: () => void;
  
  // Loading actions
  setLoading: (key: string, loading: boolean) => void;
  isLoading: (key: string) => boolean;
  
  // Form actions
  setFormError: (field: string, errors: string[]) => void;
  clearFormError: (field: string) => void;
  clearAllFormErrors: () => void;
  getFormErrors: (field: string) => string[];
}

/**
 * UI Store for MedSpaSync Pro
 * Manages global UI state including theme, toasts, modals, and loading states
 * Built with Zustand for performance and TypeScript for type safety
 * Includes persistence for theme and sidebar preferences
 */
export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'system',
      sidebarOpen: true,
      toasts: [],
      modal: { isOpen: false },
      loadingStates: {},
      formErrors: {},

      // Theme actions
      setTheme: (theme) => set({ theme }),
      
      // Sidebar actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      // Toast actions
      addToast: (toast) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newToast: ToastMessage = {
          id,
          duration: 5000,
          dismissible: true,
          ...toast,
        };
        
        set((state) => ({
          toasts: [...state.toasts, newToast],
        }));

        // Auto-remove toast after duration (except loading toasts)
        if (newToast.type !== 'loading' && newToast.duration && newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }

        return id;
      },

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),

      clearToasts: () => set({ toasts: [] }),

      // Modal actions
      openModal: (modal) =>
        set({
          modal: {
            isOpen: true,
            size: 'md',
            closable: true,
            ...modal,
          },
        }),

      closeModal: () =>
        set({
          modal: { isOpen: false },
        }),

      // Loading actions
      setLoading: (key, loading) =>
        set((state) => ({
          loadingStates: {
            ...state.loadingStates,
            [key]: loading,
          },
        })),

      isLoading: (key) => get().loadingStates[key] || false,

      // Form actions
      setFormError: (field, errors) =>
        set((state) => ({
          formErrors: {
            ...state.formErrors,
            [field]: errors,
          },
        })),

      clearFormError: (field) =>
        set((state) => {
          const { [field]: _, ...rest } = state.formErrors;
          return { formErrors: rest };
        }),

      clearAllFormErrors: () => set({ formErrors: {} }),

      getFormErrors: (field) => get().formErrors[field] || [],
    }),
    {
      name: 'medspasync-ui-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);