import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import type { User } from '../store/authStore';

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

// Mock API functions - replace with actual API calls in production
const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'test@medspasync.com' && credentials.password === 'testpassword123') {
      return {
        user: {
          id: '1',
          email: credentials.email,
          name: 'Test User',
          role: 'admin',
          organizationId: 'org-1',
          preferences: {
            theme: 'light',
            notifications: true,
          },
        },
        token: 'mock-jwt-token-' + Date.now(),
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  refreshToken: async (token: string): Promise<AuthResponse> => {
    // Simulate token refresh
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: {
        id: '1',
        email: 'test@medspasync.com',
        name: 'Test User',
        role: 'admin',
        organizationId: 'org-1',
        preferences: {
          theme: 'light',
          notifications: true,
        },
      },
      token: 'refreshed-jwt-token-' + Date.now(),
    };
  },

  validateToken: async (token: string): Promise<boolean> => {
    // Simulate token validation
    await new Promise(resolve => setTimeout(resolve, 200));
    return token.startsWith('mock-jwt-token') || token.startsWith('refreshed-jwt-token');
  },
};

/**
 * Custom hook that combines Zustand store with React Query for authentication
 * Provides login, logout, and token validation with caching and error handling
 * Part of MedSpaSync Pro's state management framework
 */
export const useAuth = () => {
  const queryClient = useQueryClient();
  const {
    user,
    token,
    isAuthenticated,
    isLoading: storeLoading,
    error,
    setUser,
    setToken,
    setLoading,
    setError,
    clearError,
    logout: storeLogout,
    updateUserPreferences,
  } = useAuthStore();

  // React Query mutation for login
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      setLoading(true);
      clearError();
    },
    onSuccess: (data: AuthResponse) => {
      setUser(data.user);
      setToken(data.token);
      setLoading(false);
      
      // Cache the user data
      queryClient.setQueryData(['user', data.user.id], data.user);
    },
    onError: (error: Error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  // React Query mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // In a real app, you might call an API to invalidate the token
      await new Promise(resolve => setTimeout(resolve, 200));
    },
    onSuccess: () => {
      storeLogout();
      queryClient.clear(); // Clear all cached data on logout
    },
  });

  // React Query for token validation
  const tokenValidationQuery = useQuery({
    queryKey: ['token-validation', token],
    queryFn: () => authApi.validateToken(token!),
    enabled: !!token && isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // React Query for user profile (if needed for refreshing user data)
  const userProfileQuery = useQuery({
    queryKey: ['user', user?.id],
    queryFn: async () => {
      if (!token) throw new Error('No token available');
      // In a real app, fetch fresh user data from API
      return user;
    },
    enabled: !!user?.id && !!token,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Helper functions
  const login = (credentials: LoginCredentials) => {
    return loginMutation.mutateAsync(credentials);
  };

  const logout = () => {
    return logoutMutation.mutateAsync();
  };

  const refreshUserProfile = () => {
    return queryClient.invalidateQueries({ queryKey: ['user', user?.id] });
  };

  // Computed loading state
  const isLoading = storeLoading || loginMutation.isPending || logoutMutation.isPending;

  return {
    // State
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    
    // Query states
    isTokenValid: tokenValidationQuery.data,
    isValidatingToken: tokenValidationQuery.isLoading,
    
    // Actions
    login,
    logout,
    refreshUserProfile,
    updateUserPreferences,
    clearError,
    
    // Mutation states for additional control
    loginMutation,
    logoutMutation,
  };
};