import React, { useEffect, useRef } from 'react';

const UptimeStatusBadge = ({ statusPageId }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.src = `https://status.uptimerobot.com/api/badge/${statusPageId}.svg`;
    }
  }, [statusPageId]);

  return (
    <a
      href={`https://stats.uptimerobot.com/${statusPageId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow"
    >
      <img ref={imgRef} alt="Uptime status" className="h-4" />
      <span>Status</span>
    </a>
  );
};

export default UptimeStatusBadge;
