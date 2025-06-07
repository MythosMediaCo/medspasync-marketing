// ========================================
// File: src/pages/ClientsPage.jsx
// Enhanced Client Management Page with Full API Integration
// ========================================

import React, { useState, useCallback } from 'react';
import { Search, Plus, Users, Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { 
  useClients, 
  useCreateClient, 
  useUpdateClient, 
  useDeleteClient,
  useUpdateClientStatus 
} from '../hooks/useClients';
import StatusBadge from '../components/ui/StatusBadge';
import LoadingSpinner, { LoadingCard } from '../components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';

// Client Card Component
const ClientCard = ({ client, onEdit, onDelete, onView }) => {
  const [showActions, setShowActions] = useState(false);
  const updateStatusMutation = useUpdateClientStatus();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id: client.id, status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-lg border border-blue-100/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {client.firstName} {client.lastName}
            </h3>
            <p className="text-sm text-gray-600">{client.email}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusBadge status={client.status} type="client" />
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            
            {showActions && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border z-10 py-1 min-w-[120px]">
                <button
                  onClick={() => { onView(client); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </button>
                <button
                  onClick={() => { onEdit(client); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => { onDelete(client); setShowActions(false); }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        {client.phone && (
          <div className="flex items-center text-gray-600">
            <span className="w-4 h-4 mr-2">📞</span>
            {client.phone}
          </div>
        )}
        <div className="flex items-center text-gray-600">
          <span className="w-4 h-4 mr-2">📅</span>
          {client._count?.appointments || 0} appointments
        </div>
        <div className="flex items-center text-gray-600">
          <span className="w-4 h-4 mr-2">💰</span>
          ${client.totalSpent?.toLocaleString() || '0'}
        </div>
        <div className="flex items-center text-gray-600">
          <span className="w-4 h-4 mr-2">👤</span>
          Since {new Date(client.createdAt).getFullYear()}
        </div>
      </div>

      {client.notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 truncate">{client.notes}</p>
        </div>
      )}
    </div>
  );
};

// Client Form Modal
const ClientFormModal = ({ client, isOpen, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: client?.firstName || '',
    lastName: client?.lastName || '',
    email: client?.email || '',
    phone: client?.phone || '',
    status: client?.status || 'PROSPECT',
    notes: client?.notes || '',
    address: client?.address || '',
    dateOfBirth: client?.dateOfBirth ? client.dateOfBirth.split('T')[0] : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {client ? 'Edit Client' : 'Add New Client'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
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
              <option value="PROSPECT">Prospect</option>
              <option value="ACTIVE">Active</option>
              <option value="VIP">VIP</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
              placeholder="Any special notes or preferences..."
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
              {isLoading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : null}
              {client ? 'Update Client' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmModal = ({ client, isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Client</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{client?.firstName} {client?.lastName}</strong>? 
          This action cannot be undone and will remove all associated appointment history.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Clients Page Component
const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Build query parameters
  const queryParams = {
    page: currentPage,
    limit: pageSize,
    ...(searchQuery && { search: searchQuery }),
    ...(statusFilter !== 'all' && { status: statusFilter }),
  };

  // API hooks
  const { data: clientsData, isLoading, error, refetch } = useClients(queryParams);
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

  // Debounced search
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    setCurrentPage(1);
    
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    const timeout = setTimeout(() => {
      // Search will trigger automatically via queryParams change
    }, 300);
    
    setSearchTimeout(timeout);
  }, [searchTimeout]);

  // Event handlers
  const handleCreateClient = async (formData) => {
    try {
      await createClientMutation.mutateAsync(formData);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create client:', error);
    }
  };

  const handleUpdateClient = async (formData) => {
    try {
      await updateClientMutation.mutateAsync({ 
        id: selectedClient.id, 
        data: formData 
      });
      setShowEditModal(false);
      setSelectedClient(null);
    } catch (error) {
      console.error('Failed to update client:', error);
    }
  };

  const handleDeleteClient = async () => {
    try {
      await deleteClientMutation.mutateAsync(selectedClient.id);
      setShowDeleteModal(false);
      setSelectedClient(null);
    } catch (error) {
      console.error('Failed to delete client:', error);
    }
  };

  const handleViewClient = (client) => {
    console.log('Viewing client:', client);
    // Navigate to client detail page or show detail modal
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const handleDeleteClick = (client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">Unable to load clients. Please check your connection.</p>
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

  const clients = clientsData?.data?.clients || [];
  const pagination = clientsData?.data?.pagination || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600 mt-1">Manage your spa's client relationships</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2 inline" />
            Add New Client
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-blue-100/50">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clients by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-500/20"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-300 focus:ring-4 focus:ring-blue-500/20"
            >
              <option value="all">All Clients</option>
              <option value="ACTIVE">Active</option>
              <option value="VIP">VIP</option>
              <option value="PROSPECT">Prospects</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {clients.length} of {pagination.total || 0} clients
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          
          {pagination.totalPages > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
                disabled={currentPage === pagination.totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Clients Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: pageSize }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : clients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <ClientCard 
                key={client.id} 
                client={client} 
                onView={handleViewClient}
                onEdit={handleEditClient}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first client'
              }
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Plus className="w-5 h-5 mr-2 inline" />
              Add First Client
            </button>
          </div>
        )}

        {/* Modals */}
        <ClientFormModal
          client={null}
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateClient}
          isLoading={createClientMutation.isLoading}
        />

        <ClientFormModal
          client={selectedClient}
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedClient(null);
          }}
          onSubmit={handleUpdateClient}
          isLoading={updateClientMutation.isLoading}
        />

        <DeleteConfirmModal
          client={selectedClient}
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedClient(null);
          }}
          onConfirm={handleDeleteClient}
          isLoading={deleteClientMutation.isLoading}
        />
      </div>
    </div>
  );
};

export default ClientsPage;