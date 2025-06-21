import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Main Pages
import Home from './pages/Home';
import InsightsPage from './pages/InsightsPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Article Pages
import SoftwareFailures from './pages/Articles/SoftwareFailures';
import HIPAACompliance from './pages/Articles/HIPAACompliance';

// Additional Article Components (you'll need to create these)
// import HiddenCostsAnalysis from './pages/Articles/HiddenCostsAnalysis';
// import AIAccuracyGuide from './pages/Articles/AIAccuracyGuide';
// import AlleAspireGuide from './pages/Articles/AlleAspireGuide';
// import FinancialAccuracy from './pages/Articles/FinancialAccuracy';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Main Site Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Insights Hub */}
              <Route path="/insights" element={<InsightsPage />} />

              {/* Current Articles */}
              <Route path="/insights/hipaa-compliance" element={<HIPAACompliance />} />
              <Route path="/insights/software-integration-failures" element={<SoftwareFailures />} />

              {/* Additional Articles (uncomment as you create them) */}
              {/* <Route path="/insights/hidden-costs-of-integration" element={<HiddenCostsAnalysis />} /> */}
              {/* <Route path="/insights/ai-accuracy-medical-spas" element={<AIAccuracyGuide />} /> */}
              {/* <Route path="/insights/alle-aspire-reconciliation-guide" element={<AlleAspireGuide />} /> */}
              {/* <Route path="/insights/spa-financial-reporting-accuracy" element={<FinancialAccuracy />} /> */}

              {/* 404 Fallback - you might want to create a 404 page */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;