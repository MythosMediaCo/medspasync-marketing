import { API_BASE_URL } from '../constants';

class UserBehaviorTracking {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/analytics`;
    this.events = [];
    this.sessionData = {};
    this.funnelData = {};
    this.cohortData = {};
    this.realTimeData = {};
    
    // Event types
    this.eventTypes = {
      PAGE_VIEW: 'page_view',
      BUTTON_CLICK: 'button_click',
      FORM_SUBMIT: 'form_submit',
      FEATURE_USE: 'feature_use',
      ERROR: 'error',
      CONVERSION: 'conversion',
      SESSION_START: 'session_start',
      SESSION_END: 'session_end',
      USER_ACTION: 'user_action',
      SYSTEM_EVENT: 'system_event'
    };

    // Funnel stages
    this.funnelStages = {
      LANDING: 'landing',
      SIGNUP: 'signup',
      ONBOARDING: 'onboarding',
      FIRST_USE: 'first_use',
      FEATURE_ADOPTION: 'feature_adoption',
      UPGRADE: 'upgrade',
      RETENTION: 'retention'
    };

    // Cohort types
    this.cohortTypes = {
      SIGNUP_DATE: 'signup_date',
      FEATURE_ADOPTION: 'feature_adoption',
      PLAN_TYPE: 'plan_type',
      GEOGRAPHIC: 'geographic',
      BEHAVIORAL: 'behavioral'
    };

    // Initialize tracking
    this.initializeTracking();
  }

  /**
   * Initialize user behavior tracking
   */
  initializeTracking() {
    // Set up session tracking
    this.startSession();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Set up periodic data sending
    this.setupPeriodicSending();
    
    // Set up real-time tracking
    this.setupRealTimeTracking();
  }

  /**
   * Start a new user session
   */
  startSession() {
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      utmParams: this.extractUTMParams(),
      deviceType: this.detectDeviceType(),
      browser: this.detectBrowser()
    };

    // Track session start
    this.trackEvent(this.eventTypes.SESSION_START, {
      sessionId: this.sessionData.sessionId,
      ...this.sessionData
    });
  }

  /**
   * Set up event listeners for automatic tracking
   */
  setupEventListeners() {
    // Page view tracking
    this.trackPageView();

    // Button click tracking
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        this.trackEvent(this.eventTypes.BUTTON_CLICK, {
          elementId: button.id,
          elementText: button.textContent?.trim(),
          elementClass: button.className,
          page: window.location.pathname
        });
      }
    });

    // Form submission tracking
    document.addEventListener('submit', (e) => {
      this.trackEvent(this.eventTypes.FORM_SUBMIT, {
        formId: e.target.id,
        formAction: e.target.action,
        formMethod: e.target.method,
        page: window.location.pathname
      });
    });

    // Error tracking
    window.addEventListener('error', (e) => {
      this.trackEvent(this.eventTypes.ERROR, {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        stack: e.error?.stack
      });
    });

    // Unhandled promise rejection tracking
    window.addEventListener('unhandledrejection', (e) => {
      this.trackEvent(this.eventTypes.ERROR, {
        type: 'unhandledrejection',
        reason: e.reason,
        promise: e.promise
      });
    });
  }

  /**
   * Set up periodic data sending
   */
  setupPeriodicSending() {
    // Send events every 30 seconds
    setInterval(() => {
      this.sendEvents();
    }, 30000);

    // Send session data every 5 minutes
    setInterval(() => {
      this.updateSession();
    }, 300000);
  }

  /**
   * Set up real-time tracking
   */
  setupRealTimeTracking() {
    // Track user engagement
    let lastActivity = Date.now();
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    activityEvents.forEach(eventType => {
      document.addEventListener(eventType, () => {
        lastActivity = Date.now();
      });
    });

    // Check for user inactivity
    setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 300000) { // 5 minutes
        this.trackEvent(this.eventTypes.USER_ACTION, {
          type: 'inactivity',
          duration: inactiveTime
        });
      }
    }, 60000);
  }

  /**
   * Track a custom event
   * @param {string} eventType - Type of event
   * @param {Object} eventData - Event data
   * @param {Object} options - Tracking options
   */
  trackEvent(eventType, eventData = {}, options = {}) {
    const event = {
      id: this.generateEventId(),
      type: eventType,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionData.sessionId,
      userId: this.getUserId(),
      page: window.location.pathname,
      url: window.location.href,
      data: eventData,
      ...options
    };

    // Add to events queue
    this.events.push(event);

    // Send immediately if critical event
    if (options.immediate || eventType === this.eventTypes.CONVERSION) {
      this.sendEvent(event);
    }

    // Update real-time data
    this.updateRealTimeData(event);

    return event;
  }

  /**
   * Track page view
   */
  trackPageView() {
    this.trackEvent(this.eventTypes.PAGE_VIEW, {
      title: document.title,
      referrer: document.referrer,
      loadTime: this.measurePageLoadTime()
    });
  }

  /**
   * Track feature usage
   * @param {string} featureName - Name of the feature
   * @param {Object} featureData - Feature usage data
   */
  trackFeatureUse(featureName, featureData = {}) {
    this.trackEvent(this.eventTypes.FEATURE_USE, {
      feature: featureName,
      ...featureData
    });
  }

  /**
   * Track conversion event
   * @param {string} conversionType - Type of conversion
   * @param {Object} conversionData - Conversion data
   */
  trackConversion(conversionType, conversionData = {}) {
    this.trackEvent(this.eventTypes.CONVERSION, {
      type: conversionType,
      value: conversionData.value || 0,
      currency: conversionData.currency || 'USD',
      ...conversionData
    }, { immediate: true });
  }

  /**
   * Track funnel progression
   * @param {string} funnelName - Name of the funnel
   * @param {string} stage - Current stage
   * @param {Object} stageData - Stage data
   */
  trackFunnelStage(funnelName, stage, stageData = {}) {
    this.trackEvent('funnel_stage', {
      funnel: funnelName,
      stage: stage,
      ...stageData
    });

    // Update funnel data
    if (!this.funnelData[funnelName]) {
      this.funnelData[funnelName] = {};
    }
    this.funnelData[funnelName][stage] = {
      timestamp: new Date().toISOString(),
      data: stageData
    };
  }

  /**
   * Send events to server
   */
  async sendEvents() {
    if (this.events.length === 0) return;

    try {
      const eventsToSend = [...this.events];
      this.events = []; // Clear the queue

      const response = await fetch(`${this.baseUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          events: eventsToSend,
          sessionId: this.sessionData.sessionId,
          userId: this.getUserId()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send events: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending events:', error);
      // Re-add events to queue for retry
      this.events.unshift(...this.events);
    }
  }

  /**
   * Send single event immediately
   * @param {Object} event - Event to send
   */
  async sendEvent(event) {
    try {
      const response = await fetch(`${this.baseUrl}/events/single`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error(`Failed to send event: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending single event:', error);
    }
  }

  /**
   * Update session data
   */
  async updateSession() {
    try {
      const sessionUpdate = {
        sessionId: this.sessionData.sessionId,
        userId: this.getUserId(),
        duration: Date.now() - new Date(this.sessionData.startTime).getTime(),
        pageViews: this.events.filter(e => e.type === this.eventTypes.PAGE_VIEW).length,
        events: this.events.length,
        lastActivity: new Date().toISOString()
      };

      const response = await fetch(`${this.baseUrl}/sessions/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(sessionUpdate)
      });

      if (!response.ok) {
        throw new Error(`Failed to update session: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating session:', error);
    }
  }

  /**
   * Get funnel analytics
   * @param {string} funnelName - Name of the funnel
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Funnel analytics
   */
  async getFunnelAnalytics(funnelName, options = {}) {
    try {
      const {
        timeRange = '30d',
        segmentBy = null,
        includeDetails = false
      } = options;

      const params = new URLSearchParams({
        funnel: funnelName,
        timeRange,
        includeDetails: includeDetails.toString()
      });

      if (segmentBy) params.append('segmentBy', segmentBy);

      const response = await fetch(`${this.baseUrl}/funnels/${funnelName}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch funnel analytics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching funnel analytics:', error);
      throw error;
    }
  }

  /**
   * Get cohort analysis
   * @param {string} cohortType - Type of cohort
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Cohort analysis
   */
  async getCohortAnalysis(cohortType, options = {}) {
    try {
      const {
        timeRange = '90d',
        metric = 'retention',
        includeDetails = false
      } = options;

      const params = new URLSearchParams({
        cohortType,
        timeRange,
        metric,
        includeDetails: includeDetails.toString()
      });

      const response = await fetch(`${this.baseUrl}/cohorts?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cohort analysis: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching cohort analysis:', error);
      throw error;
    }
  }

  /**
   * Get real-time analytics
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Real-time analytics
   */
  async getRealTimeAnalytics(options = {}) {
    try {
      const {
        includeEvents = false,
        includeSessions = false
      } = options;

      const params = new URLSearchParams({
        includeEvents: includeEvents.toString(),
        includeSessions: includeSessions.toString()
      });

      const response = await fetch(`${this.baseUrl}/realtime?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch real-time analytics: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching real-time analytics:', error);
      throw error;
    }
  }

  /**
   * Get user behavior insights
   * @param {string} userId - User ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} User insights
   */
  async getUserInsights(userId, options = {}) {
    try {
      const {
        timeRange = '30d',
        includeEvents = true,
        includeSessions = true
      } = options;

      const params = new URLSearchParams({
        timeRange,
        includeEvents: includeEvents.toString(),
        includeSessions: includeSessions.toString()
      });

      const response = await fetch(`${this.baseUrl}/users/${userId}/insights?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user insights: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user insights:', error);
      throw error;
    }
  }

  /**
   * Export analytics data
   * @param {Object} options - Export options
   * @returns {Promise<Blob>} Exported data
   */
  async exportAnalyticsData(options = {}) {
    try {
      const {
        format = 'json',
        timeRange = '30d',
        includeEvents = true,
        includeSessions = true,
        includeFunnels = true,
        includeCohorts = true
      } = options;

      const params = new URLSearchParams({
        format,
        timeRange,
        includeEvents: includeEvents.toString(),
        includeSessions: includeSessions.toString(),
        includeFunnels: includeFunnels.toString(),
        includeCohorts: includeCohorts.toString()
      });

      const response = await fetch(`${this.baseUrl}/export?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to export analytics data: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Error exporting analytics data:', error);
      throw error;
    }
  }

  // Helper methods
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateEventId() {
    return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getUserId() {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId') || 'anonymous';
  }

  extractUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      if (urlParams.has(param)) {
        utmParams[param] = urlParams.get(param);
      }
    });
    
    return utmParams;
  }

  detectDeviceType() {
    const userAgent = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return 'mobile';
    } else if (/iPad/i.test(userAgent)) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  measurePageLoadTime() {
    if (performance && performance.timing) {
      const timing = performance.timing;
      return timing.loadEventEnd - timing.navigationStart;
    }
    return null;
  }

  updateRealTimeData(event) {
    const now = new Date().toISOString();
    
    if (!this.realTimeData[event.type]) {
      this.realTimeData[event.type] = [];
    }
    
    this.realTimeData[event.type].push({
      timestamp: now,
      data: event.data
    });
    
    // Keep only last 100 events per type
    if (this.realTimeData[event.type].length > 100) {
      this.realTimeData[event.type] = this.realTimeData[event.type].slice(-100);
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
   * End current session
   */
  endSession() {
    this.trackEvent(this.eventTypes.SESSION_END, {
      sessionId: this.sessionData.sessionId,
      duration: Date.now() - new Date(this.sessionData.startTime).getTime()
    });
    
    // Send remaining events
    this.sendEvents();
  }

  /**
   * Clear all tracking data
   */
  clearTrackingData() {
    this.events = [];
    this.sessionData = {};
    this.funnelData = {};
    this.cohortData = {};
    this.realTimeData = {};
  }
}

// Create singleton instance
const userBehaviorTracking = new UserBehaviorTracking();

// Handle page unload
window.addEventListener('beforeunload', () => {
  userBehaviorTracking.endSession();
});

export default userBehaviorTracking; 