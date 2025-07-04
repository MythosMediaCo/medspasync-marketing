import { API_BASE_URL } from '../constants';

class AutomatedInterventionSystem {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/interventions`;
    this.interventions = new Map();
    this.triggers = new Map();
    this.templates = new Map();
    this.schedules = new Map();
    this.escalations = new Map();
    
    // Intervention types
    this.interventionTypes = {
      EMAIL: 'email',
      IN_APP: 'in_app',
      SMS: 'sms',
      CALL: 'call',
      ESCALATION: 'escalation'
    };

    // Trigger conditions
    this.triggerConditions = {
      HEALTH_SCORE_DROP: 'health_score_drop',
      FEATURE_ADOPTION_LOW: 'feature_adoption_low',
      ENGAGEMENT_DECLINE: 'engagement_decline',
      SUPPORT_TICKETS_HIGH: 'support_tickets_high',
      BILLING_ISSUES: 'billing_issues',
      CHURN_RISK_HIGH: 'churn_risk_high',
      MILESTONE_ACHIEVED: 'milestone_achieved',
      ONBOARDING_STUCK: 'onboarding_stuck',
      VALUE_NOT_REALIZED: 'value_not_realized'
    };

    // Priority levels
    this.priorities = {
      CRITICAL: 'critical',
      HIGH: 'high',
      MEDIUM: 'medium',
      LOW: 'low'
    };
  }

  /**
   * Create a new intervention
   * @param {Object} interventionData - Intervention configuration
   * @returns {Promise<Object>} Created intervention
   */
  async createIntervention(interventionData) {
    try {
      const response = await fetch(`${this.baseUrl}/interventions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(interventionData)
      });

      if (!response.ok) {
        throw new Error(`Failed to create intervention: ${response.statusText}`);
      }

      const intervention = await response.json();
      
      // Cache the intervention
      this.interventions.set(intervention.id, intervention);
      
      return intervention;
    } catch (error) {
      console.error('Error creating intervention:', error);
      throw error;
    }
  }

  /**
   * Trigger intervention based on conditions
   * @param {string} customerId - Customer ID
   * @param {string} triggerType - Type of trigger
   * @param {Object} triggerData - Trigger data
   * @returns {Promise<Object>} Triggered intervention
   */
  async triggerIntervention(customerId, triggerType, triggerData = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          triggerType,
          triggerData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to trigger intervention: ${response.statusText}`);
      }

      const intervention = await response.json();
      
      // Execute the intervention
      await this.executeIntervention(intervention);
      
      return intervention;
    } catch (error) {
      console.error('Error triggering intervention:', error);
      throw error;
    }
  }

  /**
   * Execute an intervention
   * @param {Object} intervention - Intervention to execute
   * @returns {Promise<Object>} Execution result
   */
  async executeIntervention(intervention) {
    try {
      const { type, customerId, template, data } = intervention;
      
      switch (type) {
        case this.interventionTypes.EMAIL:
          return await this.sendAutomatedEmail(customerId, template, data);
        
        case this.interventionTypes.IN_APP:
          return await this.showInAppNotification(customerId, template, data);
        
        case this.interventionTypes.SMS:
          return await this.sendSMS(customerId, template, data);
        
        case this.interventionTypes.CALL:
          return await this.scheduleCall(customerId, template, data);
        
        case this.interventionTypes.ESCALATION:
          return await this.escalateToHuman(customerId, template, data);
        
        default:
          throw new Error(`Unknown intervention type: ${type}`);
      }
    } catch (error) {
      console.error('Error executing intervention:', error);
      throw error;
    }
  }

  /**
   * Send automated email intervention
   * @param {string} customerId - Customer ID
   * @param {string} templateId - Email template ID
   * @param {Object} data - Template data
   * @returns {Promise<Object>} Email result
   */
  async sendAutomatedEmail(customerId, templateId, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          templateId,
          data,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending automated email:', error);
      throw error;
    }
  }

  /**
   * Show in-app notification
   * @param {string} customerId - Customer ID
   * @param {string} templateId - Notification template ID
   * @param {Object} data - Template data
   * @returns {Promise<Object>} Notification result
   */
  async showInAppNotification(customerId, templateId, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/in-app-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          templateId,
          data,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to show notification: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error showing in-app notification:', error);
      throw error;
    }
  }

  /**
   * Send SMS intervention
   * @param {string} customerId - Customer ID
   * @param {string} templateId - SMS template ID
   * @param {Object} data - Template data
   * @returns {Promise<Object>} SMS result
   */
  async sendSMS(customerId, templateId, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          templateId,
          data,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send SMS: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }

  /**
   * Schedule call intervention
   * @param {string} customerId - Customer ID
   * @param {string} templateId - Call template ID
   * @param {Object} data - Template data
   * @returns {Promise<Object>} Call scheduling result
   */
  async scheduleCall(customerId, templateId, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/schedule-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          templateId,
          data,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to schedule call: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error scheduling call:', error);
      throw error;
    }
  }

  /**
   * Escalate to human support
   * @param {string} customerId - Customer ID
   * @param {string} templateId - Escalation template ID
   * @param {Object} data - Template data
   * @returns {Promise<Object>} Escalation result
   */
  async escalateToHuman(customerId, templateId, data = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/escalate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          templateId,
          data,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to escalate: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error escalating to human:', error);
      throw error;
    }
  }

  /**
   * Create milestone celebration intervention
   * @param {string} customerId - Customer ID
   * @param {string} milestoneType - Type of milestone
   * @param {Object} milestoneData - Milestone data
   * @returns {Promise<Object>} Milestone intervention
   */
  async createMilestoneCelebration(customerId, milestoneType, milestoneData = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/milestones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          milestoneType,
          milestoneData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create milestone celebration: ${response.statusText}`);
      }

      const milestone = await response.json();
      
      // Execute milestone celebration
      await this.executeMilestoneCelebration(milestone);
      
      return milestone;
    } catch (error) {
      console.error('Error creating milestone celebration:', error);
      throw error;
    }
  }

  /**
   * Execute milestone celebration
   * @param {Object} milestone - Milestone data
   * @returns {Promise<Object>} Celebration result
   */
  async executeMilestoneCelebration(milestone) {
    try {
      const { customerId, milestoneType, milestoneData } = milestone;
      
      // Create celebration notification
      const celebrationData = {
        type: 'milestone',
        title: this.getMilestoneTitle(milestoneType),
        message: this.getMilestoneMessage(milestoneType, milestoneData),
        icon: this.getMilestoneIcon(milestoneType),
        actions: this.getMilestoneActions(milestoneType)
      };

      // Show in-app celebration
      await this.showInAppNotification(customerId, 'milestone-celebration', celebrationData);
      
      // Send celebration email
      await this.sendAutomatedEmail(customerId, 'milestone-celebration', celebrationData);
      
      // Update customer progress
      await this.updateCustomerProgress(customerId, milestoneType, milestoneData);
      
      return { success: true, milestone };
    } catch (error) {
      console.error('Error executing milestone celebration:', error);
      throw error;
    }
  }

  /**
   * Get milestone title
   * @param {string} milestoneType - Milestone type
   * @returns {string} Milestone title
   */
  getMilestoneTitle(milestoneType) {
    const titles = {
      'first_reconciliation': '🎉 First Reconciliation Complete!',
      'tenth_reconciliation': '🎊 10 Reconciliations Milestone!',
      'hundredth_reconciliation': '🏆 100 Reconciliations Achieved!',
      'first_report': '📊 First Report Generated!',
      'feature_adoption': '🚀 Feature Adoption Milestone!',
      'time_savings': '⏰ Time Savings Milestone!',
      'roi_achievement': '💰 ROI Milestone Achieved!',
      'onboarding_complete': '✅ Onboarding Complete!',
      'support_resolution': '🛠️ Support Issue Resolved!'
    };
    
    return titles[milestoneType] || '🎉 Milestone Achieved!';
  }

  /**
   * Get milestone message
   * @param {string} milestoneType - Milestone type
   * @param {Object} data - Milestone data
   * @returns {string} Milestone message
   */
  getMilestoneMessage(milestoneType, data) {
    const messages = {
      'first_reconciliation': 'Congratulations! You\'ve completed your first reconciliation. You\'re on your way to streamlined financial management.',
      'tenth_reconciliation': 'Amazing! You\'ve completed 10 reconciliations. Your efficiency is improving with every transaction.',
      'hundredth_reconciliation': 'Incredible milestone! 100 reconciliations completed. You\'re a MedSpaSync Pro power user!',
      'first_report': 'Great job! You\'ve generated your first report. Discover insights that will help grow your practice.',
      'feature_adoption': `Excellent! You've adopted ${data.featureCount || 'multiple'} features. You're maximizing your platform value.`,
      'time_savings': `Fantastic! You've saved ${data.hoursSaved || 'significant'} hours this month. Time is money!`,
      'roi_achievement': `Outstanding! You've achieved ${data.roiPercentage || 'excellent'} ROI. Your investment is paying off!`,
      'onboarding_complete': 'Welcome aboard! You\'ve completed onboarding. You\'re ready to transform your practice management.',
      'support_resolution': 'Excellent! Your support issue has been resolved. We\'re here to help you succeed.'
    };
    
    return messages[milestoneType] || 'Congratulations on reaching this milestone!';
  }

  /**
   * Get milestone icon
   * @param {string} milestoneType - Milestone type
   * @returns {string} Milestone icon
   */
  getMilestoneIcon(milestoneType) {
    const icons = {
      'first_reconciliation': '🎯',
      'tenth_reconciliation': '🎪',
      'hundredth_reconciliation': '🏆',
      'first_report': '📊',
      'feature_adoption': '🚀',
      'time_savings': '⏰',
      'roi_achievement': '💰',
      'onboarding_complete': '✅',
      'support_resolution': '🛠️'
    };
    
    return icons[milestoneType] || '🎉';
  }

  /**
   * Get milestone actions
   * @param {string} milestoneType - Milestone type
   * @returns {Array} Milestone actions
   */
  getMilestoneActions(milestoneType) {
    const actions = {
      'first_reconciliation': [
        { label: 'View Results', action: 'view_reconciliation' },
        { label: 'Learn More', action: 'open_tutorial' }
      ],
      'tenth_reconciliation': [
        { label: 'View Analytics', action: 'view_analytics' },
        { label: 'Share Success', action: 'share_milestone' }
      ],
      'hundredth_reconciliation': [
        { label: 'View Dashboard', action: 'view_dashboard' },
        { label: 'Request Case Study', action: 'request_case_study' }
      ],
      'first_report': [
        { label: 'View Report', action: 'view_report' },
        { label: 'Create Custom Report', action: 'create_report' }
      ],
      'feature_adoption': [
        { label: 'Explore Features', action: 'explore_features' },
        { label: 'Advanced Training', action: 'request_training' }
      ],
      'time_savings': [
        { label: 'View Savings', action: 'view_savings' },
        { label: 'Optimize Further', action: 'optimize_workflow' }
      ],
      'roi_achievement': [
        { label: 'View ROI Report', action: 'view_roi' },
        { label: 'Share Success', action: 'share_roi' }
      ],
      'onboarding_complete': [
        { label: 'Start Using', action: 'go_to_dashboard' },
        { label: 'Get Support', action: 'contact_support' }
      ],
      'support_resolution': [
        { label: 'Continue Working', action: 'go_to_dashboard' },
        { label: 'Rate Support', action: 'rate_support' }
      ]
    };
    
    return actions[milestoneType] || [
      { label: 'Continue', action: 'dismiss' }
    ];
  }

  /**
   * Update customer progress
   * @param {string} customerId - Customer ID
   * @param {string} milestoneType - Milestone type
   * @param {Object} milestoneData - Milestone data
   * @returns {Promise<Object>} Update result
   */
  async updateCustomerProgress(customerId, milestoneType, milestoneData) {
    try {
      const response = await fetch(`${this.baseUrl}/progress/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          milestoneType,
          milestoneData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to update progress: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating customer progress:', error);
      throw error;
    }
  }

  /**
   * Create personalized guidance intervention
   * @param {string} customerId - Customer ID
   * @param {string} guidanceType - Type of guidance
   * @param {Object} guidanceData - Guidance data
   * @returns {Promise<Object>} Guidance intervention
   */
  async createPersonalizedGuidance(customerId, guidanceType, guidanceData = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/guidance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          customerId,
          guidanceType,
          guidanceData,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to create guidance: ${response.statusText}`);
      }

      const guidance = await response.json();
      
      // Execute guidance
      await this.executeGuidance(guidance);
      
      return guidance;
    } catch (error) {
      console.error('Error creating personalized guidance:', error);
      throw error;
    }
  }

  /**
   * Execute personalized guidance
   * @param {Object} guidance - Guidance data
   * @returns {Promise<Object>} Guidance result
   */
  async executeGuidance(guidance) {
    try {
      const { customerId, guidanceType, guidanceData } = guidance;
      
      // Create guidance notification
      const notificationData = {
        type: 'guidance',
        title: this.getGuidanceTitle(guidanceType),
        message: this.getGuidanceMessage(guidanceType, guidanceData),
        icon: this.getGuidanceIcon(guidanceType),
        actions: this.getGuidanceActions(guidanceType, guidanceData),
        priority: this.getGuidancePriority(guidanceType)
      };

      // Show in-app guidance
      await this.showInAppNotification(customerId, 'personalized-guidance', notificationData);
      
      // Send guidance email if high priority
      if (notificationData.priority === 'high' || notificationData.priority === 'critical') {
        await this.sendAutomatedEmail(customerId, 'personalized-guidance', notificationData);
      }
      
      return { success: true, guidance };
    } catch (error) {
      console.error('Error executing guidance:', error);
      throw error;
    }
  }

  /**
   * Get guidance title
   * @param {string} guidanceType - Guidance type
   * @returns {string} Guidance title
   */
  getGuidanceTitle(guidanceType) {
    const titles = {
      'feature_tip': '💡 Pro Tip',
      'workflow_optimization': '⚡ Workflow Optimization',
      'best_practice': '📋 Best Practice',
      'troubleshooting': '🔧 Quick Fix',
      'training_reminder': '🎓 Training Reminder',
      'security_alert': '🔒 Security Alert',
      'performance_tip': '📈 Performance Tip',
      'integration_opportunity': '🔗 Integration Opportunity'
    };
    
    return titles[guidanceType] || '💡 Helpful Tip';
  }

  /**
   * Get guidance message
   * @param {string} guidanceType - Guidance type
   * @param {Object} data - Guidance data
   * @returns {string} Guidance message
   */
  getGuidanceMessage(guidanceType, data) {
    const messages = {
      'feature_tip': data.message || 'Here\'s a helpful tip to make the most of this feature.',
      'workflow_optimization': data.message || 'Optimize your workflow to save time and improve efficiency.',
      'best_practice': data.message || 'Follow this best practice to ensure optimal results.',
      'troubleshooting': data.message || 'Quick solution to resolve this common issue.',
      'training_reminder': data.message || 'Complete this training to unlock advanced capabilities.',
      'security_alert': data.message || 'Important security update to protect your data.',
      'performance_tip': data.message || 'Boost your performance with this optimization.',
      'integration_opportunity': data.message || 'Connect with other tools to streamline your workflow.'
    };
    
    return messages[guidanceType] || data.message || 'Here\'s some helpful guidance for you.';
  }

  /**
   * Get guidance icon
   * @param {string} guidanceType - Guidance type
   * @returns {string} Guidance icon
   */
  getGuidanceIcon(guidanceType) {
    const icons = {
      'feature_tip': '💡',
      'workflow_optimization': '⚡',
      'best_practice': '📋',
      'troubleshooting': '🔧',
      'training_reminder': '🎓',
      'security_alert': '🔒',
      'performance_tip': '📈',
      'integration_opportunity': '🔗'
    };
    
    return icons[guidanceType] || '💡';
  }

  /**
   * Get guidance actions
   * @param {string} guidanceType - Guidance type
   * @param {Object} data - Guidance data
   * @returns {Array} Guidance actions
   */
  getGuidanceActions(guidanceType, data) {
    const baseActions = [
      { label: 'Learn More', action: 'view_guidance' },
      { label: 'Dismiss', action: 'dismiss' }
    ];

    const specificActions = {
      'feature_tip': [
        { label: 'Try Feature', action: 'open_feature' },
        { label: 'Watch Demo', action: 'watch_demo' }
      ],
      'workflow_optimization': [
        { label: 'Optimize Now', action: 'optimize_workflow' },
        { label: 'View Guide', action: 'view_guide' }
      ],
      'best_practice': [
        { label: 'Apply Practice', action: 'apply_practice' },
        { label: 'Read More', action: 'read_more' }
      ],
      'troubleshooting': [
        { label: 'Fix Issue', action: 'fix_issue' },
        { label: 'Get Help', action: 'get_help' }
      ],
      'training_reminder': [
        { label: 'Start Training', action: 'start_training' },
        { label: 'Schedule Later', action: 'schedule_training' }
      ],
      'security_alert': [
        { label: 'Update Now', action: 'update_security' },
        { label: 'Learn More', action: 'security_info' }
      ],
      'performance_tip': [
        { label: 'Optimize', action: 'optimize_performance' },
        { label: 'View Metrics', action: 'view_metrics' }
      ],
      'integration_opportunity': [
        { label: 'Connect Now', action: 'connect_integration' },
        { label: 'Learn More', action: 'integration_info' }
      ]
    };

    return specificActions[guidanceType] || baseActions;
  }

  /**
   * Get guidance priority
   * @param {string} guidanceType - Guidance type
   * @returns {string} Priority level
   */
  getGuidancePriority(guidanceType) {
    const priorities = {
      'security_alert': 'critical',
      'troubleshooting': 'high',
      'training_reminder': 'medium',
      'feature_tip': 'low',
      'workflow_optimization': 'medium',
      'best_practice': 'low',
      'performance_tip': 'medium',
      'integration_opportunity': 'low'
    };
    
    return priorities[guidanceType] || 'low';
  }

  /**
   * Get intervention history for a customer
   * @param {string} customerId - Customer ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Intervention history
   */
  async getInterventionHistory(customerId, options = {}) {
    try {
      const {
        limit = 50,
        offset = 0,
        type = null,
        status = null,
        timeRange = '90d'
      } = options;

      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        timeRange
      });

      if (type) params.append('type', type);
      if (status) params.append('status', status);

      const response = await fetch(`${this.baseUrl}/history/${customerId}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch intervention history: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching intervention history:', error);
      throw error;
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
    this.interventions.delete(customerId);
    this.triggers.delete(customerId);
    this.schedules.delete(customerId);
    this.escalations.delete(customerId);
  }

  /**
   * Clear all cache
   */
  clearAllCache() {
    this.interventions.clear();
    this.triggers.clear();
    this.templates.clear();
    this.schedules.clear();
    this.escalations.clear();
  }
}

// Create singleton instance
const automatedInterventionSystem = new AutomatedInterventionSystem();

export default automatedInterventionSystem; 