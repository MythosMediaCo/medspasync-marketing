import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'viewer';
  organizationId?: string;
  preferences?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

export interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
}

/**
 * Zustand store for authentication state management
 * Integrates with localStorage for persistence
 * Part of MedSpaSync Pro's state management framework
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        try {
          // Mock authentication for development/demo
          // In production, this would call an actual API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          if (email === 'test@medspasync.com' && password === 'testpassword123') {
            const mockUser: User = {
              id: '1',
              email,
              name: 'Test User',
              role: 'admin',
              organizationId: 'org-1',
              preferences: {
                theme: 'light',
                notifications: true,
              },
            };
            
            const mockToken = 'mock-jwt-token-' + Date.now();
            
            set({
              user: mockUser,
              token: mockToken,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error('Invalid email or password');
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setToken: (token: string) => {
        set({ token });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      updateUserPreferences: (preferences: Partial<User['preferences']>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              preferences: {
                ...user.preferences,
                ...preferences,
              },
            },
          });
        }
      },
    }),
    {
      name: 'medspasync-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);