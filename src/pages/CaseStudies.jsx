import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';

const CaseStudies = () => {
  const navigate = useNavigate();
  const [selectedCase, setSelectedCase] = useState(null);

  const caseStudies = [
    {
      id: 'radiance-medspa',
      title: 'Radiance Medical Spa',
      subtitle: 'Eliminated $2,400 in Monthly Inventory Waste',
      location: 'Austin, TX',
      type: 'Independent Medical Spa',
      size: '3 treatment rooms, 2,500 clients',
      challenge: 'Manual inventory tracking was causing frequent stockouts and overstocking, leading to $2,400 in monthly waste from expired Botox and fillers.',
      solution: 'Implemented MedSpaSync Pro Core plan with AI reconciliation and predictive analytics.',
      results: {
        monthlySavings: 2400,
        annualSavings: 28800,
        wasteReduction: 85,
        efficiencyImprovement: 40,
        roi: 800,
        paybackMonths: 2.5
      },
      timeline: [
        { month: 'Month 1', milestone: 'Implementation and staff training completed' },
        { month: 'Month 2', milestone: 'First month of waste reduction: $1,800 saved' },
        { month: 'Month 3', milestone: 'Full ROI achieved, $2,400 monthly savings realized' },
        { month: 'Month 6', milestone: 'Expanded to Professional plan for advanced analytics' }
      ],
      quote: {
        text: "MedSpaSync Pro transformed our inventory management. We went from losing $2,400 monthly to waste to actually preventing it entirely. The ROI was immediate and the peace of mind is priceless.",
        author: "Dr. Sarah Chen",
        title: "Owner, Radiance Medical Spa"
      },
      metrics: [
        { label: 'Monthly Waste Prevention', value: '$2,400', color: 'green' },
        { label: 'Staff Time Savings', value: '12 hours/week', color: 'blue' },
        { label: 'Inventory Accuracy', value: '98.5%', color: 'purple' },
        { label: 'ROI Timeline', value: '2.5 months', color: 'orange' }
      ]
    },
    {
      id: 'glow-collective',
      title: 'Glow Collective',
      subtitle: '15% Operational Cost Reduction Across 4 Locations',
      location: 'Miami, FL',
      type: 'Multi-Location Practice',
      size: '4 locations, 8,000 clients',
      challenge: 'Managing inventory and reconciliation across 4 locations was consuming 20+ hours weekly and causing inconsistent financial reporting.',
      solution: 'Deployed MedSpaSync Pro Professional plan with multi-location management and centralized analytics.',
      results: {
        monthlySavings: 5000,
        annualSavings: 60000,
        wasteReduction: 90,
        efficiencyImprovement: 60,
        roi: 1000,
        paybackMonths: 1.8
      },
      timeline: [
        { month: 'Month 1', milestone: 'Centralized system implementation across all locations' },
        { month: 'Month 2', milestone: 'Staff training completed, initial savings of $3,200' },
        { month: 'Month 3', milestone: 'Full optimization achieved, $5,000 monthly savings' },
        { month: 'Month 6', milestone: 'Expanded client base by 15% due to operational efficiency' }
      ],
      quote: {
        text: "Managing 4 locations used to be a nightmare. MedSpaSync Pro gave us enterprise-level analytics at a fraction of the cost. We're saving $5,000 monthly and growing faster than ever.",
        author: "Maria Rodriguez",
        title: "CEO, Glow Collective"
      },
      metrics: [
        { label: 'Monthly Savings', value: '$5,000', color: 'green' },
        { label: 'Management Time', value: '60% reduction', color: 'blue' },
        { label: 'Client Growth', value: '15% increase', color: 'purple' },
        { label: 'ROI Timeline', value: '1.8 months', color: 'orange' }
      ]
    },
    {
      id: 'aesthetic-innovations',
      title: 'Aesthetic Innovations',
      subtitle: 'From $1,800 Monthly Losses to $1,200 Monthly Savings',
      location: 'Denver, CO',
      type: 'High-Volume Independent',
      size: '5 treatment rooms, 4,200 clients',
      challenge: 'High-volume practice was losing $1,800 monthly to reconciliation errors and inventory mismanagement, affecting profitability.',
      solution: 'Implemented MedSpaSync Pro Professional plan with advanced AI reconciliation and predictive analytics.',
      results: {
        monthlySavings: 3000,
        annualSavings: 36000,
        wasteReduction: 88,
        efficiencyImprovement: 45,
        roi: 600,
        paybackMonths: 3.2
      },
      timeline: [
        { month: 'Month 1', milestone: 'AI reconciliation system deployed' },
        { month: 'Month 2', milestone: 'Inventory optimization implemented' },
        { month: 'Month 3', milestone: 'Full system optimization, $2,800 savings' },
        { month: 'Month 4', milestone: 'ROI achieved, $3,000 monthly savings' }
      ],
      quote: {
        text: "We were losing money every month due to poor reconciliation. MedSpaSync Pro not only stopped the bleeding but turned it into a $3,000 monthly profit center. Game changer.",
        author: "Dr. James Wilson",
        title: "Founder, Aesthetic Innovations"
      },
      metrics: [
        { label: 'Monthly Savings', value: '$3,000', color: 'green' },
        { label: 'Reconciliation Accuracy', value: '94.7%', color: 'blue' },
        { label: 'Staff Efficiency', value: '45% improvement', color: 'purple' },
        { label: 'ROI Timeline', value: '3.2 months', color: 'orange' }
      ]
    },
    {
      id: 'beauty-haven',
      title: 'Beauty Haven Medical Spa',
      subtitle: 'Capturing the Male Market with Predictive Analytics',
      location: 'Seattle, WA',
      type: 'Emerging Market Focus',
      size: '2 treatment rooms, 1,800 clients',
      challenge: 'Wanted to capture the fast-growing male clientele market but lacked insights into demand patterns and inventory optimization.',
      solution: 'Deployed MedSpaSync Pro Core plan with predictive analytics and market opportunity insights.',
      results: {
        monthlySavings: 1200,
        annualSavings: 14400,
        wasteReduction: 75,
        efficiencyImprovement: 35,
        roi: 400,
        paybackMonths: 4.5
      },
      timeline: [
        { month: 'Month 1', milestone: 'Predictive analytics implementation' },
        { month: 'Month 2', milestone: 'Male market demand forecasting activated' },
        { month: 'Month 3', milestone: 'Inventory optimized for male services' },
        { month: 'Month 6', milestone: 'Male clientele increased by 40%' }
      ],
      quote: {
        text: "The predictive analytics helped us understand the male market opportunity. We've increased our male clientele by 40% and eliminated inventory waste. MedSpaSync Pro is our secret weapon.",
        author: "Lisa Thompson",
        title: "Owner, Beauty Haven Medical Spa"
      },
      metrics: [
        { label: 'Monthly Savings', value: '$1,200', color: 'green' },
        { label: 'Male Client Growth', value: '40% increase', color: 'blue' },
        { label: 'Demand Prediction', value: '92% accuracy', color: 'purple' },
        { label: 'ROI Timeline', value: '4.5 months', color: 'orange' }
      ]
    }
  ];

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleCalculateROI = () => {
    navigate('/demo/roi');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getColorClass = (color) => {
    const colors = {
      green: 'text-green-600 bg-green-50 dark:bg-green-900/20',
      blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
      purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
      orange: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Real Results from
              <span className="block text-indigo-600">Independent Medical Spas</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              See how independent medical spas are eliminating $600-$5,000 in monthly waste 
              and capturing growth in the $87.86B market opportunity.
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

            {/* Summary Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">$600-$5,000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings Range</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1-6 months</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average ROI Timeline</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">85-90%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Waste Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">40-60%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Efficiency Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Success Stories from Independent Medical Spas
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {caseStudy.title}
                    </h3>
                    <p className="text-lg font-semibold text-indigo-600 mb-2">
                      {caseStudy.subtitle}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{caseStudy.location}</span>
                      <span>•</span>
                      <span>{caseStudy.type}</span>
                      <span>•</span>
                      <span>{caseStudy.size}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {caseStudy.challenge}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {caseStudy.solution}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(caseStudy.results.monthlySavings)}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Monthly Savings</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {caseStudy.results.roi}%
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">ROI</div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                    <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-2">
                      "{caseStudy.quote.text}"
                    </p>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {caseStudy.quote.author}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        , {caseStudy.quote.title}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCase(caseStudy)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                  >
                    View Full Case Study
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Case Study Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    {selectedCase.title}
                  </h2>
                  <p className="text-xl font-semibold text-indigo-600 mb-2">
                    {selectedCase.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {selectedCase.challenge}
                  </p>

                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Solution</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {selectedCase.solution}
                  </p>

                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Results</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        {formatCurrency(selectedCase.results.monthlySavings)}
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">Monthly Savings</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">
                        {formatCurrency(selectedCase.results.annualSavings)}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Annual Savings</div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">
                        {selectedCase.results.wasteReduction}%
                      </div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">Waste Reduction</div>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">
                        {selectedCase.results.paybackMonths} mo
                      </div>
                      <div className="text-sm text-orange-700 dark:text-orange-300">Payback Period</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Implementation Timeline</h3>
                  <div className="space-y-4">
                    {selectedCase.timeline.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {item.month}
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {item.milestone}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Metrics</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedCase.metrics.map((metric, index) => (
                    <div key={index} className={`p-4 rounded-lg ${getColorClass(metric.color)}`}>
                      <div className="text-lg font-bold">{metric.value}</div>
                      <div className="text-sm">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Client Testimonial</h3>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-lg">
                  "{selectedCase.quote.text}"
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedCase.quote.author}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    , {selectedCase.quote.title}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCalculateROI}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  Calculate Your ROI
                </button>
                <button
                  onClick={handleStartTrial}
                  className="flex-1 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 py-3 px-6 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Industry Impact Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Industry-Wide Impact
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Independent medical spas across the country are transforming their operations 
            and capturing growth in the $87.86B market opportunity.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$500K+</div>
              <div className="text-lg">Total Inventory Waste Prevented</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">12 States</div>
              <div className="text-lg">Independent Spas Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">47%</div>
              <div className="text-lg">Average Efficiency Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join These Success Stories?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Start your journey to eliminating inventory waste and capturing growth 
            in the $87.86B medical spa market opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCalculateROI}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Calculate Your Potential Savings
            </button>
            <button
              onClick={handleStartTrial}
              className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
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
            Join hundreds of independent medical spas eliminating waste and capturing growth in the $87.86B market.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudies; 