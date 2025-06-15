import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MedSpaSyncPro from './components/MedSpaSyncPro'; // Import your main component
import reportWebVitals from './reportWebVitals';

// Error Boundary for Production
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log to your error reporting service (e.g., Sentry)
    console.error('MedSpaSync Pro Error:', error, errorInfo);
    
    // In production, send to analytics
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              MedSpaSync Pro encountered an unexpected error. Our team has been notified.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Application
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-gray-500 text-sm">
                  Technical Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto max-h-40">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component for Better UX
const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading MedSpaSync Pro</h2>
      <p className="text-gray-600">Preparing your AI reconciliation platform...</p>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial app loading/authentication check
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Add any global initialization here
  React.useEffect(() => {
    // Set up global error handlers
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // In production, send to error reporting service
    });

    // Performance monitoring
    if ('performance' in window && 'measure' in window.performance) {
      window.performance.mark('medspa-app-start');
    }

    return () => {
      window.removeEventListener('unhandledrejection', () => {});
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <MedSpaSyncPro />
    </ErrorBoundary>
  );
};

// Create root and render
const root = ReactDOM.createRoot(document.getElementById('root'));

// Add performance monitoring
if ('performance' in window && 'measure' in window.performance) {
  window.performance.mark('react-render-start');
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enhanced Web Vitals reporting for medical spa analytics
const sendToAnalytics = (metric) => {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example integrations:
    // Google Analytics: gtag('event', metric.name, { value: metric.value });
    // Custom analytics: analytics.track('web_vital', metric);
    console.log('Web Vital:', metric);
  }
};

// Report Web Vitals with medical spa specific tracking
reportWebVitals((metric) => {
  // Send core web vitals to analytics
  sendToAnalytics(metric);
  
  // Log performance in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Performance Metric:', metric);
  }
  
  // Mark performance milestones
  if (metric.name === 'FCP' && 'performance' in window) {
    window.performance.mark('react-render-complete');
  }
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Add global keyboard shortcuts for power users
document.addEventListener('keydown', (event) => {
  // Ctrl/Cmd + K for search (common in SaaS apps)
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    // Trigger search functionality - you can dispatch a custom event
    window.dispatchEvent(new CustomEvent('medspa-search-shortcut'));
  }
  
  // Ctrl/Cmd + Shift + U for upload
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'U') {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('medspa-upload-shortcut'));
  }
});

// Development tools
if (process.env.NODE_ENV === 'development') {
  // Add debugging helpers
  window.medSpaDebug = {
    clearLocalStorage: () => localStorage.clear(),
    simulateError: () => { throw new Error('Test error for debugging'); },
    getPerformanceMetrics: () => {
      if ('performance' in window) {
        return {
          navigation: window.performance.getEntriesByType('navigation'),
          resources: window.performance.getEntriesByType('resource'),
          marks: window.performance.getEntriesByType('mark'),
          measures: window.performance.getEntriesByType('measure')
        };
      }
      return null;
    }
  };
  
  console.log('🏥 MedSpaSync Pro Development Mode');
  console.log('Available debug tools: window.medSpaDebug');
}