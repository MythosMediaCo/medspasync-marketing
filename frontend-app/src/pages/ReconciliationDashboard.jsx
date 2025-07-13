import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Activity, 
  CheckCircle, 
  AlertCircle,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  Play,
  Pause,
  Square
} from 'lucide-react';
import Card from '../components/Card';
import StatusIndicator from '../components/StatusIndicator';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReconciliationDashboard = () => {
  const [reconciliationStats, setReconciliationStats] = useState({
    totalTransactions: 0,
    processed: 0,
    pending: 0,
    accuracy: 0,
    revenueRecovered: 0,
    timeSaved: 0
  });
  const [processStatus, setProcessStatus] = useState('idle'); // idle, running, paused, completed
  const [recentReconciliations, setRecentReconciliations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading reconciliation data
    setTimeout(() => {
      setReconciliationStats({
        totalTransactions: 1247,
        processed: 1189,
        pending: 58,
        accuracy: 98.5,
        revenueRecovered: 12500,
        timeSaved: 12.5
      });
      setRecentReconciliations([
        { id: 1, patientName: 'Sarah Johnson', service: 'Botox Treatment', amount: 150, confidence: 98.2, status: 'reconciled', time: '2 minutes ago' },
        { id: 2, patientName: 'Michael Chen', service: 'Chemical Peel', amount: 200, confidence: 95.8, status: 'pending', time: '15 minutes ago' },
        { id: 3, patientName: 'Emily Davis', service: 'Consultation', amount: 75, confidence: 99.1, status: 'reconciled', time: '1 hour ago' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, trendValue }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-accent text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-text-default mt-1">{value}</p>
          {subtitle && <p className="text-accent text-sm mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <span className="text-sm text-accent">{trendValue}</span>
              <TrendingUp className="w-4 h-4 ml-1 text-accent" />
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-light rounded-lg">
          <Icon className="w-6 h-6 text-primary-dark" />
        </div>
      </div>
    </Card>
  );

  const ProcessStep = ({ step, title, description, status, icon: Icon }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'completed': return 'success';
        case 'running': return 'info';
        case 'pending': return 'warning';
        default: return 'info';
      }
    };

    return (
      <div className="flex items-center space-x-4 p-4 bg-background-input rounded-lg">
        <div className="flex items-center justify-center w-10 h-10 bg-primary-light rounded-lg">
          <Icon className="w-5 h-5 text-primary-dark" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-accent">Step {step}</span>
            <StatusIndicator status={getStatusColor()}>
              {status}
            </StatusIndicator>
          </div>
          <h4 className="text-text-default font-medium">{title}</h4>
          <p className="text-accent text-sm">{description}</p>
        </div>
      </div>
    );
  };

  const ReconciliationItem = ({ reconciliation }) => {
    const getStatusColor = () => {
      switch (reconciliation.status) {
        case 'reconciled': return 'success';
        case 'pending': return 'warning';
        case 'error': return 'error';
        default: return 'info';
      }
    };

    return (
      <div className="flex items-center justify-between p-4 border-b border-accent last:border-b-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
            <span className="text-primary-dark text-sm font-semibold">
              {reconciliation.patientName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="text-text-default font-medium">{reconciliation.patientName}</p>
            <p className="text-accent text-sm">{reconciliation.service}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-text-default font-medium">${reconciliation.amount}</p>
          <p className="text-accent text-sm">{reconciliation.confidence}% confidence</p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusIndicator status={getStatusColor()}>
            {reconciliation.status}
          </StatusIndicator>
          <span className="text-accent text-sm">{reconciliation.time}</span>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-background-card rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
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
              Reconciliation Dashboard
            </h1>
            <p className="text-accent">
              AI-powered transaction reconciliation and revenue recovery
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="flex items-center space-x-2 bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Transactions</span>
            </button>
            <button className="flex items-center space-x-2 bg-accent hover:bg-accent-light text-primary-dark px-4 py-2 rounded-lg transition-colors">
              {processStatus === 'running' ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : processStatus === 'paused' ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Start Process</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Transactions"
            value={reconciliationStats.totalTransactions.toLocaleString()}
            subtitle="+12% this month"
            icon={Activity}
            trend="up"
            trendValue="+12%"
          />
          <MetricCard
            title="Processed"
            value={reconciliationStats.processed.toLocaleString()}
            subtitle={`${reconciliationStats.accuracy}% accuracy`}
            icon={CheckCircle}
            trend="up"
            trendValue={`${reconciliationStats.accuracy}%`}
          />
          <MetricCard
            title="Revenue Recovered"
            value={`$${reconciliationStats.revenueRecovered.toLocaleString()}`}
            subtitle="+$2,400 this month"
            icon={DollarSign}
            trend="up"
            trendValue="+$2,400"
          />
          <MetricCard
            title="Pending Review"
            value={reconciliationStats.pending}
            subtitle="Requires manual review"
            icon={AlertCircle}
          />
          <MetricCard
            title="Time Saved"
            value={`${reconciliationStats.timeSaved} hours`}
            subtitle="vs manual processing"
            icon={Clock}
            trend="up"
            trendValue="+15%"
          />
          <MetricCard
            title="Active Customers"
            value="156"
            subtitle="This month"
            icon={Users}
            trend="up"
            trendValue="+8%"
          />
        </div>

        {/* Process Steps */}
        <Card className="mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-text-default mb-6">Reconciliation Process</h2>
            <div className="space-y-4">
              <ProcessStep
                step={1}
                title="Upload Transaction Data"
                description="Import your transaction files from reward systems"
                status="completed"
                icon={Upload}
              />
              <ProcessStep
                step={2}
                title="AI Analysis"
                description="AI analyzes patterns and matches transactions"
                status={processStatus === 'running' ? 'running' : 'completed'}
                icon={Activity}
              />
              <ProcessStep
                step={3}
                title="Manual Review"
                description="Review low-confidence matches"
                status={reconciliationStats.pending > 0 ? 'pending' : 'completed'}
                icon={CheckCircle}
              />
              <ProcessStep
                step={4}
                title="Export Results"
                description="Download reconciled data and reports"
                status="pending"
                icon={TrendingUp}
              />
            </div>
          </div>
        </Card>

        {/* Recent Reconciliations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-text-default mb-4">Recent Reconciliations</h2>
              <div className="space-y-2">
                {recentReconciliations.map(reconciliation => (
                  <ReconciliationItem key={reconciliation.id} reconciliation={reconciliation} />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-accent">
                <button className="text-primary-light hover:text-primary-dark text-sm font-medium">
                  View all reconciliations →
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-text-default mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="flex items-center justify-between w-full p-3 bg-background-input rounded-lg hover:bg-primary-light transition-colors">
                  <div className="flex items-center space-x-3">
                    <Upload className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Upload New Data</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </button>
                <button className="flex items-center justify-between w-full p-3 bg-background-input rounded-lg hover:bg-primary-light transition-colors">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Review Pending</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </button>
                <button className="flex items-center justify-between w-full p-3 bg-background-input rounded-lg hover:bg-primary-light transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <span className="text-text-default font-medium">Generate Report</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-accent" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReconciliationDashboard;
