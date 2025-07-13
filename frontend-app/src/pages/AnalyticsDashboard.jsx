import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download,
  Calendar,
  Filter,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Users,
  Activity
} from 'lucide-react';
import Card from '../components/Card';
import StatusIndicator from '../components/StatusIndicator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Tabs } from '../components/Tabs';
import { DatePicker } from '../components/DatePicker';
import { ZustandToast } from '../components/Toast';
import { useAnalyticsStore, useUIStore } from '../store';

const AnalyticsDashboard = () => {
  const { 
    metrics, 
    chartData, 
    filters, 
    isLoading, 
    lastUpdated,
    refreshData, 
    exportData, 
    setDateRange,
    setFilters 
  } = useAnalyticsStore();
  
  const { addToast } = useUIStore();

  useEffect(() => {
    // Load initial analytics data
    refreshData();
  }, [refreshData]);

  const handleExport = async (format) => {
    try {
      await exportData(format);
      addToast({
        type: 'success',
        message: `Analytics data exported successfully as ${format.toUpperCase()}`,
        duration: 3000,
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to export analytics data',
        duration: 5000,
      });
    }
  };

  const handleRefresh = async () => {
    try {
      await refreshData();
      addToast({
        type: 'success',
        message: 'Analytics data refreshed successfully',
        duration: 2000,
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Failed to refresh analytics data',
        duration: 5000,
      });
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, trend = 'up' }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-default mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <ArrowUp className="w-4 h-4 text-accent" />
            ) : (
              <ArrowDown className="w-4 h-4 text-error" />
            )}
            <span className={`text-sm ml-1 ${trend === 'up' ? 'text-accent' : 'text-error'}`}>
              {change}%
            </span>
          </div>
        </div>
        <div className="p-3 bg-primary-light rounded-lg">
          <Icon className="w-6 h-6 text-primary-dark" />
        </div>
      </div>
    </Card>
  );

  const ChartCard = ({ title, children, className = '' }) => (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-default">{title}</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-accent hover:text-primary-light rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      {children}
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-background-card rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-background-card rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto py-8 px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-default mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-accent">
              Track your business performance and revenue insights
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-background-card rounded-lg p-2">
              <Calendar className="w-4 h-4 text-accent" />
              <select 
                value={filters.dateRange.preset} 
                onChange={(e) => {
                  const preset = e.target.value;
                  setFilters({ 
                    dateRange: { 
                      ...filters.dateRange, 
                      preset: preset 
                    } 
                  });
                }}
                className="bg-transparent text-text-default border-none outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            {filters.dateRange.preset === 'custom' && (
              <div className="flex items-center space-x-2">
                <DatePicker
                  value={filters.dateRange.start}
                  onChange={(date) => setDateRange(date, filters.dateRange.end)}
                  placeholder="Start date"
                  maxDate={filters.dateRange.end || new Date()}
                  size="sm"
                  variant="outlined"
                  data-testid="analytics-start-date"
                />
                <span className="text-accent">to</span>
                <DatePicker
                  value={filters.dateRange.end}
                  onChange={(date) => setDateRange(filters.dateRange.start, date)}
                  placeholder="End date"
                  minDate={filters.dateRange.start}
                  maxDate={new Date()}
                  size="sm"
                  variant="outlined"
                  data-testid="analytics-end-date"
                />
              </div>
            )}
            <button 
              onClick={handleRefresh}
              disabled={isLoading}
              className="p-2 text-accent hover:text-primary-light bg-background-card rounded-lg transition-colors disabled:opacity-50"
              title="Refresh Data"
            >
              <Filter className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleExport('csv')}
              disabled={isLoading}
              className="p-2 text-accent hover:text-primary-light bg-background-card rounded-lg transition-colors disabled:opacity-50"
              title="Export as CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`$${metrics.revenue.current.toLocaleString()}`}
            change={metrics.revenue.change}
            icon={DollarSign}
            trend={metrics.revenue.trend}
          />
          <MetricCard
            title="Transactions"
            value={metrics.transactions.current.toLocaleString()}
            change={metrics.transactions.change}
            icon={Activity}
            trend={metrics.transactions.trend}
          />
          <MetricCard
            title="Active Customers"
            value={metrics.customers.current}
            change={metrics.customers.change}
            icon={Users}
            trend={metrics.customers.trend}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversion.current}%`}
            change={metrics.conversion.change}
            icon={TrendingUp}
            trend={metrics.conversion.trend}
          />
        </div>

        {/* Analytics Tabs */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-text-default mb-6">Analytics Overview</h2>
            <Tabs
              tabs={[
                {
                  id: 'revenue',
                  label: 'Revenue',
                  icon: <DollarSign className="w-4 h-4" />,
                  content: (
                    <div className="h-64 bg-background-input rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-accent mx-auto mb-4" />
                        <p className="text-accent">Revenue trend chart will be displayed here</p>
                        <p className="text-text-default text-sm mt-2">Track monthly and yearly revenue growth</p>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'transactions',
                  label: 'Transactions',
                  icon: <Activity className="w-4 h-4" />,
                  badge: metrics.transactions.current > 2000 ? 'High' : null,
                  content: (
                    <div className="h-64 bg-background-input rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 text-accent mx-auto mb-4" />
                        <p className="text-accent">Transaction distribution chart will be displayed here</p>
                        <p className="text-text-default text-sm mt-2">View transaction volume and distribution</p>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'customers',
                  label: 'Customers',
                  icon: <Users className="w-4 h-4" />,
                  content: (
                    <div className="h-64 bg-background-input rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
                        <p className="text-accent">Customer analytics will be displayed here</p>
                        <p className="text-text-default text-sm mt-2">Monitor customer acquisition and retention</p>
                      </div>
                    </div>
                  )
                },
                {
                  id: 'insights',
                  label: 'AI Insights',
                  icon: <Calendar className="w-4 h-4" />,
                  content: (
                    <div className="space-y-4">
                      <div className="p-4 bg-background-input rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-accent" />
                          <span className="text-text-default font-medium">Revenue Analysis</span>
                        </div>
                        <p className="text-accent text-sm">
                          Your revenue growth rate of {metrics.revenue.change}% is above industry average.
                        </p>
                      </div>
                      <div className="p-4 bg-background-input rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Activity className="w-5 h-5 text-accent" />
                          <span className="text-text-default font-medium">Transaction Patterns</span>
                        </div>
                        <p className="text-accent text-sm">
                          Peak transaction times are between 2-4 PM. Consider staff scheduling optimization.
                        </p>
                      </div>
                      <div className="p-4 bg-background-input rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Users className="w-5 h-5 text-accent" />
                          <span className="text-text-default font-medium">Customer Behavior</span>
                        </div>
                        <p className="text-accent text-sm">
                          Customer retention rate improved by {metrics.customers.change}% this period.
                        </p>
                      </div>
                    </div>
                  )
                }
              ]}
              variant="underline"
              size="md"
              animated={true}
              data-testid="analytics-tabs"
            />
          </div>
        </Card>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-default mb-4">Top Performing Services</h3>
              <div className="space-y-4">
                {[
                  { name: 'Botox Treatment', revenue: 45000, growth: 15.2 },
                  { name: 'Chemical Peel', revenue: 32000, growth: 8.7 },
                  { name: 'Consultation', revenue: 28000, growth: 12.3 },
                  { name: 'Facial Treatment', revenue: 20000, growth: 5.9 }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background-input rounded-lg">
                    <div>
                      <p className="text-text-default font-medium">{service.name}</p>
                      <p className="text-accent text-sm">${service.revenue.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIndicator status="success">
                        +{service.growth}%
                      </StatusIndicator>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-default mb-4">Quick Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-background-input rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Revenue Growth</span>
                  </div>
                  <p className="text-accent text-sm">
                    Your revenue has grown by 13.6% compared to last month.
                  </p>
                </div>
                <div className="p-4 bg-background-input rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Customer Acquisition</span>
                  </div>
                  <p className="text-accent text-sm">
                    You've gained 14 new customers this month.
                  </p>
                </div>
                <div className="p-4 bg-background-input rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Transaction Volume</span>
                  </div>
                  <p className="text-accent text-sm">
                    Transaction volume increased by 7.4% this month.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Export Section */}
        <Card className="mt-8">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-default mb-2">
                  Export Analytics Data
                </h3>
                <p className="text-accent">
                  Download your analytics data for further analysis
                </p>
              </div>
              <button className="flex items-center space-x-2 bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
      
      {/* Zustand Toast Notifications */}
      <ZustandToast />
    </div>
  );
};

export default AnalyticsDashboard; 