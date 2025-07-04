import React, { useState, useEffect, useRef } from 'react';
import { FaChartLine, FaMousePointer, FaUsers, FaBullseye, FaCog, FaPlay, FaPause, FaRefresh } from 'react-icons/fa';
import { MdTrendingUp, MdTrendingDown, MdInsights, MdAnalytics } from 'react-icons/md';
import './ConversionOptimization.css';

const ConversionOptimization = ({ 
  isVisible = false, 
  onClose,
  currentPage = 'dashboard',
  userContext = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({});
  const [conversionMetrics, setConversionMetrics] = useState({});
  const [funnelData, setFunnelData] = useState({});
  const [abTests, setAbTests] = useState([]);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [personalizationRules, setPersonalizationRules] = useState([]);
  const [heatmapData, setHeatmapData] = useState({});
  const [userSegments, setUserSegments] = useState([]);
  const [conversionGoals, setConversionGoals] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const optimizationRef = useRef(null);
  const realTimeIntervalRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      setIsOpen(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isOpen) {
      loadConversionData();
      startRealTimeMonitoring();
    } else {
      stopRealTimeMonitoring();
    }

    return () => {
      stopRealTimeMonitoring();
    };
  }, [isOpen]);

  useEffect(() => {
    // Handle click outside to close
    const handleClickOutside = (event) => {
      if (optimizationRef.current && !optimizationRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const loadConversionData = async () => {
    try {
      // Load real-time conversion data
      const realTimeResponse = await fetch('/api/analytics/realtime');
      const realTimeData = await realTimeResponse.json();
      setRealTimeData(realTimeData);

      // Load conversion metrics
      const metricsResponse = await fetch('/api/analytics/conversion-metrics');
      const metricsData = await metricsResponse.json();
      setConversionMetrics(metricsData);

      // Load funnel data
      const funnelResponse = await fetch('/api/analytics/funnel-data');
      const funnelData = await funnelResponse.json();
      setFunnelData(funnelData);

      // Load A/B tests
      const abTestsResponse = await fetch('/api/ab-testing/active');
      const abTestsData = await abTestsResponse.json();
      setAbTests(abTestsData);

      // Load optimization suggestions
      const suggestionsResponse = await fetch('/api/optimization/suggestions');
      const suggestionsData = await suggestionsResponse.json();
      setOptimizationSuggestions(suggestionsData);

      // Load personalization rules
      const rulesResponse = await fetch('/api/personalization/rules');
      const rulesData = await rulesResponse.json();
      setPersonalizationRules(rulesData);

      // Load user segments
      const segmentsResponse = await fetch('/api/analytics/user-segments');
      const segmentsData = await segmentsResponse.json();
      setUserSegments(segmentsData);

      // Load conversion goals
      const goalsResponse = await fetch('/api/analytics/conversion-goals');
      const goalsData = await goalsResponse.json();
      setConversionGoals(goalsData);

    } catch (error) {
      console.error('Error loading conversion data:', error);
    }
  };

  const startRealTimeMonitoring = () => {
    if (realTimeIntervalRef.current) {
      clearInterval(realTimeIntervalRef.current);
    }

    realTimeIntervalRef.current = setInterval(async () => {
      if (isMonitoring) {
        try {
          const response = await fetch('/api/analytics/realtime');
          const data = await response.json();
          setRealTimeData(data);
          
          // Check for alerts
          checkForAlerts(data);
        } catch (error) {
          console.error('Error updating real-time data:', error);
        }
      }
    }, refreshInterval * 1000);
  };

  const stopRealTimeMonitoring = () => {
    if (realTimeIntervalRef.current) {
      clearInterval(realTimeIntervalRef.current);
      realTimeIntervalRef.current = null;
    }
  };

  const checkForAlerts = (data) => {
    const newAlerts = [];
    
    // Check conversion rate drops
    if (data.conversionRate < data.previousConversionRate * 0.8) {
      newAlerts.push({
        type: 'warning',
        message: 'Conversion rate dropped significantly',
        value: `${data.conversionRate.toFixed(2)}%`,
        previous: `${data.previousConversionRate.toFixed(2)}%`
      });
    }
    
    // Check for high bounce rate
    if (data.bounceRate > 70) {
      newAlerts.push({
        type: 'error',
        message: 'High bounce rate detected',
        value: `${data.bounceRate.toFixed(2)}%`
      });
    }
    
    // Check for A/B test significance
    data.abTests?.forEach(test => {
      if (test.significance > 0.95) {
        newAlerts.push({
          type: 'success',
          message: `A/B test "${test.name}" reached significance`,
          value: `${(test.significance * 100).toFixed(1)}%`
        });
      }
    });

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev].slice(0, 10));
    }
  };

  const renderOverview = () => {
    return (
      <div className="overview-tab">
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <FaChartLine className="metric-icon" />
              <h3>Conversion Rate</h3>
            </div>
            <div className="metric-value">
              {conversionMetrics.conversionRate?.toFixed(2)}%
            </div>
            <div className={`metric-trend ${conversionMetrics.conversionTrend > 0 ? 'positive' : 'negative'}`}>
              {conversionMetrics.conversionTrend > 0 ? <MdTrendingUp /> : <MdTrendingDown />}
              {Math.abs(conversionMetrics.conversionTrend).toFixed(1)}%
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <FaMousePointer className="metric-icon" />
              <h3>Click-Through Rate</h3>
            </div>
            <div className="metric-value">
              {conversionMetrics.clickThroughRate?.toFixed(2)}%
            </div>
            <div className={`metric-trend ${conversionMetrics.ctrTrend > 0 ? 'positive' : 'negative'}`}>
              {conversionMetrics.ctrTrend > 0 ? <MdTrendingUp /> : <MdTrendingDown />}
              {Math.abs(conversionMetrics.ctrTrend).toFixed(1)}%
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <FaUsers className="metric-icon" />
              <h3>Active Users</h3>
            </div>
            <div className="metric-value">
              {realTimeData.activeUsers?.toLocaleString()}
            </div>
            <div className="metric-subtitle">
              Last {selectedTimeRange}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <FaBullseye className="metric-icon" />
              <h3>Revenue per User</h3>
            </div>
            <div className="metric-value">
              ${conversionMetrics.revenuePerUser?.toFixed(2)}
            </div>
            <div className={`metric-trend ${conversionMetrics.rpuTrend > 0 ? 'positive' : 'negative'}`}>
              {conversionMetrics.rpuTrend > 0 ? <MdTrendingUp /> : <MdTrendingDown />}
              {Math.abs(conversionMetrics.rpuTrend).toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="alerts-section">
          <h3>Recent Alerts</h3>
          <div className="alerts-list">
            {alerts.map((alert, index) => (
              <div key={index} className={`alert-item ${alert.type}`}>
                <div className="alert-message">{alert.message}</div>
                <div className="alert-value">{alert.value}</div>
                {alert.previous && (
                  <div className="alert-previous">vs {alert.previous}</div>
                )}
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="no-alerts">No recent alerts</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFunnelAnalysis = () => {
    return (
      <div className="funnel-tab">
        <div className="funnel-header">
          <h3>Conversion Funnel Analysis</h3>
          <div className="funnel-controls">
            <select 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="funnel-visualization">
          {funnelData.stages?.map((stage, index) => (
            <div key={stage.name} className="funnel-stage">
              <div className="stage-header">
                <h4>{stage.name}</h4>
                <span className="stage-count">{stage.count.toLocaleString()}</span>
              </div>
              <div className="stage-bar">
                <div 
                  className="stage-fill" 
                  style={{ width: `${(stage.count / funnelData.stages[0].count) * 100}%` }}
                ></div>
              </div>
              <div className="stage-metrics">
                <span className="conversion-rate">{stage.conversionRate.toFixed(1)}%</span>
                <span className="drop-off">
                  {index > 0 && `-${((funnelData.stages[index - 1].count - stage.count) / funnelData.stages[index - 1].count * 100).toFixed(1)}%`}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="funnel-insights">
          <h4>Key Insights</h4>
          <div className="insights-list">
            {funnelData.insights?.map((insight, index) => (
              <div key={index} className="insight-item">
                <MdInsights className="insight-icon" />
                <span>{insight.message}</span>
                <span className="insight-impact">{insight.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderABTesting = () => {
    return (
      <div className="ab-testing-tab">
        <div className="ab-tests-header">
          <h3>Active A/B Tests</h3>
          <button className="new-test-btn">Create New Test</button>
        </div>

        <div className="ab-tests-grid">
          {abTests.map((test) => (
            <div key={test.id} className="ab-test-card">
              <div className="test-header">
                <h4>{test.name}</h4>
                <span className={`test-status ${test.status}`}>{test.status}</span>
              </div>
              <div className="test-description">{test.description}</div>
              
              <div className="test-variants">
                {test.variants.map((variant) => (
                  <div key={variant.name} className="variant-item">
                    <div className="variant-name">{variant.name}</div>
                    <div className="variant-metrics">
                      <span className="conversion-rate">{variant.conversionRate.toFixed(2)}%</span>
                      <span className="sample-size">({variant.sampleSize.toLocaleString()})</span>
                    </div>
                    {variant.significance && (
                      <div className="significance">
                        {variant.significance > 0.95 ? 'Winner' : 'In Progress'}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="test-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${test.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{test.progress}% complete</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOptimizationSuggestions = () => {
    return (
      <div className="suggestions-tab">
        <div className="suggestions-header">
          <h3>Optimization Suggestions</h3>
          <div className="suggestions-filter">
            <select defaultValue="all">
              <option value="all">All Suggestions</option>
              <option value="high">High Impact</option>
              <option value="medium">Medium Impact</option>
              <option value="low">Low Impact</option>
            </select>
          </div>
        </div>

        <div className="suggestions-list">
          {optimizationSuggestions.map((suggestion, index) => (
            <div key={index} className={`suggestion-card ${suggestion.priority}`}>
              <div className="suggestion-header">
                <h4>{suggestion.title}</h4>
                <span className={`priority-badge ${suggestion.priority}`}>
                  {suggestion.priority}
                </span>
              </div>
              <div className="suggestion-description">{suggestion.description}</div>
              
              <div className="suggestion-metrics">
                <div className="metric">
                  <span className="label">Expected Impact:</span>
                  <span className="value">{suggestion.expectedImpact}</span>
                </div>
                <div className="metric">
                  <span className="label">Implementation Time:</span>
                  <span className="value">{suggestion.implementationTime}</span>
                </div>
                <div className="metric">
                  <span className="label">Confidence:</span>
                  <span className="value">{suggestion.confidence}%</span>
                </div>
              </div>

              <div className="suggestion-actions">
                <button className="implement-btn">Implement</button>
                <button className="test-btn">A/B Test</button>
                <button className="dismiss-btn">Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPersonalization = () => {
    return (
      <div className="personalization-tab">
        <div className="personalization-header">
          <h3>Personalization Rules</h3>
          <button className="new-rule-btn">Create Rule</button>
        </div>

        <div className="rules-list">
          {personalizationRules.map((rule, index) => (
            <div key={index} className="rule-card">
              <div className="rule-header">
                <h4>{rule.name}</h4>
                <span className={`rule-status ${rule.status}`}>{rule.status}</span>
              </div>
              <div className="rule-description">{rule.description}</div>
              
              <div className="rule-conditions">
                <h5>Conditions:</h5>
                {rule.conditions.map((condition, condIndex) => (
                  <div key={condIndex} className="condition-item">
                    <span className="condition-field">{condition.field}</span>
                    <span className="condition-operator">{condition.operator}</span>
                    <span className="condition-value">{condition.value}</span>
                  </div>
                ))}
              </div>

              <div className="rule-actions">
                <h5>Actions:</h5>
                {rule.actions.map((action, actionIndex) => (
                  <div key={actionIndex} className="action-item">
                    <span className="action-type">{action.type}</span>
                    <span className="action-value">{action.value}</span>
                  </div>
                ))}
              </div>

              <div className="rule-metrics">
                <div className="metric">
                  <span className="label">Impressions:</span>
                  <span className="value">{rule.impressions.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span className="label">Conversions:</span>
                  <span className="value">{rule.conversions.toLocaleString()}</span>
                </div>
                <div className="metric">
                  <span className="label">Lift:</span>
                  <span className="value">{rule.lift.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUserSegments = () => {
    return (
      <div className="segments-tab">
        <div className="segments-header">
          <h3>User Segments</h3>
          <button className="new-segment-btn">Create Segment</button>
        </div>

        <div className="segments-grid">
          {userSegments.map((segment, index) => (
            <div key={index} className="segment-card">
              <div className="segment-header">
                <h4>{segment.name}</h4>
                <span className="segment-size">{segment.size.toLocaleString()} users</span>
              </div>
              <div className="segment-description">{segment.description}</div>
              
              <div className="segment-metrics">
                <div className="metric">
                  <span className="label">Conversion Rate:</span>
                  <span className="value">{segment.conversionRate.toFixed(2)}%</span>
                </div>
                <div className="metric">
                  <span className="label">Avg. Order Value:</span>
                  <span className="value">${segment.avgOrderValue.toFixed(2)}</span>
                </div>
                <div className="metric">
                  <span className="label">Lifetime Value:</span>
                  <span className="value">${segment.ltv.toFixed(2)}</span>
                </div>
              </div>

              <div className="segment-trends">
                <div className="trend-item">
                  <span className="trend-label">Growth</span>
                  <span className={`trend-value ${segment.growth > 0 ? 'positive' : 'negative'}`}>
                    {segment.growth > 0 ? '+' : ''}{segment.growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="conversion-optimization-fab" onClick={() => setIsOpen(true)}>
        <FaCog />
      </div>
    );
  }

  return (
    <div className="conversion-optimization" ref={optimizationRef}>
      <div className="optimization-header">
        <div className="header-title">
          <MdAnalytics />
          <h2>Conversion Optimization</h2>
        </div>
        <div className="header-controls">
          <button 
            className={`monitoring-btn ${isMonitoring ? 'active' : ''}`}
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? <FaPause /> : <FaPlay />}
          </button>
          <button className="refresh-btn" onClick={loadConversionData}>
            <FaRefresh />
          </button>
          <button className="close-btn" onClick={() => {
            setIsOpen(false);
            if (onClose) onClose();
          }}>
            ×
          </button>
        </div>
      </div>

      <div className="optimization-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine /> Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'funnel' ? 'active' : ''}`}
          onClick={() => setActiveTab('funnel')}
        >
          <MdTrendingUp /> Funnel
        </button>
        <button 
          className={`tab-btn ${activeTab === 'ab-testing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ab-testing')}
        >
          <FaBullseye /> A/B Tests
        </button>
        <button 
          className={`tab-btn ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          <MdInsights /> Suggestions
        </button>
        <button 
          className={`tab-btn ${activeTab === 'personalization' ? 'active' : ''}`}
          onClick={() => setActiveTab('personalization')}
        >
          <FaUsers /> Personalization
        </button>
        <button 
          className={`tab-btn ${activeTab === 'segments' ? 'active' : ''}`}
          onClick={() => setActiveTab('segments')}
        >
          <FaMousePointer /> Segments
        </button>
      </div>

      <div className="optimization-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'funnel' && renderFunnelAnalysis()}
        {activeTab === 'ab-testing' && renderABTesting()}
        {activeTab === 'suggestions' && renderOptimizationSuggestions()}
        {activeTab === 'personalization' && renderPersonalization()}
        {activeTab === 'segments' && renderUserSegments()}
      </div>
    </div>
  );
};

export default ConversionOptimization; 