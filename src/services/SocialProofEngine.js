class SocialProofEngine {
  constructor() {
    this.liveStats = {
      totalCustomers: 0,
      recentSignups: [],
      activeUsers: 0,
      successStories: [],
      trustBadges: [],
      usageStats: {}
    };
    
    this.updateInterval = null;
    this.callbacks = new Set();
    this.isRunning = false;
  }

  // Initialize the social proof engine
  async initialize() {
    try {
      await this.loadInitialData();
      this.startLiveUpdates();
      this.isRunning = true;
      console.log('SocialProofEngine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize SocialProofEngine:', error);
    }
  }

  // Load initial data from backend
  async loadInitialData() {
    try {
      const response = await fetch('/api/social-proof/initial-data');
      const data = await response.json();
      
      this.liveStats = {
        ...this.liveStats,
        ...data
      };
      
      this.notifySubscribers();
    } catch (error) {
      console.error('Failed to load initial social proof data:', error);
      // Fallback to mock data
      this.loadMockData();
    }
  }

  // Start live updates
  startLiveUpdates() {
    this.updateInterval = setInterval(() => {
      this.updateLiveStats();
    }, 5000); // Update every 5 seconds
  }

  // Update live statistics
  async updateLiveStats() {
    try {
      // Simulate real-time updates
      this.liveStats.totalCustomers += Math.floor(Math.random() * 3);
      this.liveStats.activeUsers = Math.floor(this.liveStats.totalCustomers * 0.7);
      
      // Add recent signup
      if (Math.random() > 0.7) {
        this.addRecentSignup();
      }
      
      // Update usage stats
      this.updateUsageStats();
      
      this.notifySubscribers();
    } catch (error) {
      console.error('Failed to update live stats:', error);
    }
  }

  // Add a recent signup notification
  addRecentSignup() {
    const practiceTypes = ['Medical Spa', 'Dermatology Clinic', 'Plastic Surgery', 'Aesthetic Center'];
    const locations = ['New York, NY', 'Los Angeles, CA', 'Miami, FL', 'Chicago, IL', 'Dallas, TX'];
    const timeAgo = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago'];
    
    const newSignup = {
      id: Date.now(),
      practiceName: this.generatePracticeName(),
      practiceType: practiceTypes[Math.floor(Math.random() * practiceTypes.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      timeAgo: timeAgo[Math.floor(Math.random() * timeAgo.length)],
      avatar: this.generateAvatar()
    };
    
    this.liveStats.recentSignups.unshift(newSignup);
    
    // Keep only last 10 signups
    if (this.liveStats.recentSignups.length > 10) {
      this.liveStats.recentSignups = this.liveStats.recentSignups.slice(0, 10);
    }
  }

  // Generate realistic practice name
  generatePracticeName() {
    const prefixes = ['Advanced', 'Elite', 'Premier', 'Modern', 'Innovative', 'Professional'];
    const suffixes = ['Medical Spa', 'Aesthetics', 'Dermatology', 'Wellness', 'Beauty', 'Care'];
    const names = ['Skin', 'Glow', 'Radiance', 'Vitality', 'Harmony', 'Essence'];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `${prefix} ${name} ${suffix}`;
  }

  // Generate avatar placeholder
  generateAvatar() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#38f9d7'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `https://ui-avatars.com/api/?background=${color.replace('#', '')}&color=fff&size=40&name=MS`;
  }

  // Update usage statistics
  updateUsageStats() {
    this.liveStats.usageStats = {
      transactionsProcessed: this.liveStats.totalCustomers * 150 + Math.floor(Math.random() * 1000),
      reconciliationAccuracy: 94.7 + (Math.random() - 0.5) * 0.6,
      timeSaved: this.liveStats.totalCustomers * 12 + Math.floor(Math.random() * 50),
      revenueRecovered: this.liveStats.totalCustomers * 2500 + Math.floor(Math.random() * 10000)
    };
  }

  // Load mock data for development
  loadMockData() {
    this.liveStats = {
      totalCustomers: 1247,
      activeUsers: 873,
      recentSignups: [
        {
          id: 1,
          practiceName: 'Elite Radiance Medical Spa',
          practiceType: 'Medical Spa',
          location: 'Beverly Hills, CA',
          timeAgo: '2 minutes ago',
          avatar: 'https://ui-avatars.com/api/?background=667eea&color=fff&size=40&name=ER'
        },
        {
          id: 2,
          practiceName: 'Advanced Skin Aesthetics',
          practiceType: 'Dermatology Clinic',
          location: 'Miami, FL',
          timeAgo: '5 minutes ago',
          avatar: 'https://ui-avatars.com/api/?background=764ba2&color=fff&size=40&name=AS'
        },
        {
          id: 3,
          practiceName: 'Premier Wellness Care',
          practiceType: 'Aesthetic Center',
          location: 'New York, NY',
          timeAgo: '8 minutes ago',
          avatar: 'https://ui-avatars.com/api/?background=f093fb&color=fff&size=40&name=PW'
        }
      ],
      successStories: [
        {
          id: 1,
          practiceName: 'Glow Medical Spa',
          location: 'Austin, TX',
          testimonial: 'MedSpaSync Pro saved us 15 hours per month and recovered $3,200 in lost revenue.',
          improvement: '40% efficiency increase',
          avatar: 'https://ui-avatars.com/api/?background=4facfe&color=fff&size=60&name=GM'
        },
        {
          id: 2,
          practiceName: 'Vitality Dermatology',
          location: 'Seattle, WA',
          testimonial: 'The AI accuracy is incredible. We caught discrepancies we never would have found manually.',
          improvement: '95% error detection',
          avatar: 'https://ui-avatars.com/api/?background=43e97b&color=fff&size=60&name=VD'
        }
      ],
      trustBadges: [
        { name: 'HIPAA Compliant', icon: 'shield-check' },
        { name: 'SOC 2 Type II', icon: 'certificate' },
        { name: '99.9% Uptime', icon: 'server' },
        { name: '24/7 Support', icon: 'headset' }
      ],
      usageStats: {
        transactionsProcessed: 187050,
        reconciliationAccuracy: 94.7,
        timeSaved: 14960,
        revenueRecovered: 3117500
      }
    };
  }

  // Subscribe to live updates
  subscribe(callback) {
    this.callbacks.add(callback);
    // Immediately call with current data
    callback(this.liveStats);
    
    return () => {
      this.callbacks.delete(callback);
    };
  }

  // Notify all subscribers
  notifySubscribers() {
    this.callbacks.forEach(callback => {
      try {
        callback(this.liveStats);
      } catch (error) {
        console.error('Error in social proof callback:', error);
      }
    });
  }

  // Get current stats
  getStats() {
    return this.liveStats;
  }

  // Get formatted customer count
  getFormattedCustomerCount() {
    if (this.liveStats.totalCustomers >= 1000000) {
      return `${(this.liveStats.totalCustomers / 1000000).toFixed(1)}M+`;
    } else if (this.liveStats.totalCustomers >= 1000) {
      return `${(this.liveStats.totalCustomers / 1000).toFixed(1)}K+`;
    }
    return this.liveStats.totalCustomers.toString();
  }

  // Get recent signups for display
  getRecentSignups(limit = 5) {
    return this.liveStats.recentSignups.slice(0, limit);
  }

  // Get success stories
  getSuccessStories() {
    return this.liveStats.successStories;
  }

  // Get trust badges
  getTrustBadges() {
    return this.liveStats.trustBadges;
  }

  // Get usage statistics
  getUsageStats() {
    return this.liveStats.usageStats;
  }

  // Get live notification text
  getLiveNotification() {
    const signups = this.liveStats.recentSignups;
    if (signups.length === 0) return null;
    
    const latest = signups[0];
    return `${latest.practiceName} just joined MedSpaSync Pro`;
  }

  // Get social proof metrics for landing page
  getLandingPageMetrics() {
    return {
      totalCustomers: this.getFormattedCustomerCount(),
      activeUsers: this.liveStats.activeUsers.toLocaleString(),
      transactionsProcessed: this.liveStats.usageStats.transactionsProcessed.toLocaleString(),
      accuracy: this.liveStats.usageStats.reconciliationAccuracy.toFixed(1),
      timeSaved: this.liveStats.usageStats.timeSaved.toLocaleString(),
      revenueRecovered: `$${(this.liveStats.usageStats.revenueRecovered / 1000000).toFixed(1)}M`
    };
  }

  // Track user interaction with social proof
  trackInteraction(type, data = {}) {
    try {
      const interaction = {
        type,
        data,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId()
      };
      
      // Send to analytics
      fetch('/api/analytics/social-proof-interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interaction)
      }).catch(error => {
        console.error('Failed to track social proof interaction:', error);
      });
    } catch (error) {
      console.error('Error tracking social proof interaction:', error);
    }
  }

  // Get session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('medspasync_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('medspasync_session_id', sessionId);
    }
    return sessionId;
  }

  // Stop live updates
  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.isRunning = false;
  }

  // Cleanup
  destroy() {
    this.stop();
    this.callbacks.clear();
  }
}

// Create singleton instance
const socialProofEngine = new SocialProofEngine();

export default socialProofEngine; 