// src/components/QueryProvider.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast'; // Ensure this is the global Toaster

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except 408 (timeout)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return error?.response?.status === 408 ? failureCount < 2 : false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false, // Don't refetch automatically on window focus
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Data remains in cache for 10 minutes
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry mutations on client errors (4xx)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 2 times for server errors (5xx)
        return failureCount < 2;
      },
      // You can add a global onError/onSuccess for mutations here if needed
      // onError: (error) => toast.error(`Mutation failed: ${error.message}`),
    },
  },
});

// You can set global mutation defaults if needed, though often handled by useAPIMutation hooks
// queryClient.setMutationDefaults(['posts'], {
//   mutationFn: async (variables) => {
//     // Global mutation logic if needed
//   },
// });

export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* We already have a global Toaster in App.jsx,
          so this one might be redundant or could be configured for specific toasts.
          For now, keeping the App.jsx one as the primary.
          Removed this embedded Toaster to avoid conflicts with global one.*/}
      {/* <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#363636', color: '#fff' },
          success: { duration: 3000, iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error: { duration: 5000, iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      /> */}
      {/* Only show Devtools in development environment */}
      {import.meta.env.MODE === 'development' && ( // Vite's way to check dev mode
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};