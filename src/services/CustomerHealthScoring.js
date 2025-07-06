import { API_BASE_URL } from '../constants';

class CustomerHealthScoring {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/customer-health`;
    this.healthScores = new Map();
    this.riskFactors = new Map();
    this.adoptionMetrics = new Map();
    this.engagementData = new Map();
    this.churnPredictions = new Map();
    this.valueMetrics = new Map();
    
    // Health score weights
    this.weights = {
      engagement: 0.25,
      adoption: 0.25,
      value: 0.20,
      support: 0.15,
      billing: 0.15
    };

    // Risk thresholds
    this.thresholds = {
      critical: 30,
      warning: 50,
      healthy: 70,
      excellent: 90
    };
  }

  /**
   * Calculate comprehensive health score for a customer
   * @param {string} customerId - Customer ID
   * @param {Object} options - Calculation options
   * @returns {Promise<Object>} Health score data
   */
  async calculateHealthScore(customerId, options = {}) {
    try {
      const {
        includePredictions = true,
        timeRange = '30d',
        refresh = false
      } = options;

      // Check cache if not refreshing
      if (!refresh && this.healthScores.has(customerId)) {
        const cached = this.healthScores.get(customerId);
        if (Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minutes
          return cached.data;
        }
      }

      // Fetch all health metrics
      const [
        engagementScore,
        adoptionScore,
        valueScore,
        supportScore,
        billingScore,
        riskFactors,
        churnPrediction
      ] = await Promise.all([
        this.calculateEngagementScore(customerId, timeRange),
        this.calculateAdoptionScore(customerId, timeRange),
        this.calculateValueScore(customerId, timeRange),
        this.calculateSupportScore(customerId, timeRange),
        this.calculateBillingScore(customerId, timeRange),
        this.identifyRiskFactors(customerId),
        includePredictions ? this.predictChurnRisk(customerId) : null
      ]);

      // Calculate weighted health score
      const healthScore = Math.round(
        engagementScore * this.weights.engagement +
        adoptionScore * this.weights.adoption +
        valueScore * this.weights.value +
        supportScore * this.weights.support +
        billingScore * this.weights.billing
      );

      // Determine health status
      const healthStatus = this.determineHealthStatus(healthScore);

      // Create comprehensive health data
      const healthData = {
        customerId,
        overallScore: healthScore,
        healthStatus,
        timestamp: new Date().toISOString(),
        timeRange,
        metrics: {
          engagement: {
            score: engagementScore,
            weight: this.weights.engagement,
            details: await this.getEngagementDetails(customerId, timeRange)
          },
          adoption: {
            score: adoptionScore,
            weight: this.weights.adoption,
            details: await this.getAdoptionDetails(customerId, timeRange)
          },
          value: {
            score: valueScore,
            weight: this.weights.value,
            details: await this.getValueDetails(customerId, timeRange)
          },
          support: {
            score: supportScore,
            weight: this.weights.support,
            details: await this.getSupportDetails(customerId, timeRange)
          },
          billing: {
            score: billingScore,
            weight: this.weights.billing,
            details: await this.getBillingDetails(customerId, timeRange)
          }
        },
        riskFactors,
        churnPrediction,
        recommendations: await this.generateRecommendations(customerId, healthData),
        trends: await this.calculateTrends(customerId, timeRange)
      };

      // Cache the result
      this.healthScores.set(customerId, {
        data: healthData,
        timestamp: Date.now()
      });

      return healthData;
    } catch (error) {
      console.error('Error calculating health score:', error);
      throw error;
    }
  }

  /**
   * Calculate engagement score based on user activity
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for calculation
   * @returns {Promise<number>} Engagement score (0-100)
   */
  async calculateEngagementScore(customerId, timeRange = '30d') {
    try {
      const response = await fetch(`${this.baseUrl}/engagement/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch engagement data: ${response.statusText}`);
      }

      const engagementData = await response.json();
      
      // Calculate score based on multiple factors
      let score = 0;
      
      // Login frequency (30%)
      const loginScore = Math.min(engagementData.loginFrequency / 20 * 100, 100);
      score += loginScore * 0.3;
      
      // Feature usage (40%)
      const featureScore = Math.min(engagementData.featuresUsed / engagementData.totalFeatures * 100, 100);
      score += featureScore * 0.4;
      
      // Session duration (20%)
      const sessionScore = Math.min(engagementData.avgSessionDuration / 30 * 100, 100);
      score += sessionScore * 0.2;
      
      // Data upload frequency (10%)
      const uploadScore = Math.min(engagementData.uploadFrequency / 10 * 100, 100);
      score += uploadScore * 0.1;

      return Math.round(score);
    } catch (error) {
      console.error('Error calculating engagement score:', error);
      return 50; // Default score
    }
  }

  /**
   * Calculate feature adoption score
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for calculation
   * @returns {Promise<number>} Adoption score (0-100)
   */
  async calculateAdoptionScore(customerId, timeRange = '30d') {
    try {
      const response = await fetch(`${this.baseUrl}/adoption/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch adoption data: ${response.statusText}`);
      }

      const adoptionData = await response.json();
      
      let score = 0;
      
      // Core features adoption (50%)
      const coreFeatures = ['reconciliation', 'dashboard', 'reports'];
      const coreAdoption = coreFeatures.filter(feature => 
        adoptionData.featureUsage[feature] && adoptionData.featureUsage[feature].adopted
      ).length;
      score += (coreAdoption / coreFeatures.length) * 50;
      
      // Advanced features adoption (30%)
      const advancedFeatures = ['analytics', 'billing', 'integrations'];
      const advancedAdoption = advancedFeatures.filter(feature => 
        adoptionData.featureUsage[feature] && adoptionData.featureUsage[feature].adopted
      ).length;
      score += (advancedAdoption / advancedFeatures.length) * 30;
      
      // Feature depth (20%)
      const depthScore = Math.min(adoptionData.avgFeatureDepth / 5 * 100, 100);
      score += depthScore * 0.2;

      return Math.round(score);
    } catch (error) {
      console.error('Error calculating adoption score:', error);
      return 50; // Default score
    }
  }

  /**
   * Calculate value realization score
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for calculation
   * @returns {Promise<number>} Value score (0-100)
   */
  async calculateValueScore(customerId, timeRange = '30d') {
    try {
      const response = await fetch(`${this.baseUrl}/value/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch value data: ${response.statusText}`);
      }

      const valueData = await response.json();
      
      let score = 0;
      
      // ROI achievement (40%)
      const roiScore = Math.min(valueData.roiAchievement / 200 * 100, 100);
      score += roiScore * 0.4;
      
      // Time savings (30%)
      const timeSavingsScore = Math.min(valueData.timeSavings / 20 * 100, 100);
      score += timeSavingsScore * 0.3;
      
      // Error reduction (20%)
      const errorReductionScore = Math.min(valueData.errorReduction / 50 * 100, 100);
      score += errorReductionScore * 0.2;
      
      // Revenue impact (10%)
      const revenueScore = Math.min(valueData.revenueImpact / 10000 * 100, 100);
      score += revenueScore * 0.1;

      return Math.round(score);
    } catch (error) {
      console.error('Error calculating value score:', error);
      return 50; // Default score
    }
  }

  /**
   * Calculate support satisfaction score
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for calculation
   * @returns {Promise<number>} Support score (0-100)
   */
  async calculateSupportScore(customerId, timeRange = '30d') {
    try {
      const response = await fetch(`${this.baseUrl}/support/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch support data: ${response.statusText}`);
      }

      const supportData = await response.json();
      
      let score = 100; // Start with perfect score
      
      // Deduct points for support issues
      if (supportData.ticketCount > 0) {
        const ticketPenalty = Math.min(supportData.ticketCount * 5, 30);
        score -= ticketPenalty;
      }
      
      // Deduct points for unresolved issues
      if (supportData.unresolvedTickets > 0) {
        const unresolvedPenalty = Math.min(supportData.unresolvedTickets * 10, 40);
        score -= unresolvedPenalty;
      }
      
      // Add points for positive feedback
      if (supportData.positiveFeedback > 0) {
        const feedbackBonus = Math.min(supportData.positiveFeedback * 5, 20);
        score += feedbackBonus;
      }

      return Math.max(0, Math.round(score));
    } catch (error) {
      console.error('Error calculating support score:', error);
      return 80; // Default score
    }
  }

  /**
   * Calculate billing health score
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for calculation
   * @returns {Promise<number>} Billing score (0-100)
   */
  async calculateBillingScore(customerId, timeRange = '30d') {
    try {
      const response = await fetch(`${this.baseUrl}/billing/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch billing data: ${response.statusText}`);
      }

      const billingData = await response.json();
      
      let score = 100; // Start with perfect score
      
      // Deduct points for payment issues
      if (billingData.paymentFailures > 0) {
        const failurePenalty = Math.min(billingData.paymentFailures * 15, 50);
        score -= failurePenalty;
      }
      
      // Deduct points for overdue payments
      if (billingData.overdueDays > 0) {
        const overduePenalty = Math.min(billingData.overdueDays * 2, 30);
        score -= overduePenalty;
      }
      
      // Add points for early payments
      if (billingData.earlyPayments > 0) {
        const earlyBonus = Math.min(billingData.earlyPayments * 5, 15);
        score += earlyBonus;
      }

      return Math.max(0, Math.round(score));
    } catch (error) {
      console.error('Error calculating billing score:', error);
      return 90; // Default score
    }
  }

  /**
   * Identify risk factors for customer health
   * @param {string} customerId - Customer ID
   * @returns {Promise<Array>} Risk factors
   */
  async identifyRiskFactors(customerId) {
    try {
      const response = await fetch(`${this.baseUrl}/risks/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch risk factors: ${response.statusText}`);
      }

      const riskData = await response.json();
      
      const riskFactors = [];
      
      // Engagement risks
      if (riskData.loginFrequency < 5) {
        riskFactors.push({
          category: 'engagement',
          severity: 'high',
          description: 'Low login frequency',
          impact: 'Reduced platform engagement',
          recommendation: 'Increase user training and engagement campaigns'
        });
      }
      
      // Adoption risks
      if (riskData.featureAdoption < 0.3) {
        riskFactors.push({
          category: 'adoption',
          severity: 'medium',
          description: 'Low feature adoption',
          impact: 'Limited value realization',
          recommendation: 'Provide feature-specific training and support'
        });
      }
      
      // Support risks
      if (riskData.supportTickets > 5) {
        riskFactors.push({
          category: 'support',
          severity: 'medium',
          description: 'High support ticket volume',
          impact: 'Potential user frustration',
          recommendation: 'Review common issues and improve onboarding'
        });
      }
      
      // Billing risks
      if (riskData.paymentIssues > 0) {
        riskFactors.push({
          category: 'billing',
          severity: 'high',
          description: 'Payment processing issues',
          impact: 'Risk of service interruption',
          recommendation: 'Contact customer immediately to resolve billing'
        });
      }

      return riskFactors;
    } catch (error) {
      console.error('Error identifying risk factors:', error);
      return [];
    }
  }

  /**
   * Predict churn risk
   * @param {string} customerId - Customer ID
   * @returns {Promise<Object>} Churn prediction
   */
  async predictChurnRisk(customerId) {
    try {
      const response = await fetch(`${this.baseUrl}/churn-prediction/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch churn prediction: ${response.statusText}`);
      }

      const predictionData = await response.json();
      
      return {
        riskScore: predictionData.riskScore,
        riskLevel: this.categorizeChurnRisk(predictionData.riskScore),
        factors: predictionData.factors,
        confidence: predictionData.confidence,
        timeframe: predictionData.timeframe,
        recommendedActions: predictionData.recommendedActions
      };
    } catch (error) {
      console.error('Error predicting churn risk:', error);
      return {
        riskScore: 0.1,
        riskLevel: 'low',
        factors: [],
        confidence: 0.8,
        timeframe: '90d',
        recommendedActions: []
      };
    }
  }

  /**
   * Categorize churn risk level
   * @param {number} riskScore - Risk score (0-1)
   * @returns {string} Risk level
   */
  categorizeChurnRisk(riskScore) {
    if (riskScore >= 0.7) return 'critical';
    if (riskScore >= 0.5) return 'high';
    if (riskScore >= 0.3) return 'medium';
    if (riskScore >= 0.1) return 'low';
    return 'minimal';
  }

  /**
   * Determine health status based on score
   * @param {number} score - Health score
   * @returns {string} Health status
   */
  determineHealthStatus(score) {
    if (score >= this.thresholds.excellent) return 'excellent';
    if (score >= this.thresholds.healthy) return 'healthy';
    if (score >= this.thresholds.warning) return 'warning';
    if (score >= this.thresholds.critical) return 'critical';
    return 'at-risk';
  }

  /**
   * Generate recommendations based on health data
   * @param {string} customerId - Customer ID
   * @param {Object} healthData - Health data
   * @returns {Promise<Array>} Recommendations
   */
  async generateRecommendations(customerId, healthData) {
    const recommendations = [];
    
    // Engagement recommendations
    if (healthData.metrics.engagement.score < 60) {
      recommendations.push({
        category: 'engagement',
        priority: 'high',
        title: 'Improve User Engagement',
        description: 'Increase platform usage through targeted training and support',
        actions: [
          'Schedule onboarding review call',
          'Send feature highlight emails',
          'Provide personalized training materials'
        ],
        expectedImpact: 'Increase engagement score by 20-30 points'
      });
    }
    
    // Adoption recommendations
    if (healthData.metrics.adoption.score < 50) {
      recommendations.push({
        category: 'adoption',
        priority: 'medium',
        title: 'Boost Feature Adoption',
        description: 'Help users discover and utilize more platform features',
        actions: [
          'Create feature-specific tutorials',
          'Set up feature discovery campaigns',
          'Offer guided feature tours'
        ],
        expectedImpact: 'Increase adoption score by 15-25 points'
      });
    }
    
    // Value recommendations
    if (healthData.metrics.value.score < 40) {
      recommendations.push({
        category: 'value',
        priority: 'high',
        title: 'Demonstrate Value',
        description: 'Show clear ROI and time savings from platform usage',
        actions: [
          'Generate ROI report',
          'Share success stories',
          'Provide usage analytics'
        ],
        expectedImpact: 'Increase value score by 25-35 points'
      });
    }
    
    // Support recommendations
    if (healthData.metrics.support.score < 70) {
      recommendations.push({
        category: 'support',
        priority: 'medium',
        title: 'Address Support Issues',
        description: 'Resolve outstanding support tickets and improve satisfaction',
        actions: [
          'Review and resolve open tickets',
          'Follow up on recent issues',
          'Provide proactive support'
        ],
        expectedImpact: 'Increase support score by 15-20 points'
      });
    }

    return recommendations;
  }

  /**
   * Calculate health trends over time
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range
   * @returns {Promise<Object>} Trend data
   */
  async calculateTrends(customerId, timeRange = '30d') {
    try {
      const response = await fetch(`${this.baseUrl}/trends/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch trend data: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating trends:', error);
      return {
        direction: 'stable',
        change: 0,
        period: timeRange
      };
    }
  }

  /**
   * Get detailed engagement data
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range
   * @returns {Promise<Object>} Engagement details
   */
  async getEngagementDetails(customerId, timeRange) {
    try {
      const response = await fetch(`${this.baseUrl}/engagement/${customerId}/details?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch engagement details: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching engagement details:', error);
      return {};
    }
  }

  /**
   * Get detailed adoption data
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range
   * @returns {Promise<Object>} Adoption details
   */
  async getAdoptionDetails(customerId, timeRange) {
    try {
      const response = await fetch(`${this.baseUrl}/adoption/${customerId}/details?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch adoption details: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching adoption details:', error);
      return {};
    }
  }

  /**
   * Get detailed value data
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range
   * @returns {Promise<Object>} Value details
   */
  async getValueDetails(customerId, timeRange) {
    try {
      const response = await fetch(`${this.baseUrl}/value/${customerId}/details?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch value details: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching value details:', error);
      return {};
    }
  }

  /**
   * Get detailed support data
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range
   * @returns {Promise<Object>} Support details
   */
  async getSupportDetails(customerId, timeRange) {
    try {
      const response = await fetch(`${this.baseUrl}/support/${customerId}/details?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch support details: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching support details:', error);
      return {};
    }
  }

  /**
   * Get detailed billing data
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range
   * @returns {Promise<Object>} Billing details
   */
  async getBillingDetails(customerId, timeRange) {
    try {
      const response = await fetch(`${this.baseUrl}/billing/${customerId}/details?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch billing details: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching billing details:', error);
      return {};
    }
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
    this.healthScores.delete(customerId);
    this.riskFactors.delete(customerId);
    this.adoptionMetrics.delete(customerId);
    this.engagementData.delete(customerId);
    this.churnPredictions.delete(customerId);
    this.valueMetrics.delete(customerId);
  }

  /**
   * Clear all cache
   */
  clearAllCache() {
    this.healthScores.clear();
    this.riskFactors.clear();
    this.adoptionMetrics.clear();
    this.engagementData.clear();
    this.churnPredictions.clear();
    this.valueMetrics.clear();
  }
}

// Create singleton instance
const customerHealthScoring = new CustomerHealthScoring();

export default customerHealthScoring; 