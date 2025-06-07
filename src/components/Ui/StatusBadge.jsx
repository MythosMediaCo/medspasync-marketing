// ========================================
// File: src/components/ui/StatusBadge.jsx
// Reusable Status Badge Component
// ========================================

import React from 'react';

const StatusBadge = ({ status, type = 'client' }) => {
  const getStatusConfig = (status, type) => {
    const configs = {
      client: {
        ACTIVE: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
        VIP: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'VIP' },
        INACTIVE: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactive' },
        PROSPECT: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Prospect' },
      },
      appointment: {
        SCHEDULED: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Scheduled' },
        CONFIRMED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
        COMPLETED: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Completed' },
        CANCELLED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
        NO_SHOW: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'No Show' },
      },
    };

    return configs[type]?.[status] || configs[type]?.ACTIVE || configs.client.ACTIVE;
  };

  const config = getStatusConfig(status, type);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;