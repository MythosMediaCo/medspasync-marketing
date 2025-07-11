import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-blue-to-teal rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <span className="text-white text-3xl font-bold">M</span>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Loading MedSpaSync Pro
        </h2>
        <p className="text-gray-600 mb-8">
          Preparing your practice management dashboard...
        </p>
        
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="spinner w-8 h-8"></div>
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-200"></div>
        </div>
        
        {/* Security Notice */}
        <div className="mt-8 text-sm text-gray-500">
          <p>HIPAA Compliant • SOC 2 Certified</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 