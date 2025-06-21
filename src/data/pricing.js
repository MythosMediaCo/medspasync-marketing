// Shared pricing data for consistent pricing across components
export const pricingPlans = {
  core: {
    id: 'core',
    name: 'Core Reconciliation',
    price: 299,
    currency: '$',
    period: 'month',
    status: 'available',
    badge: {
      text: '✅ Available Now',
      type: 'success'
    },
    description: 'Perfect for medical spas looking to automate their reconciliation process',
    features: [
      {
        icon: '✓',
        text: 'Save 8+ hours weekly on reconciliation',
        highlight: true
      },
      {
        icon: '✓', 
        text: 'Prevent $2,500+ monthly revenue loss',
        highlight: true
      },
      {
        icon: '✓',
        text: '95%+ AI matching accuracy',
        highlight: false
      },
      {
        icon: '✓',
        text: '24-hour implementation',
        highlight: false
      },
      {
        icon: '✓',
        text: 'HIPAA-conscious security',
        highlight: false
      }
    ],
    cta: {
      text: 'Start Core Plan',
      action: 'subscribe',
      plan: 'Core'
    },
    featured: true
  },
  
  professional: {
    id: 'professional',
    name: 'Professional Suite', 
    price: 499,
    currency: '$',
    period: 'month',
    status: 'coming_soon',
    badge: {
      text: '🚧 Q3 2025',
      type: 'info'
    },
    description: 'Advanced features for larger medical spa operations',
    features: [
      {
        icon: '✓',
        text: 'Everything in Core Plan',
        highlight: false
      },
      {
        icon: '✓',
        text: 'Automated scheduling',
        highlight: false
      },
      {
        icon: '✓',
        text: 'Advanced analytics dashboard',
        highlight: false
      },
      {
        icon: '✓',
        text: 'Priority phone support',
        highlight: false
      }
    ],
    cta: {
      text: 'Get Notified',
      action: 'notify',
      disabled: true
    },
    featured: false
  }
};

export const pricingFeatures = {
  guarantee: {
    icon: '✓',
    text: '30-day money-back guarantee'
  },
  compliance: {
    icon: '✓', 
    text: 'HIPAA-compliant processing'
  },
  cancellation: {
    icon: '✓',
    text: 'Cancel anytime'
  }
};

export const businessMetrics = {
  timeWasted: {
    value: '8+',
    unit: 'hours weekly',
    description: 'lost to manual reconciliation'
  },
  revenueLoss: {
    value: '$2,500+',
    unit: 'monthly',
    description: 'in missed revenue'
  },
  accuracy: {
    value: '95%+',
    unit: 'accuracy',
    description: 'AI matching rate'
  },
  implementation: {
    value: '24',
    unit: 'hours',
    description: 'setup time'
  }
};

// Helper functions
export const formatPrice = (plan) => {
  return `${plan.currency}${plan.price}`;
};

export const getPlanFeatures = (planId) => {
  return pricingPlans[planId]?.features || [];
};

export const getAvailablePlans = () => {
  return Object.values(pricingPlans).filter(plan => plan.status === 'available');
};

export const getFeaturedPlan = () => {
  return Object.values(pricingPlans).find(plan => plan.featured);
};