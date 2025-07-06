import { API_BASE_URL } from '../constants';

class RevenueIntelligence {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/revenue-intelligence`;
    this.revenueData = new Map();
    this.predictions = new Map();
    this.forecasts = new Map();
    this.churnAnalysis = new Map();
    this.expansionOpportunities = new Map();
    
    // Revenue metrics
    this.revenueMetrics = {
      MRR: 'monthly_recurring_revenue',
      ARR: 'annual_recurring_revenue',
      LTV: 'lifetime_value',
      CAC: 'customer_acquisition_cost',
      CHURN_RATE: 'churn_rate',
      EXPANSION_RATE: 'expansion_rate',
      NET_RETENTION: 'net_retention',
      GROSS_RETENTION: 'gross_retention'
    };

    // Prediction models
    this.predictionModels = {
      LTV_PREDICTION: 'ltv_prediction',
      CHURN_PREDICTION: 'churn_prediction',
      EXPANSION_PREDICTION: 'expansion_prediction',
      REVENUE_FORECAST: 'revenue_forecast',
      USAGE_PREDICTION: 'usage_prediction'
    };

    // Pricing models
    this.pricingModels = {
      USAGE_BASED: 'usage_based',
      TIERED: 'tiered',
      PER_USER: 'per_user',
      HYBRID: 'hybrid'
    };

    // Churn risk levels
    this.churnRiskLevels = {
      LOW: 'low',
      MEDIUM: 'medium',
      HIGH: 'high',
      CRITICAL: 'critical'
    };
  }

  /**
   * Calculate customer lifetime value (LTV)
   * @param {string} customerId - Customer ID
   * @param {Object} options - Calculation options
   * @returns {Promise<Object>} LTV calculation
   */
  async calculateLTV(customerId, options = {}) {
    try {
      const {
        includePredictions = true,
        timeRange = 'all',
        model = 'advanced'
      } = options;

      const response = await fetch(`${this.baseUrl}/ltv/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          includePredictions,
          timeRange,
          model,
          calculatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to calculate LTV: ${response.statusText}`);
      }

      const ltvData = await response.json();
      
      // Cache LTV data
      this.revenueData.set(`ltv_${customerId}`, ltvData);
      
      return ltvData;
    } catch (error) {
      console.error('Error calculating LTV:', error);
      throw error;
    }
  }

  /**
   * Predict customer churn risk
   * @param {string} customerId - Customer ID
   * @param {Object} options - Prediction options
   * @returns {Promise<Object>} Churn prediction
   */
  async predictChurnRisk(customerId, options = {}) {
    try {
      const {
        includeFactors = true,
        timeHorizon = '30d',
        model = 'ml_enhanced'
      } = options;

      const response = await fetch(`${this.baseUrl}/churn-prediction/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          includeFactors,
          timeHorizon,
          model,
          predictedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to predict churn risk: ${response.statusText}`);
      }

      const prediction = await response.json();
      
      // Cache prediction
      this.predictions.set(`churn_${customerId}`, prediction);
      
      return prediction;
    } catch (error) {
      console.error('Error predicting churn risk:', error);
      throw error;
    }
  }

  /**
   * Identify expansion opportunities
   * @param {string} customerId - Customer ID
   * @param {Object} options - Identification options
   * @returns {Promise<Object>} Expansion opportunities
   */
  async identifyExpansionOpportunities(customerId, options = {}) {
    try {
      const {
        includeRecommendations = true,
        timeRange = '90d',
        threshold = 0.7
      } = options;

      const response = await fetch(`${this.baseUrl}/expansion-opportunities/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          includeRecommendations,
          timeRange,
          threshold,
          identifiedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to identify expansion opportunities: ${response.statusText}`);
      }

      const opportunities = await response.json();
      
      // Cache opportunities
      this.expansionOpportunities.set(customerId, opportunities);
      
      return opportunities;
    } catch (error) {
      console.error('Error identifying expansion opportunities:', error);
      throw error;
    }
  }

  /**
   * Generate revenue forecast
   * @param {Object} options - Forecast options
   * @returns {Promise<Object>} Revenue forecast
   */
  async generateRevenueForecast(options = {}) {
    try {
      const {
        timeHorizon = '12m',
        includeScenarios = true,
        confidenceLevel = 0.95,
        model = 'ensemble'
      } = options;

      const response = await fetch(`${this.baseUrl}/revenue-forecast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          timeHorizon,
          includeScenarios,
          confidenceLevel,
          model,
          forecastedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate revenue forecast: ${response.statusText}`);
      }

      const forecast = await response.json();
      
      // Cache forecast
      this.forecasts.set(`revenue_${timeHorizon}`, forecast);
      
      return forecast;
    } catch (error) {
      console.error('Error generating revenue forecast:', error);
      throw error;
    }
  }

  /**
   * Calculate usage-based pricing recommendations
   * @param {string} customerId - Customer ID
   * @param {Object} usageData - Usage data
   * @returns {Promise<Object>} Pricing recommendations
   */
  async calculateUsageBasedPricing(customerId, usageData) {
    try {
      const response = await fetch(`${this.baseUrl}/usage-pricing/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          usageData,
          calculatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to calculate usage-based pricing: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating usage-based pricing:', error);
      throw error;
    }
  }

  /**
   * Analyze customer cohort performance
   * @param {Object} options - Cohort analysis options
   * @returns {Promise<Object>} Cohort analysis
   */
  async analyzeCohortPerformance(options = {}) {
    try {
      const {
        cohortType = 'signup_date',
        timeRange = '12m',
        includeMetrics = true,
        includePredictions = true
      } = options;

      const response = await fetch(`${this.baseUrl}/cohort-analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          cohortType,
          timeRange,
          includeMetrics,
          includePredictions,
          analyzedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze cohort performance: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing cohort performance:', error);
      throw error;
    }
  }

  /**
   * Predict customer expansion likelihood
   * @param {string} customerId - Customer ID
   * @param {Object} options - Prediction options
   * @returns {Promise<Object>} Expansion prediction
   */
  async predictExpansionLikelihood(customerId, options = {}) {
    try {
      const {
        timeHorizon = '90d',
        includeFeatures = true,
        model = 'gradient_boosting'
      } = options;

      const response = await fetch(`${this.baseUrl}/expansion-prediction/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          timeHorizon,
          includeFeatures,
          model,
          predictedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to predict expansion likelihood: ${response.statusText}`);
      }

      const prediction = await response.json();
      
      // Cache prediction
      this.predictions.set(`expansion_${customerId}`, prediction);
      
      return prediction;
    } catch (error) {
      console.error('Error predicting expansion likelihood:', error);
      throw error;
    }
  }

  /**
   * Calculate net revenue retention
   * @param {Object} options - Calculation options
   * @returns {Promise<Object>} Net revenue retention
   */
  async calculateNetRevenueRetention(options = {}) {
    try {
      const {
        timeRange = '12m',
        includeBreakdown = true,
        includeTrends = true
      } = options;

      const response = await fetch(`${this.baseUrl}/net-revenue-retention`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          timeRange,
          includeBreakdown,
          includeTrends,
          calculatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to calculate net revenue retention: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating net revenue retention:', error);
      throw error;
    }
  }

  /**
   * Generate customer health score
   * @param {string} customerId - Customer ID
   * @param {Object} options - Health score options
   * @returns {Promise<Object>} Customer health score
   */
  async generateCustomerHealthScore(customerId, options = {}) {
    try {
      const {
        includeFactors = true,
        includeRecommendations = true,
        model = 'comprehensive'
      } = options;

      const response = await fetch(`${this.baseUrl}/customer-health/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          includeFactors,
          includeRecommendations,
          model,
          generatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate customer health score: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating customer health score:', error);
      throw error;
    }
  }

  /**
   * Analyze pricing optimization opportunities
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Pricing optimization analysis
   */
  async analyzePricingOptimization(options = {}) {
    try {
      const {
        includeSegments = true,
        includeElasticity = true,
        includeCompetitive = true
      } = options;

      const response = await fetch(`${this.baseUrl}/pricing-optimization`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          includeSegments,
          includeElasticity,
          includeCompetitive,
          analyzedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to analyze pricing optimization: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing pricing optimization:', error);
      throw error;
    }
  }

  /**
   * Predict customer lifetime value
   * @param {string} customerId - Customer ID
   * @param {Object} options - Prediction options
   * @returns {Promise<Object>} LTV prediction
   */
  async predictCustomerLTV(customerId, options = {}) {
    try {
      const {
        timeHorizon = '36m',
        includeConfidence = true,
        model = 'survival_analysis'
      } = options;

      const response = await fetch(`${this.baseUrl}/ltv-prediction/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          timeHorizon,
          includeConfidence,
          model,
          predictedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to predict customer LTV: ${response.statusText}`);
      }

      const prediction = await response.json();
      
      // Cache prediction
      this.predictions.set(`ltv_prediction_${customerId}`, prediction);
      
      return prediction;
    } catch (error) {
      console.error('Error predicting customer LTV:', error);
      throw error;
    }
  }

  /**
   * Calculate customer acquisition cost (CAC)
   * @param {Object} options - Calculation options
   * @returns {Promise<Object>} CAC calculation
   */
  async calculateCAC(options = {}) {
    try {
      const {
        timeRange = '12m',
        includeBreakdown = true,
        includeTrends = true
      } = options;

      const response = await fetch(`${this.baseUrl}/cac`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          timeRange,
          includeBreakdown,
          includeTrends,
          calculatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to calculate CAC: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating CAC:', error);
      throw error;
    }
  }

  /**
   * Generate revenue intelligence dashboard
   * @param {Object} options - Dashboard options
   * @returns {Promise<Object>} Dashboard data
   */
  async generateRevenueDashboard(options = {}) {
    try {
      const {
        includeMetrics = true,
        includePredictions = true,
        includeForecasts = true,
        timeRange = '12m'
      } = options;

      const response = await fetch(`${this.baseUrl}/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          includeMetrics,
          includePredictions,
          includeForecasts,
          timeRange,
          generatedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to generate revenue dashboard: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating revenue dashboard:', error);
      throw error;
    }
  }

  /**
   * Get revenue analytics
   * @param {Object} options - Analytics options
   * @returns {Promise<Object>} Revenue analytics
   */
  async getRevenueAnalytics(options = {}) {
    try {
      const {
        timeRange = '30d',
        includeMetrics = true,
        includeTrends = true,
        includeSegments = true
      } = options;

      const params = new URLSearchParams({
        timeRange,
        includeMetrics: includeMetrics.toString(),
        includeTrends: includeTrends.toString(),
        includeSegments: includeSegments.toString()
      });

      const response = await fetch(`${this.baseUrl}/analytics?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch revenue analytics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      throw error;
    }
  }

  /**
   * Export revenue intelligence data
   * @param {Object} options - Export options
   * @returns {Promise<Blob>} Exported data
   */
  async exportRevenueData(options = {}) {
    try {
      const {
        format = 'csv',
        timeRange = '12m',
        includeMetrics = true,
        includePredictions = true,
        includeForecasts = true
      } = options;

      const params = new URLSearchParams({
        format,
        timeRange,
        includeMetrics: includeMetrics.toString(),
        includePredictions: includePredictions.toString(),
        includeForecasts: includeForecasts.toString()
      });

      const response = await fetch(`${this.baseUrl}/export?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to export revenue data: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting revenue data:', error);
      throw error;
    }
  }

  // Helper methods
  calculateChurnRiskLevel(riskScore) {
    if (riskScore >= 0.8) return this.churnRiskLevels.CRITICAL;
    if (riskScore >= 0.6) return this.churnRiskLevels.HIGH;
    if (riskScore >= 0.4) return this.churnRiskLevels.MEDIUM;
    return this.churnRiskLevels.LOW;
  }

  calculateExpansionProbability(score) {
    if (score >= 0.8) return 'very_high';
    if (score >= 0.6) return 'high';
    if (score >= 0.4) return 'medium';
    if (score >= 0.2) return 'low';
    return 'very_low';
  }

  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  formatPercentage(value) {
    return `${(value * 100).toFixed(2)}%`;
  }

  /**
   * Get authentication token
   * @returns {string} Auth token
   */
  getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  /**
   * Clear cache for a specific customer
   * @param {string} customerId - Customer ID
   */
  clearCustomerCache(customerId) {
    this.revenueData.delete(`ltv_${customerId}`);
    this.predictions.delete(`churn_${customerId}`);
    this.predictions.delete(`expansion_${customerId}`);
    this.predictions.delete(`ltv_prediction_${customerId}`);
    this.expansionOpportunities.delete(customerId);
  }

  /**
   * Clear all cache
   */
  clearAllCache() {
    this.revenueData.clear();
    this.predictions.clear();
    this.forecasts.clear();
    this.churnAnalysis.clear();
    this.expansionOpportunities.clear();
  }
}

// Create singleton instance
const revenueIntelligence = new RevenueIntelligence();

export default revenueIntelligence; 