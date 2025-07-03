import axios from 'axios';

const API_BASE_URL = 'https://aapii-production.up.railway.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reconciliationService = {
  predictMatch: async (pair) => {
    const response = await api.post('/predict', pair);
    return response.data.result;
  },

  batchPredict: async (pairs) => {
    const response = await api.post('/batch-predict', {
      transaction_pairs: pairs,
    });
    return response.data;
  },

  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};
