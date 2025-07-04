import React, { useState, useEffect, useRef } from 'react';
import { FaTrophy, FaStar, FaCheck, FaArrowRight, FaPlay, FaPause, FaChartLine, FaTarget } from 'react-icons/fa';
import { MdTrendingUp, MdCelebration, MdInsights, MdTimeline } from 'react-icons/md';
import './UserSuccessTracker.css';

const UserSuccessTracker = ({ 
  user, 
  practiceId, 
  isVisible = false,
  onAchievementUnlocked 
}) => {
  const [userProgress, setUserProgress] = useState({
    overallProgress: 0,
    currentLevel: 1,
    experiencePoints: 0,
    achievements: [],
    milestones: [],
    streaks: {
      login: 0,
      reconciliation: 0,
      accuracy: 0
    },
    nextMilestone: null
  });
  
  const [achievements, setAchievements] = useState([]);
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState(null);

  const progressIntervalRef = useRef(null);
  const celebrationTimeoutRef = useRef(null);

  useEffect(() => {
    if (isVisible && user && practiceId) {
      loadUserProgress();
      startProgressTracking();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (celebrationTimeoutRef.current) {
        clearTimeout(celebrationTimeoutRef.current);
      }
    };
  }, [isVisible, user, practiceId]);

  const loadUserProgress = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/user-success/${practiceId}`);
      const data = await response.json();
      
      setUserProgress(data.progress);
      setAchievements(data.achievements);
      setInsights(data.insights);
      setRecommendations(data.recommendations);
      
    } catch (error) {
      console.error('Failed to load user progress:', error);
      // Load mock data for development
      loadMockProgressData();
    } finally {
      setIsLoading(false);
    }
  };

  const startProgressTracking = () => {
    progressIntervalRef.current = setInterval(() => {
      updateProgress();
    }, 10000); // Update every 10 seconds
  };

  const updateProgress = async () => {
    try {
      // Simulate progress updates
      setUserProgress(prev => {
        const newExp = prev.experiencePoints + Math.floor(Math.random() * 10);
        const newLevel = Math.floor(newExp / 100) + 1;
        const newProgress = (newExp % 100) / 100;
        
        // Check for level up
        if (newLevel > prev.currentLevel) {
          triggerLevelUp(newLevel);
        }
        
        return {
          ...prev,
          experiencePoints: newExp,
          currentLevel: newLevel,
          overallProgress: newProgress
        };
      });
      
      // Check for new achievements
      checkForNewAchievements();
      
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  const triggerLevelUp = (newLevel) => {
    const celebration = {
      type: 'level_up',
      title: `Level ${newLevel} Unlocked! 🎉`,
      message: `Congratulations! You've reached level ${newLevel}`,
      rewards: [
        'New dashboard features unlocked',
        'Advanced analytics access',
        'Priority support status'
      ],
      level: newLevel
    };
    
    setCelebrationData(celebration);
    setShowCelebration(true);
    
    // Auto-hide celebration after 5 seconds
    celebrationTimeoutRef.current = setTimeout(() => {
      setShowCelebration(false);
      setCelebrationData(null);
    }, 5000);
    
    if (onAchievementUnlocked) {
      onAchievementUnlocked(celebration);
    }
  };

  const checkForNewAchievements = async () => {
    try {
      const response = await fetch(`/api/user-success/${practiceId}/achievements/check`);
      const data = await response.json();
      
      if (data.newAchievements && data.newAchievements.length > 0) {
        data.newAchievements.forEach(achievement => {
          triggerAchievementUnlock(achievement);
        });
      }
    } catch (error) {
      console.error('Failed to check for new achievements:', error);
    }
  };

  const triggerAchievementUnlock = (achievement) => {
    const celebration = {
      type: 'achievement',
      title: `Achievement Unlocked! 🏆`,
      message: achievement.title,
      description: achievement.description,
      rewards: achievement.rewards || [],
      achievement: achievement
    };
    
    setCelebrationData(celebration);
    setShowCelebration(true);
    
    // Auto-hide celebration after 5 seconds
    celebrationTimeoutRef.current = setTimeout(() => {
      setShowCelebration(false);
      setCelebrationData(null);
    }, 5000);
    
    if (onAchievementUnlocked) {
      onAchievementUnlocked(celebration);
    }
  };

  const loadMockProgressData = () => {
    setUserProgress({
      overallProgress: 0.67,
      currentLevel: 3,
      experiencePoints: 267,
      achievements: [
        {
          id: 1,
          title: 'First Upload',
          description: 'Complete your first data upload',
          icon: 'upload',
          unlockedAt: '2024-01-15T10:30:00Z',
          progress: 100
        },
        {
          id: 2,
          title: 'Accuracy Master',
          description: 'Achieve 95%+ reconciliation accuracy',
          icon: 'accuracy',
          unlockedAt: '2024-01-20T14:15:00Z',
          progress: 100
        },
        {
          id: 3,
          title: 'Time Saver',
          description: 'Save 10+ hours of manual work',
          icon: 'time',
          unlockedAt: null,
          progress: 75
        }
      ],
      milestones: [
        {
          id: 1,
          title: 'Process 500 Transactions',
          description: 'Reach 500 processed transactions',
          target: 500,
          current: 347,
          reward: 'Advanced Analytics'
        },
        {
          id: 2,
          title: '7-Day Streak',
          description: 'Use the platform for 7 consecutive days',
          target: 7,
          current: 5,
          reward: 'Priority Support'
        }
      ],
      streaks: {
        login: 5,
        reconciliation: 3,
        accuracy: 7
      },
      nextMilestone: {
        title: 'Process 500 Transactions',
        progress: 0.69,
        estimatedCompletion: '3 days'
      }
    });
    
    setAchievements([
      {
        id: 1,
        title: 'First Upload',
        description: 'Complete your first data upload',
        icon: 'upload',
        unlockedAt: '2024-01-15T10:30:00Z',
        category: 'onboarding'
      },
      {
        id: 2,
        title: 'Accuracy Master',
        description: 'Achieve 95%+ reconciliation accuracy',
        icon: 'accuracy',
        unlockedAt: '2024-01-20T14:15:00Z',
        category: 'performance'
      }
    ]);
    
    setInsights([
      {
        id: 1,
        type: 'performance',
        title: 'Accuracy Improving',
        description: 'Your reconciliation accuracy has improved by 15% this week',
        metric: '+15%',
        trend: 'up'
      },
      {
        id: 2,
        type: 'efficiency',
        title: 'Time Savings Growing',
        description: 'You\'ve saved 12 hours this month',
        metric: '12h',
        trend: 'up'
      }
    ]);
    
    setRecommendations([
      {
        id: 1,
        type: 'feature',
        title: 'Try Advanced Analytics',
        description: 'Unlock advanced analytics to gain deeper insights',
        action: 'Explore Analytics',
        priority: 'medium'
      },
      {
        id: 2,
        type: 'optimization',
        title: 'Optimize Upload Process',
        description: 'Streamline your data upload process for better efficiency',
        action: 'View Tips',
        priority: 'low'
      }
    ]);
  };

  const formatProgress = (progress) => {
    return Math.round(progress * 100);
  };

  const getLevelTitle = (level) => {
    const titles = {
      1: 'Beginner',
      2: 'Explorer',
      3: 'Practitioner',
      4: 'Expert',
      5: 'Master',
      6: 'Legend'
    };
    return titles[level] || `Level ${level}`;
  };

  const getAchievementIcon = (icon) => {
    const icons = {
      upload: '📤',
      accuracy: '🎯',
      time: '⏰',
      streak: '🔥',
      milestone: '🏆',
      efficiency: '⚡'
    };
    return icons[icon] || '🏆';
  };

  const renderProgressOverview = () => (
    <div className="progress-overview">
      <div className="level-card">
        <div className="level-header">
          <div className="level-badge">
            <span className="level-number">{userProgress.currentLevel}</span>
          </div>
          <div className="level-info">
            <h3>{getLevelTitle(userProgress.currentLevel)}</h3>
            <p>{userProgress.experiencePoints} XP</p>
          </div>
        </div>
        
        <div className="level-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${formatProgress(userProgress.overallProgress)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {formatProgress(userProgress.overallProgress)}% to Level {userProgress.currentLevel + 1}
          </div>
        </div>
      </div>

      <div className="streaks-section">
        <h4>Current Streaks</h4>
        <div className="streaks-grid">
          <div className="streak-card">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <div className="streak-value">{userProgress.streaks.login}</div>
              <div className="streak-label">Login Days</div>
            </div>
          </div>
          <div className="streak-card">
            <div className="streak-icon">⚡</div>
            <div className="streak-info">
              <div className="streak-value">{userProgress.streaks.reconciliation}</div>
              <div className="streak-label">Reconciliation</div>
            </div>
          </div>
          <div className="streak-card">
            <div className="streak-icon">🎯</div>
            <div className="streak-info">
              <div className="streak-value">{userProgress.streaks.accuracy}</div>
              <div className="streak-label">High Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="achievements-section">
      <h3>Achievements</h3>
      <div className="achievements-grid">
        {userProgress.achievements.map(achievement => (
          <div key={achievement.id} className={`achievement-card ${achievement.unlockedAt ? 'unlocked' : 'locked'}`}>
            <div className="achievement-icon">
              {achievement.unlockedAt ? (
                <div className="unlocked-icon">🏆</div>
              ) : (
                <div className="locked-icon">🔒</div>
              )}
            </div>
            
            <div className="achievement-content">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
              
              {achievement.unlockedAt ? (
                <div className="achievement-date">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              ) : (
                <div className="achievement-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">{achievement.progress}%</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="milestones-section">
      <h3>Milestones</h3>
      <div className="milestones-list">
        {userProgress.milestones.map(milestone => (
          <div key={milestone.id} className="milestone-item">
            <div className="milestone-header">
              <div className="milestone-icon">
                <FaTarget />
              </div>
              <div className="milestone-info">
                <h4>{milestone.title}</h4>
                <p>{milestone.description}</p>
              </div>
              <div className="milestone-reward">
                <FaTrophy />
                <span>{milestone.reward}</span>
              </div>
            </div>
            
            <div className="milestone-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(milestone.current / milestone.target) * 100}%` }}
                ></div>
              </div>
              <div className="progress-text">
                {milestone.current} / {milestone.target}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="insights-section">
      <h3>Success Insights</h3>
      <div className="insights-grid">
        {insights.map(insight => (
          <div key={insight.id} className={`insight-card ${insight.trend}`}>
            <div className="insight-icon">
              {insight.trend === 'up' ? <MdTrendingUp /> : <FaChartLine />}
            </div>
            <div className="insight-content">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
              <div className="insight-metric">{insight.metric}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="recommendations-section">
      <h3>Personalized Recommendations</h3>
      <div className="recommendations-list">
        {recommendations.map(recommendation => (
          <div key={recommendation.id} className={`recommendation-card ${recommendation.priority}`}>
            <div className="recommendation-icon">
              <MdInsights />
            </div>
            <div className="recommendation-content">
              <h4>{recommendation.title}</h4>
              <p>{recommendation.description}</p>
              <button className="recommendation-action">
                {recommendation.action} <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCelebration = () => {
    if (!showCelebration || !celebrationData) return null;

    return (
      <div className="celebration-overlay">
        <div className="celebration-modal">
          <div className="celebration-content">
            <div className="celebration-icon">
              {celebrationData.type === 'level_up' ? '🎉' : '🏆'}
            </div>
            <h2>{celebrationData.title}</h2>
            <p>{celebrationData.message}</p>
            
            {celebrationData.rewards && celebrationData.rewards.length > 0 && (
              <div className="celebration-rewards">
                <h4>Rewards Unlocked:</h4>
                <ul>
                  {celebrationData.rewards.map((reward, index) => (
                    <li key={index}>
                      <FaCheck /> {reward}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button 
              className="celebration-close"
              onClick={() => setShowCelebration(false)}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="user-success-tracker">
      <div className="tracker-header">
        <div className="header-content">
          <h1>Your Success Journey</h1>
          <p>Track your progress and celebrate achievements</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-value">{achievements.length}</div>
            <div className="stat-label">Achievements</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userProgress.streaks.login}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userProgress.experiencePoints}</div>
            <div className="stat-label">Total XP</div>
          </div>
        </div>
      </div>

      <div className="tracker-content">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your success journey...</p>
          </div>
        ) : (
          <>
            {renderProgressOverview()}
            {renderAchievements()}
            {renderMilestones()}
            {renderInsights()}
            {renderRecommendations()}
          </>
        )}
      </div>

      {renderCelebration()}
    </div>
  );
};

export default UserSuccessTracker; 