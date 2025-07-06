import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         AreaChart, Area } from 'recharts';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [metrics, setMetrics] = useState({});
  const [realTimeData, setRealTimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('conversion');
  const [filters, setFilters] = useState({
    source: 'all',
    plan: 'all',
    region: 'all'
  });

  const realTimeInterval = useRef(null);
  const dashboardRef = useRef(null);

  // Sample data - in production, this would come from your analytics service
  const sampleData = {
    conversion: [
      { date: '2024-01-01', visitors: 1200, trials: 180, conversions: 45, rate: 25.0 },
      { date: '2024-01-02', visitors: 1350, trials: 210, conversions: 52, rate: 24.8 },
      { date: '2024-01-03', visitors: 1100, trials: 165, conversions: 41, rate: 24.8 },
      { date: '2024-01-04', visitors: 1400, trials: 224, conversions: 58, rate: 25.9 },
      { date: '2024-01-05', visitors: 1250, trials: 200, conversions: 50, rate: 25.0 },
      { date: '2024-01-06', visitors: 1300, trials: 208, conversions: 54, rate: 26.0 },
      { date: '2024-01-07', visitors: 1450, trials: 232, conversions: 62, rate: 26.7 }
    ],
    engagement: [
      { date: '2024-01-01', sessions: 850, avgDuration: 12.5, bounceRate: 32.1, pagesPerSession: 4.2 },
      { date: '2024-01-02', sessions: 920, avgDuration: 13.2, bounceRate: 30.8, pagesPerSession: 4.5 },
      { date: '2024-01-03', sessions: 780, avgDuration: 11.8, bounceRate: 33.5, pagesPerSession: 3.9 },
      { date: '2024-01-04', sessions: 950, avgDuration: 13.8, bounceRate: 29.2, pagesPerSession: 4.7 },
      { date: '2024-01-05', sessions: 890, avgDuration: 12.9, bounceRate: 31.4, pagesPerSession: 4.3 },
      { date: '2024-01-06', sessions: 910, avgDuration: 13.1, bounceRate: 30.1, pagesPerSession: 4.4 },
      { date: '2024-01-07', sessions: 1020, avgDuration: 14.2, bounceRate: 28.7, pagesPerSession: 4.8 }
    ],
    revenue: [
      { date: '2024-01-01', mrr: 125000, arr: 1500000, churn: 2.1, expansion: 8.5 },
      { date: '2024-01-02', mrr: 126200, arr: 1514400, churn: 2.0, expansion: 8.8 },
      { date: '2024-01-03', mrr: 125800, arr: 1509600, churn: 2.2, expansion: 8.2 },
      { date: '2024-01-04', mrr: 127500, arr: 1530000, churn: 1.9, expansion: 9.1 },
      { date: '2024-01-05', mrr: 128100, arr: 1537200, churn: 1.8, expansion: 9.3 },
      { date: '2024-01-06', mrr: 128800, arr: 1545600, churn: 1.7, expansion: 9.5 },
      { date: '2024-01-07', mrr: 130200, arr: 1562400, churn: 1.6, expansion: 9.8 }
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    loadAnalyticsData();
    startRealTimeUpdates();
    
    return () => {
      if (realTimeInterval.current) {
        clearInterval(realTimeInterval.current);
      }
    };
  }, [timeRange, filters]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics({
        conversion: {
          totalVisitors: 9000,
          totalTrials: 1419,
          totalConversions: 362,
          avgConversionRate: 25.5,
          trend: '+2.3%'
        },
        engagement: {
          totalSessions: 6420,
          avgSessionDuration: 13.1,
          avgBounceRate: 30.8,
          avgPagesPerSession: 4.4,
          trend: '+1.8%'
        },
        revenue: {
          currentMRR: 130200,
          currentARR: 1562400,
          avgChurnRate: 1.9,
          avgExpansionRate: 9.0,
          trend: '+4.2%'
        }
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
      setLoading(false);
    }
  };

  const startRealTimeUpdates = () => {
    realTimeInterval.current = setInterval(() => {
      // Simulate real-time data updates
      const newDataPoint = {
        timestamp: new Date().toISOString(),
        activeUsers: Math.floor(Math.random() * 50) + 100,
        trialsCreated: Math.floor(Math.random() * 5) + 1,
        conversions: Math.floor(Math.random() * 2),
        supportRequests: Math.floor(Math.random() * 3)
      };
      
      setRealTimeData(prev => {
        const updated = [...prev, newDataPoint];
        return updated.slice(-20); // Keep last 20 data points
      });
    }, 5000); // Update every 5 seconds
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getMetricData = () => {
    return sampleData[selectedMetric] || [];
  };

  const renderMetricCard = (title, value, subtitle, trend, color = '#0088FE') => (
    <div className="metric-card" style={{ borderLeftColor: color }}>
      <div className="metric-header">
        <h3>{title}</h3>
        <span className="trend" style={{ color: trend?.startsWith('+') ? '#00C49F' : '#FF6B6B' }}>
          {trend}
        </span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-subtitle">{subtitle}</div>
    </div>
  );

  const renderConversionChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={getMetricData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [
            name === 'rate' ? `${value}%` : formatNumber(value),
            name === 'visitors' ? 'Visitors' : 
            name === 'trials' ? 'Trials' : 
            name === 'conversions' ? 'Conversions' : 'Conversion Rate'
          ]}
        />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="visitors" 
          stackId="1" 
          stroke="#8884d8" 
          fill="#8884d8" 
          fillOpacity={0.3}
        />
        <Area 
          type="monotone" 
          dataKey="trials" 
          stackId="1" 
          stroke="#82ca9d" 
          fill="#82ca9d" 
          fillOpacity={0.3}
        />
        <Area 
          type="monotone" 
          dataKey="conversions" 
          stackId="1" 
          stroke="#ffc658" 
          fill="#ffc658" 
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderEngagementChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={getMetricData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [
            name === 'avgDuration' ? `${value} min` : 
            name === 'bounceRate' ? `${value}%` : 
            name === 'pagesPerSession' ? value : formatNumber(value),
            name === 'sessions' ? 'Sessions' :
            name === 'avgDuration' ? 'Avg Duration' :
            name === 'bounceRate' ? 'Bounce Rate' : 'Pages/Session'
          ]}
        />
        <Legend />
        <Line type="monotone" dataKey="sessions" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="avgDuration" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="pagesPerSession" stroke="#ffc658" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderRevenueChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={getMetricData()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [
            name === 'mrr' || name === 'arr' ? formatCurrency(value) : `${value}%`,
            name === 'mrr' ? 'MRR' :
            name === 'arr' ? 'ARR' :
            name === 'churn' ? 'Churn Rate' : 'Expansion Rate'
          ]}
        />
        <Legend />
        <Bar dataKey="mrr" fill="#8884d8" />
        <Bar dataKey="expansion" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderRealTimeChart = () => (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={realTimeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip 
          formatter={(value, name) => [value, name === 'activeUsers' ? 'Active Users' : 
            name === 'trialsCreated' ? 'Trials Created' :
            name === 'conversions' ? 'Conversions' : 'Support Requests']}
        />
        <Legend />
        <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="trialsCreated" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="conversions" stroke="#ffc658" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderFunnelChart = () => {
    const funnelData = [
      { name: 'Visitors', value: 9000, fill: '#8884d8' },
      { name: 'Demo Started', value: 4500, fill: '#82ca9d' },
      { name: 'Trial Created', value: 1419, fill: '#ffc658' },
      { name: 'Onboarding Completed', value: 850, fill: '#ff7300' },
      { name: 'Converted', value: 362, fill: '#00C49F' }
    ];

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={funnelData} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip formatter={(value) => [formatNumber(value), 'Users']} />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  if (loading) {
    return (
      <div className="analytics-dashboard loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard" ref={dashboardRef}>
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Analytics Dashboard</h1>
          <p>Real-time insights into your self-service platform performance</p>
        </div>
        
        <div className="dashboard-controls">
          <div className="time-range-selector">
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
          
          <div className="metric-selector">
            <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
              <option value="conversion">Conversion</option>
              <option value="engagement">Engagement</option>
              <option value="revenue">Revenue</option>
            </select>
          </div>
        </div>
      </div>

      <div className="metrics-overview">
        <div className="metrics-grid">
          {selectedMetric === 'conversion' && (
            <>
              {renderMetricCard(
                'Total Visitors',
                formatNumber(metrics.conversion?.totalVisitors || 0),
                'Unique visitors to the platform',
                metrics.conversion?.trend,
                '#8884d8'
              )}
              {renderMetricCard(
                'Trial Signups',
                formatNumber(metrics.conversion?.totalTrials || 0),
                'Users who started a trial',
                '+5.2%',
                '#82ca9d'
              )}
              {renderMetricCard(
                'Conversions',
                formatNumber(metrics.conversion?.totalConversions || 0),
                'Trial to paid conversions',
                '+3.8%',
                '#ffc658'
              )}
              {renderMetricCard(
                'Conversion Rate',
                formatPercentage(metrics.conversion?.avgConversionRate || 0),
                'Average trial to paid rate',
                metrics.conversion?.trend,
                '#ff7300'
              )}
            </>
          )}
          
          {selectedMetric === 'engagement' && (
            <>
              {renderMetricCard(
                'Total Sessions',
                formatNumber(metrics.engagement?.totalSessions || 0),
                'User sessions across the platform',
                metrics.engagement?.trend,
                '#8884d8'
              )}
              {renderMetricCard(
                'Avg Session Duration',
                `${metrics.engagement?.avgSessionDuration || 0} min`,
                'Average time spent per session',
                '+1.2%',
                '#82ca9d'
              )}
              {renderMetricCard(
                'Bounce Rate',
                formatPercentage(metrics.engagement?.avgBounceRate || 0),
                'Percentage of single-page sessions',
                '-2.1%',
                '#ffc658'
              )}
              {renderMetricCard(
                'Pages per Session',
                (metrics.engagement?.avgPagesPerSession || 0).toFixed(1),
                'Average pages viewed per session',
                '+0.3',
                '#ff7300'
              )}
            </>
          )}
          
          {selectedMetric === 'revenue' && (
            <>
              {renderMetricCard(
                'Monthly Recurring Revenue',
                formatCurrency(metrics.revenue?.currentMRR || 0),
                'Current monthly recurring revenue',
                metrics.revenue?.trend,
                '#8884d8'
              )}
              {renderMetricCard(
                'Annual Recurring Revenue',
                formatCurrency(metrics.revenue?.currentARR || 0),
                'Current annual recurring revenue',
                '+4.2%',
                '#82ca9d'
              )}
              {renderMetricCard(
                'Churn Rate',
                formatPercentage(metrics.revenue?.avgChurnRate || 0),
                'Monthly customer churn rate',
                '-0.3%',
                '#ffc658'
              )}
              {renderMetricCard(
                'Expansion Rate',
                formatPercentage(metrics.revenue?.avgExpansionRate || 0),
                'Monthly revenue expansion rate',
                '+0.8%',
                '#ff7300'
              )}
            </>
          )}
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <h3>{selectedMetric === 'conversion' ? 'Conversion Funnel' : 
                 selectedMetric === 'engagement' ? 'User Engagement Trends' : 
                 'Revenue Metrics'}</h3>
          </div>
          <div className="chart-content">
            {selectedMetric === 'conversion' && renderConversionChart()}
            {selectedMetric === 'engagement' && renderEngagementChart()}
            {selectedMetric === 'revenue' && renderRevenueChart()}
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Real-Time Activity</h3>
          </div>
          <div className="chart-content">
            {renderRealTimeChart()}
          </div>
        </div>
      </div>

      <div className="funnel-section">
        <div className="chart-container full-width">
          <div className="chart-header">
            <h3>Complete User Journey Funnel</h3>
          </div>
          <div className="chart-content">
            {renderFunnelChart()}
          </div>
        </div>
      </div>

      <div className="insights-section">
        <div className="insights-header">
          <h3>AI-Generated Insights</h3>
        </div>
        <div className="insights-grid">
          <div className="insight-card positive">
            <div className="insight-icon">📈</div>
            <div className="insight-content">
              <h4>Conversion Rate Improving</h4>
              <p>Your conversion rate has increased by 2.3% this week. The new onboarding flow is showing positive results.</p>
            </div>
          </div>
          
          <div className="insight-card warning">
            <div className="insight-icon">⚠️</div>
            <div className="insight-content">
              <h4>Bounce Rate Alert</h4>
              <p>Bounce rate increased by 1.2% on mobile devices. Consider optimizing the mobile experience.</p>
            </div>
          </div>
          
          <div className="insight-card positive">
            <div className="insight-icon">💰</div>
            <div className="insight-content">
              <h4>Revenue Growth Strong</h4>
              <p>MRR growth rate is 4.2% this month, above the industry average of 3.1%.</p>
            </div>
          </div>
          
          <div className="insight-card info">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h4>Optimization Opportunity</h4>
              <p>Users who complete the demo experience have 3.2x higher conversion rates. Consider promoting the demo more prominently.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 