class MedSpaAPI {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  }

  async predictMatch(rewardTransaction, posTransaction, threshold = 0.95) {
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

  async batchPredict(transactionPairs, threshold = 0.95) {
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

  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'ERROR', timestamp: new Date().toISOString() };
    }
  }

  async testAPI() {
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
