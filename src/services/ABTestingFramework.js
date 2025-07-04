import { API_BASE_URL } from '../constants';

class ABTestingFramework {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/ab-testing`;
    this.experiments = new Map();
    this.variants = new Map();
    this.results = new Map();
    this.userAssignments = new Map();
    
    // Experiment types
    this.experimentTypes = {
      UI_CHANGE: 'ui_change',
      FEATURE_FLAG: 'feature_flag',
      PRICING: 'pricing',
      CONTENT: 'content',
      WORKFLOW: 'workflow',
      MESSAGING: 'messaging'
    };

    // Variant types
    this.variantTypes = {
      CONTROL: 'control',
      TREATMENT: 'treatment',
      MULTI_VARIANT: 'multi_variant'
    };

    // Metrics
    this.metrics = {
      CONVERSION_RATE: 'conversion_rate',
      CLICK_THROUGH_RATE: 'click_through_rate',
      REVENUE_PER_USER: 'revenue_per_user',
      SESSION_DURATION: 'session_duration',
      BOUNCE_RATE: 'bounce_rate',
      FEATURE_ADOPTION: 'feature_adoption',
      USER_ENGAGEMENT: 'user_engagement',
      CUSTOM_METRIC: 'custom_metric'
    };

    // Statistical significance levels
    this.significanceLevels = {
      P90: 0.1,
      P95: 0.05,
      P99: 0.01
    };

    // Initialize framework
    this.initializeFramework();
  }

  /**
   * Initialize A/B testing framework
   */
  initializeFramework() {
    // Load active experiments
    this.loadActiveExperiments();
    
    // Set up experiment tracking
    this.setupExperimentTracking();
    
    // Set up automatic winner detection
    this.setupWinnerDetection();
  }

  /**
   * Create a new A/B test experiment
   * @param {Object} experimentData - Experiment configuration
   * @returns {Promise<Object>} Created experiment
   */
  async createExperiment(experimentData) {
    try {
      const response = await fetch(`${this.baseUrl}/experiments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...experimentData,
          status: 'draft',
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create experiment: ${response.statusText}`);
      }

      const experiment = await response.json();
      
      // Cache the experiment
      this.experiments.set(experiment.id, experiment);
      
      return experiment;
    } catch (error) {
      console.error('Error creating experiment:', error);
      throw error;
    }
  }

  /**
   * Start an experiment
   * @param {string} experimentId - Experiment ID
   * @param {Object} options - Start options
   * @returns {Promise<Object>} Started experiment
   */
  async startExperiment(experimentId, options = {}) {
    try {
      const {
        trafficAllocation = 0.1, // 10% of traffic
        duration = 14, // 14 days
        sampleSize = null
      } = options;

      const response = await fetch(`${this.baseUrl}/experiments/${experimentId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          trafficAllocation,
          duration,
          sampleSize,
          startDate: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to start experiment: ${response.statusText}`);
      }

      const experiment = await response.json();
      
      // Update cache
      this.experiments.set(experimentId, experiment);
      
      return experiment;
    } catch (error) {
      console.error('Error starting experiment:', error);
      throw error;
    }
  }

  /**
   * Stop an experiment
   * @param {string} experimentId - Experiment ID
   * @param {Object} options - Stop options
   * @returns {Promise<Object>} Stopped experiment
   */
  async stopExperiment(experimentId, options = {}) {
    try {
      const {
        implementWinner = false,
        forceStop = false
      } = options;

      const response = await fetch(`${this.baseUrl}/experiments/${experimentId}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          implementWinner,
          forceStop,
          endDate: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to stop experiment: ${response.statusText}`);
      }

      const experiment = await response.json();
      
      // Update cache
      this.experiments.set(experimentId, experiment);
      
      return experiment;
    } catch (error) {
      console.error('Error stopping experiment:', error);
      throw error;
    }
  }

  /**
   * Get user variant assignment
   * @param {string} experimentId - Experiment ID
   * @param {string} userId - User ID
   * @returns {string} Assigned variant
   */
  getUserVariant(experimentId, userId) {
    // Check if user is already assigned
    const assignmentKey = `${experimentId}_${userId}`;
    if (this.userAssignments.has(assignmentKey)) {
      return this.userAssignments.get(assignmentKey);
    }

    // Get experiment details
    const experiment = this.experiments.get(experimentId);
    if (!experiment || experiment.status !== 'active') {
      return 'control';
    }

    // Determine variant assignment
    const variant = this.determineVariantAssignment(experiment, userId);
    
    // Cache assignment
    this.userAssignments.set(assignmentKey, variant);
    
    // Track assignment
    this.trackVariantAssignment(experimentId, userId, variant);
    
    return variant;
  }

  /**
   * Determine variant assignment for user
   * @param {Object} experiment - Experiment data
   * @param {string} userId - User ID
   * @returns {string} Assigned variant
   */
  determineVariantAssignment(experiment, userId) {
    // Use consistent hashing for stable assignments
    const hash = this.hashString(userId + experiment.id);
    const normalizedHash = hash % 100;
    
    // Check if user is in experiment traffic
    if (normalizedHash >= experiment.trafficAllocation * 100) {
      return 'control';
    }
    
    // Assign to variant based on hash
    const variants = experiment.variants.filter(v => v.name !== 'control');
    const variantIndex = hash % variants.length;
    
    return variants[variantIndex]?.name || 'control';
  }

  /**
   * Track experiment event
   * @param {string} experimentId - Experiment ID
   * @param {string} eventType - Type of event
   * @param {Object} eventData - Event data
   */
  trackExperimentEvent(experimentId, eventType, eventData = {}) {
    const userId = this.getUserId();
    const variant = this.getUserVariant(experimentId, userId);
    
    const event = {
      experimentId,
      userId,
      variant,
      eventType,
      timestamp: new Date().toISOString(),
      data: eventData
    };

    // Send event to server
    this.sendExperimentEvent(event);
  }

  /**
   * Track conversion for experiment
   * @param {string} experimentId - Experiment ID
   * @param {Object} conversionData - Conversion data
   */
  trackConversion(experimentId, conversionData = {}) {
    this.trackExperimentEvent(experimentId, 'conversion', conversionData);
  }

  /**
   * Track impression for experiment
   * @param {string} experimentId - Experiment ID
   * @param {Object} impressionData - Impression data
   */
  trackImpression(experimentId, impressionData = {}) {
    this.trackExperimentEvent(experimentId, 'impression', impressionData);
  }

  /**
   * Get experiment results
   * @param {string} experimentId - Experiment ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Experiment results
   */
  async getExperimentResults(experimentId, options = {}) {
    try {
      const {
        includeRawData = false,
        includeStatisticalTests = true,
        timeRange = null
      } = options;

      const params = new URLSearchParams({
        includeRawData: includeRawData.toString(),
        includeStatisticalTests: includeStatisticalTests.toString()
      });

      if (timeRange) params.append('timeRange', timeRange);

      const response = await fetch(`${this.baseUrl}/experiments/${experimentId}/results?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch experiment results: ${response.statusText}`);
      }

      const results = await response.json();
      
      // Cache results
      this.results.set(experimentId, results);
      
      return results;
    } catch (error) {
      console.error('Error fetching experiment results:', error);
      throw error;
    }
  }

  /**
   * Calculate statistical significance
   * @param {Object} variantA - Variant A data
   * @param {Object} variantB - Variant B data
   * @param {string} metric - Metric to test
   * @returns {Object} Statistical test results
   */
  calculateStatisticalSignificance(variantA, variantB, metric) {
    const { mean: meanA, std: stdA, n: nA } = variantA[metric];
    const { mean: meanB, std: stdB, n: nB } = variantB[metric];
    
    // Calculate pooled standard error
    const pooledStd = Math.sqrt(((nA - 1) * stdA * stdA + (nB - 1) * stdB * stdB) / (nA + nB - 2));
    const standardError = pooledStd * Math.sqrt(1/nA + 1/nB);
    
    // Calculate t-statistic
    const tStat = (meanB - meanA) / standardError;
    
    // Calculate degrees of freedom
    const df = nA + nB - 2;
    
    // Calculate p-value (simplified)
    const pValue = this.calculatePValue(tStat, df);
    
    // Determine significance levels
    const significance = {
      p90: pValue < this.significanceLevels.P90,
      p95: pValue < this.significanceLevels.P95,
      p99: pValue < this.significanceLevels.P99
    };
    
    return {
      tStatistic: tStat,
      pValue: pValue,
      significance: significance,
      effectSize: (meanB - meanA) / pooledStd,
      confidenceInterval: this.calculateConfidenceInterval(meanB - meanA, standardError, df)
    };
  }

  /**
   * Determine experiment winner
   * @param {Object} results - Experiment results
   * @param {Object} options - Winner determination options
   * @returns {Object} Winner analysis
   */
  determineWinner(results, options = {}) {
    const {
      primaryMetric = 'conversion_rate',
      significanceLevel = 'p95',
      minimumSampleSize = 100,
      minimumLift = 0.05
    } = options;

    const variants = results.variants;
    const control = variants.find(v => v.name === 'control');
    const treatments = variants.filter(v => v.name !== 'control');
    
    if (!control || treatments.length === 0) {
      return { winner: null, reason: 'No valid variants to compare' };
    }

    let bestVariant = null;
    let bestLift = 0;
    let significantWinner = null;

    treatments.forEach(treatment => {
      // Check sample size
      if (treatment.sampleSize < minimumSampleSize) {
        return;
      }

      // Calculate lift
      const lift = (treatment[primaryMetric].mean - control[primaryMetric].mean) / control[primaryMetric].mean;
      
      if (lift > bestLift) {
        bestLift = lift;
        bestVariant = treatment;
      }

      // Check statistical significance
      const significance = this.calculateStatisticalSignificance(control, treatment, primaryMetric);
      
      if (significance.significance[significanceLevel] && lift > minimumLift) {
        significantWinner = treatment;
      }
    });

    return {
      winner: significantWinner || bestVariant,
      bestLift: bestLift,
      significantWinner: significantWinner !== null,
      reason: significantWinner ? 'Statistically significant winner' : 'No significant winner found'
    };
  }

  /**
   * Implement experiment winner
   * @param {string} experimentId - Experiment ID
   * @param {Object} options - Implementation options
   * @returns {Promise<Object>} Implementation result
   */
  async implementWinner(experimentId, options = {}) {
    try {
      const {
        winnerVariant = null,
        rolloutPercentage = 100,
        gradualRollout = false
      } = options;

      const response = await fetch(`${this.baseUrl}/experiments/${experimentId}/implement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          winnerVariant,
          rolloutPercentage,
          gradualRollout,
          implementedAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to implement winner: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error implementing winner:', error);
      throw error;
    }
  }

  /**
   * Create hypothesis test
   * @param {Object} hypothesisData - Hypothesis data
   * @returns {Promise<Object>} Created hypothesis
   */
  async createHypothesis(hypothesisData) {
    try {
      const response = await fetch(`${this.baseUrl}/hypotheses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          ...hypothesisData,
          status: 'proposed',
          createdAt: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create hypothesis: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating hypothesis:', error);
      throw error;
    }
  }

  /**
   * Get experiment recommendations
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Experiment recommendations
   */
  async getExperimentRecommendations(options = {}) {
    try {
      const {
        basedOn = 'performance',
        limit = 10,
        includeHistorical = true
      } = options;

      const params = new URLSearchParams({
        basedOn,
        limit: limit.toString(),
        includeHistorical: includeHistorical.toString()
      });

      const response = await fetch(`${this.baseUrl}/recommendations?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }

  // Helper methods
  loadActiveExperiments() {
    // Load active experiments from server
    this.fetchActiveExperiments();
  }

  async fetchActiveExperiments() {
    try {
      const response = await fetch(`${this.baseUrl}/experiments/active`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (response.ok) {
        const experiments = await response.json();
        experiments.forEach(exp => {
          this.experiments.set(exp.id, exp);
        });
      }
    } catch (error) {
      console.error('Error fetching active experiments:', error);
    }
  }

  setupExperimentTracking() {
    // Set up automatic tracking for active experiments
    this.experiments.forEach(experiment => {
      if (experiment.status === 'active') {
        this.setupExperimentTracking(experiment);
      }
    });
  }

  setupWinnerDetection() {
    // Check for winners every hour
    setInterval(() => {
      this.checkForWinners();
    }, 3600000);
  }

  async checkForWinners() {
    this.experiments.forEach(async (experiment) => {
      if (experiment.status === 'active') {
        const results = await this.getExperimentResults(experiment.id);
        const winner = this.determineWinner(results);
        
        if (winner.winner && winner.significantWinner) {
          // Notify about winner
          this.notifyWinner(experiment, winner);
        }
      }
    });
  }

  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  calculatePValue(tStat, df) {
    // Simplified p-value calculation
    // In production, use a proper statistical library
    const absT = Math.abs(tStat);
    if (absT > 3.291) return 0.001;
    if (absT > 2.576) return 0.01;
    if (absT > 1.96) return 0.05;
    if (absT > 1.645) return 0.1;
    return 0.5;
  }

  calculateConfidenceInterval(difference, standardError, df) {
    const tValue = 1.96; // 95% confidence interval
    const margin = tValue * standardError;
    return {
      lower: difference - margin,
      upper: difference + margin
    };
  }

  trackVariantAssignment(experimentId, userId, variant) {
    const event = {
      experimentId,
      userId,
      variant,
      eventType: 'assignment',
      timestamp: new Date().toISOString()
    };

    this.sendExperimentEvent(event);
  }

  async sendExperimentEvent(event) {
    try {
      await fetch(`${this.baseUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Error sending experiment event:', error);
    }
  }

  notifyWinner(experiment, winner) {
    // Send notification about winner
    console.log(`Winner detected for experiment ${experiment.name}:`, winner);
    
    // In production, send email/notification to stakeholders
  }

  getUserId() {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId') || 'anonymous';
  }

  /**
   * Get authentication token
   * @returns {string} Auth token
   */
  getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  }

  /**
   * Clear all experiment data
   */
  clearExperimentData() {
    this.experiments.clear();
    this.variants.clear();
    this.results.clear();
    this.userAssignments.clear();
  }
}

// Create singleton instance
const abTestingFramework = new ABTestingFramework();

export default abTestingFramework; 