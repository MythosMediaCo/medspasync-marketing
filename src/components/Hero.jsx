import React from 'react';
// Requires: npm install lucide-react
// Fallback icons if lucide-react is not available
const ArrowRight = ({ className }) => <span className={className}>→</span>;
const CheckCircle = ({ className }) => <span className={className}>✅</span>;
const Shield = ({ className }) => <span className={className}>🛡️</span>;

// Try to import from lucide-react, fallback to our simple icons
let LucideIcons = { ArrowRight, CheckCircle, Shield };
try {
  LucideIcons = require('lucide-react');
} catch (e) {
  console.warn('lucide-react not available, using fallback icons');
}

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="badge badge-primary mb-6">
              Healthcare Technology
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your
              <span className="text-blue-600 block">Medical Spa</span>
              Operations
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive practice management software designed specifically for medical spas. 
              Manage appointments, clients, and business operations with confidence and ease.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn btn-primary text-lg px-8 py-4">
                Start Free Trial
                <LucideIcons.ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="btn btn-secondary text-lg px-8 py-4">
                Watch Demo
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <LucideIcons.Shield className="w-5 h-5 text-success-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideIcons.CheckCircle className="w-5 h-5 text-success-500" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <LucideIcons.CheckCircle className="w-5 h-5 text-success-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative animate-slide-in">
            <div className="card-elevated p-8">
              <div className="bg-gradient-blue-to-teal rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">MedSpaSync Pro</h3>
                <p className="text-blue-100 mb-6">
                  Complete medical spa management solution
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold">160+</div>
                    <div className="text-blue-100">Lab Tests</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-blue-100">Support</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-success-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-teal-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 