import { api } from './api.js';

class OnboardingProgressTracker {
  constructor() {
    this.baseUrl = '/api/onboarding';
    this.progressCache = new Map();
    this.interventionThresholds = {
      step1: 5 * 60 * 1000, // 5 minutes
      step2: 10 * 60 * 1000, // 10 minutes
      step3: 8 * 60 * 1000,  // 8 minutes
      step4: 15 * 60 * 1000, // 15 minutes
      step5: 12 * 60 * 1000, // 12 minutes
      step6: 20 * 60 * 1000, // 20 minutes
      step7: 5 * 60 * 1000   // 5 minutes
    };
  }

  /**
   * Get onboarding progress for a user
   */
  async getProgress(userId) {
    try {
      // Check cache first
      if (this.progressCache.has(userId)) {
        const cached = this.progressCache.get(userId);
        if (Date.now() - cached.timestamp < 5 * 60 * 1000) { // 5 minute cache
          return cached.data;
        }
      }

      const response = await api.get(`${this.baseUrl}/progress/${userId}`);
      const progress = response.data;

      // Cache the result
      this.progressCache.set(userId, {
        data: progress,
        timestamp: Date.now()
      });

      return progress;
    } catch (error) {
      console.error('Failed to get onboarding progress:', error);
      return this.getDefaultProgress();
    }
  }

  /**
   * Update onboarding progress
   */
  async updateProgress(userId, progressData) {
    try {
      const response = await api.post(`${this.baseUrl}/progress/${userId}`, {
        ...progressData,
        updatedAt: new Date().toISOString()
      });

      // Update cache
      this.progressCache.set(userId, {
        data: response.data,
        timestamp: Date.now()
      });

      // Check for intervention triggers
      await this.checkInterventionTriggers(userId, progressData);

      return response.data;
    } catch (error) {
      console.error('Failed to update onboarding progress:', error);
      throw error;
    }
  }

  /**
   * Mark a step as completed
   */
  async completeStep(userId, stepId, stepData = {}) {
    try {
      const currentProgress = await this.getProgress(userId);
      const completedSteps = [...new Set([...currentProgress.completedSteps, stepId])];
      const progress = (completedSteps.length / 7) * 100;

      const updateData = {
        currentStep: Math.min(stepId + 1, 7),
        completedSteps,
        progress,
        lastActivityAt: new Date().toISOString(),
        stepData: {
          ...currentProgress.stepData,
          [`step${stepId}`]: {
            ...stepData,
            completedAt: new Date().toISOString()
          }
        }
      };

      return await this.updateProgress(userId, updateData);
    } catch (error) {
      console.error('Failed to complete step:', error);
      throw error;
    }
  }

  /**
   * Skip a step
   */
  async skipStep(userId, stepId) {
    try {
      const currentProgress = await this.getProgress(userId);
      const skippedSteps = [...new Set([...currentProgress.skippedSteps || [], stepId])];
      const completedSteps = [...new Set([...currentProgress.completedSteps, stepId])];
      const progress = (completedSteps.length / 7) * 100;

      const updateData = {
        currentStep: Math.min(stepId + 1, 7),
        completedSteps,
        skippedSteps,
        progress,
        lastActivityAt: new Date().toISOString(),
        stepData: {
          ...currentProgress.stepData,
          [`step${stepId}`]: {
            skipped: true,
            skippedAt: new Date().toISOString()
          }
        }
      };

      return await this.updateProgress(userId, updateData);
    } catch (error) {
      console.error('Failed to skip step:', error);
      throw error;
    }
  }

  /**
   * Track user activity
   */
  async trackActivity(userId, activity) {
    try {
      const currentProgress = await this.getProgress(userId);
      const activities = [...(currentProgress.activities || []), {
        ...activity,
        timestamp: new Date().toISOString()
      }];

      const updateData = {
        ...currentProgress,
        lastActivityAt: new Date().toISOString(),
        activities
      };

      return await this.updateProgress(userId, updateData);
    } catch (error) {
      console.error('Failed to track activity:', error);
    }
  }

  /**
   * Check for intervention triggers
   */
  async checkInterventionTriggers(userId, progressData) {
    try {
      const currentProgress = await this.getProgress(userId);
      const now = Date.now();
      const lastActivity = new Date(currentProgress.lastActivityAt).getTime();
      const timeSinceLastActivity = now - lastActivity;

      // Check if user is stuck on current step
      const currentStep = progressData.currentStep || currentProgress.currentStep;
      const threshold = this.interventionThresholds[`step${currentStep}`];

      if (threshold && timeSinceLastActivity > threshold) {
        await this.triggerIntervention(userId, currentStep, 'stuck');
      }

      // Check for low completion rate
      const completionRate = (currentProgress.completedSteps?.length || 0) / 7;
      if (completionRate < 0.3 && timeSinceLastActivity > 30 * 60 * 1000) { // 30 minutes
        await this.triggerIntervention(userId, currentStep, 'low_completion');
      }

      // Check for multiple skips
      const skippedSteps = currentProgress.skippedSteps || [];
      if (skippedSteps.length > 2) {
        await this.triggerIntervention(userId, currentStep, 'multiple_skips');
      }

    } catch (error) {
      console.error('Failed to check intervention triggers:', error);
    }
  }

  /**
   * Trigger intervention for stuck users
   */
  async triggerIntervention(userId, stepId, reason) {
    try {
      const intervention = {
        userId,
        stepId,
        reason,
        triggeredAt: new Date().toISOString(),
        status: 'pending'
      };

      await api.post(`${this.baseUrl}/interventions`, intervention);

      // Send notification
      await this.sendInterventionNotification(userId, stepId, reason);

      console.log(`Intervention triggered for user ${userId} on step ${stepId}: ${reason}`);
    } catch (error) {
      console.error('Failed to trigger intervention:', error);
    }
  }

  /**
   * Send intervention notification
   */
  async sendInterventionNotification(userId, stepId, reason) {
    try {
      const notifications = {
        stuck: {
          title: 'Need help with setup?',
          message: 'We noticed you might be stuck. Our team is here to help!',
          action: 'Get Help'
        },
        low_completion: {
          title: 'Let\'s get you started',
          message: 'Complete your setup to unlock the full power of MedSpaSync Pro.',
          action: 'Continue Setup'
        },
        multiple_skips: {
          title: 'Quick setup available',
          message: 'We can help you complete setup quickly with our guided assistance.',
          action: 'Get Guided Help'
        }
      };

      const notification = notifications[reason];
      if (notification) {
        await api.post('/api/notifications', {
          userId,
          type: 'onboarding_intervention',
          title: notification.title,
          message: notification.message,
          action: notification.action,
          data: { stepId, reason }
        });
      }
    } catch (error) {
      console.error('Failed to send intervention notification:', error);
    }
  }

  /**
   * Get onboarding analytics
   */
  async getAnalytics() {
    try {
      const response = await api.get(`${this.baseUrl}/analytics`);
      return response.data;
    } catch (error) {
      console.error('Failed to get onboarding analytics:', error);
      return this.getDefaultAnalytics();
    }
  }

  /**
   * Get user onboarding timeline
   */
  async getTimeline(userId) {
    try {
      const progress = await this.getProgress(userId);
      const timeline = [];

      // Add step completions
      progress.completedSteps?.forEach(stepId => {
        const stepData = progress.stepData?.[`step${stepId}`];
        if (stepData) {
          timeline.push({
            type: 'step_completed',
            stepId,
            timestamp: stepData.completedAt,
            data: stepData
          });
        }
      });

      // Add step skips
      progress.skippedSteps?.forEach(stepId => {
        const stepData = progress.stepData?.[`step${stepId}`];
        if (stepData?.skipped) {
          timeline.push({
            type: 'step_skipped',
            stepId,
            timestamp: stepData.skippedAt,
            data: stepData
          });
        }
      });

      // Add activities
      progress.activities?.forEach(activity => {
        timeline.push({
          type: 'activity',
          timestamp: activity.timestamp,
          data: activity
        });
      });

      // Sort by timestamp
      return timeline.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('Failed to get onboarding timeline:', error);
      return [];
    }
  }

  /**
   * Get onboarding recommendations
   */
  async getRecommendations(userId) {
    try {
      const progress = await this.getProgress(userId);
      const recommendations = [];

      // Check completion rate
      const completionRate = (progress.completedSteps?.length || 0) / 7;
      if (completionRate < 0.5) {
        recommendations.push({
          type: 'completion',
          priority: 'high',
          title: 'Complete your setup',
          description: 'Finish onboarding to unlock all features',
          action: 'Continue Setup'
        });
      }

      // Check for skipped important steps
      const importantSteps = [2, 4, 6]; // Upload, Settings, Integrations
      const skippedImportant = importantSteps.filter(step => 
        progress.skippedSteps?.includes(step)
      );

      if (skippedImportant.length > 0) {
        recommendations.push({
          type: 'important_steps',
          priority: 'medium',
          title: 'Complete important steps',
          description: `You skipped ${skippedImportant.length} important setup steps`,
          action: 'Review Steps'
        });
      }

      // Check for inactivity
      const lastActivity = new Date(progress.lastActivityAt);
      const daysSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceActivity > 1) {
        recommendations.push({
          type: 'inactivity',
          priority: 'medium',
          title: 'Resume your setup',
          description: 'Continue where you left off',
          action: 'Resume Setup'
        });
      }

      return recommendations;
    } catch (error) {
      console.error('Failed to get recommendations:', error);
      return [];
    }
  }

  /**
   * Reset onboarding progress
   */
  async resetProgress(userId) {
    try {
      const response = await api.post(`${this.baseUrl}/reset/${userId}`);
      
      // Clear cache
      this.progressCache.delete(userId);
      
      return response.data;
    } catch (error) {
      console.error('Failed to reset onboarding progress:', error);
      throw error;
    }
  }

  /**
   * Get onboarding completion certificate
   */
  async getCompletionCertificate(userId) {
    try {
      const progress = await this.getProgress(userId);
      const completionRate = (progress.completedSteps?.length || 0) / 7;

      if (completionRate >= 0.8) { // 80% completion threshold
        return {
          completed: true,
          completionRate: Math.round(completionRate * 100),
          completedAt: progress.lastActivityAt,
          certificate: {
            id: `CERT-${userId}-${Date.now()}`,
            title: 'MedSpaSync Pro Setup Certificate',
            description: 'Successfully completed onboarding setup',
            issuedAt: new Date().toISOString()
          }
        };
      }

      return {
        completed: false,
        completionRate: Math.round(completionRate * 100),
        remainingSteps: 7 - (progress.completedSteps?.length || 0)
      };
    } catch (error) {
      console.error('Failed to get completion certificate:', error);
      return { completed: false, completionRate: 0 };
    }
  }

  /**
   * Get default progress structure
   */
  getDefaultProgress() {
    return {
      currentStep: 1,
      completedSteps: [],
      skippedSteps: [],
      progress: 0,
      startedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      activities: [],
      stepData: {},
      status: 'in_progress'
    };
  }

  /**
   * Get default analytics
   */
  getDefaultAnalytics() {
    return {
      totalUsers: 0,
      completedOnboarding: 0,
      averageCompletionTime: 0,
      stepCompletionRates: {},
      commonStuckPoints: [],
      interventionTriggers: {}
    };
  }

  /**
   * Clear progress cache
   */
  clearCache() {
    this.progressCache.clear();
  }

  /**
   * Export onboarding data
   */
  async exportOnboardingData(userId) {
    try {
      const [progress, timeline, recommendations] = await Promise.all([
        this.getProgress(userId),
        this.getTimeline(userId),
        this.getRecommendations(userId)
      ]);

      return {
        progress,
        timeline,
        recommendations,
        exportedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to export onboarding data:', error);
      throw error;
    }
  }

  /**
   * Get onboarding insights
   */
  async getInsights(userId) {
    try {
      const progress = await this.getProgress(userId);
      const timeline = await this.getTimeline(userId);
      const recommendations = await this.getRecommendations(userId);

      const insights = {
        completionRate: Math.round((progress.completedSteps?.length || 0) / 7 * 100),
        timeSpent: this.calculateTimeSpent(timeline),
        efficiency: this.calculateEfficiency(progress, timeline),
        engagement: this.calculateEngagement(timeline),
        recommendations: recommendations.length,
        nextSteps: this.getNextSteps(progress)
      };

      return insights;
    } catch (error) {
      console.error('Failed to get insights:', error);
      return {};
    }
  }

  /**
   * Calculate time spent on onboarding
   */
  calculateTimeSpent(timeline) {
    if (timeline.length < 2) return 0;

    const startTime = new Date(timeline[timeline.length - 1].timestamp);
    const endTime = new Date(timeline[0].timestamp);
    
    return Math.round((endTime - startTime) / (1000 * 60)); // minutes
  }

  /**
   * Calculate onboarding efficiency
   */
  calculateEfficiency(progress, timeline) {
    const timeSpent = this.calculateTimeSpent(timeline);
    const completedSteps = progress.completedSteps?.length || 0;
    
    if (timeSpent === 0) return 0;
    
    return Math.round((completedSteps / timeSpent) * 100); // steps per hour
  }

  /**
   * Calculate user engagement
   */
  calculateEngagement(timeline) {
    const activities = timeline.filter(item => item.type === 'activity');
    const uniqueDays = new Set(
      activities.map(activity => 
        new Date(activity.timestamp).toDateString()
      )
    ).size;

    return uniqueDays;
  }

  /**
   * Get next steps for user
   */
  getNextSteps(progress) {
    const currentStep = progress.currentStep;
    const completedSteps = progress.completedSteps || [];
    
    if (currentStep > 7) {
      return ['Explore dashboard', 'Upload your first file', 'Invite team members'];
    }

    const stepNames = [
      'Welcome',
      'Upload first file',
      'Review results',
      'Configure settings',
      'Invite team members',
      'Set up integrations',
      'Complete setup'
    ];

    return stepNames.slice(currentStep - 1);
  }
}

export default OnboardingProgressTracker; 