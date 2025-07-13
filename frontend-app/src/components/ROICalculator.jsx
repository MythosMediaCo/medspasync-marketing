import React, { useState, useEffect } from 'react';
// Requires: npm install lucide-react
import { X, Calculator, TrendingUp } from 'lucide-react';

const ROICalculator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    adminHours: 12,
    avgRevenue: 200
  });
  const [results, setResults] = useState({});

  const calculateROI = () => {
    const { adminHours, avgRevenue } = formData;
    const weeklySavings = Math.min(adminHours * 0.75, 20);
    const hourlyCost = 30;
    const weeklyTimeSavings = weeklySavings * hourlyCost;
    const monthlyTimeSavings = weeklyTimeSavings * 4.33;
    const annualTimeSavings = monthlyTimeSavings * 12;
    const additionalAppointments = Math.floor(weeklySavings / 2);
    const weeklyRevenueBump = additionalAppointments * avgRevenue;
    const monthlyRevenueBump = weeklyRevenueBump * 4.33;
    const annualRevenueBump = monthlyRevenueBump * 12;
    const totalMonthlySavings = monthlyTimeSavings + monthlyRevenueBump;
    const totalAnnualSavings = annualTimeSavings + annualRevenueBump;
    const monthlyCost = 149;
    const annualCost = monthlyCost * 12;
    const roi = ((totalAnnualSavings - annualCost) / annualCost) * 100;
    const paybackWeeks = (monthlyCost / (totalMonthlySavings / 4.33)).toFixed(1);
    setResults({
      weeklySavings: weeklySavings.toFixed(1),
      monthlyTimeSavings: monthlyTimeSavings.toFixed(0),
      monthlyRevenueBump: monthlyRevenueBump.toFixed(0),
      totalMonthlySavings: totalMonthlySavings.toFixed(0),
      totalAnnualSavings: totalAnnualSavings.toFixed(0),
      roi: roi.toFixed(0),
      paybackWeeks,
      additionalAppointments
    });
  };

  useEffect(() => {
    calculateROI();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">ROI Calculator</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">See your potential savings with MedSpaSync Pro</p>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Tell us about your practice</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Providers
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={formData.providers}
                    onChange={(e) => handleInputChange('providers', e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1</span>
                    <span className="font-medium">{formData.providers} providers</span>
                    <span>15+</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weekly Appointments
                  </label>
                  <input
                    type="number"
                    value={formData.weeklyAppointments}
                    onChange={(e) => handleInputChange('weeklyAppointments', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Admin Hours (Weekly)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={formData.adminHours}
                    onChange={(e) => handleInputChange('adminHours', e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>5 hrs</span>
                    <span className="font-medium">{formData.adminHours} hours</span>
                    <span>40+ hrs</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Revenue per Treatment
                  </label>
                  <input
                    type="number"
                    value={formData.avgRevenue}
                    onChange={(e) => handleInputChange('avgRevenue', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>
            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Your Potential Savings
              </h3>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{results.weeklySavings}hrs</div>
                    <div className="text-sm text-gray-600">Weekly Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{results.paybackWeeks}wks</div>
                    <div className="text-sm text-gray-600">Payback Period</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monthly time savings:</span>
                    <span className="font-semibold text-green-600">${results.monthlyTimeSavings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Additional revenue capacity:</span>
                    <span className="font-semibold text-blue-600">${results.monthlyRevenueBump}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total monthly benefit:</span>
                      <span className="text-xl font-bold text-indigo-600">${results.totalMonthlySavings}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{results.roi}% ROI</div>
                  <div className="text-sm text-gray-600">Annual Return on Investment</div>
                  <div className="text-xs text-gray-500 mt-1">
                    ${results.totalAnnualSavings} annual benefit vs $1,788 software cost
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                  Start Free 14-Day Trial
                </button>
                <button className="w-full border border-indigo-600 text-indigo-600 py-3 px-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                  Schedule Demo for My Practice Size
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator; 