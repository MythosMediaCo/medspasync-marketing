// ========================================
// File: src/pages/AppointmentsPage.jsx
// Enhanced Appointments Management
// ========================================

import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Clock } from 'lucide-react';
import { 
  useAppointments, 
  useCreateAppointment, 
  useUpdateAppointment,
  useUpdateAppointmentStatus 
} from '../hooks/useAppointments';
import { useClients } from '../hooks/useClients';
import { useServices } from '../hooks/useServices';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSpinner, { LoadingTable } from '../components/ui/LoadingSpinner';
import { format, parseISO, isToday, isTomorrow, isYesterday, startOfWeek, endOfWeek } from 'date-fns';

// Appointment Row Component
const AppointmentRow = ({ appointment, onEdit, onStatusChange }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d, yyyy');
  };

  const formatTime = (dateString) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const statusOptions = [
    { value: 'SCHEDULED', label: 'Scheduled' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'CANCELLED', label: 'Cancelled' },
    { value: 'NO_SHOW', label: 'No Show' },
  ];

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {appointment.client?.firstName?.charAt(0)}{appointment.client?.lastName?.charAt(0)}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {appointment.client?.firstName} {appointment.client?.lastName}
            </div>
            <div className="text-sm text-gray-500">{appointment.client?.email}</div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{appointment.service?.name}</div>
        <div className="text-sm text-gray-500">{appointment.service?.duration} minutes</div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDate(appointment.dateTime)}</div>
        <div className="text-sm text-gray-500">{formatTime(appointment.dateTime)}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="relative">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="flex items-center"
          >
            <StatusBadge status={appointment.status} type="appointment" />
          </button>
          
          {showStatusMenu && (
            <div className="absolute left-0 top-8 bg-white rounded-lg shadow-lg border z-10 py-1 min-w-[140px]">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onStatusChange(appointment.id, option.value);
                    setShowStatusMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                >
                  <StatusBadge status={option.value} type="appointment" />
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        ${appointment.price?.toLocaleString() || '0'}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button
          onClick={() => onEdit(appointment)}
          className="text-blue-600 hover:text-blue-900 mr-3"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

// Appointment Form Modal
const AppointmentFormModal = ({ appointment, isOpen, onClose, onSubmit, isLoading }) => {
  const { data: clientsData } = useClients();
  const { data: servicesData } = useServices();
  
  const clients = clientsData?.data?.clients || [];
  const services = servicesData?.data?.services || [];
  
  const [formData, setFormData] = useState({
    clientId: appointment?.clientId || '',
    serviceId: appointment?.serviceId || '',
    dateTime: appointment?.dateTime ? appointment.dateTime.slice(0, 16) : '',
    status: appointment?.status || 'SCHEDULED',
    notes: appointment?.notes || '',
    price: appointment?.price || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientId || !formData.serviceId || !formData.dateTime) {
      return;
    }
    
    const selectedService = services.find(s => s.id === parseInt(formData.serviceId));
    const submissionData = {
      ...formData,
      clientId: parseInt(formData.clientId),
      serviceId: parseInt(formData.serviceId),
      price: formData.price || selectedService?.price || 0,
    };
    
    onSubmit(submissionData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-fill price when service is selected
    if (field === 'serviceId') {
      const selectedService = services.find(s => s.id === parseInt(value));
      if (selectedService && !formData.price) {
        setFormData(prev => ({ ...prev, price: selectedService.price }));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {appointment ? 'Edit Appointment' : 'Book New Appointment'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client *
            </label>
            <select
              required
              value={formData.clientId}
              onChange={(e) => handleChange('clientId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.firstName} {client.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service *
            </label>
            <select
              required
              value={formData.serviceId}
              onChange={(e) => handleChange('serviceId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              required
              value={formData.dateTime}
              onChange={(e) => handleChange('dateTime', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
              {appointment ? 'Update' : 'Book'} Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Appointments Page
const AppointmentsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Build query parameters
  const queryParams = useMemo(() => {
    const params = {};
    if (statusFilter !== 'all') params.status = statusFilter;
    if (dateFilter !== 'all') {
      const today = new Date();
      switch (dateFilter) {
        case 'today':
          params.date = format(today, 'yyyy-MM-dd');
          break;
        case 'week':
          params.startDate = format(startOfWeek(today), 'yyyy-MM-dd');
          params.endDate = format(endOfWeek(today), 'yyyy-MM-dd');
          break;
      }
    }
    return params;
  }, [statusFilter, dateFilter]);

  // API hooks
  const { data: appointmentsData, isLoading, error, refetch } = useAppointments(queryParams);
  const createAppointmentMutation = useCreateAppointment();
  const updateAppointmentMutation = useUpdateAppointment();
  const updateStatusMutation = useUpdateAppointmentStatus();

  const appointments = appointmentsData?.data || [];

  // Event handlers
  const handleCreateAppointment = async (formData) => {
    try {
      await createAppointmentMutation.mutateAsync(formData);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
  };

  const handleUpdateAppointment = async (formData) => {
    try {
      await updateAppointmentMutation.mutateAsync({
        id: selectedAppointment.id,
        data: formData
      });
      setShowEditModal(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id: appointmentId, status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Appointments</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your appointment schedule</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Book Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="SCHEDULED">Scheduled</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {isLoading ? (
          <LoadingTable rows={8} cols={6} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <AppointmentRow
                    key={appointment.id}
                    appointment={appointment}
                    onEdit={handleEditAppointment}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </tbody>
            </table>
            
            {appointments.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-600 mb-6">
                  {statusFilter !== 'all' || dateFilter !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'Get started by booking your first appointment'
                  }
                </p>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  <Plus className="w-5 h-5 mr-2 inline" />
                  Book First Appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AppointmentFormModal
        appointment={null}
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateAppointment}
        isLoading={createAppointmentMutation.isLoading}
      />

      <AppointmentFormModal
        appointment={selectedAppointment}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAppointment(null);
        }}
        onSubmit={handleUpdateAppointment}
        isLoading={updateAppointmentMutation.isLoading}
      />
    </div>
  );
};

export default AppointmentsPage;