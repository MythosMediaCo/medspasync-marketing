// src/hooks/useClients.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsAPI } from '../services/api.js'; // Explicit .js extension
import toast from 'react-hot-toast'; // For displaying notifications

// Query keys for better cache management
export const clientKeys = {
  all: ['clients'],
  lists: () => [...clientKeys.all, 'list'],
  list: (filters) => [...clientKeys.lists(), { filters }],
  details: () => [...clientKeys.all, 'detail'],
  detail: (id) => [...clientKeys.details(), id],
  history: (id) => [...clientKeys.all, 'history', id],
};

// Get all clients with filtering and pagination
export const useClients = (params = {}) => {
  return useQuery({
    queryKey: clientKeys.list(params),
    queryFn: () => clientsAPI.getAll(params), // clientsAPI returns data directly
    keepPreviousData: true, // Keep previous data while fetching new data
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      toast.error('Failed to load clients');
      console.error('useClients error:', error);
    },
  });
};

// Get single client by ID
export const useClient = (id, options = {}) => {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientsAPI.getById(id), // clientsAPI returns data directly
    enabled: !!id, // Only run query if ID exists
    staleTime: 5 * 60 * 1000,
    ...options,
    onError: (error) => {
      toast.error('Failed to load client details');
      console.error('useClient error:', error);
    },
  });
};

// Get client history by ID
export const useClientHistory = (id) => {
  return useQuery({
    queryKey: clientKeys.history(id),
    queryFn: () => clientsAPI.getHistory(id), // clientsAPI returns data directly
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Create client mutation
export const useCreateClient = () => {
  const queryClient = useQueryClient(); // Access the query client

  return useMutation({
    mutationFn: clientsAPI.create, // Use the create function from clientsAPI
    onSuccess: () => {
      queryClient.invalidateQueries(clientKeys.lists()); // Invalidate all client lists
      toast.success('Client created successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create client';
      toast.error(message);
      console.error('useCreateClient error:', error);
    },
  });
};

// Update client mutation
export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => clientsAPI.update(id, data), // Update function
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(clientKeys.lists()); // Invalidate lists
      queryClient.invalidateQueries(clientKeys.detail(variables.id)); // Invalidate specific detail
      toast.success('Client updated successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update client';
      toast.error(message);
      console.error('useUpdateClient error:', error);
    },
  });
};

// Delete client mutation
export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientsAPI.delete, // Delete function
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(clientKeys.lists()); // Invalidate lists
      queryClient.removeQueries(clientKeys.detail(id)); // Remove specific detail from cache
      toast.success('Client deleted successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to delete client';
      toast.error(message);
      console.error('useDeleteClient error:', error);
    },
  });
};

// Update client status mutation
export const useUpdateClientStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => clientsAPI.updateStatus(id, status), // Update status function
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(clientKeys.lists());
      queryClient.invalidateQueries(clientKeys.detail(variables.id));
      toast.success('Client status updated');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
      console.error('useUpdateClientStatus error:', error);
    },
  });
};