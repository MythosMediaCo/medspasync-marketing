import React, { useState } from 'react';
import useReconciliation from '../../hooks/useReconciliation.js';
import { useWebSocket } from '../../hooks/useWebSocket.js';

const ReconciliationDashboard = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const { startReconciliation, getResults, loading, error } = useReconciliation();
  const { connectionStatus } = useWebSocket('/ws');
  const [job, setJob] = useState(null);

  const handleStart = async () => {
    const jobInfo = await startReconciliation({ dateRange });
    setJob(jobInfo);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">AI Reconciliation</h1>
      <div className="text-sm text-gray-600">WebSocket: {connectionStatus}</div>
      <div className="space-x-2">
        <input
          type="date"
          value={dateRange.start.toISOString().split('T')[0]}
          onChange={e => setDateRange({ ...dateRange, start: new Date(e.target.value) })}
        />
        <input
          type="date"
          value={dateRange.end.toISOString().split('T')[0]}
          onChange={e => setDateRange({ ...dateRange, end: new Date(e.target.value) })}
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleStart} disabled={loading}>
          {loading ? 'Starting...' : 'Start'}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {job && (
        <div className="text-sm text-gray-700">
          Job ID: {job.jobId} Status: {job.status}
        </div>
      )}
    </div>
  );
};

export default ReconciliationDashboard;
