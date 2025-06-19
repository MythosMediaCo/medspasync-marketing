// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-10 text-sm text-gray-600 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div>&copy; {new Date().getFullYear()} MedSpaSync Pro. All rights reserved.</div>
        <div className="space-x-6">
          <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</Link>
          <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms</Link>
          <Link to="/support" className="hover:text-indigo-600 dark:hover:text-indigo-400">Support</Link>
        </div>
      </div>
    </footer>
  );
}
