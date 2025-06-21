// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: {
      title: 'Product',
      links: [
        { label: 'AI Features', href: '/features', description: '95%+ accuracy' },
        { label: 'Pricing', href: '/pricing', description: '$299/month' },
        { label: 'Live Demo', href: 'https://demo.medspasyncpro.com', external: true },
        { label: 'Implementation', href: '/features#implementation', description: '24 hours' },
      ]
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about', description: 'Operations experts' },
        { label: 'Industry Insights', href: '/insights' },
        { label: 'Support', href: '/support', description: '24hr response' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'HIPAA Compliance', href: '/insights/hipaa-compliance' },
        { label: 'Integration Guide', href: '/insights/software-integration-failures' },
        { label: 'ROI Calculator', href: '/pricing#economics' },
        { label: 'Documentation', href: '/support' },
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Security', href: '/privacy#security' },
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MS</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">MedSpaSync Pro</h3>
                <p className="text-sm text-emerald-400">AI Intelligence Layer for Medical Spas</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Built by medical spa operations experts who understand the 8+ hours weekly 
              and $2,500+ monthly cost of manual reconciliation problems.
            </p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-emerald-400 font-bold">95%+</div>
                <div className="text-xs text-gray-500">AI Accuracy</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-emerald-400 font-bold">24hrs</div>
                <div className="text-xs text-gray-500">Setup Time</div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://demo.medspasyncpro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200"
            >
              <span className="mr-2">🎯</span>
              Try AI Demo
            </a>
          </div>

          {/* Navigation Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center justify-between group"
                      >
                        <span>{link.label}</span>
                        {link.description && (
                          <span className="text-xs text-gray-600 group-hover:text-emerald-500">
                            {link.description}
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center justify-between group"
                      >
                        <span>{link.label}</span>
                        {link.description && (
                          <span className="text-xs text-gray-600 group-hover:text-emerald-500">
                            {link.description}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-3">Need Help Getting Started?</h4>
              <p className="text-gray-400 text-sm mb-4">
                Our operations experts respond within 24 hours with actionable solutions.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="mailto:support@medspasyncpro.com"
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                >
                  support@medspasyncpro.com
                </a>
                <span className="text-gray-600">•</span>
                <span className="text-gray-500 text-sm">24-hour response</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Ready to Eliminate Manual Work?</h4>
              <p className="text-gray-400 text-sm mb-4">
                Start reconciling with 95%+ accuracy in 24 hours. No complex integrations required.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://demo.medspasyncpro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                >
                  Try Demo
                </a>
                <span className="text-gray-600">•</span>
                <Link
                  to="/pricing"
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span>&copy; {currentYear} MythosMediaCo LLC. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">MedSpaSync Pro is a MythosMediaCo product</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-500">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Platform Status: Operational</span>
              </div>
              <a
                href="mailto:support@medspasyncpro.com"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;