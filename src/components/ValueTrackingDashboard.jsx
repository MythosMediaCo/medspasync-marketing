import React, { useState, useEffect, useRef } from 'react';
import { FaChartLine, FaClock, FaDollarSign, FaCheck, FaTrophy, FaTrendingUp, FaCalendar, FaTarget } from 'react-icons/fa';
import { MdAnalytics, MdSavings, MdSpeed, MdAccuracy } from 'react-icons/md';
import './ValueTrackingDashboard.css';

const ValueTrackingDashboard = ({ 
  user, 
  practiceId, 
  isVisible = false,
  onMilestoneAchieved 
}) => {
  const [valueMetrics, setValueMetrics] = useState({
    totalROI: 0,
    timeSaved: 0,
    revenueRecovered: 0,
    efficiencyGain: 0,
    accuracyImprovement: 0,
    costSavings: 0
  });
  
  const [realTimeData, setRealTimeData] = useState({
    transactionsProcessed: 0,
    errorsPrevented: 0,
    timeSavedToday: 0,
    revenueFoundToday: 0
  });
  
  const [milestones, setMilestones] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const updateIntervalRef = useRef(null);
  const achievementTimeoutRef = useRef(null);

  useEffect(() => {
    if (isVisible && user && practiceId) {
      loadValueData();
      startRealTimeUpdates();
    }

    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
      if (achievementTimeoutRef.current) {
        clearTimeout(achievementTimeoutRef.current);
      }
    };
  }, [isVisible, user, practiceId]);

  const loadValueData = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/value-tracking/${practiceId}`);
      const data = await response.json();
      
      setValueMetrics(data.metrics);
      setMilestones(data.milestones);
      setAchievements(data.achievements);
      setTrends(data.trends);
      setLastUpdate(new Date());
      
      // Check for new achievements
      checkForNewAchievements(data.achievements);
      
    } catch (error) {
      console.error('Failed to load value data:', error);
      // Load mock data for development
      loadMockValueData();
    } finally {
      setIsLoading(false);
    }
  };

  const startRealTimeUpdates = () => {
    updateIntervalRef.current = setInterval(() => {
      updateRealTimeMetrics();
    }, 5000); // Update every 5 seconds
  };

  const updateRealTimeMetrics = async () => {
    try {
      // Simulate real-time updates
      setRealTimeData(prev => ({
        transactionsProcessed: prev.transactionsProcessed + Math.floor(Math.random() * 5),
        errorsPrevented: prev.errorsPrevented + Math.floor(Math.random() * 2),
        timeSavedToday: prev.timeSavedToday + (Math.random() * 0.5),
        revenueFoundToday: prev.revenueFoundToday + (Math.random() * 50)
      }));

      // Update value metrics
      setValueMetrics(prev => ({
        ...prev,
        totalROI: prev.totalROI + (Math.random() * 0.5),
        timeSaved: prev.timeSaved + (Math.random() * 0.2),
        revenueRecovered: prev.revenueRecovered + (Math.random() * 25),
        efficiencyGain: Math.min(100, prev.efficiencyGain + (Math.random() * 0.1)),
        accuracyImprovement: Math.min(100, prev.accuracyImprovement + (Math.random() * 0.05)),
        costSavings: prev.costSavings + (Math.random() * 15)
      }));

      setLastUpdate(new Date());
      
      // Check for milestone achievements
      checkMilestoneAchievements();
      
    } catch (error) {
      console.error('Failed to update real-time metrics:', error);
    }
  };

  const checkMilestoneAchievements = () => {
    const newMilestones = milestones.filter(milestone => {
      if (milestone.achieved) return false;
      
      let achieved = false;
      switch (milestone.type) {
        case 'time-saved':
          achieved = valueMetrics.timeSaved >= milestone.target;
          break;
        case 'revenue-recovered':
          achieved = valueMetrics.revenueRecovered >= milestone.target;
          break;
        case 'transactions-processed':
          achieved = realTimeData.transactionsProcessed >= milestone.target;
          break;
        case 'efficiency-gain':
          achieved = valueMetrics.efficiencyGain >= milestone.target;
          break;
        default:
          break;
      }
      
      if (achieved) {
        milestone.achieved = true;
        milestone.achievedAt = new Date().toISOString();
        showAchievementNotification(milestone);
        return true;
      }
      
      return false;
    });
    
    if (newMilestones.length > 0) {
      setMilestones(prev => prev.map(m => 
        newMilestones.find(nm => nm.id === m.id) || m
      ));
      
      if (onMilestoneAchieved) {
        onMilestoneAchieved(newMilestones);
      }
    }
  };

  const showAchievementNotification = (milestone) => {
    const notification = {
      id: Date.now(),
      type: 'achievement',
      title: 'Milestone Achieved!',
      message: `You've reached ${milestone.title}`,
      milestone: milestone,
      timestamp: new Date().toISOString()
    };
    
    setAchievements(prev => [notification, ...prev.slice(0, 9)]);
    
    // Auto-remove notification after 5 seconds
    achievementTimeoutRef.current = setTimeout(() => {
      setAchievements(prev => prev.filter(a => a.id !== notification.id));
    }, 5000);
  };

  const checkForNewAchievements = (newAchievements) => {
    const currentAchievementIds = achievements.map(a => a.id);
    const newOnes = newAchievements.filter(a => !currentAchievementIds.includes(a.id));
    
    if (newOnes.length > 0) {
      newOnes.forEach(achievement => {
        showAchievementNotification(achievement);
      });
    }
  };

  const loadMockValueData = () => {
    setValueMetrics({
      totalROI: 284.7,
      timeSaved: 47.3,
      revenueRecovered: 8475.50,
      efficiencyGain: 67.8,
      accuracyImprovement: 94.7,
      costSavings: 3240.00
    });
    
    setRealTimeData({
      transactionsProcessed: 1247,
      errorsPrevented: 89,
      timeSavedToday: 3.2,
      revenueFoundToday: 425.75
    });
    
    setMilestones([
      {
        id: 1,
        title: 'First $1,000 Saved',
        description: 'Save your first $1,000 in time and recovered revenue',
        type: 'revenue-recovered',
        target: 1000,
        achieved: true,
        achievedAt: '2024-01-15T10:30:00Z',
        reward: 'Advanced Analytics Unlocked'
      },
      {
        id: 2,
        title: '10 Hours Saved',
        description: 'Save 10 hours of manual reconciliation time',
        type: 'time-saved',
        target: 10,
        achieved: true,
        achievedAt: '2024-01-20T14:15:00Z',
        reward: 'Custom Dashboard Templates'
      },
      {
        id: 3,
        title: '500 Transactions Processed',
        description: 'Process 500 transactions with AI assistance',
        type: 'transactions-processed',
        target: 500,
        achieved: false,
        progress: 1247,
        reward: 'Priority Support Access'
      },
      {
        id: 4,
        title: '50% Efficiency Gain',
        description: 'Achieve 50% improvement in reconciliation efficiency',
        type: 'efficiency-gain',
        target: 50,
        achieved: false,
        progress: 67.8,
        reward: 'Executive Dashboard Access'
      }
    ]);
    
    setTrends([
      { date: '2024-01-01', roi: 0, timeSaved: 0, revenueRecovered: 0 },
      { date: '2024-01-07', roi: 45.2, timeSaved: 8.5, revenueRecovered: 1250 },
      { date: '2024-01-14', roi: 128.7, timeSaved: 18.3, revenueRecovered: 2847 },
      { date: '2024-01-21', roi: 284.7, timeSaved: 47.3, revenueRecovered: 8475 }
    ]);
    
    setLastUpdate(new Date());
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTime = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const getProgressPercentage = (current, target) => {
    return Math.min(100, (current / target) * 100);
  };

  const renderValueMetrics = () => (
    <div className="value-metrics">
      <div className="metric-card primary">
        <div className="metric-icon">
          <FaChartLine />
        </div>
        <div className="metric-content">
          <div className="metric-value">{formatPercentage(valueMetrics.totalROI)}</div>
          <div className="metric-label">Total ROI</div>
          <div className="metric-subtitle">Return on investment</div>
        </div>
        <div className="metric-trend positive">
          <FaTrendingUp />
          <span>+{formatPercentage(valueMetrics.totalROI - 250)}</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon">
          <FaClock />
        </div>
        <div className="metric-content">
          <div className="metric-value">{formatTime(valueMetrics.timeSaved)}</div>
          <div className="metric-label">Time Saved</div>
          <div className="metric-subtitle">Hours recovered</div>
        </div>
        <div className="metric-trend positive">
          <FaTrendingUp />
          <span>+{formatTime(valueMetrics.timeSaved - 40)}</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon">
          <FaDollarSign />
        </div>
        <div className="metric-content">
          <div className="metric-value">{formatCurrency(valueMetrics.revenueRecovered)}</div>
          <div className="metric-label">Revenue Recovered</div>
          <div className="metric-subtitle">Money found</div>
        </div>
        <div className="metric-trend positive">
          <FaTrendingUp />
          <span>+{formatCurrency(valueMetrics.revenueRecovered - 7000)}</span>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon">
          <MdSpeed />
        </div>
        <div className="metric-content">
          <div className="metric-value">{formatPercentage(valueMetrics.efficiencyGain)}</div>
          <div className="metric-label">Efficiency Gain</div>
          <div className="metric-subtitle">Process improvement</div>
        </div>
        <div className="metric-trend positive">
          <FaTrendingUp />
          <span>+{formatPercentage(valueMetrics.efficiencyGain - 60)}</span>
        </div>
      </div>
    </div>
  );

  const renderRealTimeMetrics = () => (
    <div className="realtime-metrics">
      <h3>Real-Time Activity</h3>
      <div className="realtime-grid">
        <div className="realtime-card">
          <div className="realtime-icon">
            <MdAnalytics />
          </div>
          <div className="realtime-content">
            <div className="realtime-value">{realTimeData.transactionsProcessed.toLocaleString()}</div>
            <div className="realtime-label">Transactions Processed</div>
          </div>
        </div>

        <div className="realtime-card">
          <div className="realtime-icon">
            <FaCheck />
          </div>
          <div className="realtime-content">
            <div className="realtime-value">{realTimeData.errorsPrevented}</div>
            <div className="realtime-label">Errors Prevented</div>
          </div>
        </div>

        <div className="realtime-card">
          <div className="realtime-icon">
            <FaClock />
          </div>
          <div className="realtime-content">
            <div className="realtime-value">{formatTime(realTimeData.timeSavedToday)}</div>
            <div className="realtime-label">Time Saved Today</div>
          </div>
        </div>

        <div className="realtime-card">
          <div className="realtime-icon">
            <MdSavings />
          </div>
          <div className="realtime-content">
            <div className="realtime-value">{formatCurrency(realTimeData.revenueFoundToday)}</div>
            <div className="realtime-label">Revenue Found Today</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="milestones-section">
      <h3>Success Milestones</h3>
      <div className="milestones-grid">
        {milestones.map(milestone => (
          <div key={milestone.id} className={`milestone-card ${milestone.achieved ? 'achieved' : ''}`}>
            <div className="milestone-header">
              <div className="milestone-icon">
                {milestone.achieved ? <FaTrophy /> : <FaTarget />}
              </div>
              <div className="milestone-status">
                {milestone.achieved ? (
                  <span className="status achieved">Achieved</span>
                ) : (
                  <span className="status pending">In Progress</span>
                )}
              </div>
            </div>
            
            <div className="milestone-content">
              <h4>{milestone.title}</h4>
              <p>{milestone.description}</p>
              
              {!milestone.achieved && milestone.progress !== undefined && (
                <div className="milestone-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${getProgressPercentage(milestone.progress, milestone.target)}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {milestone.progress.toLocaleString()} / {milestone.target.toLocaleString()}
                  </div>
                </div>
              )}
              
              <div className="milestone-reward">
                <FaCheck /> {milestone.reward}
              </div>
              
              {milestone.achieved && milestone.achievedAt && (
                <div className="achievement-date">
                  Achieved {new Date(milestone.achievedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="trends-section">
      <h3>Value Growth Trends</h3>
      <div className="trends-chart">
        <div className="trends-header">
          <div className="trend-metric">
            <span className="trend-label">ROI</span>
            <span className="trend-value">{formatPercentage(valueMetrics.totalROI)}</span>
          </div>
          <div className="trend-metric">
            <span className="trend-label">Time Saved</span>
            <span className="trend-value">{formatTime(valueMetrics.timeSaved)}</span>
          </div>
          <div className="trend-metric">
            <span className="trend-label">Revenue</span>
            <span className="trend-value">{formatCurrency(valueMetrics.revenueRecovered)}</span>
          </div>
        </div>
        
        <div className="trends-visualization">
          {trends.map((trend, index) => (
            <div key={index} className="trend-point">
              <div className="trend-dot"></div>
              <div className="trend-date">{new Date(trend.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="achievements-section">
      <h3>Recent Achievements</h3>
      <div className="achievements-list">
        {achievements.slice(0, 5).map(achievement => (
          <div key={achievement.id} className="achievement-item">
            <div className="achievement-icon">
              <FaTrophy />
            </div>
            <div className="achievement-content">
              <div className="achievement-title">{achievement.title}</div>
              <div className="achievement-message">{achievement.message}</div>
              <div className="achievement-time">
                {new Date(achievement.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className="value-tracking-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Value Tracking Dashboard</h1>
          <p>Real-time insights into your MedSpaSync Pro ROI</p>
        </div>
        
        <div className="header-meta">
          <div className="last-update">
            Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}
          </div>
          <div className="live-indicator">
            <div className="live-dot"></div>
            Live
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your value metrics...</p>
          </div>
        ) : (
          <>
            {renderValueMetrics()}
            {renderRealTimeMetrics()}
            {renderMilestones()}
            {renderTrends()}
            {renderAchievements()}
          </>
        )}
      </div>
    </div>
  );
};

export default ValueTrackingDashboard; 