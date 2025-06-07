// src/hooks/useServices.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesAPI } from '../services/api.js'; // Explicit .js extension
import toast from 'react-hot-toast';

export const serviceKeys = {
  all: ['services'],
  lists: () => [...serviceKeys.all, 'list'],
  list: (filters) => [...serviceKeys.lists(), { filters }],
  details: () => [...serviceKeys.all, 'detail'],
  detail: (id) => [...serviceKeys.details(), id],
};

export const useServices = (params = {}) => {
  return useQuery({
    queryKey: serviceKeys.list(params),
    queryFn: () => servicesAPI.getAll(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 15 * 60 * 1000, // 15 minutes
    onError: (error) => {
      toast.error('Failed to load services');
      console.error('useServices error:', error);
    },
  });
};

export const useService = (id) => {
  return useQuery({
    queryKey: serviceKeys.detail(id),
    queryFn: () => servicesAPI.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(serviceKeys.lists());
      toast.success('Service created successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to create service';
      toast.error(message);
      console.error('useCreateService error:', error);
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => servicesAPI.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(serviceKeys.lists());
      queryClient.invalidateQueries(serviceKeys.detail(variables.id));
      toast.success('Service updated successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update service';
      toast.error(message);
      console.error('useUpdateService error:', error);
    },
  });
};

export const useDeleteService = () => { // Added delete hook
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: servicesAPI.delete,
        onSuccess: (data, id) => {
            queryClient.invalidateQueries(serviceKeys.lists());
            queryClient.removeQueries(serviceKeys.detail(id));
            toast.success('Service deleted successfully');
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to delete service';
            toast.error(message);
            console.error('useDeleteService error:', error);
        },
    });
};