// medspasync-frontend-main/src/components/Common/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // In a production app, you would log error to an error reporting service
        console.error('MedSpaSync Pro Error:', error, errorInfo); // Keep for development debugging
        // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-3xl">⚠️</span>
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Oops! Something went wrong
                        </h1>

                        <p className="text-gray-600 mb-6">
                            We encountered an unexpected error. Please refresh the page to continue.
                            {this.state.error && (
                                <span className="block mt-2 text-red-500 text-sm">
                                    Error: {this.state.error.message || 'Unknown error'}
                                </span>
                            )}
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                            >
                                Refresh Page
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.clear(); // Clear all local storage data
                                    window.location.href = '/'; // Redirect to home
                                }}
                                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Clear Data & Restart
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;