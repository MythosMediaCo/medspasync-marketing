import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

const FeaturesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ai-reconciliation');

  const features = {
    'ai-reconciliation': {
      title: 'AI Reconciliation',
      subtitle: 'Prevent $600-$2,000 Monthly Losses from Reconciliation Errors',
      description: 'Our specialized AI reconciliation engine achieves 94.7% accuracy in medical spa financial data, preventing costly errors that general platforms miss.',
      benefits: [
        {
          title: '94.7% Reconciliation Accuracy',
          description: 'Specialized medical spa financial reconciliation vs. general AI',
          impact: '$600-$2,000 monthly error prevention',
          icon: '🎯'
        },
        {
          title: 'Real-Time Error Detection',
          description: 'Instant identification of discrepancies in claims and payments',
          impact: 'Prevents 85% of reconciliation errors',
          icon: '⚡'
        },
        {
          title: 'Automated Correction',
          description: 'AI-powered automatic correction of common reconciliation issues',
          impact: 'Saves 8-15 hours weekly in manual corrections',
          icon: '🤖'
        },
        {
          title: 'HIPAA-Compliant Processing',
          description: 'Secure handling of sensitive medical spa financial data',
          impact: 'Ensures compliance while optimizing efficiency',
          icon: '🔒'
        }
      ],
      comparison: {
        zenoti: 'General AI for all spa types',
        pabau: 'No reconciliation features',
        patientnow: 'Basic financial tools only',
        medspasync: 'Specialized medical spa reconciliation with 94.7% accuracy'
      }
    },
    'inventory-optimization': {
      title: 'Inventory Optimization',
      subtitle: 'Eliminate $600-$2,000 Monthly Waste from Expired Products',
      description: 'AI-powered inventory management prevents stockouts and overstocking of high-value injectables like Botox and fillers.',
      benefits: [
        {
          title: 'Predictive Demand Forecasting',
          description: 'AI algorithms predict Botox and filler demand cycles',
          impact: '85% reduction in expired inventory',
          icon: '📊'
        },
        {
          title: 'Automated Reordering',
          description: 'Smart reorder points based on usage patterns and lead times',
          impact: 'Prevents $600+ monthly stockout losses',
          icon: '🔄'
        },
        {
          title: 'Expiration Tracking',
          description: 'Advanced tracking of product expiration dates with alerts',
          impact: 'Eliminates $800+ monthly expired product waste',
          icon: '⏰'
        },
        {
          title: 'Multi-Location Management',
          description: 'Centralized inventory control across all practice locations',
          impact: 'Optimizes $1,500+ monthly in transfer costs',
          icon: '🏢'
        }
      ],
      comparison: {
        zenoti: 'Basic inventory tracking',
        pabau: 'No inventory management',
        patientnow: 'No inventory features',
        medspasync: 'AI-powered predictive inventory optimization'
      }
    },
    'predictive-analytics': {
      title: 'Predictive Analytics',
      subtitle: 'Capture Your Share of the $87.86B Market Opportunity',
      description: 'Advanced analytics help independent medical spas compete against chains and capture growth in the rapidly expanding market.',
      benefits: [
        {
          title: 'Market Opportunity Analysis',
          description: 'Identify growth opportunities in the $87.86B medical spa market',
          impact: '15-40% revenue growth potential',
          icon: '📈'
        },
        {
          title: 'Seasonal Demand Prediction',
          description: 'Forecast demand patterns for injectables and treatments',
          impact: 'Optimizes $1,200+ monthly in seasonal planning',
          icon: '🌤️'
        },
        {
          title: 'Competitive Intelligence',
          description: 'Benchmark performance against industry standards',
          impact: 'Identifies $800+ monthly optimization opportunities',
          icon: '🎯'
        },
        {
          title: 'Growth Forecasting',
          description: 'Predict practice growth and resource requirements',
          impact: 'Enables strategic expansion planning',
          icon: '🚀'
        }
      ],
      comparison: {
        zenoti: 'Basic reporting and analytics',
        pabau: 'No predictive capabilities',
        patientnow: 'Marketing-focused analytics only',
        medspasync: 'Advanced predictive analytics for business growth'
      }
    },
    'independent-advantage': {
      title: 'Independent Advantage',
      subtitle: 'Enterprise-Level Analytics for the 90% of Spas That Are Independently Owned',
      description: 'Designed specifically for independent medical spas to compete against chains and capture market share.',
      benefits: [
        {
          title: 'Independent Spa Optimization',
          description: 'Features designed for single-location and small chain operations',
          impact: '40% lower cost than enterprise solutions',
          icon: '💼'
        },
        {
          title: 'Resource Efficiency',
          description: 'Optimized for limited staff and budget constraints',
          impact: '15% operational cost reduction',
          icon: '⚡'
        },
        {
          title: 'Chain Competition Tools',
          description: 'Analytics and insights to compete against large chains',
          impact: 'Enables independent market share growth',
          icon: '🏆'
        },
        {
          title: 'Scalable Growth',
          description: 'Grow from single location to multi-location seamlessly',
          impact: 'Supports expansion without platform changes',
          icon: '📈'
        }
      ],
      comparison: {
        zenoti: 'Enterprise-focused with high costs',
        pabau: 'Basic features for small practices',
        patientnow: 'Marketing focus, limited operations',
        medspasync: 'Specialized for independent spa optimization'
      }
    }
  };

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleCalculateROI = () => {
    navigate('/demo/roi');
  };

  const activeFeature = features[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Features That Drive
              <span className="block text-indigo-600">Measurable Financial Results</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Transform generic efficiency claims into specific financial benefits. 
              See exactly how each feature prevents waste and drives growth in the $87.86B market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleCalculateROI}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Calculate Your ROI
              </button>
              <button
                onClick={handleStartTrial}
                className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tabs */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(features).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-6 rounded-xl text-left transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <h3 className={`text-lg font-bold mb-2 ${activeTab === key ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${activeTab === key ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                  {feature.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Feature Details */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {activeFeature.title}
            </h2>
            <p className="text-xl text-indigo-600 font-semibold mb-4">
              {activeFeature.subtitle}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {activeFeature.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Key Benefits & Financial Impact
              </h3>
              <div className="space-y-6">
                {activeFeature.benefits.map((benefit, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{benefit.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {benefit.description}
                        </p>
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-3 rounded-lg">
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {benefit.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Comparison */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                Competitive Advantage
              </h3>
              <div className="space-y-6">
                {Object.entries(activeFeature.comparison).map(([competitor, description]) => (
                  <div key={competitor} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        competitor === 'medspasync' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                          : 'bg-gray-400'
                      }`}>
                        {competitor === 'medspasync' ? 'M' : competitor.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                          {competitor === 'medspasync' ? 'MedSpaSync Pro' : competitor.charAt(0).toUpperCase() + competitor.slice(1)}
                        </h4>
                        <p className={`text-sm ${
                          competitor === 'medspasync' 
                            ? 'text-indigo-600 dark:text-indigo-400 font-semibold' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Calculate Your Specific ROI
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            See exactly how these features will impact your bottom line with our 
            medical spa-specific ROI calculator.
          </p>
          <button
            onClick={handleCalculateROI}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Calculate Your Savings
          </button>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Zenoti</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">Pabau</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">PatientNow</th>
                  <th className="text-center py-4 px-6 font-semibold text-indigo-600">MedSpaSync Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">AI Reconciliation</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">General AI</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">Basic</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500 font-semibold">✓ 94.7% Accuracy</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Inventory Optimization</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">Basic</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500 font-semibold">✓ AI-Powered</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Predictive Analytics</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">Basic</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">Marketing Only</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500 font-semibold">✓ Advanced</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Medical Spa Focus</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">General</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">General</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">General</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500 font-semibold">✓ Specialized</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Independent Optimization</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">Basic</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500 font-semibold">✓ Designed For</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Monthly Savings Potential</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">$100-500</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">$50-200</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">$100-300</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500 font-semibold">$600-2,000</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">ROI Timeline</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">8-15 months</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">10-18 months</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">9-16 months</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-green-500 font-semibold">1-6 months</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Features Matter for Independent Medical Spas
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">$</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Financial Impact</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every feature directly impacts your bottom line with measurable financial benefits.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Specialized Focus</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built specifically for medical spa challenges, not general spa management.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">📈</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Growth Enablement</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Features designed to help independent spas capture market share and grow.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Immediate ROI</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Most features deliver measurable ROI within 1-6 months of implementation.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Advantage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Features that help independent spas compete against chains and capture market share.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Market Opportunity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tools to capture your share of the $87.86B medical spa market opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Features into Financial Results?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of independent medical spas that have turned generic efficiency 
            into specific financial benefits with MedSpaSync Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCalculateROI}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Calculate Your ROI
            </button>
            <button
              onClick={handleStartTrial}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            MedSpaSync Pro - Specialized Financial Optimization for Independent Medical Spas
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Transform features into financial results and capture your share of the $87.86B market opportunity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage; 