// Vercel Analytics Integration for MedSpaSync Pro
// Based on Vercel Analytics best practices

// Initialize Vercel Analytics
export const initAnalytics = () => {
  // Only load analytics in production
  if (import.meta.env.PROD) {
    // Load Vercel Analytics script
    const script = document.createElement('script');
    script.src = 'https://va.vercel-scripts.com/v1/script.js';
    script.defer = true;
    document.head.appendChild(script);
  }
};

// Track page views
export const trackPageView = (page) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('pageview', { url: page });
  }
};

// Track custom events
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', {
      name: eventName,
      properties: {
        ...properties,
        timestamp: Date.now(),
        url: window.location.href
      }
    });
  }
};

// Track healthcare-specific events
export const trackHealthcareEvent = (eventType, details = {}) => {
  const healthcareEvents = {
    'patient_login': 'Patient Login',
    'appointment_booked': 'Appointment Booked',
    'treatment_completed': 'Treatment Completed',
    'payment_processed': 'Payment Processed',
    'consultation_scheduled': 'Consultation Scheduled',
    'form_submitted': 'Form Submitted',
    'feature_used': 'Feature Used'
  };

  trackEvent(healthcareEvents[eventType] || eventType, {
    ...details,
    category: 'healthcare',
    environment: process.env.NODE_ENV
  });
};

// Track performance metrics
export const trackPerformance = (metric) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('web-vitals', metric);
  }
};

// Track user engagement
export const trackEngagement = (action, duration = null) => {
  trackEvent('user_engagement', {
    action,
    duration,
    page: window.location.pathname
  });
};

// Track form interactions
export const trackFormInteraction = (formName, action, fieldName = null) => {
  trackEvent('form_interaction', {
    form: formName,
    action,
    field: fieldName,
    page: window.location.pathname
  });
};

// Track conversion events
export const trackConversion = (conversionType, value = null) => {
  const conversionEvents = {
    'appointment_booking': 'Appointment Booking',
    'consultation_request': 'Consultation Request',
    'contact_form': 'Contact Form',
    'demo_request': 'Demo Request',
    'pricing_view': 'Pricing View'
  };

  trackEvent(conversionEvents[conversionType] || conversionType, {
    value,
    category: 'conversion',
    timestamp: Date.now()
  });
};

// Initialize analytics on app load
export const initializeAnalytics = () => {
  // Initialize Vercel Analytics
  initAnalytics();

  // Track initial page view
  trackPageView(window.location.pathname);

  // Track performance metrics
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          trackPerformance({
            name: 'Navigation Timing',
            value: entry.loadEventEnd - entry.loadEventStart,
            id: entry.entryType
          });
        }
      }
    });
    observer.observe({ entryTypes: ['navigation'] });
  }

  // Track user engagement
  let startTime = Date.now();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const duration = Date.now() - startTime;
      trackEngagement('session_end', duration);
    } else {
      startTime = Date.now();
      trackEngagement('session_start');
    }
  });
};

// Export analytics functions
export default {
  initAnalytics,
  trackPageView,
  trackEvent,
  trackHealthcareEvent,
  trackPerformance,
  trackEngagement,
  trackFormInteraction,
  trackConversion,
  initializeAnalytics
}; 