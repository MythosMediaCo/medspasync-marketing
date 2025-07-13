import React from 'react';
import LazyImage from './LazyImage.jsx';

const UptimeStatusBadge = ({ statusPageId }) => {
  const statusBadgeUrl = `https://status.uptimerobot.com/api/badge/${statusPageId}.svg`;
  
  return (
    <a
      href={`https://stats.uptimerobot.com/${statusPageId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow"
    >
      <LazyImage 
        src={statusBadgeUrl}
        alt="Uptime status" 
        className="h-4"
        placeholder={<div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>}
        fallback={<div className="h-4 w-16 bg-red-100 rounded flex items-center justify-center text-xs text-red-500">Error</div>}
      />
      <span>Status</span>
    </a>
  );
};

export default UptimeStatusBadge;
