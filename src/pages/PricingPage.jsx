import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import ROICalculator from '../components/demo/ROICalculator.jsx';

const PricingPage = () => {
  const navigate = useNavigate();
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    core: {
      name: 'Core',
      price: { monthly: 299, annual: 2990 },
      description: 'Perfect for single-location independent medical spas',
      features: [
        'AI-powered financial reconciliation',
        'Inventory waste prevention',
        'Basic predictive analytics',
        'Client management',
        'Standard support',
        'Mobile app access'
      ],
      savings: {
        monthly: 600,
        annual: 7200,
        roi: '200-600%',
        payback: '2-4 months'
      },
      bestFor: 'Independent medical spas with 1-3 treatment rooms',
      limitations: [
        'Up to 500 clients',
        'Basic reporting',
        'Standard integrations'
      ]
    },
    professional: {
      name: 'Professional',
      price: { monthly: 499, annual: 4990 },
      description: 'Multi-location practices and high-volume independent spas',
      features: [
        'Everything in Core',
        'Advanced predictive analytics',
        'Multi-location management',
        'Advanced reporting & insights',
        'Priority support',
        'API access',
        'Custom integrations',
        'Staff training'
      ],
      savings: {
        monthly: 1500,
        annual: 18000,
        roi: '300-1000%',
        payback: '1-3 months'
      },
      bestFor: 'Professional practices with 4-10 locations or high-volume single locations',
      limitations: [
        'Up to 2,000 clients',
        'Advanced features included'
      ]
    },
    enterprise: {
      name: 'Enterprise',
      price: { monthly: 799, annual: 7990 },
      description: 'Chains and franchise operations with complex needs',
      features: [
        'Everything in Professional',
        'Unlimited reconciliation',
        'White-label options',
        'Advanced AI insights',
        'Dedicated success manager',
        'Custom development',
        'Enterprise integrations',
        'Advanced security features'
      ],
      savings: {
        monthly: 3000,
        annual: 36000,
        roi: '400-1200%',
        payback: '1-2 months'
      },
      bestFor: 'Enterprise chains, franchises, and large medical spa groups',
      limitations: [
        'Unlimited clients',
        'All features included'
      ]
    }
  };

  const handleStartTrial = (plan) => {
    navigate('/register', { state: { selectedPlan: plan } });
  };

  const handleCalculateROI = () => {
    setShowROICalculator(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCurrentPrice = (plan) => {
    return billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual;
  };

  const getSavings = (plan) => {
    return billingCycle === 'monthly' ? plan.savings.monthly : plan.savings.annual;
  };

  if (showROICalculator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <button 
            onClick={() => setShowROICalculator(false)}
            className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← Back to Pricing
          </button>
          <ROICalculator />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Value-Based Pricing
              <span className="block text-indigo-600">That Pays for Itself</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Our ROI-focused pricing prevents $600-$3,000 in monthly waste while helping you 
              capture your share of the $87.86B medical spa market opportunity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleCalculateROI}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Calculate Your ROI
              </button>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {billingCycle === 'monthly' ? 'Switch to Annual (Save 17%)' : 'Switch to Monthly'}
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'annual' ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
                <span className="ml-1 text-green-600 font-bold">(Save 17%)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`relative rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 ${
                  key === 'professional'
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-2 border-indigo-600'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'
                }`}
              >
                {key === 'professional' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className={`text-sm mb-6 ${key === 'professional' ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      {formatCurrency(getCurrentPrice(plan))}
                    </span>
                    <span className={`text-lg ${key === 'professional' ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>

                  {/* ROI Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-3 rounded-lg ${key === 'professional' ? 'bg-indigo-500/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                      <div className={`text-lg font-bold ${key === 'professional' ? 'text-white' : 'text-green-600'}`}>
                        {formatCurrency(getSavings(plan))}
                      </div>
                      <div className={`text-xs ${key === 'professional' ? 'text-indigo-100' : 'text-green-700 dark:text-green-300'}`}>
                        {billingCycle === 'monthly' ? 'Monthly Savings' : 'Annual Savings'}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${key === 'professional' ? 'bg-purple-500/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                      <div className={`text-lg font-bold ${key === 'professional' ? 'text-white' : 'text-blue-600'}`}>
                        {plan.savings.roi}
                      </div>
                      <div className={`text-xs ${key === 'professional' ? 'text-purple-100' : 'text-blue-700 dark:text-blue-300'}`}>
                        ROI
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className={`font-semibold mb-4 ${key === 'professional' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    What's Included
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className={`text-green-500 mt-1 ${key === 'professional' ? 'text-green-300' : ''}`}>✓</span>
                        <span className={`text-sm ${key === 'professional' ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations && (
                  <div className="mb-8">
                    <h4 className={`font-semibold mb-4 ${key === 'professional' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className={`text-gray-400 mt-1 ${key === 'professional' ? 'text-indigo-200' : ''}`}>•</span>
                          <span className={`text-sm ${key === 'professional' ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                            {limitation}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Best For */}
                <div className="mb-8">
                  <h4 className={`font-semibold mb-2 ${key === 'professional' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    Best For
                  </h4>
                  <p className={`text-sm ${key === 'professional' ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                    {plan.bestFor}
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleStartTrial(key)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    key === 'professional'
                      ? 'bg-white text-indigo-600 hover:bg-gray-50'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105'
                  }`}
                >
                  Start Free Trial
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Comparison Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            ROI Comparison: MedSpaSync Pro vs. General Platforms
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Core Plan ROI */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Core Plan</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">{formatCurrency(plans.core.savings.monthly)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{plans.core.savings.roi}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ROI</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600 mb-1">{plans.core.savings.payback}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
                </div>
              </div>
            </div>

            {/* Professional Plan ROI */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg text-center text-white">
              <h3 className="text-xl font-bold mb-4">Professional Plan</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{formatCurrency(plans.professional.savings.monthly)}</div>
                  <div className="text-sm text-indigo-100">Monthly Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">{plans.professional.savings.roi}</div>
                  <div className="text-sm text-indigo-100">ROI</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-1">{plans.professional.savings.payback}</div>
                  <div className="text-sm text-indigo-100">Payback Period</div>
                </div>
              </div>
            </div>

            {/* Enterprise Plan ROI */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Enterprise Plan</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">{formatCurrency(plans.enterprise.savings.monthly)}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{plans.enterprise.savings.roi}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ROI</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-600 mb-1">{plans.enterprise.savings.payback}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
                </div>
              </div>
            </div>

            {/* Industry Average */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Industry Average</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-gray-400 mb-1">$300</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-400 mb-1">150%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ROI</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-400 mb-1">10 months</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Payback Period</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Our Pricing Delivers Superior Value
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">$</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Prevent Inventory Waste</h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered inventory management prevents $600-$3,000 in monthly waste from expired products and stockouts.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">15%</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Operational Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Proven healthcare analytics reduce administrative overhead by 15% while improving accuracy.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">AI</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Specialized AI Reconciliation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                94.7% accuracy in medical spa financial reconciliation that general platforms can't match.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">90%</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Independent Spa Focus</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Designed specifically for the 90% of spas that are independently owned, not enterprise chains.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1-6</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Payback Period</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Most practices see ROI within 1-6 months, compared to 8-15 months with general platforms.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">$87B</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Market Opportunity</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Capture your share of the $87.86B medical spa market with specialized tools and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Losing Money to Inventory Waste?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of independent medical spas that have eliminated $600-$3,000 in monthly waste 
            and are capturing growth in the $87.86B market opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCalculateROI}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Calculate Your Savings
            </button>
            <button
              onClick={() => handleStartTrial('professional')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                How quickly will I see ROI?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Most independent medical spas see ROI within 1-6 months, with immediate savings from 
                inventory waste prevention and staff time optimization.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                What if I'm not satisfied?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 30-day money-back guarantee. If you're not completely satisfied with the 
                value and ROI, we'll refund your subscription.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can change your plan at any time. Upgrades take effect immediately, 
                and downgrades take effect at your next billing cycle.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Is there a setup fee or hidden costs?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No setup fees or hidden costs. The price you see is the price you pay. 
                We believe in transparent, value-based pricing.
              </p>
            </div>
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

export default PricingPage; 