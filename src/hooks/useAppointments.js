// ========================================
// File: src/hooks/useAppointments.js
// React Query hooks for appointments
// ========================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointmentsAPI } from '../services/api';
import { toast } from 'react-hot-toast';

export const appointmentKeys = {
  all: ['appointments'],
  lists: () => [...appointmentKeys.all, 'list'],
  list: (filters) => [...appointmentKeys.lists(), { filters }],
  details: () => [...appointmentKeys.all, 'detail'],
  detail: (id) => [...appointmentKeys.details(), id],
  availability: (params) => [...appointmentKeys.all, 'availability', params],
  dateRange: (startDate, endDate) => [...appointmentKeys.all, 'range', { startDate, endDate }],
};

export const useAppointments = (params = {}) => {
  return useQuery({
    queryKey: appointmentKeys.list(params),
    queryFn: () => appointmentsAPI.getAll(params).then(res => res.data),
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    onError: (error) => {
      toast.error('Failed to load appointments');
      console.error('useAppointments error:', error);
    },
  });
};

export const useAppointment = (id) => {
  return useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => appointmentsAPI.getById(id).then(res => res.data),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useAppointmentsByDateRange = (startDate, endDate) => {
  return useQuery({
    queryKey: appointmentKeys.dateRange(startDate, endDate),
    queryFn: () => appointmentsAPI.getByDateRange(startDate, endDate).then(res => res.data),
    enabled: !!(startDate && endDate),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useAvailability = (params) => {
  return useQuery({
    queryKey: appointmentKeys.availability(params),
    queryFn: () => appointmentsAPI.getAvailability(params).then(res => res.data),
    enabled: !!(params.date && params.serviceId),
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: appointmentsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(appointmentKeys.lists());
      queryClient.invalidateQueries(['clients']); // Update client appointment counts
      toast.success('Appointment booked successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to book appointment';
      toast.error(message);
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => appointmentsAPI.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(appointmentKeys.lists());
      queryClient.invalidateQueries(appointmentKeys.detail(variables.id));
      toast.success('Appointment updated successfully');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update appointment';
      toast.error(message);
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }) => appointmentsAPI.updateStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(appointmentKeys.lists());
      queryClient.invalidateQueries(appointmentKeys.detail(variables.id));
      toast.success('Appointment status updated');
    },
    onError: (error) => {
      const message = error.response?.data?.message || 'Failed to update status';
      toast.error(message);
    },
  });
};