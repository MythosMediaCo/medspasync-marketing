import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solutions from './components/Solutions';
import Features from './components/Features';
import InteractiveDemo from './components/InteractiveDemo';
import SuccessStories from './components/SuccessStories';
import ROICalculator from './components/ROICalculator';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DocumentationAgent from './components/DocumentationAgent';
import LiveChat from './components/LiveChat';
import { ToastProvider } from './context/ToastContext';

/**
 * MedSpaSync Pro App Component
 * 
 * Implements the complete application with:
 * - Design system integration
 * - Dark mode initialization
 * - Routing with all components
 * - Toast context for notifications
 * - Interactive demo and success stories
 * - ROI calculator, documentation agent, and live chat
 */
const App = () => {
  // Dark Mode Initialization
  useEffect(() => {
    // Check for saved dark mode preference or default to light mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                      (!localStorage.getItem('darkMode') && 
                       window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
          <Navigation />
          
          <main className="pt-16 lg:pt-20">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Problem />
                  <Solutions />
                  <Features />
                  <InteractiveDemo />
                  <SuccessStories />
                  <ROICalculator />
                  <Pricing />
                  <About />
                  <Contact />
                </>
              } />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/demo" element={<InteractiveDemo />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/roi-calculator" element={<ROICalculator />} />
              <Route path="*" element={
                <div className="section">
                  <div className="container text-center">
                    <h1 className="text-h1 mb-6">Page Not Found</h1>
                    <p className="text-body-large text-grey-500 mb-8">
                      The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="btn-primary">
                      Return Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          
          <Footer />
          <DocumentationAgent />
          <LiveChat />
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;