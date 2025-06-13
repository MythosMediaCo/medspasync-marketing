import { useState } from 'react';
import reconciliationService from '../services/reconciliationService.js';

export function useReconciliation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startReconciliation = async (options) => {
    setLoading(true);
    setError(null);
    try {
      const job = await reconciliationService.startReconciliation(options);
      return job;
    } catch (err) {
      setError(err.message || 'Failed to start reconciliation');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getResults = async (jobId) => {
    try {
      return await reconciliationService.getResults(jobId);
    } catch (err) {
      setError(err.message || 'Failed to fetch results');
      throw err;
    }
  };

  return { startReconciliation, getResults, loading, error };
}

export default useReconciliation;
