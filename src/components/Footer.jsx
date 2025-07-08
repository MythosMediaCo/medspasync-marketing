import React from 'react';

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} MedSpaSync Pro. All rights reserved.
      </div>
      <div className="flex items-center gap-6 text-sm">
        <a href="#" className="text-indigo-600 hover:underline">Privacy & Security</a>
        <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
      </div>
      <div className="text-gray-700 text-sm font-semibold">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full mr-2">Value Guarantee</span>
        Save 15+ hours weekly or your money back.
      </div>
    </div>
  </footer>
);

export default Footer; 