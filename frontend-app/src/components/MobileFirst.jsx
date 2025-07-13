import React from 'react';

const MobileFirst = () => (
  <section className="py-16 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Mobile-First, Always</h2>
      <p className="text-lg text-gray-700 mb-8">
        Access your full analytics dashboard, reports, and notifications from any device. 90% of features work offline. Make decisions on the go.
      </p>
      {/* TODO: Insert mobile app screenshots here */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
        <div className="w-40 h-72 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Mobile Screenshot 1</div>
        <div className="w-40 h-72 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Mobile Screenshot 2</div>
      </div>
      <div className="text-indigo-700 font-semibold text-sm">
        Offline capability. Touch-optimized. Instant notifications.
      </div>
    </div>
  </section>
);

export default MobileFirst; 