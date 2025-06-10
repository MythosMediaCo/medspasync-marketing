// ========================================
// File: src/pages/AppointmentsPage.jsx
// Enhanced Appointments Management - Fixed Version
// ========================================

import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, Plus, Search, Users, Phone, Mail, Clock, User, DollarSign, MoreVertical } from 'lucide-react';
import { 
  useAppointments, 
  useCreateAppointment, 
  useUpdateAppointment,
  useDeleteAppointment,
  useUpdateAppointmentStatus
} from '../hooks/useAppointments.js';
import { useClients } from '../hooks/useClients.js';
import { useServices } from '../hooks/useServices.js';
import StatusBadge from '../components/Ui/StatusBadge.jsx';
import LoadingSpinner, { LoadingTable } from '../components/Ui/LoadingSpinner.jsx';
import Modal from '../components/Ui/Modal.jsx';
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';
import { format, parseISO, isToday, isTomorrow, isYesterday, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import toast from 'react-hot-toast';
import { generateInitials, formatCurrency } from '../utils/formatting.js';

// Appointment Row Component
const AppointmentRow = React.memo(({ appointment, onEdit, onDelete, onStatusChange }) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  
  const formatDateDisplay = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM d, yyyy');
  };

  const formatTimeDisplay = (dateString) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const statusOptions = [
    { value: 'SCHEDULED', label: 'Scheduled', color: 'blue' },
    { value: 'CONFIRMED', label: 'Confirmed', color: 'green' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'yellow' },
    { value: 'COMPLETED', label: 'Completed', color: 'purple' },
    { value: 'CANCELLED', label: 'Cancelled', color: 'red' },
    { value: 'NO_SHOW', label: 'No Show', color: 'orange' },
  ];

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {generateInitials(appointment.client?.firstName, appointment.client?.lastName)}
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
        <div className="text-sm text-gray-900">{formatDateDisplay(appointment.dateTime)}</div>
        <div className="text-sm text-gray-500">{formatTimeDisplay(appointment.dateTime)}</div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="relative">
          <button
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            className="flex items-center focus:outline-none"
          >
            <StatusBadge status={appointment.status} type="appointment" />
            <MoreVertical className="w-4 h-4 text-gray-400 ml-1" />
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
        {formatCurrency(parseFloat(appointment.price) || 0)}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(appointment)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(appointment)}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
});

// Appointment Form Modal
const AppointmentFormModal = React.memo(({ appointment, isOpen, onClose, onSubmit, isLoading }) => {
  const { data: clientsData, isLoading: clientsLoading } = useClients();
  const { data: servicesData, isLoading: servicesLoading } = useServices();
  
  const clients = clientsData?.data?.clients || [];
  const services = servicesData?.data?.services || [];
  
  const [formData, setFormData] = useState({
    clientId: appointment?.clientId || '',
    serviceId: appointment?.serviceId || '',
    dateTime: appointment?.dateTime ? format(parseISO(appointment.dateTime), "yyyy-MM-dd'T'HH:mm") : '',
    status: appointment?.status || 'SCHEDULED',
    notes: appointment?.notes || '',
    price: appointment?.price ? parseFloat(appointment.price) : '',
  });

  // Reset form data when appointment changes
  React.useEffect(() => {
    if (appointment) {
      setFormData({
        clientId: appointment.clientId || '',
        serviceId: appointment.serviceId || '',
        dateTime: appointment.dateTime ? format(parseISO(appointment.dateTime), "yyyy-MM-dd'T'HH:mm") : '',
        status: appointment.status || 'SCHEDULED',
        notes: appointment.notes || '',
        price: appointment.price ? parseFloat(appointment.price) : '',
      });
    } else {
      setFormData({
        clientId: '',
        serviceId: '',
        dateTime: '',
        status: 'SCHEDULED',
        notes: '',
        price: '',
      });
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.clientId || !formData.serviceId || !formData.dateTime) {
      toast.error('Client, Service, and Date & Time are required.');
      return;
    }
    
    const selectedService = services.find(s => s.id === formData.serviceId); 
    const submissionData = {
      ...formData,
      clientId: formData.clientId, 
      serviceId: formData.serviceId,
      price: parseFloat(formData.price) || (selectedService ? parseFloat(selectedService.price) : 0),
    };
    
    onSubmit(submissionData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-fill price when service is selected (only if price is not manually set)
    if (field === 'serviceId') {
      const selectedService = services.find(s => s.id === value);
      if (selectedService && (!formData.price || formData.price === '')) {
        setFormData(prev => ({ ...prev, price: parseFloat(selectedService.price) }));
      }
    }
  };

  if (!isOpen) return null;

  const loadingData = clientsLoading || servicesLoading || isLoading;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={appointment ? 'Edit Appointment' : 'Book New Appointment'} showCloseButton={true}>
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
            disabled={loadingData}
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
            disabled={loadingData}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - {formatCurrency(parseFloat(service.price))}
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
            disabled={loadingData}
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
            disabled={loadingData}
          >
            <option value="SCHEDULED">Scheduled</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="NO_SHOW">No Show</option>
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
            disabled={loadingData}
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
            disabled={loadingData}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={loadingData}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            disabled={loadingData}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" className="mr-2" />
            ) : null}
            {appointment ? 'Update Appointment' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </Modal>
  );
});

// Main Appointments Page
const AppointmentsPage = React.memo(() => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Build query parameters for useAppointments hook
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
        case 'month':
          params.startDate = format(startOfMonth(today), 'yyyy-MM-dd');
          params.endDate = format(endOfMonth(today), 'yyyy-MM-dd');
          break;
        default:
          break;
      }
    }
    return params;
  }, [statusFilter, dateFilter]);

  // API hooks
  const { data: appointmentsData, isLoading, error, refetch } = useAppointments(queryParams);
  const createAppointmentMutation = useCreateAppointment();
  const updateAppointmentMutation = useUpdateAppointment();
  const deleteAppointmentMutation = useDeleteAppointment();
  const updateStatusMutation = useUpdateAppointmentStatus();

  const appointments = appointmentsData?.data?.appointments || [];

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

  const handleDeleteAppointment = async () => {
    try {
      await deleteAppointmentMutation.mutateAsync(selectedAppointment.id);
      setShowDeleteModal(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Failed to delete appointment:', error);
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

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDeleteModal(true);
  };

  // Error state display
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">Unable to load appointments. Please check your connection.</p>
          <p className="text-sm text-gray-500 mb-4">{error.message}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-1">Manage your appointment schedule</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2 inline" />
            Book Appointment
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-blue-100/50">
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
                <option value="month">This Month</option>
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
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="NO_SHOW">No Show</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {appointments.length} appointments
            {statusFilter !== 'all' && ` with status: ${statusFilter}`}
            {dateFilter !== 'all' && ` for ${dateFilter === 'today' ? 'today' : dateFilter === 'week' ? 'this week' : 'this month'}`}
          </p>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {isLoading ? (
            <LoadingTable rows={8} cols={6} />
          ) : appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
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
                      onDelete={handleDeleteClick}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-6">
                {statusFilter !== 'all' || dateFilter !== 'all' 
                  ? 'Try adjusting your filters or add a new appointment' 
                  : 'Get started by booking your first appointment'
                }
              </p>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
              >
                <Plus className="w-5 h-5 mr-2 inline" />
                Book First Appointment
              </button>
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

        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedAppointment(null);
          }}
          onConfirm={handleDeleteAppointment}
          isLoading={deleteAppointmentMutation.isLoading}
          title="Delete Appointment"
          message={selectedAppointment ?
            `Are you sure you want to delete this appointment for ${selectedAppointment.client?.firstName} ${selectedAppointment.client?.lastName} on ${format(parseISO(selectedAppointment.dateTime), 'MMM d, h:mm a')}? This action cannot be undone.` :
            'Are you sure you want to delete this appointment?'
          }
        />
      </div>
    </div>
  );
});

export default AppointmentsPage;