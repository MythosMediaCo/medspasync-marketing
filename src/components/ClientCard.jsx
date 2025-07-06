import React from 'react';
import { Phone, Mail, Calendar, User, DollarSign } from 'lucide-react';
import StatusBadge from './Ui/StatusBadge.jsx'; // Explicit .jsx extension
import { format } from 'date-fns'; // For date formatting
import { generateInitials, formatCurrency } from '../utils/formatting.js'; // Assuming these exist

// Client Card Component (Reusable for ClientsPage grid and Dashboard Top Clients)
const ClientCard = React.memo(({ client, onView, onEdit, onDelete }) => (
    <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-6 shadow-lg border border-blue-100/50 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {generateInitials(client.firstName, client.lastName)}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">{client.firstName} {client.lastName}</h3>
                    {client.email && <p className="text-sm text-gray-600">{client.email}</p>}
                </div>
            </div>
            <StatusBadge status={client.status} type="client" />
        </div>

        <div className="space-y-2 text-sm flex-1">
            {client.phone && (
                <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone}
                </div>
            )}
            {client.email && ( // Add email display
                <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                </div>
            )}
            <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {client._count?.appointments || 0} appointments
            </div>
            {client.totalSpent > 0 && ( // Assuming totalSpent from backend
                <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Total Spent: {formatCurrency(client.totalSpent)}
                </div>
            )}
            <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                Member since {format(new Date(client.createdAt), 'yyyy')}
            </div>
        </div>

        {client.notes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 truncate">{client.notes}</p>
            </div>
        )}

        <div className="flex justify-end mt-4 space-x-2">
            {onView && (
                <button
                    onClick={() => onView(client)}
                    className="text-blue-600 hover:underline text-sm"
                >
                    View
                </button>
            )}
            {onEdit && (
                <button
                    onClick={() => onEdit(client)}
                    className="text-indigo-600 hover:underline text-sm"
                >
                    Edit
                </button>
            )}
            {onDelete && (
                <button
                    onClick={() => onDelete(client)}
                    className="text-red-600 hover:underline text-sm"
                >
                    Delete
                </button>
            )}
        </div>
    </div>
));

export default ClientCard;