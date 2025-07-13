import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Card from '../components/Card';
import StatusIndicator from '../components/StatusIndicator';
import { Badge } from '../components/Badge';
import { showToast } from '../components/Toast';
import { Button, ButtonGroup } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import { Tooltip } from '../components/Tooltip';
import { ProgressBar } from '../components/ProgressBar';
import { FileUpload } from '../components/FileUpload';

const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    revenue: 0,
    transactions: 0,
    customers: 0,
    growth: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: false,
    autoReconcile: true,
    darkMode: false,
    advancedReports: true,
  });

  useEffect(() => {
    // Simulate loading dashboard data
    setTimeout(() => {
      setMetrics({
        revenue: 125000,
        transactions: 2847,
        customers: 156,
        growth: 12.5
      });
      setRecentActivity([
        { id: 1, type: 'transaction', amount: 250, status: 'completed', time: '2 min ago' },
        { id: 2, type: 'reconciliation', status: 'pending', time: '5 min ago' },
        { id: 3, type: 'customer', status: 'new', time: '10 min ago' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const MetricCard = ({ title, value, icon: Icon, change, changeType }) => (
    <Card variant="elevated" padding="md" data-testid={`metric-card-${title.toLowerCase().replace(' ', '-')}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-primary mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-sm ${changeType === 'positive' ? 'text-success' : 'text-error'}`}>
                {changeType === 'positive' ? '+' : ''}{change}%
              </span>
              <TrendingUp className="w-4 h-4 ml-1 text-success" />
            </div>
          )}
        </div>
        <div className="p-3 bg-secondary rounded-lg">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </div>
    </Card>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = () => {
      switch (activity.type) {
        case 'transaction': return <DollarSign className="w-4 h-4" />;
        case 'reconciliation': return <Activity className="w-4 h-4" />;
        case 'customer': return <Users className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
      }
    };

    const getStatusColor = () => {
      switch (activity.status) {
        case 'completed': return 'success';
        case 'pending': return 'warning';
        case 'new': return 'info';
        default: return 'info';
      }
    };

    return (
      <div className="flex items-center justify-between p-4 border-b border-accent last:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-background-input rounded-lg">
            {getIcon()}
          </div>
          <div>
            <p className="text-text-default font-medium">
              {activity.type === 'transaction' ? `$${activity.amount} transaction` : 
               activity.type === 'reconciliation' ? 'Reconciliation process' : 'New customer'}
            </p>
            <p className="text-accent text-sm">{activity.time}</p>
          </div>
        </div>
        <Badge variant={getStatusColor()} size="sm">
          {activity.status}
        </Badge>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-8" data-testid="dashboard-loading">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-secondary rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8" data-testid="dashboard-page">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome back to MedSpaSync Pro
        </h1>
        <p className="text-text-secondary">
          Here's what's happening with your business today
        </p>
      </div>

      {/* Badge Component Demo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Status Indicators</h2>
        <div className="flex flex-wrap gap-3" data-testid="badge-demo">
          <Badge variant="success">Active</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="info">Processing</Badge>
          <Badge variant="neutral">Inactive</Badge>
          <Badge variant="primary">Premium</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="success" size="lg">Large Success</Badge>
          <Badge variant="error" size="sm">Small Error</Badge>
        </div>
      </div>

      {/* Enhanced Button Component Demo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Enhanced Interactive Buttons</h2>
        <div className="space-y-6" data-testid="enhanced-button-demo">
          {/* Button Variants */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Button Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" ripple={true} tooltip="Primary action button">
                Primary
              </Button>
              <Button variant="secondary" ripple={true} tooltip="Secondary action">
                Secondary
              </Button>
              <Button variant="accent" ripple={true} tooltip="Accent styling">
                Accent
              </Button>
              <Button variant="outline" ripple={true} tooltip="Outlined button">
                Outline
              </Button>
              <Button variant="ghost" ripple={true} tooltip="Minimal ghost button">
                Ghost
              </Button>
              <Button variant="danger" ripple={true} tooltip="Destructive action">
                Danger
              </Button>
              <Button variant="success" ripple={true} tooltip="Success action">
                Success
              </Button>
              <Button variant="gradient" ripple={true} tooltip="Gradient with shimmer effect">
                Gradient
              </Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="xs">Extra Small</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="xl">Extra Large</Button>
            </div>
          </div>

          {/* Button States */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Button States</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" loading={true}>
                Loading
              </Button>
              <Button variant="secondary" disabled={true}>
                Disabled
              </Button>
              <Button 
                variant="accent" 
                leftIcon={<TrendingUp className="w-4 h-4" />}
              >
                With Left Icon
              </Button>
              <Button 
                variant="outline" 
                rightIcon={<Users className="w-4 h-4" />}
              >
                With Right Icon
              </Button>
              <Button 
                variant="primary" 
                leftIcon={<DollarSign className="w-4 h-4" />}
                rightIcon={<Activity className="w-4 h-4" />}
              >
                Both Icons
              </Button>
            </div>
          </div>

          {/* Button Groups */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Button Groups</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-text-secondary mb-2">Horizontal Attached Group</p>
                <ButtonGroup variant="attached" animated={true}>
                  <Button variant="outline">Day</Button>
                  <Button variant="outline">Week</Button>
                  <Button variant="primary">Month</Button>
                  <Button variant="outline">Year</Button>
                </ButtonGroup>
              </div>
              
              <div>
                <p className="text-sm text-text-secondary mb-2">Horizontal Separated Group</p>
                <ButtonGroup variant="separated" animated={true}>
                  <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
                    Schedule
                  </Button>
                  <Button variant="secondary" leftIcon={<Users className="w-4 h-4" />}>
                    Clients
                  </Button>
                  <Button variant="secondary" leftIcon={<Activity className="w-4 h-4" />}>
                    Reports
                  </Button>
                </ButtonGroup>
              </div>

              <div>
                <p className="text-sm text-text-secondary mb-2">Vertical Group</p>
                <ButtonGroup orientation="vertical" variant="attached" animated={true}>
                  <Button variant="outline" fullWidth={true}>Create New</Button>
                  <Button variant="outline" fullWidth={true}>Import Data</Button>
                  <Button variant="outline" fullWidth={true}>Export Report</Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Component Demo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Notification System</h2>
        <div className="flex flex-wrap gap-3" data-testid="toast-demo">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => showToast.success('Operation completed successfully!')}
          >
            Success Toast
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => showToast.error('An error occurred while processing.')}
          >
            Error Toast
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => showToast.warning('Please check your input data.')}
          >
            Warning Toast
          </Button>
          <Button 
            variant="accent" 
            size="sm"
            onClick={() => showToast.info('New update available for download.')}
          >
            Info Toast
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              const toastId = showToast.loading('Processing your request...');
              setTimeout(() => {
                showToast.dismiss(toastId);
                showToast.success('Request completed successfully!');
              }, 3000);
            }}
          >
            Loading Toast
          </Button>
        </div>
      </div>

      {/* Tooltip Component Demo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Interactive Help System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-testid="tooltip-demo">
          <Card variant="elevated" padding="md">
            <div className="text-center space-y-4">
              <Tooltip content="Hover tooltip provides instant help without interrupting your workflow" position="top">
                <Button variant="primary" size="sm">
                  Hover Tooltip
                </Button>
              </Tooltip>
              <Tooltip 
                content="Click tooltips stay open until you click elsewhere, perfect for longer explanations" 
                trigger="click" 
                position="bottom"
              >
                <Button variant="secondary" size="sm">
                  Click Tooltip
                </Button>
              </Tooltip>
            </div>
          </Card>
          
          <Card variant="elevated" padding="md">
            <div className="text-center space-y-4">
              <Tooltip 
                content="Focus tooltips appear when you tab to an element, ensuring keyboard accessibility" 
                trigger="focus" 
                position="left"
              >
                <Button variant="accent" size="sm">
                  Focus Tooltip
                </Button>
              </Tooltip>
              <Tooltip 
                content="Smart positioning automatically adjusts to keep tooltips visible within the viewport" 
                position="right"
              >
                <Button variant="ghost" size="sm">
                  Smart Position
                </Button>
              </Tooltip>
            </div>
          </Card>

          <Card variant="elevated" padding="md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-primary text-sm">Revenue Analytics</span>
                <Tooltip content="Track monthly revenue growth, identify trends, and forecast future performance">
                  <TrendingUp className="w-4 h-4 text-accent cursor-help" />
                </Tooltip>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-primary text-sm">Customer Insights</span>
                <Tooltip content="Analyze customer behavior, retention rates, and lifetime value calculations" position="left">
                  <Users className="w-4 h-4 text-accent cursor-help" />
                </Tooltip>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-primary text-sm">Transaction Processing</span>
                <Tooltip content="Monitor real-time transaction processing, success rates, and error handling" position="bottom">
                  <Activity className="w-4 h-4 text-accent cursor-help" />
                </Tooltip>
              </div>
            </div>
          </Card>

          <Card variant="elevated" padding="md">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Quick Actions</h3>
              <div className="space-y-2">
                <Tooltip content="Generate comprehensive reports for the selected time period with detailed metrics and insights">
                  <Button variant="primary" size="sm" className="w-full">
                    Generate Report
                  </Button>
                </Tooltip>
                <Tooltip content="Export current dashboard data in multiple formats: CSV, PDF, or Excel" trigger="click">
                  <Button variant="secondary" size="sm" className="w-full">
                    Export Data
                  </Button>
                </Tooltip>
                <Tooltip content="Configure alert thresholds, notification preferences, and automated reporting schedules">
                  <Button variant="accent" size="sm" className="w-full">
                    Settings
                  </Button>
                </Tooltip>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ProgressBar Component Demo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Progress Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="progress-bar-demo">
          <Card variant="elevated" padding="md">
            <h3 className="text-lg font-medium text-text-primary mb-6">Business Metrics Progress</h3>
            <div className="space-y-6">
              <ProgressBar
                value={metrics.growth}
                max={20}
                label="Monthly Growth Target"
                showPercentage={true}
                variant="success"
                size="md"
                animated={true}
                data-testid="growth-progress"
              />
              <ProgressBar
                value={75}
                label="Customer Satisfaction"
                showValue={true}
                variant="primary"
                size="lg"
                animated={true}
                data-testid="satisfaction-progress"
              />
              <ProgressBar
                value={89}
                label="System Uptime"
                showPercentage={true}
                variant="info"
                size="md"
                striped={true}
                animated={true}
                data-testid="uptime-progress"
              />
              <ProgressBar
                value={45}
                label="Quarterly Revenue Goal"
                showPercentage={true}
                variant="warning"
                size="md"
                animated={true}
                data-testid="revenue-goal-progress"
              />
            </div>
          </Card>

          <Card variant="elevated" padding="md">
            <h3 className="text-lg font-medium text-text-primary mb-6">System Status & Performance</h3>
            <div className="space-y-6">
              <ProgressBar
                value={100}
                label="Data Backup Complete"
                showPercentage={true}
                variant="success"
                size="md"
                animated={true}
                data-testid="backup-progress"
              />
              <ProgressBar
                value={68}
                label="Storage Utilization"
                showValue={true}
                variant="gradient"
                size="lg"
                animated={true}
                pulse={true}
                data-testid="storage-progress"
              />
              <ProgressBar
                value={25}
                label="Security Scan Progress"
                showPercentage={true}
                variant="info"
                size="md"
                striped={true}
                animated={true}
                data-testid="security-progress"
              />
              <ProgressBar
                value={85}
                label="API Response Performance"
                showPercentage={true}
                variant="primary"
                size="sm"
                animated={true}
                data-testid="api-performance-progress"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Checkbox Component Demo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Settings & Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="checkbox-demo">
          <Card variant="elevated" padding="md">
            <h3 className="text-lg font-medium text-text-primary mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <Checkbox
                checked={settings.emailNotifications}
                onChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                label="Email Notifications"
                description="Receive important updates and alerts via email"
                data-testid="checkbox-email"
              />
              <Checkbox
                checked={settings.smsAlerts}
                onChange={(checked) => setSettings({ ...settings, smsAlerts: checked })}
                label="SMS Alerts"
                description="Get instant notifications for critical events"
                variant="warning"
                data-testid="checkbox-sms"
              />
              <Checkbox
                checked={settings.autoReconcile}
                onChange={(checked) => setSettings({ ...settings, autoReconcile: checked })}
                label="Auto-Reconciliation"
                description="Automatically process transactions when confidence is high"
                variant="success"
                data-testid="checkbox-auto-reconcile"
              />
            </div>
          </Card>

          <Card variant="elevated" padding="md">
            <h3 className="text-lg font-medium text-text-primary mb-4">Interface Settings</h3>
            <div className="space-y-4">
              <Checkbox
                checked={settings.darkMode}
                onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
                label="Dark Mode"
                description="Use dark theme for better viewing in low light"
                size="lg"
                data-testid="checkbox-dark-mode"
              />
              <Checkbox
                checked={settings.advancedReports}
                onChange={(checked) => setSettings({ ...settings, advancedReports: checked })}
                label="Advanced Reports"
                description="Enable detailed analytics and custom reporting features"
                size="sm"
                data-testid="checkbox-advanced-reports"
              />
              <Checkbox
                checked={false}
                onChange={() => {}}
                indeterminate={true}
                label="Beta Features"
                description="Partially enabled - some features are in testing"
                disabled={false}
                data-testid="checkbox-beta-features"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* FileUpload Component Demo */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Document Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="file-upload-demo">
          <Card variant="elevated" padding="md">
            <h3 className="text-lg font-medium text-text-primary mb-4">Client Documents</h3>
            <FileUpload
              accept="image/*,.pdf,.doc,.docx"
              multiple={true}
              maxSize={5 * 1024 * 1024} // 5MB
              maxFiles={3}
              dragAndDrop={true}
              showPreview={true}
              variant="default"
              onFilesSelected={(files) => {
                console.log('Files selected:', files);
                showToast.info(`${files.length} file(s) selected for upload`);
              }}
              onUpload={async (files) => {
                // Simulate upload
                await new Promise(resolve => setTimeout(resolve, 2000));
                showToast.success(`Successfully uploaded ${files.length} file(s)`);
              }}
              data-testid="client-documents-upload"
            />
          </Card>

          <Card variant="elevated" padding="md">
            <h3 className="text-lg font-medium text-text-primary mb-4">Quick Upload</h3>
            <div className="space-y-4">
              <FileUpload
                accept="image/*"
                multiple={false}
                maxSize={2 * 1024 * 1024} // 2MB
                dragAndDrop={true}
                showPreview={true}
                variant="compact"
                onFilesSelected={(files) => {
                  showToast.info('Profile image selected');
                }}
                data-testid="profile-image-upload"
              />
              
              <FileUpload
                accept=".csv,.xlsx,.xls"
                multiple={false}
                maxSize={10 * 1024 * 1024} // 10MB
                dragAndDrop={false}
                showPreview={false}
                variant="minimal"
                onFilesSelected={(files) => {
                  showToast.info('Data file selected for import');
                }}
                onUpload={async (files) => {
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  showToast.success('Data imported successfully');
                }}
                data-testid="data-import-upload"
              />
            </div>
          </Card>
        </div>
      </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`$${metrics.revenue.toLocaleString()}`}
            icon={DollarSign}
            change={metrics.growth}
            changeType="positive"
          />
          <MetricCard
            title="Transactions"
            value={metrics.transactions.toLocaleString()}
            icon={Activity}
            change={8.2}
            changeType="positive"
          />
          <MetricCard
            title="Active Customers"
            value={metrics.customers}
            icon={Users}
            change={15.3}
            changeType="positive"
          />
          <MetricCard
            title="Growth Rate"
            value={`${metrics.growth}%`}
            icon={TrendingUp}
            change={2.1}
            changeType="positive"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-text-default mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/analytics"
                  className="flex items-center justify-between p-3 bg-background-input rounded-lg hover:bg-primary-light transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">View Analytics</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
                <Link
                  to="/reconciliation"
                  className="flex items-center justify-between p-3 bg-background-input rounded-lg hover:bg-primary-light transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Start Reconciliation</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
                <Link
                  to="/customers"
                  className="flex items-center justify-between p-3 bg-background-input rounded-lg hover:bg-primary-light transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Manage Customers</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </Link>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-text-default mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {recentActivity.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-accent">
                <Link
                  to="/activity"
                  className="text-primary-light hover:text-primary-dark text-sm font-medium"
                >
                  View all activity →
                </Link>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-text-default mb-4">AI Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-background-input rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-text-default font-medium">Revenue Trend</span>
                </div>
                <p className="text-accent text-sm">
                  Your revenue has increased by 12.5% this month. Consider expanding your service offerings.
                </p>
              </div>
              <div className="p-4 bg-background-input rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <span className="text-text-default font-medium">Reconciliation Alert</span>
                </div>
                <p className="text-accent text-sm">
                  3 transactions need reconciliation. Review them to ensure accuracy.
                </p>
              </div>
            </div>
          </div>
        </Card>
    </div>
  );
};

export default DashboardPage;
