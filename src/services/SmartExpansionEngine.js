import { API_BASE_URL } from '../constants';

class SmartExpansionEngine {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/expansion`;
    this.recommendations = new Map();
    this.upgradeFlows = new Map();
    this.billingChanges = new Map();
    this.expansionOffers = new Map();
    this.usageMetrics = new Map();
    
    // Expansion types
    this.expansionTypes = {
      TIER_UPGRADE: 'tier_upgrade',
      FEATURE_ADDON: 'feature_addon',
      SEAT_EXPANSION: 'seat_expansion',
      STORAGE_UPGRADE: 'storage_upgrade',
      INTEGRATION_ADDON: 'integration_addon',
      CUSTOM_FEATURE: 'custom_feature'
    };

    // Recommendation triggers
    this.triggers = {
      USAGE_THRESHOLD: 'usage_threshold',
      FEATURE_DEMAND: 'feature_demand',
      GROWTH_PREDICTION: 'growth_prediction',
      COMPETITIVE_OFFER: 'competitive_offer',
      CUSTOMER_REQUEST: 'customer_request',
      AUTOMATIC_UPGRADE: 'automatic_upgrade'
    };

    // Upgrade urgency levels
    this.urgencyLevels = {
      CRITICAL: 'critical',
      HIGH: 'high',
      MEDIUM: 'medium',
      LOW: 'low',
      OPPORTUNISTIC: 'opportunistic'
    };
  }

  /**
   * Analyze customer usage and generate expansion recommendations
   * @param {string} customerId - Customer ID
   * @param {Object} options - Analysis options
   * @returns {Promise<Object>} Expansion recommendations
   */
  async analyzeExpansionOpportunities(customerId, options = {}) {
    try {
      const {
        includePredictions = true,
        timeRange = '90d',
        refresh = false
      } = options;

      // Check cache if not refreshing
      if (!refresh && this.recommendations.has(customerId)) {
        const cached = this.recommendations.get(customerId);
        if (Date.now() - cached.timestamp < 10 * 60 * 1000) { // 10 minutes
          return cached.data;
        }
      }

      // Fetch comprehensive analysis
      const [
        usageAnalysis,
        featureDemand,
        growthPrediction,
        competitiveAnalysis,
        billingOptimization
      ] = await Promise.all([
        this.analyzeUsagePatterns(customerId, timeRange),
        this.analyzeFeatureDemand(customerId, timeRange),
        this.predictGrowth(customerId, timeRange),
        this.analyzeCompetitivePosition(customerId),
        this.analyzeBillingOptimization(customerId, timeRange)
      ]);

      // Generate recommendations
      const recommendations = await this.generateRecommendations(
        customerId,
        usageAnalysis,
        featureDemand,
        growthPrediction,
        competitiveAnalysis,
        billingOptimization
      );

      // Calculate expansion potential
      const expansionPotential = this.calculateExpansionPotential(recommendations);

      // Create comprehensive analysis
      const analysis = {
        customerId,
        timestamp: new Date().toISOString(),
        timeRange,
        usageAnalysis,
        featureDemand,
        growthPrediction,
        competitiveAnalysis,
        billingOptimization,
        recommendations,
        expansionPotential,
        nextBestAction: this.determineNextBestAction(recommendations)
      };

      // Cache the result
      this.recommendations.set(customerId, {
        data: analysis,
        timestamp: Date.now()
      });

      return analysis;
    } catch (error) {
      console.error('Error analyzing expansion opportunities:', error);
      throw error;
    }
  }

  /**
   * Analyze usage patterns for expansion opportunities
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for analysis
   * @returns {Promise<Object>} Usage analysis
   */
  async analyzeUsagePatterns(customerId, timeRange = '90d') {
    try {
      const response = await fetch(`${this.baseUrl}/usage-analysis/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch usage analysis: ${response.statusText}`);
      }

      const usageData = await response.json();
      
      // Calculate usage-based recommendations
      const recommendations = [];
      
      // Storage usage analysis
      if (usageData.storageUsage > usageData.storageLimit * 0.8) {
        recommendations.push({
          type: this.expansionTypes.STORAGE_UPGRADE,
          urgency: this.urgencyLevels.HIGH,
          reason: 'Storage usage approaching limit',
          currentUsage: usageData.storageUsage,
          currentLimit: usageData.storageLimit,
          suggestedUpgrade: this.calculateStorageUpgrade(usageData.storageUsage)
        });
      }
      
      // Transaction volume analysis
      if (usageData.transactionVolume > usageData.planLimit * 0.9) {
        recommendations.push({
          type: this.expansionTypes.TIER_UPGRADE,
          urgency: this.urgencyLevels.CRITICAL,
          reason: 'Transaction volume approaching plan limit',
          currentVolume: usageData.transactionVolume,
          planLimit: usageData.planLimit,
          suggestedTier: this.suggestNextTier(usageData.transactionVolume)
        });
      }
      
      // Feature usage analysis
      const underutilizedFeatures = this.identifyUnderutilizedFeatures(usageData.featureUsage);
      if (underutilizedFeatures.length > 0) {
        recommendations.push({
          type: this.expansionTypes.FEATURE_ADDON,
          urgency: this.urgencyLevels.MEDIUM,
          reason: 'Opportunity to unlock additional value',
          features: underutilizedFeatures,
          potentialValue: this.calculateFeatureValue(underutilizedFeatures)
        });
      }

      return {
        ...usageData,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing usage patterns:', error);
      return { recommendations: [] };
    }
  }

  /**
   * Analyze feature demand and usage
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for analysis
   * @returns {Promise<Object>} Feature demand analysis
   */
  async analyzeFeatureDemand(customerId, timeRange = '90d') {
    try {
      const response = await fetch(`${this.baseUrl}/feature-demand/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch feature demand: ${response.statusText}`);
      }

      const demandData = await response.json();
      
      // Identify high-demand features
      const highDemandFeatures = demandData.features.filter(feature => 
        feature.demandScore > 0.7 && !feature.isSubscribed
      );
      
      // Calculate demand-based recommendations
      const recommendations = highDemandFeatures.map(feature => ({
        type: this.expansionTypes.FEATURE_ADDON,
        urgency: this.calculateDemandUrgency(feature.demandScore),
        reason: `High demand for ${feature.name}`,
        feature: feature,
        potentialROI: this.calculateFeatureROI(feature)
      }));

      return {
        ...demandData,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing feature demand:', error);
      return { recommendations: [] };
    }
  }

  /**
   * Predict customer growth and expansion needs
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for prediction
   * @returns {Promise<Object>} Growth prediction
   */
  async predictGrowth(customerId, timeRange = '90d') {
    try {
      const response = await fetch(`${this.baseUrl}/growth-prediction/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch growth prediction: ${response.statusText}`);
      }

      const predictionData = await response.json();
      
      // Generate growth-based recommendations
      const recommendations = [];
      
      // Transaction growth prediction
      if (predictionData.transactionGrowth > 0.3) {
        recommendations.push({
          type: this.expansionTypes.TIER_UPGRADE,
          urgency: this.urgencyLevels.MEDIUM,
          reason: 'Anticipated growth in transaction volume',
          predictedGrowth: predictionData.transactionGrowth,
          timeframe: predictionData.timeframe,
          suggestedTier: this.suggestGrowthTier(predictionData.transactionGrowth)
        });
      }
      
      // User growth prediction
      if (predictionData.userGrowth > 0.2) {
        recommendations.push({
          type: this.expansionTypes.SEAT_EXPANSION,
          urgency: this.urgencyLevels.MEDIUM,
          reason: 'Anticipated growth in team size',
          predictedGrowth: predictionData.userGrowth,
          timeframe: predictionData.timeframe,
          suggestedSeats: this.calculateSuggestedSeats(predictionData.userGrowth)
        });
      }

      return {
        ...predictionData,
        recommendations
      };
    } catch (error) {
      console.error('Error predicting growth:', error);
      return { recommendations: [] };
    }
  }

  /**
   * Analyze competitive position and market opportunities
   * @param {string} customerId - Customer ID
   * @returns {Promise<Object>} Competitive analysis
   */
  async analyzeCompetitivePosition(customerId) {
    try {
      const response = await fetch(`${this.baseUrl}/competitive-analysis/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch competitive analysis: ${response.statusText}`);
      }

      const competitiveData = await response.json();
      
      // Generate competitive-based recommendations
      const recommendations = [];
      
      // Competitive feature gaps
      if (competitiveData.featureGaps.length > 0) {
        recommendations.push({
          type: this.expansionTypes.FEATURE_ADDON,
          urgency: this.urgencyLevels.HIGH,
          reason: 'Competitive advantage opportunity',
          gaps: competitiveData.featureGaps,
          competitiveValue: this.calculateCompetitiveValue(competitiveData.featureGaps)
        });
      }
      
      // Market positioning opportunities
      if (competitiveData.marketOpportunities.length > 0) {
        recommendations.push({
          type: this.expansionTypes.CUSTOM_FEATURE,
          urgency: this.urgencyLevels.MEDIUM,
          reason: 'Market differentiation opportunity',
          opportunities: competitiveData.marketOpportunities,
          marketValue: this.calculateMarketValue(competitiveData.marketOpportunities)
        });
      }

      return {
        ...competitiveData,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing competitive position:', error);
      return { recommendations: [] };
    }
  }

  /**
   * Analyze billing optimization opportunities
   * @param {string} customerId - Customer ID
   * @param {string} timeRange - Time range for analysis
   * @returns {Promise<Object>} Billing optimization analysis
   */
  async analyzeBillingOptimization(customerId, timeRange = '90d') {
    try {
      const response = await fetch(`${this.baseUrl}/billing-optimization/${customerId}?timeRange=${timeRange}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch billing optimization: ${response.statusText}`);
      }

      const billingData = await response.json();
      
      // Generate billing-based recommendations
      const recommendations = [];
      
      // Cost optimization opportunities
      if (billingData.costSavings > 0) {
        recommendations.push({
          type: this.expansionTypes.TIER_UPGRADE,
          urgency: this.urgencyLevels.MEDIUM,
          reason: 'Cost optimization opportunity',
          potentialSavings: billingData.costSavings,
          suggestedPlan: billingData.suggestedPlan,
          paybackPeriod: billingData.paybackPeriod
        });
      }
      
      // Usage-based pricing optimization
      if (billingData.usageOptimization) {
        recommendations.push({
          type: 'pricing_optimization',
          urgency: this.urgencyLevels.LOW,
          reason: 'Usage-based pricing optimization',
          currentPricing: billingData.currentPricing,
          optimizedPricing: billingData.optimizedPricing,
          potentialSavings: billingData.usageOptimization.savings
        });
      }

      return {
        ...billingData,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing billing optimization:', error);
      return { recommendations: [] };
    }
  }

  /**
   * Generate comprehensive expansion recommendations
   * @param {string} customerId - Customer ID
   * @param {Object} usageAnalysis - Usage analysis data
   * @param {Object} featureDemand - Feature demand data
   * @param {Object} growthPrediction - Growth prediction data
   * @param {Object} competitiveAnalysis - Competitive analysis data
   * @param {Object} billingOptimization - Billing optimization data
   * @returns {Promise<Array>} Comprehensive recommendations
   */
  async generateRecommendations(customerId, usageAnalysis, featureDemand, growthPrediction, competitiveAnalysis, billingOptimization) {
    try {
      // Combine all recommendations
      const allRecommendations = [
        ...usageAnalysis.recommendations,
        ...featureDemand.recommendations,
        ...growthPrediction.recommendations,
        ...competitiveAnalysis.recommendations,
        ...billingOptimization.recommendations
      ];

      // Prioritize recommendations
      const prioritizedRecommendations = this.prioritizeRecommendations(allRecommendations);

      // Add personalized messaging
      const personalizedRecommendations = await this.addPersonalizedMessaging(
        customerId,
        prioritizedRecommendations
      );

      // Calculate ROI and value for each recommendation
      const recommendationsWithROI = personalizedRecommendations.map(rec => ({
        ...rec,
        roi: this.calculateRecommendationROI(rec),
        value: this.calculateRecommendationValue(rec),
        implementationTime: this.estimateImplementationTime(rec)
      }));

      return recommendationsWithROI;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }

  /**
   * Prioritize recommendations based on urgency and value
   * @param {Array} recommendations - List of recommendations
   * @returns {Array} Prioritized recommendations
   */
  prioritizeRecommendations(recommendations) {
    const urgencyWeights = {
      [this.urgencyLevels.CRITICAL]: 100,
      [this.urgencyLevels.HIGH]: 80,
      [this.urgencyLevels.MEDIUM]: 60,
      [this.urgencyLevels.LOW]: 40,
      [this.urgencyLevels.OPPORTUNISTIC]: 20
    };

    return recommendations
      .map(rec => ({
        ...rec,
        priorityScore: urgencyWeights[rec.urgency] || 0
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore);
  }

  /**
   * Add personalized messaging to recommendations
   * @param {string} customerId - Customer ID
   * @param {Array} recommendations - Recommendations to personalize
   * @returns {Promise<Array>} Personalized recommendations
   */
  async addPersonalizedMessaging(customerId, recommendations) {
    try {
      // Fetch customer context
      const customerContext = await this.getCustomerContext(customerId);
      
      return recommendations.map(rec => ({
        ...rec,
        personalizedMessage: this.generatePersonalizedMessage(rec, customerContext),
        customerContext: customerContext
      }));
    } catch (error) {
      console.error('Error adding personalized messaging:', error);
      return recommendations;
    }
  }

  /**
   * Get customer context for personalization
   * @param {string} customerId - Customer ID
   * @returns {Promise<Object>} Customer context
   */
  async getCustomerContext(customerId) {
    try {
      const response = await fetch(`${this.baseUrl}/customer-context/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch customer context: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching customer context:', error);
      return {};
    }
  }

  /**
   * Generate personalized message for recommendation
   * @param {Object} recommendation - Recommendation data
   * @param {Object} customerContext - Customer context
   * @returns {string} Personalized message
   */
  generatePersonalizedMessage(recommendation, customerContext) {
    const { type, urgency, reason } = recommendation;
    const { practiceName, industry, size } = customerContext;

    const urgencyMessages = {
      [this.urgencyLevels.CRITICAL]: 'Immediate action recommended',
      [this.urgencyLevels.HIGH]: 'High priority recommendation',
      [this.urgencyLevels.MEDIUM]: 'Consider this opportunity',
      [this.urgencyLevels.LOW]: 'Optional enhancement',
      [this.urgencyLevels.OPPORTUNISTIC]: 'Future consideration'
    };

    const typeMessages = {
      [this.expansionTypes.TIER_UPGRADE]: `Upgrade your plan to better support ${practiceName}'s growth`,
      [this.expansionTypes.FEATURE_ADDON]: `Unlock additional value with premium features`,
      [this.expansionTypes.SEAT_EXPANSION]: `Scale your team access as ${practiceName} grows`,
      [this.expansionTypes.STORAGE_UPGRADE]: `Ensure uninterrupted operations with expanded storage`,
      [this.expansionTypes.INTEGRATION_ADDON]: `Streamline workflows with additional integrations`,
      [this.expansionTypes.CUSTOM_FEATURE]: `Differentiate ${practiceName} with custom capabilities`
    };

    return `${urgencyMessages[urgency]}: ${typeMessages[type] || reason}`;
  }

  /**
   * Calculate expansion potential score
   * @param {Array} recommendations - Recommendations
   * @returns {Object} Expansion potential
   */
  calculateExpansionPotential(recommendations) {
    const totalValue = recommendations.reduce((sum, rec) => sum + (rec.value || 0), 0);
    const avgROI = recommendations.reduce((sum, rec) => sum + (rec.roi || 0), 0) / recommendations.length;
    const urgencyScore = recommendations.reduce((sum, rec) => {
      const urgencyWeights = { critical: 100, high: 80, medium: 60, low: 40, opportunistic: 20 };
      return sum + (urgencyWeights[rec.urgency] || 0);
    }, 0) / recommendations.length;

    return {
      score: Math.round((totalValue * 0.4 + avgROI * 0.3 + urgencyScore * 0.3) / 100),
      totalValue,
      avgROI: Math.round(avgROI),
      urgencyScore: Math.round(urgencyScore),
      recommendationCount: recommendations.length
    };
  }

  /**
   * Determine next best action
   * @param {Array} recommendations - Recommendations
   * @returns {Object} Next best action
   */
  determineNextBestAction(recommendations) {
    if (recommendations.length === 0) {
      return {
        action: 'monitor',
        reason: 'No immediate expansion opportunities identified',
        priority: 'low'
      };
    }

    const topRecommendation = recommendations[0];
    
    return {
      action: topRecommendation.type,
      reason: topRecommendation.reason,
      priority: topRecommendation.urgency,
      value: topRecommendation.value,
      roi: topRecommendation.roi
    };
  }

  /**
   * Create expansion offer
   * @param {string} customerId - Customer ID
   * @param {Object} offerData - Offer data
   * @returns {Promise<Object>} Created offer
   */
  async createExpansionOffer(customerId, offerData) {
    try {
      const response = await fetch(`${this.baseUrl}/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          ...offerData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create expansion offer: ${response.statusText}`);
      }

      const offer = await response.json();
      
      // Cache the offer
      this.expansionOffers.set(offer.id, offer);
      
      return offer;
    } catch (error) {
      console.error('Error creating expansion offer:', error);
      throw error;
    }
  }

  /**
   * Process expansion upgrade
   * @param {string} customerId - Customer ID
   * @param {string} upgradeType - Type of upgrade
   * @param {Object} upgradeData - Upgrade data
   * @returns {Promise<Object>} Upgrade result
   */
  async processExpansionUpgrade(customerId, upgradeType, upgradeData) {
    try {
      const response = await fetch(`${this.baseUrl}/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          upgradeType,
          upgradeData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to process upgrade: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Clear cache for this customer
      this.clearCustomerCache(customerId);
      
      return result;
    } catch (error) {
      console.error('Error processing expansion upgrade:', error);
      throw error;
    }
  }

  // Helper methods for calculations
  calculateStorageUpgrade(currentUsage) {
    const tiers = [100, 250, 500, 1000, 2000]; // GB
    return tiers.find(tier => tier > currentUsage * 1.5) || tiers[tiers.length - 1];
  }

  suggestNextTier(currentVolume) {
    const tiers = ['starter', 'professional', 'enterprise', 'premium'];
    const volumeThresholds = [1000, 5000, 20000, 50000];
    
    for (let i = 0; i < volumeThresholds.length; i++) {
      if (currentVolume < volumeThresholds[i]) {
        return tiers[i];
      }
    }
    return tiers[tiers.length - 1];
  }

  identifyUnderutilizedFeatures(featureUsage) {
    return Object.entries(featureUsage)
      .filter(([feature, usage]) => usage.adopted && usage.utilization < 0.3)
      .map(([feature, usage]) => ({
        name: feature,
        currentUtilization: usage.utilization,
        potentialValue: this.calculateFeatureValue([feature])
      }));
  }

  calculateFeatureValue(features) {
    const featureValues = {
      'advanced_analytics': 500,
      'custom_reports': 300,
      'api_access': 400,
      'priority_support': 200,
      'white_label': 1000,
      'multi_location': 600
    };
    
    return features.reduce((sum, feature) => sum + (featureValues[feature.name] || 100), 0);
  }

  calculateDemandUrgency(demandScore) {
    if (demandScore > 0.9) return this.urgencyLevels.CRITICAL;
    if (demandScore > 0.7) return this.urgencyLevels.HIGH;
    if (demandScore > 0.5) return this.urgencyLevels.MEDIUM;
    return this.urgencyLevels.LOW;
  }

  calculateFeatureROI(feature) {
    return Math.round((feature.estimatedValue / feature.cost) * 100);
  }

  suggestGrowthTier(growthRate) {
    if (growthRate > 0.5) return 'enterprise';
    if (growthRate > 0.3) return 'professional';
    return 'starter';
  }

  calculateSuggestedSeats(growthRate) {
    return Math.ceil(growthRate * 10);
  }

  calculateCompetitiveValue(gaps) {
    return gaps.reduce((sum, gap) => sum + (gap.value || 200), 0);
  }

  calculateMarketValue(opportunities) {
    return opportunities.reduce((sum, opp) => sum + (opp.value || 300), 0);
  }

  calculateRecommendationROI(recommendation) {
    const baseROI = 150; // Base 150% ROI
    const urgencyMultiplier = {
      [this.urgencyLevels.CRITICAL]: 2.0,
      [this.urgencyLevels.HIGH]: 1.5,
      [this.urgencyLevels.MEDIUM]: 1.2,
      [this.urgencyLevels.LOW]: 1.0,
      [this.urgencyLevels.OPPORTUNISTIC]: 0.8
    };
    
    return Math.round(baseROI * (urgencyMultiplier[recommendation.urgency] || 1.0));
  }

  calculateRecommendationValue(recommendation) {
    const baseValue = 1000;
    const typeMultiplier = {
      [this.expansionTypes.TIER_UPGRADE]: 1.5,
      [this.expansionTypes.FEATURE_ADDON]: 1.0,
      [this.expansionTypes.SEAT_EXPANSION]: 1.2,
      [this.expansionTypes.STORAGE_UPGRADE]: 0.8,
      [this.expansionTypes.INTEGRATION_ADDON]: 1.3,
      [this.expansionTypes.CUSTOM_FEATURE]: 2.0
    };
    
    return Math.round(baseValue * (typeMultiplier[recommendation.type] || 1.0));
  }

  estimateImplementationTime(recommendation) {
    const timeEstimates = {
      [this.expansionTypes.TIER_UPGRADE]: 'immediate',
      [this.expansionTypes.FEATURE_ADDON]: '1-2 days',
      [this.expansionTypes.SEAT_EXPANSION]: 'immediate',
      [this.expansionTypes.STORAGE_UPGRADE]: 'immediate',
      [this.expansionTypes.INTEGRATION_ADDON]: '3-5 days',
      [this.expansionTypes.CUSTOM_FEATURE]: '2-4 weeks'
    };
    
    return timeEstimates[recommendation.type] || '1-2 days';
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
    this.recommendations.delete(customerId);
    this.upgradeFlows.delete(customerId);
    this.billingChanges.delete(customerId);
    this.usageMetrics.delete(customerId);
  }

  /**
   * Clear all cache
   */
  clearAllCache() {
    this.recommendations.clear();
    this.upgradeFlows.clear();
    this.billingChanges.clear();
    this.expansionOffers.clear();
    this.usageMetrics.clear();
  }
}

// Create singleton instance
const smartExpansionEngine = new SmartExpansionEngine();

export default smartExpansionEngine; 