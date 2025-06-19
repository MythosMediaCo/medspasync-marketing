<<<<<<< HEAD
// ✅ Next: Footer.jsx

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-8 h-8 button-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <span className="text-xl font-semibold text-white">MedSpaSync Pro</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            The first AI-powered reconciliation platform built exclusively for medical spas. Backed by research. Designed by operators. Built on integrity.
          </p>
          <p className="text-xs text-gray-500">© 2025 MythosMediaCo, LLC. All rights reserved.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="https://app.medspasyncpro.com/demo" className="hover:text-white transition-colors">Try the Demo</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="/insights" className="hover:text-white transition-colors">Strategic Insights</a></li>
            <li><a href="/support" className="hover:text-white transition-colors">Support</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
=======
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Overview */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-8 h-8 button-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm" />
              </div>
              <span className="text-xl font-semibold text-white">MedSpaSync Pro</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              The first reconciliation platform built exclusively for medical spas.
              Eliminate manual tracking, errors, and revenue loss with software designed by industry veterans.
            </p>
            <p className="text-xs text-gray-500">© 2025 MythosMediaCo, LLC. All rights reserved.</p>
          </div>
          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li>
                <a href="https://app.medspasyncpro.com/demo" className="hover:text-white transition-colors">
                  Try the Demo
                </a>
              </li>
            </ul>
          </div>
          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
>>>>>>> 95d1a57cc0c1b7c6670e326a2a17f106f104aa2d
