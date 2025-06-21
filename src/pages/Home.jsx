// React automatically imported in JSX
import { useToast } from '../context/ToastContext';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import { pricingPlans, pricingFeatures, businessMetrics, formatPrice } from '../data/pricing';

const HomePage = () => {
  const { showToast } = useToast();

  const handleDemoClick = () => {
    showToast('Launching demo in new tab...', 'info');
    window.open('https://demo.medspasyncpro.com', '_blank');
  };

  const handleSubscribeClick = (plan) => {
    showToast(`Starting ${plan} subscription...`, 'success');
    // In production, redirect to Stripe checkout
    // window.location.href = '/api/checkout/create-session';
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Skip Link for Accessibility */}
      <a href="#main" className="skip-link">Skip to main content</a>
      
      {/* Unified Navigation */}
      <Navigation variant="demo" />

      <main id="main" className="demo-container">
        {/* Hero Section */}
        <section className="demo-section text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Stop Losing <span className="text-red-600">8+ Hours Weekly</span><br />
            to <span className="text-gradient">Manual Reconciliation</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            AI matching achieves <strong className="text-emerald-600">95%+ accuracy</strong>, preventing{' '}
            <strong className="text-red-600">$2,500+ monthly</strong> in missed revenue.<br />
            <span className="text-gradient font-semibold">The AI Intelligence Layer for Medical Spas.</span>
          </p>
          
          <div className="status-badge warning pulse-slow mb-8 text-lg">
            💰 See your lost revenue recovered in real time
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              variant="primary"
              size="xl"
              onClick={handleDemoClick}
              className="px-12 py-4"
            >
              🚀 Try Live Demo (No Email Required)
            </Button>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => handleSubscribeClick('Core')}
              className="px-12 py-4"
            >
              Start Subscription
            </Button>
          </div>

          <div className="alert-info">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            No complex integrations • 24-hour setup • HIPAA-conscious security
          </div>
        </section>

        {/* Problem Section */}
        <section id="problems" className="demo-section problem-section">
          <div className="text-center mb-12">
            <div className="status-badge warning mb-4">
              💸 Revenue Leak Alert
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Hidden <span className="text-red-600">Revenue Leak</span> in Your Spa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand reconciliation challenges because we've lived them
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="problem-card">
              <div className="text-emerald-600 mb-6">
                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h4m6 4h4"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Our team includes medical spa operations experts who spent years manually reconciling Alle, Aspire, and POS data. We built the solution we wished existed.
              </p>
            </div>

            <div className="problem-card">
              <div className="text-emerald-600 mb-6">
                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proven Methodology</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI algorithms are trained on real medical spa reconciliation patterns, achieving 95%+ accuracy through deep understanding of spa workflows.
              </p>
            </div>

            <div className="problem-card">
              <div className="text-emerald-600 mb-6">
                <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Operations Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get support from people who understand your reconciliation challenges. We respond within 24 hours with practical, actionable solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="demo-section">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your spa's reconciliation needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {Object.values(pricingPlans).map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.featured ? 'featured' : ''} ${plan.status === 'coming_soon' ? 'coming-soon' : ''}`}>
                <div className={`status-badge ${plan.badge.type} absolute -top-3 left-1/2 transform -translate-x-1/2`}>
                  {plan.badge.text}
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="metric-display">
                    <div className={`metric-number ${plan.id === 'professional' ? 'text-purple-600' : ''}`}>
                      {formatPrice(plan)}
                    </div>
                    <div className="metric-label">per {plan.period}</div>
                  </div>
                </div>

                <ul className={`space-y-4 mb-10 text-left ${plan.status === 'coming_soon' ? 'text-gray-500' : ''}`}>
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-lg">
                      <svg className={`h-6 w-6 mr-4 ${plan.status === 'coming_soon' ? 'text-gray-400' : 'text-emerald-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {plan.cta.disabled ? (
                  <button 
                    disabled 
                    className="w-full bg-gray-400 text-white py-4 px-8 rounded-xl text-xl font-bold cursor-not-allowed"
                  >
                    {plan.cta.text}
                  </button>
                ) : (
                  <Button 
                    variant="primary"
                    size="xl"
                    onClick={() => handleSubscribeClick(plan.cta.plan)}
                    className="w-full py-4"
                  >
                    {plan.cta.text}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="alert-success inline-flex">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              {Object.values(pricingFeatures).map(feature => feature.text).join(' • ')}
            </div>
          </div>
        </section>

        {/* Demo CTA Section */}
        <section className="demo-section gradient-hero text-white rounded-2xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Try It Now - No Email Required
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
            Upload your files and see the reconciliation magic happen in real-time
          </p>
          <Button
            variant="secondary"
            size="2xl"
            onClick={handleDemoClick}
            className="bg-white text-emerald-600 px-12 py-5 rounded-2xl shadow-2xl hover:bg-gray-50 hover:-translate-y-1"
          >
            🚀 Launch Live Demo
          </Button>
          <p className="text-lg mt-6 opacity-75">
            Your files are processed locally and never stored on our servers
          </p>
        </section>

        {/* Final CTA */}
        <section className="demo-section gradient-cta rounded-2xl text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Stop <span className="text-gradient">Reconciling by Hand?</span>
          </h3>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            You've seen how MedSpaSync Pro can recover your lost revenue.
            Start your subscription today and eliminate manual reconciliation forever.
          </p>

          <Button
            variant="cta"
            onClick={() => handleSubscribeClick('Core')}
            className="px-16 py-6 rounded-2xl text-3xl font-bold"
          >
            🚀 Subscribe Now - {formatPrice(pricingPlans.core)}/{pricingPlans.core.period}
          </Button>
        </section>
      </main>

      {/* Demo-Inspired Footer */}
      <footer className="demo-nav border-t-0">
        <div className="demo-container">
          <div className="flex flex-col md:flex-row justify-between items-center py-8 space-y-4 md:space-y-0">
            <div className="text-gray-600">
              &copy; 2025 MedSpaSync Pro. All rights reserved.
            </div>
            <div className="flex space-x-8">
              <a href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors">Privacy</a>
              <a href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors">Terms</a>
              <a href="/support" className="text-gray-600 hover:text-emerald-600 transition-colors">Support</a>
              <a href="/contact" className="text-gray-600 hover:text-emerald-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;