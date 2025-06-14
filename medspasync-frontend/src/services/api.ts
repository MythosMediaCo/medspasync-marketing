import axios from 'axios';

const API_BASE_URL = 'https://aapii-production.up.railway.app';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ReconciliationResult {
  match_probability: number;
  predicted_match: number;
  confidence_level: 'High' | 'Medium' | 'Low';
  recommendation: 'Auto-Accept' | 'Manual Review' | 'Likely No Match';
  feature_analysis: {
    name_similarity: number;
    service_similarity: number;
    date_proximity: number;
    amount_ratio_valid: number;
    overall_confidence: number;
  };
}

export interface TransactionPair {
  reward_transaction: {
    customer_name: string;
    service: string;
    amount: number;
    date: string;
  };
  pos_transaction: {
    customer_name: string;
    service: string;
    amount: number;
    date: string;
  };
}

export const reconciliationService = {
  predictMatch: async (pair: TransactionPair): Promise<ReconciliationResult> => {
    const response = await api.post('/predict', pair);
    return response.data.result;
  },

  batchPredict: async (pairs: TransactionPair[]) => {
    const response = await api.post('/batch-predict', {
      transaction_pairs: pairs
    });
    return response.data;
  },

  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};
