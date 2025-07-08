import React from 'react';
// Requires: npm install lucide-react
// Fallback icons if lucide-react is not available
const Check = ({ className }) => <span className={className}>✓</span>;
const X = ({ className }) => <span className={className}>✗</span>;
const AlertCircle = ({ className }) => <span className={className}>⚠️</span>;

// Try to import from lucide-react, fallback to our simple icons
let LucideIcons = { Check, X, AlertCircle };
try {
  LucideIcons = require('lucide-react');
} catch (e) {
  console.warn('lucide-react not available, using fallback icons');
}

const CompetitiveDiff = () => {
  const competitors = [
    {
      name: "Vagaro",
      tagline: "General beauty salon software",
      price: "$25-30/month",
      strengths: ["Low cost", "Easy to use"],
      weaknesses: ["Not medical spa specific", "Limited analytics", "No HIPAA features"],
      medspasync: "Medical spa sophistication, not general beauty salon software",
      color: "orange"
    },
    {
      name: "Zenoti", 
      tagline: "Enterprise complexity",
      price: "$300-600/month",
      strengths: ["Comprehensive features", "Enterprise scale"],
      weaknesses: ["Complex implementation", "High cost", "Overwhelming for small practices"],
      medspasync: "Professional-grade features without enterprise complexity",
      color: "red"
    },
    {
      name: "Boulevard",
      tagline: "Pretty interface, limited depth", 
      price: "$200-400/month",
      strengths: ["Modern design", "Good UX"],
      weaknesses: ["Limited medical spa features", "Expensive", "Missing analytics"],
      medspasync: "Modern interface WITH medical spa functionality",
      color: "purple"
    },
    {
      name: "Pabau",
      tagline: "UK-based, chain-focused",
      price: "$150-250/month", 
      strengths: ["Feature-rich", "Good for chains"],
      weaknesses: ["UK-centric", "Complex for independents", "Poor US support"],
      medspasync: "Purpose-built for US independents, not UK-based chains",
      color: "blue"
    }
  ];

  const features = [
    { feature: "Medical Spa-Specific KPIs", vagaro: false, zenoti: true, boulevard: false, pabau: true, medspasync: true },
    { feature: "HIPAA Compliance Built-in", vagaro: false, zenoti: true, boulevard: true, pabau: true, medspasync: true },
    { feature: "48-Hour Implementation", vagaro: true, zenoti: false, boulevard: false, pabau: false, medspasync: true },
    { feature: "Transparent Pricing", vagaro: true, zenoti: false, boulevard: false, pabau: false, medspasync: true },
    { feature: "Independent Practice Focus", vagaro: false, zenoti: false, boulevard: false, pabau: false, medspasync: true },
    { feature: "Mobile-First Analytics", vagaro: false, zenoti: false, boulevard: true, pabau: false, medspasync: true },
    { feature: "Predictive Inventory", vagaro: false, zenoti: true, boulevard: false, pabau: false, medspasync: true },
    { feature: "ROI Optimization", vagaro: false, zenoti: false, boulevard: false, pabau: false, medspasync: true }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Independent Practices Choose MedSpaSync Pro
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're the only platform built specifically for independent medical spas. 
            Here's how we compare to the alternatives.
          </p>
        </div>
        {/* Competitor Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {competitors.map((comp, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{comp.name}</h3>
                  <p className="text-gray-600">{comp.tagline}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{comp.price}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-${comp.color}-100 flex items-center justify-center`}>
                  <LucideIcons.AlertCircle className={`w-6 h-6 text-${comp.color}-600`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {comp.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <LucideIcons.Check className="w-3 h-3 text-green-500 mr-1" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Weaknesses</h4>
                  <ul className="space-y-1">
                    {comp.weaknesses.map((weakness, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <LucideIcons.X className="w-3 h-3 text-red-500 mr-1" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-medium text-indigo-900 mb-2">MedSpaSync Pro Advantage:</h4>
                <p className="text-sm text-indigo-800">{comp.medspasync}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Feature Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 text-white p-6">
            <h3 className="text-2xl font-bold">Feature Comparison</h3>
            <p className="text-indigo-100">See how MedSpaSync Pro stacks up against the competition</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Vagaro</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Zenoti</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Boulevard</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Pabau</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-indigo-600 bg-indigo-50">MedSpaSync Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {features.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {row.vagaro ? <LucideIcons.Check className="w-5 h-5 text-green-500 mx-auto" /> : <LucideIcons.X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.zenoti ? <LucideIcons.Check className="w-5 h-5 text-green-500 mx-auto" /> : <LucideIcons.X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.boulevard ? <LucideIcons.Check className="w-5 h-5 text-green-500 mx-auto" /> : <LucideIcons.X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.pabau ? <LucideIcons.Check className="w-5 h-5 text-green-500 mx-auto" /> : <LucideIcons.X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                    <td className="px-6 py-4 text-center bg-indigo-50">
                      {row.medspasync ? <LucideIcons.Check className="w-5 h-5 text-indigo-600 mx-auto" /> : <LucideIcons.X className="w-5 h-5 text-red-500 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            See Why We're Different - Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveDiff; 