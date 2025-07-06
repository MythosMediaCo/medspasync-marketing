import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

const CompetitorComparison = () => {
  const navigate = useNavigate();
  const [selectedCompetitor, setSelectedCompetitor] = useState('zenoti');

  const competitors = {
    zenoti: {
      name: 'Zenoti',
      logo: 'Z',
      color: '#6366F1',
      tagline: 'General AI for all spa types',
      focus: 'Enterprise chain management',
      target: 'Large spa chains and franchises',
      strengths: [
        'Large platform with many integrations',
        'Established market presence',
        'Comprehensive feature set',
        'Multi-location management'
      ],
      weaknesses: [
        'One-size-fits-all approach',
        'Not specialized for medical spas',
        'Higher cost for small practices',
        'Complex for independent owners'
      ],
      pricing: '$300-800/month',
      roi: '150-300%',
      payback: '8-12 months'
    },
    pabau: {
      name: 'Pabau',
      logo: 'P',
      color: '#10B981',
      tagline: 'Echo AI for automated communication',
      focus: 'Patient communication and marketing',
      target: 'Practitioners and small practices',
      strengths: [
        'Echo AI for automated communication',
        'Patient engagement tools',
        'Marketing automation',
        'Easy to use interface'
      ],
      weaknesses: [
        'Limited financial optimization',
        'No specialized reconciliation',
        'Basic inventory management',
        'No predictive analytics'
      ],
      pricing: '$200-500/month',
      roi: '100-200%',
      payback: '10-15 months'
    },
    patientnow: {
      name: 'PatientNow',
      logo: 'P',
      color: '#F59E0B',
      tagline: 'AI for patient acquisition',
      focus: 'Patient conversion and marketing',
      target: 'Marketing-focused practices',
      strengths: [
        'AI for patient acquisition',
        'Marketing automation',
        'Patient conversion tools',
        'Lead generation features'
      ],
      weaknesses: [
        'Limited operational optimization',
        'No inventory management',
        'Basic financial tools',
        'No reconciliation features'
      ],
      pricing: '$250-600/month',
      roi: '120-250%',
      payback: '9-14 months'
    }
  };

  const medspasyncAdvantages = {
    zenoti: [
      {
        title: 'Specialized Medical Spa Focus',
        description: 'Built specifically for medical spa financial optimization vs. general spa management',
        impact: '60% better reconciliation accuracy',
        icon: '🎯'
      },
      {
        title: 'Independent Spa Optimization',
        description: 'Designed for the 90% of spas that are independently owned vs. enterprise focus',
        impact: '40% lower cost for small practices',
        icon: '💼'
      },
      {
        title: 'AI Reconciliation Specialization',
        description: '94.7% accuracy in medical spa financial reconciliation vs. general AI',
        impact: '$600-$2,000 monthly waste prevention',
        icon: '🤖'
      },
      {
        title: 'Predictive Analytics',
        description: 'Advanced demand forecasting for injectables vs. basic reporting',
        impact: '85% reduction in inventory waste',
        icon: '📊'
      }
    ],
    pabau: [
      {
        title: 'Financial Optimization Focus',
        description: 'Revenue cycle management vs. patient communication focus',
        impact: '15% operational cost reduction',
        icon: '💰'
      },
      {
        title: 'Inventory Management',
        description: 'AI-powered inventory optimization vs. basic tracking',
        impact: '$600-$2,000 monthly savings',
        icon: '📦'
      },
      {
        title: 'Reconciliation Accuracy',
        description: 'Specialized financial reconciliation vs. no reconciliation features',
        impact: '94.7% accuracy rate',
        icon: '✅'
      },
      {
        title: 'Predictive Growth',
        description: 'Market opportunity capture vs. basic business tools',
        impact: '$87.86B market opportunity',
        icon: '🚀'
      }
    ],
    patientnow: [
      {
        title: 'Operational Optimization',
        description: 'Business intelligence and operations vs. marketing focus',
        impact: '15% efficiency improvement',
        icon: '⚙️'
      },
      {
        title: 'Financial Reconciliation',
        description: 'AI-powered reconciliation vs. no financial tools',
        impact: '$600-$2,000 monthly savings',
        icon: '💳'
      },
      {
        title: 'Inventory Management',
        description: 'Predictive inventory optimization vs. no inventory features',
        impact: '85% waste reduction',
        icon: '📦'
      },
      {
        title: 'Lifetime Value Optimization',
        description: 'Customer lifetime value vs. acquisition focus',
        impact: '40% higher customer retention',
        icon: '👥'
      }
    ]
  };

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleCalculateROI = () => {
    navigate('/demo/roi');
  };

  const selectedComp = competitors[selectedCompetitor];
  const advantages = medspasyncAdvantages[selectedCompetitor];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              MedSpaSync Pro vs.
              <span className="block text-indigo-600">General Spa Management Platforms</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Why independent medical spas choose specialized financial optimization over 
              one-size-fits-all solutions in the $87.86B market opportunity.
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

      {/* Competitor Selection */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Comparison
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(competitors).map(([key, competitor]) => (
              <button
                key={key}
                onClick={() => setSelectedCompetitor(key)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedCompetitor === key
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                }`}
              >
                <div className="text-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}
                    style={{ backgroundColor: competitor.color }}
                  >
                    {competitor.logo}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{competitor.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{competitor.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              MedSpaSync Pro vs. {selectedComp.name}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Specialized financial optimization for independent medical spas vs. {selectedComp.focus.toLowerCase()}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Competitor Analysis */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold"
                  style={{ backgroundColor: selectedComp.color }}
                >
                  {selectedComp.logo}
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedComp.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedComp.tagline}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Target Market</h4>
                  <p className="text-gray-600 dark:text-gray-400">{selectedComp.target}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Strengths</h4>
                  <ul className="space-y-2">
                    {selectedComp.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600 dark:text-gray-400">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Limitations</h4>
                  <ul className="space-y-2">
                    {selectedComp.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500 mt-1">✗</span>
                        <span className="text-gray-600 dark:text-gray-400">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedComp.pricing}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedComp.roi}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Typical ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{selectedComp.payback}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
                  </div>
                </div>
              </div>
            </div>

            {/* MedSpaSync Advantages */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                  M
                </div>
                <h3 className="text-2xl font-bold mb-2">MedSpaSync Pro</h3>
                <p className="text-gray-600 dark:text-gray-400">Specialized financial optimization for independent medical spas</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Target Market</h4>
                  <p className="text-gray-600 dark:text-gray-400">Independent medical spas (90% of market) seeking financial optimization</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Advantages</h4>
                  <div className="space-y-4">
                    {advantages.map((advantage, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{advantage.icon}</span>
                          <div>
                            <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {advantage.title}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {advantage.description}
                            </p>
                            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                              {advantage.impact}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">$299-799</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Cost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">200-1200%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Typical ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">1-6 months</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">{selectedComp.name}</th>
                  <th className="text-center py-4 px-6 font-semibold text-indigo-600">MedSpaSync Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">AI Reconciliation</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
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
                    <span className="text-green-500 font-semibold">✓ AI-Powered</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Predictive Analytics</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-red-500">✗</span>
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
                    <span className="text-green-500 font-semibold">✓ Specialized</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">Independent Spa Optimization</td>
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
                    <span className="text-green-500 font-semibold">$600-2,000</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">ROI Timeline</td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-gray-500">8-15 months</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Choose Specialized Financial Optimization?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of independent medical spas that have switched from general platforms 
            to MedSpaSync Pro and are saving $600-$2,000 monthly while capturing growth in the $87.86B market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCalculateROI}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Calculate Your Savings
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
            Capture your share of the $87.86B medical spa market opportunity with AI-powered financial optimization.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CompetitorComparison; 