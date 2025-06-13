import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const MatchingProgress = ({ job, onCancel }) => {
  if (!job) return null;

  const { status = 'processing', progress = 0, message } = job;

  const color = progress < 0 ? 'bg-red-500' : progress < 100 ? 'bg-blue-500' : 'bg-green-500';

  const StatusIcon = status === 'failed'
    ? XCircle
    : status === 'completed'
    ? CheckCircle
    : Clock;

  return (
    <div className="border rounded p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <StatusIcon className="w-5 h-5" />
          <span className="font-semibold">Job ID: {job.jobId || job.id}</span>
        </div>
        {status === 'processing' && (
          <button
            onClick={onCancel}
            className="text-sm text-red-600 border border-red-300 px-2 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="text-sm text-gray-600">{message || 'Processing...'}</div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`h-2 rounded ${color}`}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>
    </div>
  );
};

export default MatchingProgress;
