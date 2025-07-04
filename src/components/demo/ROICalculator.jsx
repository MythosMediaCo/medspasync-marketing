import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import './ROICalculator.css';

// Placeholder for a charting library component
const ChartPlaceholder = ({ title }) => (
  <div className="chart-placeholder">
    <p>{title}</p>
  </div>
);

// Reusable Slider Component
const Slider = ({ label, value, onChange, min, max, step, format }) => (
    <div className="slider-container">
        <label>{label}: {format(value)}</label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
        />
    </div>
);

const ROICalculator = () => {
  const [formData, setFormData] = useState({
    monthlyRevenue: 50000,
    monthlyBotoxValue: 15000,
    monthlyFillerValue: 10000,
    treatmentRooms: 3,
    monthlyTransactions: 300,
    currentInventoryMethod: 'manual',
    staffReconciliationHours: 8,
    currentWastePercentage: 8,
    practiceType: 'independent',
    locationCount: 1
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Calculate ROI and savings
  const calculateROI = () => {
    const {
      monthlyRevenue,
      monthlyBotoxValue,
      monthlyFillerValue,
      treatmentRooms,
      monthlyTransactions,
      currentInventoryMethod,
      staffReconciliationHours,
      currentWastePercentage,
      practiceType,
      locationCount
    } = formData;

    // Base calculations
    const totalInventoryValue = monthlyBotoxValue + monthlyFillerValue;
    const currentMonthlyWaste = (totalInventoryValue * currentWastePercentage) / 100;
    const staffCostPerHour = 25; // Average medical spa staff cost
    const monthlyStaffCost = staffReconciliationHours * staffCostPerHour * 4; // 4 weeks

    // MedSpaSync Pro benefits
    const wasteReduction = currentMonthlyWaste * 0.85; // 85% reduction
    const staffTimeSavings = staffReconciliationHours * 0.6 * staffCostPerHour * 4; // 60% time savings
    const efficiencyGains = (monthlyRevenue * 0.15) / 12; // 15% operational efficiency
    const reconciliationAccuracy = (monthlyTransactions * 0.05 * 150); // 5% error reduction at $150 avg transaction

    const totalMonthlySavings = wasteReduction + staffTimeSavings + efficiencyGains + reconciliationAccuracy;
    const annualSavings = totalMonthlySavings * 12;

    // ROI calculations
    const monthlyCost = practiceType === 'independent' ? 299 : practiceType === 'professional' ? 499 : 799;
    const annualCost = monthlyCost * 12;
    const roiPercentage = ((annualSavings - annualCost) / annualCost) * 100;
    const paybackMonths = annualCost / totalMonthlySavings;

    // Break down savings by category
    const savingsBreakdown = [
      { name: 'Inventory Waste Prevention', value: wasteReduction, color: '#FF6B6B' },
      { name: 'Staff Time Savings', value: staffTimeSavings, color: '#4ECDC4' },
      { name: 'Operational Efficiency', value: efficiencyGains, color: '#45B7D1' },
      { name: 'Reconciliation Accuracy', value: reconciliationAccuracy, color: '#96CEB4' }
    ];

    // Monthly savings projection
    const monthlyProjection = [];
    for (let i = 1; i <= 12; i++) {
      monthlyProjection.push({
        month: `Month ${i}`,
        cumulativeSavings: totalMonthlySavings * i,
        cumulativeCost: monthlyCost * i,
        netBenefit: (totalMonthlySavings * i) - (monthlyCost * i)
      });
    }

    // Competitive advantage metrics
    const competitiveAdvantages = [
      {
        metric: 'vs. Manual Management',
        improvement: '85%',
        description: 'Waste reduction through AI prediction'
      },
      {
        metric: 'vs. General Spa Software',
        improvement: '60%',
        description: 'Time savings through specialized reconciliation'
      },
      {
        metric: 'vs. Traditional Methods',
        improvement: '15%',
        description: 'Operational cost reduction'
      }
    ];

    setResults({
      totalMonthlySavings,
      annualSavings,
      roiPercentage,
      paybackMonths,
      savingsBreakdown,
      monthlyProjection,
      competitiveAdvantages,
      recommendedPlan: practiceType === 'independent' ? 'Core' : practiceType === 'professional' ? 'Professional' : 'Enterprise'
    });
  };

  useEffect(() => {
    calculateROI();
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleCalculate = () => {
    setShowResults(true);
    calculateROI();
  };

  const handleReset = () => {
    setFormData({
      monthlyRevenue: 50000,
      monthlyBotoxValue: 15000,
      monthlyFillerValue: 10000,
      treatmentRooms: 3,
      monthlyTransactions: 300,
      currentInventoryMethod: 'manual',
      staffReconciliationHours: 8,
      currentWastePercentage: 8,
      practiceType: 'independent',
      locationCount: 1
    });
    setShowResults(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Calculate Your Monthly Savings
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          See exactly how much money you're losing to inventory waste and how MedSpaSync Pro can help you 
          capture your share of the $87.86B medical spa market opportunity.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Practice Information</h2>
          
          <div className="space-y-6">
            {/* Practice Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Practice Type
              </label>
              <select
                value={formData.practiceType}
                onChange={(e) => handleInputChange('practiceType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="independent">Independent Medical Spa (1-3 locations)</option>
                <option value="professional">Professional Practice (4-10 locations)</option>
                <option value="enterprise">Enterprise Chain (10+ locations)</option>
              </select>
            </div>

            {/* Monthly Revenue */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Revenue
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.monthlyRevenue}
                  onChange={(e) => handleInputChange('monthlyRevenue', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="50000"
                />
              </div>
            </div>

            {/* Inventory Values */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Botox Inventory Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.monthlyBotoxValue}
                    onChange={(e) => handleInputChange('monthlyBotoxValue', parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="15000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Monthly Filler Inventory Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.monthlyFillerValue}
                    onChange={(e) => handleInputChange('monthlyFillerValue', parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>

            {/* Current Waste Percentage */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Monthly Inventory Waste Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.currentWastePercentage}
                  onChange={(e) => handleInputChange('currentWastePercentage', parseFloat(e.target.value) || 0)}
                  className="w-full pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="8"
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Industry average is 8-12% for medical spas
              </p>
            </div>

            {/* Staff Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weekly Hours Spent on Reconciliation
              </label>
              <input
                type="number"
                value={formData.staffReconciliationHours}
                onChange={(e) => handleInputChange('staffReconciliationHours', parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="8"
              />
            </div>

            {/* Monthly Transactions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Transaction Volume
              </label>
              <input
                type="number"
                value={formData.monthlyTransactions}
                onChange={(e) => handleInputChange('monthlyTransactions', parseInt(e.target.value) || 0)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="300"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                Calculate My Savings
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Display */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {!showResults ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">$</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your Savings Calculator
              </h3>
              <p className="text-gray-600">
                Fill in your practice information and click "Calculate My Savings" to see your potential ROI.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Key Results */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Potential Savings</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(results.totalMonthlySavings)}
                    </div>
                    <div className="text-sm text-green-700">Monthly Savings</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.annualSavings)}
                    </div>
                    <div className="text-sm text-blue-700">Annual Savings</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">
                      {results.roiPercentage.toFixed(0)}%
                    </div>
                    <div className="text-sm text-purple-700">ROI</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">
                      {results.paybackMonths.toFixed(1)} mo
                    </div>
                    <div className="text-sm text-orange-700">Payback Period</div>
                  </div>
                </div>
              </div>

              {/* Savings Breakdown Chart */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Savings Breakdown</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.savingsBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {results.savingsBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Projection Chart */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">12-Month Projection</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.monthlyProjection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="cumulativeSavings" stroke="#00C49F" strokeWidth={2} name="Cumulative Savings" />
                      <Line type="monotone" dataKey="cumulativeCost" stroke="#FF6B6B" strokeWidth={2} name="Cumulative Cost" />
                      <Line type="monotone" dataKey="netBenefit" stroke="#4ECDC4" strokeWidth={2} name="Net Benefit" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Competitive Advantages */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Competitive Advantages</h4>
                <div className="space-y-3">
                  {results.competitiveAdvantages.map((advantage, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold text-gray-900">{advantage.metric}</div>
                        <div className="text-sm text-gray-600">{advantage.description}</div>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{advantage.improvement}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Plan */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Recommended Plan</h4>
                <div className="text-2xl font-bold text-indigo-600 mb-2">{results.recommendedPlan}</div>
                <p className="text-gray-600 mb-4">
                  Based on your practice size and requirements, we recommend the {results.recommendedPlan} plan 
                  for optimal ROI and feature alignment.
                </p>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
                  Start Free Trial
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Industry Context */}
      <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Industry Context</h3>
          <p className="text-lg mb-6">
            Independent medical spas lose an average of $600-$2,000 monthly to inventory waste and reconciliation errors. 
            MedSpaSync Pro helps you capture your share of the $87.86B market opportunity.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">$87.86B</div>
              <div className="text-sm">Medical Spa Market by 2034</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">47%</div>
              <div className="text-sm">AI Adoption CAGR in Beauty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">90%</div>
              <div className="text-sm">Independent Spa Market Share</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
