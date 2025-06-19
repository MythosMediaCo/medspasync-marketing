import React from 'react';

const LoadingScreen = ({ message = "Loading your medical spa management platform..." }) => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
            <div className="relative mb-8">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mb-4 animate-pulse">
                    <span className="text-3xl font-bold text-white">M</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-bounce"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">MedSpaSync Pro</h2>

            <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
            </div>

            <p className="text-gray-600 text-lg" aria-live="polite">{message}</p>
        </div>
    </div>
);

export default LoadingScreen;
