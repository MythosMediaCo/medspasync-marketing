// Function Health Visual Design System - Features Data

export const features = [
  {
    id: 1,
    title: "AI-Powered Transaction Matching",
    description: "Advanced machine learning algorithms that automatically match POS transactions with loyalty rewards, achieving 98% accuracy across all medical spa systems.",
    icon: {
      type: "path",
      props: {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      }
    },
    benefits: [
      "98% matching accuracy",
      "Handles naming variations",
      "Time-shift tolerance",
      "Pattern recognition"
    ]
  },
  {
    id: 2,
    title: "Real-Time Revenue Recovery",
    description: "Automatically detect and recover missed revenue from unmatched transactions, preventing $2,500+ monthly losses with intelligent reconciliation.",
    icon: {
      type: "path",
      props: {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      }
    },
    benefits: [
      "$2,500+ monthly recovery",
      "Automatic detection",
      "Revenue tracking",
      "Loss prevention"
    ]
  },
  {
    id: 3,
    title: "24-Hour Implementation",
    description: "Start reconciling within 24 hours with our streamlined onboarding process. No complex integrations required - just upload your CSV files.",
    icon: {
      type: "path",
      props: {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M13 10V3L4 14h7v7l9-11h-7z"
      }
    },
    benefits: [
      "24-hour setup",
      "No API integration",
      "CSV file upload",
      "Guided onboarding"
    ]
  },
  {
    id: 4,
    title: "HIPAA-Compliant Security",
    description: "Enterprise-grade security with full HIPAA compliance. All data encrypted in transit and at rest, with automatic file deletion after processing.",
    icon: {
      type: "path",
      props: {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      }
    },
    benefits: [
      "HIPAA compliant",
      "End-to-end encryption",
      "Auto-deletion",
      "Audit trails"
    ]
  },
  {
    id: 5,
    title: "Universal System Support",
    description: "Works with any POS system that exports CSV files. Compatible with Alle, Aspire, and all major loyalty programs and payment processors.",
    icon: {
      type: "path",
      props: {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      }
    },
    benefits: [
      "Any POS system",
      "All loyalty programs",
      "Standard CSV format",
      "No vendor lock-in"
    ]
  },
  {
    id: 6,
    title: "Comprehensive Reporting",
    description: "Generate detailed reconciliation reports for accounting, analysis, and business intelligence with customizable date ranges and export options.",
    icon: {
      type: "path",
      props: {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      }
    },
    benefits: [
      "Excel export",
      "Custom date ranges",
      "Detailed breakdowns",
      "Business intelligence"
    ]
  }
];

// Business metrics for data visualization
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
    value: '98%',
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

// Core solution features (legacy support)
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
    description: 'Our intelligent matching algorithm analyzes and matches transactions with 98%+ accuracy.',
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
    value: '98%+',
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
    color: 'red'
  }
];

// Utility functions for legacy support
export const getFeaturesByCategory = (category) => {
  return features.filter(feature => feature.category === category);
};

export const getCoreFeatures = () => {
  return coreFeatures;
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