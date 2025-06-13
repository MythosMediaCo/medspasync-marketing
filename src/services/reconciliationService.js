import api from './api.js';

const reconciliationService = {
  startReconciliation: async (options) => {
    const res = await api.post('/reconciliation/process', options);
    return res.data;
  },
  getResults: async (jobId) => {
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
  }
};

export { reconciliationService };
export default reconciliationService;
