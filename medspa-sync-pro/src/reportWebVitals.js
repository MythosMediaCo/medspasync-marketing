// Enhanced Web Vitals for MedSpaSync Pro
// Tracks both standard web vitals and medical spa specific metrics

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Standard Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Enhanced performance tracking for medical spa workflows
export const reportMedSpaMetrics = (onPerfEntry) => {
  if (!onPerfEntry || typeof onPerfEntry !== 'function') return;

  // Track medical spa specific performance metrics
  const trackMedSpaPerformance = () => {
    // File upload performance
    window.addEventListener('medspa-file-upload-start', (event) => {
      const startTime = performance.now();
      window.medSpaUploadStart = startTime;
      
      onPerfEntry({
        name: 'MEDSPA_UPLOAD_START',
        value: startTime,
        id: event.detail?.fileId || 'unknown',
        detail: {
          fileSize: event.detail?.fileSize,
          fileType: event.detail?.fileType
        }
      });
    });

    window.addEventListener('medspa-file-upload-complete', (event) => {
      const endTime = performance.now();
      const duration = endTime - (window.medSpaUploadStart || endTime);
      
      onPerfEntry({
        name: 'MEDSPA_UPLOAD_DURATION',
        value: duration,
        id: event.detail?.fileId || 'unknown',
        detail: {
          fileSize: event.detail?.fileSize,
          throughput: event.detail?.fileSize / (duration / 1000), // bytes per second
          success: event.detail?.success
        }
      });
    });

    // AI processing performance
    window.addEventListener('medspa-ai-processing-start', (event) => {
      const startTime = performance.now();
      window.medSpaAiStart = startTime;
      
      onPerfEntry({
        name: 'MEDSPA_AI_START',
        value: startTime,
        id: event.detail?.jobId || 'unknown',
        detail: {
          transactionCount: event.detail?.transactionCount,
          confidenceThreshold: event.detail?.confidenceThreshold
        }
      });
    });

    window.addEventListener('medspa-ai-processing-complete', (event) => {
      const endTime = performance.now();
      const duration = endTime - (window.medSpaAiStart || endTime);
      
      onPerfEntry({
        name: 'MEDSPA_AI_DURATION',
        value: duration,
        id: event.detail?.jobId || 'unknown',
        detail: {
          transactionCount: event.detail?.transactionCount,
          autoMatchRate: event.detail?.autoMatchRate,
          accuracy: event.detail?.accuracy,
          throughput: event.detail?.transactionCount / (duration / 1000) // transactions per second
        }
      });
    });

    // Reconciliation workflow performance
    window.addEventListener('medspa-reconciliation-start', (event) => {
      const startTime = performance.now();
      window.medSpaReconciliationStart = startTime;
      
      onPerfEntry({
        name: 'MEDSPA_RECONCILIATION_START',
        value: startTime,
        id: event.detail?.sessionId || 'unknown'
      });
    });

    window.addEventListener('medspa-reconciliation-complete', (event) => {
      const endTime = performance.now();
      const duration = endTime - (window.medSpaReconciliationStart || endTime);
      
      onPerfEntry({
        name: 'MEDSPA_RECONCILIATION_DURATION',
        value: duration,
        id: event.detail?.sessionId || 'unknown',
        detail: {
          totalTransactions: event.detail?.totalTransactions,
          timeSaved: event.detail?.timeSaved,
          userSatisfaction: event.detail?.userSatisfaction
        }
      });
    });

    // Manual review efficiency tracking
    window.addEventListener('medspa-manual-review', (event) => {
      onPerfEntry({
        name: 'MEDSPA_MANUAL_REVIEW',
        value: performance.now(),
        id: event.detail?.matchId || 'unknown',
        detail: {
          decision: event.detail?.decision, // approve/reject
          confidence: event.detail?.confidence,
          timeSpent: event.detail?.timeSpent,
          wasCorrect: event.detail?.wasCorrect // for learning
        }
      });
    });
  };

  // Initialize tracking when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackMedSpaPerformance);
  } else {
    trackMedSpaPerformance();
  }
};

// Performance analytics for medical spa operations
export const getMedSpaAnalytics = () => {
  const metrics = {
    fileUploadPerformance: [],
    aiProcessingPerformance: [],
    reconciliationWorkflow: [],
    manualReviewEfficiency: []
  };

  // Collect performance entries
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    const measures = window.performance.getEntriesByType('measure');
    const marks = window.performance.getEntriesByType('mark');
    
    // Group by medical spa workflow
    measures.forEach(measure => {
      if (measure.name.startsWith('medspa-upload')) {
        metrics.fileUploadPerformance.push(measure);
      } else if (measure.name.startsWith('medspa-ai')) {
        metrics.aiProcessingPerformance.push(measure);
      } else if (measure.name.startsWith('medspa-reconciliation')) {
        metrics.reconciliationWorkflow.push(measure);
      }
    });
  }

  return metrics;
};

// Helper function to trigger performance events
export const trackMedSpaEvent = (eventName, detail = {}) => {
  const event = new CustomEvent(eventName, { detail });
  window.dispatchEvent(event);
  
  // Also create a performance mark for browser dev tools
  if ('performance' in window && 'mark' in window.performance) {
    window.performance.mark(`${eventName}-${Date.now()}`);
  }
};

// Calculate business impact metrics
export const calculateBusinessMetrics = (performanceData) => {
  const metrics = {};
  
  // Calculate time savings
  if (performanceData.reconciliationWorkflow.length > 0) {
    const avgReconciliationTime = performanceData.reconciliationWorkflow
      .reduce((sum, entry) => sum + entry.duration, 0) / performanceData.reconciliationWorkflow.length;
    
    // Assuming manual reconciliation takes 15-30 minutes per session
    const manualReconciliationTime = 20 * 60 * 1000; // 20 minutes in milliseconds
    const timeSaved = manualReconciliationTime - avgReconciliationTime;
    
    metrics.timeSavedPerSession = timeSaved;
    metrics.timeSavedHours = timeSaved / (1000 * 60 * 60);
    metrics.costSavingsPerSession = (timeSaved / (1000 * 60 * 60)) * 50; // $50/hour staff cost
  }
  
  // Calculate AI efficiency
  if (performanceData.aiProcessingPerformance.length > 0) {
    const avgProcessingTime = performanceData.aiProcessingPerformance
      .reduce((sum, entry) => sum + (entry.detail?.duration || 0), 0) / performanceData.aiProcessingPerformance.length;
    
    const avgTransactionCount = performanceData.aiProcessingPerformance
      .reduce((sum, entry) => sum + (entry.detail?.transactionCount || 0), 0) / performanceData.aiProcessingPerformance.length;
    
    metrics.avgProcessingSpeed = avgTransactionCount / (avgProcessingTime / 1000); // transactions per second
    metrics.aiEfficiencyScore = Math.min(100, (metrics.avgProcessingSpeed / 10) * 100); // normalized score
  }
  
  return metrics;
};

// Export analytics to external services
export const exportAnalytics = (metrics, destination = 'console') => {
  const analyticsData = {
    timestamp: new Date().toISOString(),
    sessionId: sessionStorage.getItem('medSpaSessionId') || 'unknown',
    userAgent: navigator.userAgent,
    metrics: metrics,
    businessImpact: calculateBusinessMetrics(metrics)
  };
  
  switch (destination) {
    case 'console':
      console.group('🏥 MedSpa Performance Analytics');
      console.table(analyticsData.metrics);
      console.log('Business Impact:', analyticsData.businessImpact);
      console.groupEnd();
      break;
      
    case 'google-analytics':
      // Example Google Analytics 4 integration
      if (typeof gtag === 'function') {
        gtag('event', 'medspa_performance', {
          custom_parameter_1: analyticsData.businessImpact.timeSavedHours,
          custom_parameter_2: analyticsData.businessImpact.aiEfficiencyScore
        });
      }
      break;
      
    case 'mixpanel':
      // Example Mixpanel integration
      if (typeof mixpanel === 'object') {
        mixpanel.track('MedSpa Performance', analyticsData);
      }
      break;
      
    case 'custom-endpoint':
      // Send to your own analytics endpoint
      fetch('/api/analytics/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analyticsData)
      }).catch(error => console.error('Analytics export failed:', error));
      break;
  }
};

// Set up automatic analytics export
export const setupAnalyticsExport = (interval = 300000) => { // 5 minutes default
  setInterval(() => {
    const metrics = getMedSpaAnalytics();
    if (Object.values(metrics).some(arr => arr.length > 0)) {
      exportAnalytics(metrics, process.env.REACT_APP_ANALYTICS_DESTINATION || 'console');
    }
  }, interval);
};

export default reportWebVitals;