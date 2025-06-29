import React, { useState, useEffect } from 'react';
import Button from './Button';

/**
 * ROI Calculator Component - Interactive Savings Calculator
 * 
 * Features:
 * - Dynamic ROI calculation based on spa metrics
 * - Real-time savings projections
 * - Customizable parameters
 * - Visual charts and breakdowns
 */
const ROICalculator = () => {
  const [formData, setFormData] = useState({
    monthlyTransactions: 500,
    averageTransactionValue: 250,
    currentReconciliationTime: 8,
    staffHourlyRate: 25,
    currentMatchRate: 85,
    monthlyRevenue: 125000
  });

  const [results, setResults] = useState(null);

  // Calculate ROI based on form data
  const calculateROI = () => {
    const {
      monthlyTransactions,
      averageTransactionValue,
      currentReconciliationTime,
      staffHourlyRate,
      currentMatchRate,
      monthlyRevenue
    } = formData;

    // Current costs
    const currentTimeCost = currentReconciliationTime * 4 * staffHourlyRate; // 4 weeks per month
    const currentRevenueLoss = (monthlyRevenue * (100 - currentMatchRate) / 100) * 0.02; // 2% of unmatched revenue

    // MedSpaSync Pro benefits
    const newReconciliationTime = 0.5; // 30 minutes per week
    const newTimeCost = newReconciliationTime * 4 * staffHourlyRate;
    const newMatchRate = 98; // MedSpaSync Pro accuracy
    const newRevenueLoss = (monthlyRevenue * (100 - newMatchRate) / 100) * 0.02;

    // Savings calculations
    const timeSavings = currentTimeCost - newTimeCost;
    const revenueRecovery = currentRevenueLoss - newRevenueLoss;
    const totalMonthlySavings = timeSavings + revenueRecovery;
    const annualSavings = totalMonthlySavings * 12;

    // ROI calculations
    const medspasyncCost = 299; // Monthly subscription
    const netMonthlySavings = totalMonthlySavings - medspasyncCost;
    const netAnnualSavings = netMonthlySavings * 12;
    const roiPercentage = (netAnnualSavings / (medspasyncCost * 12)) * 100;

    // Time savings breakdown
    const weeklyTimeSaved = currentReconciliationTime - newReconciliationTime;
    const monthlyTimeSaved = weeklyTimeSaved * 4;
    const annualTimeSaved = monthlyTimeSaved * 12;

    setResults({
      current: {
        timeCost: currentTimeCost,
        revenueLoss: currentRevenueLoss,
        totalCost: currentTimeCost + currentRevenueLoss
      },
      new: {
        timeCost: newTimeCost,
        revenueLoss: newRevenueLoss,
        totalCost: newTimeCost + newRevenueLoss
      },
      savings: {
        time: timeSavings,
        revenue: revenueRecovery,
        total: totalMonthlySavings,
        annual: annualSavings,
        net: netMonthlySavings,
        netAnnual: netAnnualSavings
      },
      roi: {
        percentage: roiPercentage,
        paybackMonths: medspasyncCost / netMonthlySavings
      },
      time: {
        weekly: weeklyTimeSaved,
        monthly: monthlyTimeSaved,
        annual: annualTimeSaved
      }
    });
  };

  useEffect(() => {
    calculateROI();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const presetScenarios = [
    {
      name: 'Small Spa',
      description: '1-2 locations, <500 transactions/month',
      values: {
        monthlyTransactions: 300,
        averageTransactionValue: 200,
        currentReconciliationTime: 6,
        staffHourlyRate: 20,
        currentMatchRate: 80,
        monthlyRevenue: 60000
      }
    },
    {
      name: 'Medium Spa',
      description: '2-3 locations, 500-1000 transactions/month',
      values: {
        monthlyTransactions: 750,
        averageTransactionValue: 250,
        currentReconciliationTime: 8,
        staffHourlyRate: 25,
        currentMatchRate: 85,
        monthlyRevenue: 125000
      }
    },
    {
      name: 'Large Spa',
      description: '3+ locations, 1000+ transactions/month',
      values: {
        monthlyTransactions: 1500,
        averageTransactionValue: 300,
        currentReconciliationTime: 12,
        staffHourlyRate: 30,
        currentMatchRate: 90,
        monthlyRevenue: 300000
      }
    }
  ];

  const applyPreset = (preset) => {
    setFormData(preset.values);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <div className="container-function">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-display-medium text-brand-primary mb-6">
            Calculate Your ROI with MedSpaSync Pro
          </h2>
          <p className="text-body-large text-neutral-600 max-w-3xl mx-auto">
            See exactly how much time and money you can save with AI-powered reconciliation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="space-y-6">
              <div className="info-card">
                <h3 className="text-title-medium text-brand-primary mb-6">
                  Your Current Metrics
                </h3>

                {/* Preset Scenarios */}
                <div className="mb-6">
                  <label className="block text-body font-medium text-neutral-700 mb-3">
                    Quick Setup - Choose Your Spa Size
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {presetScenarios.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => applyPreset(preset)}
                        className="p-3 border border-neutral-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 text-left"
                      >
                        <div className="font-medium text-neutral-700">{preset.name}</div>
                        <div className="text-body-small text-neutral-500">{preset.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-body font-medium text-neutral-700 mb-2">
                      Monthly Transactions
                    </label>
                    <input
                      type="number"
                      value={formData.monthlyTransactions}
                      onChange={(e) => handleInputChange('monthlyTransactions', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>

                  <div>
                    <label className="block text-body font-medium text-neutral-700 mb-2">
                      Average Transaction Value ($)
                    </label>
                    <input
                      type="number"
                      value={formData.averageTransactionValue}
                      onChange={(e) => handleInputChange('averageTransactionValue', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="250"
                    />
                  </div>

                  <div>
                    <label className="block text-body font-medium text-neutral-700 mb-2">
                      Current Weekly Reconciliation Time (hours)
                    </label>
                    <input
                      type="number"
                      value={formData.currentReconciliationTime}
                      onChange={(e) => handleInputChange('currentReconciliationTime', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="8"
                    />
                  </div>

                  <div>
                    <label className="block text-body font-medium text-neutral-700 mb-2">
                      Staff Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      value={formData.staffHourlyRate}
                      onChange={(e) => handleInputChange('staffHourlyRate', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-body font-medium text-neutral-700 mb-2">
                      Current Match Rate (%)
                    </label>
                    <input
                      type="number"
                      value={formData.currentMatchRate}
                      onChange={(e) => handleInputChange('currentMatchRate', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="85"
                    />
                  </div>

                  <div>
                    <label className="block text-body font-medium text-neutral-700 mb-2">
                      Monthly Revenue ($)
                    </label>
                    <input
                      type="number"
                      value={formData.monthlyRevenue}
                      onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="125000"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="space-y-6">
              {results && (
                <>
                  {/* Summary Card */}
                  <div className="info-card">
                    <h3 className="text-title-medium text-brand-primary mb-6">
                      Your Potential Savings
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-emerald-50 rounded-lg">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">
                          ${results.savings.netAnnual.toLocaleString()}
                        </div>
                        <div className="text-body-small text-emerald-700">Annual Net Savings</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {results.roi.percentage.toFixed(0)}%
                        </div>
                        <div className="text-body-small text-blue-700">ROI</div>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg mb-6">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {results.roi.paybackMonths.toFixed(1)} months
                      </div>
                      <div className="text-body-small text-purple-700">Payback Period</div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="info-card">
                    <h4 className="text-title-medium text-brand-primary mb-4">
                      Monthly Savings Breakdown
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <span className="text-body text-neutral-700">Time Savings</span>
                        <span className="font-bold text-emerald-600">${results.savings.time.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <span className="text-body text-neutral-700">Revenue Recovery</span>
                        <span className="font-bold text-blue-600">${results.savings.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <span className="text-body text-neutral-700">MedSpaSync Pro Cost</span>
                        <span className="font-bold text-red-600">-$299</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                        <span className="text-body font-medium text-emerald-700">Net Monthly Savings</span>
                        <span className="font-bold text-emerald-600">${results.savings.net.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Savings */}
                  <div className="info-card">
                    <h4 className="text-title-medium text-brand-primary mb-4">
                      Time Savings
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {results.time.weekly}h
                        </div>
                        <div className="text-body-small text-neutral-600">Per Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {results.time.monthly}h
                        </div>
                        <div className="text-body-small text-neutral-600">Per Month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">
                          {results.time.annual}h
                        </div>
                        <div className="text-body-small text-neutral-600">Per Year</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="info-card max-w-2xl mx-auto">
              <h3 className="text-title-large text-brand-primary mb-4">
                Ready to Start Saving?
              </h3>
              <p className="text-body text-neutral-600 mb-6">
                Join hundreds of medical spas already saving time and money with AI-powered reconciliation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="large"
                  className="bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700"
                >
                  Start Your Free Trial
                </Button>
                <Button 
                  variant="secondary" 
                  size="large"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator; 