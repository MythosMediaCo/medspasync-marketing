import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoadingScreen from '../components/Common/LoadingScreen.jsx';
import UptimeStatusBadge from '../components/Common/UptimeStatusBadge.jsx';
import Header from '../components/Header.jsx';
import ROICalculator from '../components/demo/ROICalculator.jsx';

const LandingPage = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [isCreatingSandbox, setIsCreatingSandbox] = useState(false);

  const handleGetStarted = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleSignIn = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleCalculateSavings = useCallback(() => {
    setShowROICalculator(true);
  }, []);

  const handleLaunchSandbox = useCallback(async () => {
    setIsCreatingSandbox(true);
    try {
      const response = await fetch('/api/demo/sandbox', { method: 'POST' });
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Failed to create sandbox');
      }
    } catch (error) {
      console.error('Failed to create sandbox', error);
    }
    setIsCreatingSandbox(false);
  }, [navigate]);

  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const { firstName, isAuthenticated, isLoading, role } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const from = location.state?.from;
      if (from) {
        navigate(from, { replace: true });
        return;
      }

      const cookie = document.cookie
        .split(';')
        .map(c => c.trim())
        .find(c => c.startsWith('lastVisitedPage='));
      const lastVisited = cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
      if (lastVisited) {
        navigate(lastVisited, { replace: true });
        return;
      }

      if (role) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, location, navigate, role]);

  if (isLoading) {
    return <LoadingScreen message="Loading user session..." />;
  }

  if (showROICalculator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <button 
            onClick={() => setShowROICalculator(false)}
            className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            ← Back to Home
          </button>
          <ROICalculator />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-gray-100 text-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Stop the Hidden Profit Killer
              <span className="block text-indigo-600">Destroying Your Medical Spa's Bottom Line</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Independent medical spas lose <span className="font-bold text-red-600">$600-$2,000 monthly</span> to inventory waste. 
              Our AI reconciliation and predictive analytics eliminate this profit drain while you capture growth in the 
              <span className="font-bold text-indigo-600"> $87.86B market</span>.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleCalculateSavings}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Calculate Your Monthly Savings
              </button>
              <button
                onClick={handleGetStarted}
                className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Start Free Trial
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Join the 47% Annual Growth in AI for Beauty</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Trusted by Independent Spas Across 12 States</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Over $500K in Inventory Waste Prevented</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Independent Medical Spas Choose MedSpaSync Pro
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value Prop 1 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">$</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Eliminate $2,000 Monthly Inventory Losses</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI-powered inventory management prevents expired products and stockouts that drain your profits.
              </p>
            </div>

            {/* Value Prop 2 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">15%</span>
              </div>
              <h3 className="text-xl font-bold mb-2">15% Operational Cost Reduction</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proven healthcare analytics reduce administrative overhead and improve efficiency.
              </p>
            </div>

            {/* Value Prop 3 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">AI</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Reconciliation That Zenoti and Pabau Can't Match</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Specialized medical spa financial reconciliation with 94.7% accuracy.
              </p>
            </div>

            {/* Value Prop 4 */}
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">90%</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enterprise Analytics for Independent Spa Owners</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Designed specifically for the 90% of spas that are independently owned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why We're Different from General Spa Management Platforms
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* vs Zenoti */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">vs. Zenoti</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <div>
                    <p className="font-semibold">General AI for all spa types</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">One-size-fits-all approach</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Medical spa predictive analytics specialist</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Specialized financial reconciliation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* vs Pabau */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">vs. Pabau</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <div>
                    <p className="font-semibold">Echo AI for automated communication</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Focus on patient communication</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Predictive analytics for profit optimization</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Revenue cycle management focus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* vs PatientNow */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-center">vs. PatientNow</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✗</span>
                  <div>
                    <p className="font-semibold">AI for patient acquisition</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Marketing and conversion focus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <p className="font-semibold">Analytics for operational optimization</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Business intelligence depth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Capture Your Share of the $87.86B Medical Spa Market
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            The medical spa industry is growing at 47% CAGR with AI adoption. 
            Independent spas need specialized tools to compete against chains and capture this massive opportunity.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$87.86B</div>
              <div className="text-lg">Market Size by 2034</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">47%</div>
              <div className="text-lg">AI Adoption CAGR</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">90%</div>
              <div className="text-lg">Independent Spa Market</div>
            </div>
          </div>
          <button
            onClick={handleGetStarted}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Start Your Growth Journey
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stop Losing Money to Inventory Waste?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join hundreds of independent medical spas that have eliminated $600-$2,000 in monthly waste 
            and are capturing growth in the $87.86B market opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCalculateSavings}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Calculate Your Savings
            </button>
            <button
              onClick={handleLaunchSandbox}
              className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
              disabled={isCreatingSandbox}
            >
              {isCreatingSandbox ? 'Creating Sandbox...' : 'Try Free Demo'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <a href="/demo" className="hover:text-indigo-600 hover:underline transition">
              Interactive Demo
            </a>
            <a href="/demo/roi" className="hover:text-indigo-600 hover:underline transition">
              ROI Calculator
            </a>
            <a href="/support" className="hover:text-indigo-600 hover:underline transition">
              AI Support
            </a>
            <a href="/docs" className="hover:text-indigo-600 hover:underline transition">
              Documentation
            </a>
            <a href="/pricing" className="hover:text-indigo-600 hover:underline transition">
              Pricing
            </a>
            <a href="/case-studies" className="hover:text-indigo-600 hover:underline transition">
              Case Studies
            </a>
          </nav>
          
          <div className="mt-8 flex justify-center">
            <UptimeStatusBadge statusPageId="9mEaClE07F" />
          </div>

          <div className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
            Version {version} | MedSpaSync Pro - Specialized Financial Optimization for Independent Medical Spas
          </div>
        </div>
      </footer>
    </div>
  );
});

export default LandingPage;
