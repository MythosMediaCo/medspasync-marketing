import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Download, 
  Calendar,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../hooks/useApi';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const { apiCall } = useApi();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [socket, setSocket] = useState(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    if (user) {
      fetchDashboardData();
      initializeWebSocket();
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, dateRange]);

  // Initialize WebSocket connection for real-time updates
  const initializeWebSocket = () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const socketUrl = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:3001';
    const newSocket = new WebSocket(`${socketUrl.replace('http', 'ws')}?token=${token}`);

    newSocket.onopen = () => {
      console.log('Analytics WebSocket connected');
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'analytics_update' || data.type === 'dashboard_summary') {
        handleAnalyticsUpdate(data);
      }
    };

    newSocket.onerror = (error) => {
      console.error('Analytics WebSocket error:', error);
    };

    newSocket.onclose = () => {
      console.log('Analytics WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (user) {
          initializeWebSocket();
        }
      }, 5000);
    };

    setSocket(newSocket);
  };

  // Handle real-time analytics updates
  const handleAnalyticsUpdate = (data) => {
    if (data.type === 'dashboard_summary') {
      setDashboardData(prev => ({
        ...prev,
        summary: data.data
      }));
    } else if (data.type === 'analytics_update') {
      // Refresh dashboard data when new analytics are received
      fetchDashboardData();
    }
  };

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      const startDate = getStartDate(dateRange);
      const endDate = new Date().toISOString().split('T')[0];
      
      const response = await apiCall(`/api/analytics/dashboard?startDate=${startDate}&endDate=${endDate}`);
      
      if (response.success) {
        setDashboardData(response.dashboard);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get start date based on selected range
  const getStartDate = (range) => {
    const today = new Date();
    const startDate = new Date();
    
    switch (range) {
      case '7d':
        startDate.setDate(today.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(today.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(today.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      default:
        startDate.setDate(today.getDate() - 30);
    }
    
    return startDate.toISOString().split('T')[0];
  };

  // Export analytics data
  const exportData = async (format = 'json') => {
    try {
      const startDate = getStartDate(dateRange);
      const endDate = new Date().toISOString().split('T')[0];
      
      const response = await apiCall(`/api/analytics/export?format=${format}&startDate=${startDate}&endDate=${endDate}`);
      
      if (format === 'csv') {
        // Create and download CSV file
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${startDate}-${endDate}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // Download JSON file
        const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${startDate}-${endDate}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Failed to export data:', error);
    }
  };

  // Format metric name for display
  const formatMetricName = (metric) => {
    return metric
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get metric color based on type
  const getMetricColor = (metric) => {
    const colors = {
      appointments_created: '#3b82f6',
      payments_received: '#10b981',
      reconciliation_jobs: '#f59e0b',
      user_activity: '#8b5cf6',
      default: '#6b7280'
    };
    return colors[metric] || colors.default;
  };

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="analytics-dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics dashboard...</p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Analytics Dashboard</h1>
          <p>Track your business performance and insights</p>
        </div>
        
        <div className="header-actions">
          <div className="date-range-selector">
            <Calendar size={16} />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="date-range-select"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          
          <div className="export-actions">
            <button 
              className="export-button"
              onClick={() => exportData('json')}
              title="Export as JSON"
            >
              <Download size={16} />
              JSON
            </button>
            <button 
              className="export-button"
              onClick={() => exportData('csv')}
              title="Export as CSV"
            >
              <Download size={16} />
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {dashboardData?.summary && (
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon">
              <BarChart3 size={24} />
            </div>
            <div className="card-content">
              <h3>{dashboardData.summary.totalMetrics}</h3>
              <p>Total Metrics</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">
              <Activity size={24} />
            </div>
            <div className="card-content">
              <h3>{dashboardData.summary.totalRecords}</h3>
              <p>Total Records</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="card-icon">
              <TrendingUp size={24} />
            </div>
            <div className="card-content">
              <h3>{dashboardData.summary.insights}</h3>
              <p>Insights</p>
            </div>
          </div>
          
          {dashboardData.summary.topMetric && (
            <div className="summary-card highlight">
              <div className="card-icon">
                <BarChart3 size={24} />
              </div>
              <div className="card-content">
                <h3>{formatMetricName(dashboardData.summary.topMetric.metric)}</h3>
                <p>Top Metric: {dashboardData.summary.topMetric.value}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Aggregated Metrics */}
        {dashboardData?.aggregated && (
          <div className="dashboard-section">
            <h2>Aggregated Metrics</h2>
            <div className="metrics-grid">
              {Object.entries(dashboardData.aggregated).map(([metric, data]) => (
                <div key={metric} className="metric-card">
                  <div className="metric-header">
                    <h4>{formatMetricName(metric)}</h4>
                    <div 
                      className="metric-color-indicator"
                      style={{ backgroundColor: getMetricColor(metric) }}
                    ></div>
                  </div>
                  <div className="metric-stats">
                    <div className="stat">
                      <span className="stat-label">Total:</span>
                      <span className="stat-value">{data.total.toFixed(2)}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Average:</span>
                      <span className="stat-value">{data.average.toFixed(2)}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Count:</span>
                      <span className="stat-value">{data.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Metrics */}
        {dashboardData?.topMetrics && (
          <div className="dashboard-section">
            <h2>Top Performing Metrics</h2>
            <div className="top-metrics-list">
              {dashboardData.topMetrics.map((metric, index) => (
                <div key={metric.metric} className="top-metric-item">
                  <div className="metric-rank">#{index + 1}</div>
                  <div className="metric-info">
                    <h4>{formatMetricName(metric.metric)}</h4>
                    <p>Value: {metric.value.toFixed(2)}</p>
                  </div>
                  <div 
                    className="metric-bar"
                    style={{ 
                      width: `${(metric.value / dashboardData.topMetrics[0].value) * 100}%`,
                      backgroundColor: getMetricColor(metric.metric)
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        {dashboardData?.insights && (
          <div className="dashboard-section">
            <h2>Insights & Recommendations</h2>
            
            {/* Trends */}
            {dashboardData.insights.trends.length > 0 && (
              <div className="insights-group">
                <h3>Trends</h3>
                <div className="trends-list">
                  {dashboardData.insights.trends.map((trend, index) => (
                    <div key={index} className="trend-item">
                      <div className={`trend-direction ${trend.direction}`}>
                        {trend.direction === 'increasing' ? '↗' : '↘'}
                      </div>
                      <div className="trend-content">
                        <p>{trend.message}</p>
                        <span className="trend-percentage">{trend.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {dashboardData.insights.recommendations.length > 0 && (
              <div className="insights-group">
                <h3>Recommendations</h3>
                <div className="recommendations-list">
                  {dashboardData.insights.recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-item">
                      <div className="recommendation-icon">💡</div>
                      <p>{rec.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alerts */}
            {dashboardData.insights.alerts.length > 0 && (
              <div className="insights-group">
                <h3>Alerts</h3>
                <div className="alerts-list">
                  {dashboardData.insights.alerts.map((alert, index) => (
                    <div key={index} className={`alert-item ${alert.severity}`}>
                      <div className="alert-icon">
                        {alert.severity === 'high' ? '⚠️' : 'ℹ️'}
                      </div>
                      <p>{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Responsiveness Indicator */}
      <div className="device-indicator">
        <div className="device-icons">
          <Monitor size={16} title="Desktop" />
          <Tablet size={16} title="Tablet" />
          <Smartphone size={16} title="Mobile" />
        </div>
        <span>Responsive Design</span>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 