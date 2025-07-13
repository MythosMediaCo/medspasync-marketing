import React from 'react';

const ContentMarketing = () => (
  <section className="py-16 bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Resources & Education</h2>
      <p className="text-lg text-gray-700 mb-8">
        Grow your practice with our expert blog, guides, and resource center. Learn how to optimize operations, boost profitability, and stay ahead in the industry.
      </p>
      {/* TODO: Insert blog/resource links here */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
        <div className="w-64 h-32 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-400">Blog Post 1</div>
        <div className="w-64 h-32 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-400">Guide 1</div>
        <div className="w-64 h-32 bg-white border border-gray-200 rounded flex items-center justify-center text-gray-400">Resource 1</div>
      </div>
      <div className="text-indigo-700 font-semibold text-sm">
        Visit the <a href="#" className="underline">MedSpaSync Pro Blog</a> for more.
      </div>
    </div>
  </section>
);

export default ContentMarketing; 