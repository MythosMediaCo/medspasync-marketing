import React from 'react';
import { Loader } from 'lucide-react';

const LoadingScreen = ({ message = "Loading your medical spa management platform..." }) => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
            {/* Animated Logo */}
            <div className="relative mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-pulse">
                    <Loader className="w-12 h-12 text-white animate-spin" />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full animate-bounce shadow-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-500 rounded-full animate-bounce delay-300 shadow-lg"></div>
                <div className="absolute top-1/2 -right-8 w-4 h-4 bg-indigo-400 rounded-full animate-ping"></div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                MedSpaSync Pro
            </h2>

            {/* Loading Animation */}
            <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-bounce delay-300"></div>
            </div>

            {/* Message */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200">
                <p className="text-gray-700 text-lg font-medium" aria-live="polite">
                    {message}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-500">
                <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    HIPAA Compliant
                </span>
                <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    SOC 2 Certified
                </span>
            </div>
        </div>
    </div>
);

export default LoadingScreen;
