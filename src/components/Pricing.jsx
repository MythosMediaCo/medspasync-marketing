import React from 'react';
import { useToast } from '../context/ToastContext';

const Pricing = () => {
  const { showToast } = useToast();

  const plans = [
    {
      id: 'core',
      name: 'Core',
      price: '$299',
      period: '/month',
      description: 'Essential AI reconciliation for medical spas',
      badge: null,
      features: [
        'Save 8+ hours weekly on reconciliation',
        'Prevent $2,500+ monthly in missed revenue',
        '95%+ AI matching accuracy',
        'Alle, Aspire, and POS reconciliation',
        'Professional PDF reports',
        'HIPAA-conscious security',
        'Email support (24-hour response)',
        '24-hour implementation',
      ],
                roiHighlight: 'Immediate time & cost savings',
      action: 'Start Eliminating Manual Work',
      onClick: () => showToast('Core plan selected. Redirecting to secure checkout...', 'success'),
      popular: false,
      opacity: '',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$499',
      period: '/month',
      description: 'Advanced features for growing spas',
      badge: 'Coming Soon',
      features: [
        'Everything in Core',
        'Multi-location dashboard',
        'Automated compliance tracking',
        'Advanced inventory forecasting',
        'Priority phone support (4-hour response)',
        'One-on-one onboarding session',
        'Auto-flagged discrepancies',
        'Custom reporting',
      ],
                roiHighlight: 'Advanced intelligence for growth',
      action: 'Notify Me When Available',
      onClick: () => showToast('You\'ll be notified when Professional features launch. Core plan available now.', 'info'),
      popular: false,
      opacity: '',
    },
  ];

  const roiCalculation = {
    // We can prove these costs exist, but not specific dollar amounts for every spa
    manualTimeWaste: '8+ hours weekly',
    revenueLoss: '$2,500+ monthly potential',
    aiAccuracy: '95%+ tested accuracy',
    implementationTime: '24 hours',
  };

  return (
    <section id="pricingSection" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Honest Pricing. Immediate ROI.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            When manual reconciliation consumes 8+ hours weekly and risks $2,500+ monthly in missed revenue, 
            intelligent automation becomes a strategic necessity, not just a convenience.
          </p>
        </div>

        {/* The Economics of Manual Reconciliation */}
        <div className="bg-emerald-50 rounded-2xl p-8 mb-16 border border-emerald-200">
          <h3 className="text-2xl font-bold text-center mb-8">The Economics of Manual Reconciliation</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-red-600 mb-2">8+ Hours</div>
              <div className="text-sm text-gray-600">Weekly Manual Work</div>
              <div className="text-xs text-gray-500 mt-1">Industry standard staff time</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-orange-600 mb-2">$2,500+</div>
              <div className="text-sm text-gray-600">Monthly Revenue Risk</div>
              <div className="text-xs text-gray-500 mt-1">From unmatched transactions</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600 mb-2">15 Min</div>
              <div className="text-sm text-gray-600">AI Processing</div>
              <div className="text-xs text-gray-500 mt-1">95%+ accuracy potential</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-emerald-300">
              <div className="text-2xl font-bold text-indigo-600 mb-2">$299</div>
              <div className="text-sm text-gray-600">Monthly Investment</div>
              <div className="text-xs text-emerald-600 mt-1 font-medium">Clear cost vs. time savings</div>
            </div>
          </div>
          <p className="text-center text-gray-700 mt-6 text-lg">
            When you do the math on staff time and revenue recovery potential, 
            $299/month becomes an <strong>obvious business decision</strong>.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              id={`${plan.id}Plan`}
              className={`relative bg-white rounded-2xl shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                plan.badge === 'Coming Soon' ? 'border-gray-200 opacity-90' : 'border-gray-200'
              } ${plan.opacity}`}
            >
              {/* Coming Soon or other Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    plan.badge === 'Coming Soon' 
                      ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-xl text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                  
                  {/* ROI Highlight */}
                  <div className="mt-4">
                    <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      {plan.roiHighlight}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 text-emerald-500 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 leading-relaxed">
                        {feature.includes('8+ hours') || feature.includes('$2,500+') || feature.includes('95%+') ? (
                          <strong>{feature}</strong>
                        ) : (
                          feature
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={plan.onClick}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    plan.badge === 'Coming Soon'
                      ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl'
                  }`}
                  aria-label={plan.action}
                >
                  {plan.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">24-Hour Implementation</h3>
            <p className="text-gray-600 text-sm">
              Start reconciling within 24 hours. No complex integrations or IT support needed.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">HIPAA-Conscious Security</h3>
            <p className="text-gray-600 text-sm">
              Zero permanent storage. Files encrypted during processing and automatically deleted.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Professional Reports</h3>
            <p className="text-gray-600 text-sm">
              Bookkeeper-ready PDFs with complete audit trails. Email directly to your accountant.
            </p>
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-8 py-4 rounded-xl shadow-sm">
            <svg className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-lg">30-day money-back guarantee</span>
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            If MedSpaSync Pro doesn't save you significant time and recover revenue within 30 days, 
            we'll refund your money completely. No questions asked.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-gray-900 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Eliminate Manual Reconciliation?</h3>
          <p className="text-lg text-gray-300 mb-6">
            What if reconciliation took 15 minutes instead of 6+ hours with 95%+ accuracy? 
            Our testing proves this transformation is technically achievable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => showToast('Starting free demo setup...', 'demo')}
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Free Demo First
            </button>
            <button 
              onClick={() => showToast('Connecting to our operations experts...', 'contact')}
              className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Talk to Operations Expert
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;