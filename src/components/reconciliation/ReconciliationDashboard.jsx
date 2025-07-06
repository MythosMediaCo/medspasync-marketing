import React, { useState, useCallback } from 'react';
import useReconciliation from '../../hooks/useReconciliation.js';
import { useWebSocket } from '../../hooks/useWebSocket.js';
import MatchingProgress from './MatchingProgress.jsx';

const ReconciliationDashboard = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    end: new Date()
  });
  const { startReconciliation, getResults, loading, error } = useReconciliation();
  const [job, setJob] = useState(null);

  const handleWsMessage = useCallback(
    (msg) => {
      if (!job) return;
      if (msg.type === 'reconciliation:progress' && msg.jobId === job.jobId) {
        setJob((prev) => ({ ...prev, progress: msg.progress, message: msg.message }));
      }
      if (msg.type === 'reconciliation:complete' && msg.jobId === job.jobId) {
        getResults(msg.jobId).then((res) => {
          setJob((prev) => ({ ...prev, status: 'completed', progress: 100, results: res }));
        });
      }
      if (msg.type === 'reconciliation:error' && msg.jobId === job.jobId) {
        setJob((prev) => ({ ...prev, status: 'failed', message: msg.error }));
      }
    },
    [job, getResults]
  );

  const { connectionStatus } = useWebSocket('/ws', { onMessage: handleWsMessage });

  const handleStart = async () => {
    const jobInfo = await startReconciliation({ dateRange });
    setJob({ ...jobInfo, progress: 0, status: 'processing' });
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
        <MatchingProgress job={job} onCancel={() => setJob(null)} />
      )}
      {job?.results && (
        <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded text-xs overflow-x-auto">
          {JSON.stringify(job.results, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ReconciliationDashboard;
