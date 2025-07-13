import React from 'react';

const SocialProof = () => (
  <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Leading Independent Medical Spas</h2>
      {/* TODO: Insert company logos here */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
        <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo 1</div>
        <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo 2</div>
        <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo 3</div>
        <div className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">Logo 4</div>
      </div>
      {/* TODO: Insert testimonials here */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-indigo-50 p-6 rounded-xl shadow text-left">
          <p className="text-gray-700 mb-2">“MedSpaSync Pro paid for itself in the first month. Our team is happier and our numbers are up!”</p>
          <div className="text-sm text-gray-500">— Dr. Smith, Renew MedSpa</div>
        </div>
        <div className="bg-indigo-50 p-6 rounded-xl shadow text-left">
          <p className="text-gray-700 mb-2">“The analytics are a game changer. I finally know which treatments are actually profitable.”</p>
          <div className="text-sm text-gray-500">— Sarah L., Glow Aesthetics</div>
        </div>
        <div className="bg-indigo-50 p-6 rounded-xl shadow text-left">
          <p className="text-gray-700 mb-2">“Setup was so fast. We were live in 2 days and support is fantastic.”</p>
          <div className="text-sm text-gray-500">— Michael P., Pure Radiance Spa</div>
        </div>
      </div>
      {/* TODO: Insert trust/security badges here */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
        <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">HIPAA</div>
        <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">SOC 2</div>
        <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">PCI</div>
      </div>
    </div>
  </section>
);

export default SocialProof; 