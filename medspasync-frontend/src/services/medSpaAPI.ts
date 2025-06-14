// [Copy the API service code from the artifact above]
// src/services/medSpaAPI.ts
export interface TransactionData {
  customer_name: string;
  service: string;
  amount: number;
  date: string;
  phone?: string;
  email?: string;
  provider?: string;
}

export interface PredictionResult {
  match_probability: number;
  predicted_match: number;
  confidence_level: 'High' | 'Medium' | 'Low';
  recommendation: 'Auto-Accept' | 'Manual Review' | 'Likely No Match';
  feature_analysis: {
    name_similarity: number;
    service_similarity: number;
    date_proximity: number;
    amount_ratio_valid: number;
    treatment_category_match: number;
    overall_confidence: number;
  };
  processing_timestamp: string;
}

export interface APIResponse {
  success: boolean;
  result?: PredictionResult;
  error?: string;
}

export interface BatchResponse {
  success: boolean;
  results?: (PredictionResult & { pair_index: number })[];
  summary?: {
    total_processed: number;
    auto_accept: number;
    manual_review: number;
    likely_no_match: number;
    auto_accept_rate_percent: number;
    processing_time_seconds: number;
  };
  business_impact?: {
    estimated_time_saved_hours: number;
    manual_review_needed: number;
    efficiency_gain_percent: number;
  };
}

class MedSpaAPI {
  private baseURL = 'https://aapii-production.up.railway.app';

  async predictMatch(
    rewardTransaction: TransactionData,
    posTransaction: TransactionData,
    threshold = 0.95
  ): Promise<APIResponse> {
    try {
      const response = await fetch(`${this.baseURL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reward_transaction: rewardTransaction,
          pos_transaction: posTransaction,
          threshold,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async batchPredict(
    transactionPairs: Array<{
      reward_transaction: TransactionData;
      pos_transaction: TransactionData;
    }>,
    threshold = 0.95
  ): Promise<BatchResponse> {
    try {
      const response = await fetch(`${this.baseURL}/batch-predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_pairs: transactionPairs,
          threshold,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Batch API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'ERROR', timestamp: new Date().toISOString() };
    }
  }

  async testAPI(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/test`);
      return await response.json();
    } catch (error) {
      console.error('Test API failed:', error);
      return { error: 'Test failed' };
    }
  }
}

export const medSpaAPI = new MedSpaAPI();
export default medSpaAPI;