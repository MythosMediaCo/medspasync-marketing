import api from './api.js';

const reconciliationService = {
  // Existing helper used by the reconciliation dashboard
  startReconciliation: async (options) => {
    const res = await api.post('/reconciliation/process', options);
    return res.data;
  },

  // Generalised processing API used by the new workflow
  processReconciliation: async (options) => {
    const res = await api.post('/reconciliation/process', options);
    return res.data;
  },

  getResults: async (jobId) => {
    const res = await api.get(`/reconciliation/results/${jobId}`);
    return res.data;
  },

  // Alias used in new components
  getReconciliationResults: async (jobId) => {
    const res = await api.get(`/reconciliation/results/${jobId}`);
    return res.data;
  },
  getDashboardMetrics: async (period = '30d') => {
    const res = await api.get('/reconciliation/dashboard', { params: { period } });
    return res.data;
  },
  submitManualReview: async (data) => {
    const res = await api.post('/reconciliation/manual-review', data);
    return res.data;
  },

  // Download reconciled results
  exportResults: async (jobId, format = 'csv') => {
    const res = await api.get(`/reconciliation/export/${jobId}`, {
      params: { format },
      responseType: 'blob'
    });
    return res.data;
  }
};

export { reconciliationService };
export default reconciliationService;
