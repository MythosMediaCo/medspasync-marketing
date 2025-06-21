// Shared feature data for consistent features across components

// Core metrics used throughout the site
export const businessMetrics = {
  timeWasted: {
    value: '8+',
    unit: 'hours weekly',
    description: 'lost to manual reconciliation',
    icon: '⏰'
  },
  revenueLoss: {
    value: '$2,500+',
    unit: 'monthly',
    description: 'in missed revenue',
    icon: '💰'
  },
  aiAccuracy: {
    value: '95%+',
    unit: 'accuracy',
    description: 'AI matching rate',
    icon: '🧠'
  },
  implementation: {
    value: '24',
    unit: 'hours',
    description: 'setup time',
    icon: '⚡'
  }
};

// Core problem statements
export const problems = [
  {
    id: 'time_loss',
    title: 'Manual Reconciliation Hell',
    icon: '⏰',
    metric: businessMetrics.timeWasted,
    description: 'Spending hours every week manually matching POS transactions with Alle, Aspire, and other rewards programs.',
    badge: '8+ hours per week lost'
  },
  {
    id: 'revenue_loss',
    title: 'Missed Revenue Recovery',
    icon: '💰',
    metric: businessMetrics.revenueLoss,
    description: 'Unmatched transactions mean unclaimed revenue. When loyalty rewards don\'t match your POS, you lose money.',
    badge: '$2,500+ monthly losses'
  },
  {
    id: 'accuracy',
    title: 'Inaccurate Reporting',
    icon: '📊',
    description: 'Without proper reconciliation, your financial reports don\'t reflect reality, making business decisions harder.',
    badge: 'Decision paralysis'
  }
];

// Core solution features
export const coreFeatures = [
  {
    id: 'ai_matching',
    icon: '🧠',
    title: 'Advanced AI Matching',
    description: 'Our AI algorithm accurately matches POS transactions with loyalty rewards, even with naming variations and timing differences.',
    metrics: [businessMetrics.aiAccuracy],
    highlights: ['Pattern recognition', 'Name variation handling', 'Time-shift tolerance'],
    category: 'core'
  },
  {
    id: 'fast_setup',
    icon: '⚡',
    title: '24-Hour Setup',
    description: 'Most medical spas are reconciling within 24 hours. No complex integrations required - just upload your CSV files.',
    metrics: [businessMetrics.implementation],
    highlights: ['No API integration required', 'CSV file upload', 'Guided onboarding'],
    category: 'core'
  },
  {
    id: 'universal_support',
    icon: '📁',
    title: 'Universal CSV Support',
    description: 'Works with any POS system that exports CSV files. Alle, Aspire, and all major loyalty programs supported.',
    highlights: ['Any POS system', 'All loyalty programs', 'Standard CSV format'],
    category: 'core'
  },
  {
    id: 'security',
    icon: '🔐',
    title: 'HIPAA-Conscious Security',
    description: 'Your data is encrypted in transit and at rest. Files are automatically deleted after processing.',
    highlights: ['End-to-end encryption', 'Auto-deletion', 'Compliance ready'],
    category: 'core'
  },
  {
    id: 'reports',
    icon: '📊',
    title: 'Detailed Reports',
    description: 'Export comprehensive reconciliation reports for accounting and business analysis.',
    highlights: ['Excel export', 'Custom date ranges', 'Detailed breakdowns'],
    category: 'core'
  },
  {
    id: 'revenue_recovery',
    icon: '💰',
    title: 'Revenue Recovery',
    description: 'Prevent $2,500+ monthly losses with intelligent matching that finds every unmatched transaction.',
    metrics: [businessMetrics.revenueLoss],
    highlights: ['Automatic detection', 'Revenue tracking', 'Loss prevention'],
    category: 'core'
  }
];

// Professional tier features (coming Q3 2025)
export const professionalFeatures = [
  {
    id: 'automated_scheduling',
    icon: '📅',
    title: 'Automated Scheduling',
    description: 'Schedule reconciliation runs automatically based on your spa\'s workflow.',
    badge: 'Coming Q3 2025',
    category: 'professional'
  },
  {
    id: 'advanced_analytics',
    icon: '📈',
    title: 'Advanced Analytics Dashboard',
    description: 'Deep insights into reconciliation patterns, revenue trends, and optimization opportunities.',
    badge: 'Coming Q3 2025',
    category: 'professional'
  },
  {
    id: 'priority_support',
    icon: '📞',
    title: 'Priority Phone Support',
    description: 'Direct phone line with medical spa operations experts for immediate assistance.',
    badge: 'Coming Q3 2025',
    category: 'professional'
  },
  {
    id: 'custom_integrations',
    icon: '🔌',
    title: 'Custom Integrations',
    description: 'Direct API integrations with your existing POS and management systems.',
    badge: 'Coming Q3 2025',
    category: 'professional'
  }
];

// Solution process steps
export const solutionSteps = [
  {
    step: 1,
    title: 'Upload Your Files',
    description: 'Drag and drop your POS and loyalty program CSV files into our secure interface.',
    icon: '📁',
    timeEstimate: '2 minutes'
  },
  {
    step: 2,
    title: 'AI Processing',
    description: 'Our intelligent matching algorithm analyzes and matches transactions with 95%+ accuracy.',
    icon: '🧠',
    timeEstimate: '5-10 minutes'
  },
  {
    step: 3,
    title: 'Review Results',
    description: 'Review matched and unmatched transactions with detailed explanations and confidence scores.',
    icon: '📊',
    timeEstimate: '10 minutes'
  },
  {
    step: 4,
    title: 'Export Reports',
    description: 'Download comprehensive reconciliation reports for your accounting and analysis needs.',
    icon: '💼',
    timeEstimate: '1 minute'
  }
];

// Trust indicators
export const trustIndicators = [
  {
    label: 'Setup Time',
    value: '24 Hours',
    color: 'emerald'
  },
  {
    label: 'Accuracy Rate',
    value: '95%+',
    color: 'blue'
  },
  {
    label: 'Time Saved',
    value: '8+ Hours/Week',
    color: 'green'
  },
  {
    label: 'Revenue Protected',
    value: '$2,500+/Month',
    color: 'emerald'
  }
];

// Support tiers
export const supportOptions = [
  {
    type: 'Email Support',
    availability: 'All Plans',
    responseTime: '24 hours',
    description: 'Get help via email with detailed responses from our medical spa operations experts.',
    features: ['Detailed written responses', 'Screenshot/file attachments', 'Follow-up support']
  },
  {
    type: 'Implementation Support',
    availability: 'All Plans',
    responseTime: 'Same day',
    description: 'One-on-one guidance to get your reconciliation process up and running quickly.',
    features: ['Screen sharing sessions', 'File format assistance', 'Custom workflow setup']
  },
  {
    type: 'Priority Phone Support',
    availability: 'Professional Plan',
    responseTime: 'Within 4 hours',
    description: 'Direct phone access to our team for urgent reconciliation issues.',
    features: ['Direct phone line', 'Emergency support', 'Escalation management'],
    badge: 'Coming Q3 2025'
  }
];

// Helper functions
export const getFeaturesByCategory = (category) => {
  return coreFeatures.filter(feature => feature.category === category);
};

export const getCoreFeatures = () => {
  return getFeaturesByCategory('core');
};

export const getProfessionalFeatures = () => {
  return professionalFeatures;
};

export const getMetricByKey = (key) => {
  return businessMetrics[key];
};

export const getProblemByMetric = (metricKey) => {
  return problems.find(problem => problem.metric === businessMetrics[metricKey]);
};