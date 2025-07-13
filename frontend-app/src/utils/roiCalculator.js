// ROI Calculator Utility
// Usage: import { calculateROI } from './roiCalculator';

export function calculateROI({ providers, weeklyAppointments, adminHours, avgRevenue }) {
  // Time savings calculation
  const weeklySavings = Math.min(adminHours * 0.75, 20); // Save up to 75% of admin time, max 20 hours
  const hourlyCost = 30; // Average admin hourly cost
  const weeklyTimeSavings = weeklySavings * hourlyCost;
  const monthlyTimeSavings = weeklyTimeSavings * 4.33;
  const annualTimeSavings = monthlyTimeSavings * 12;

  // Efficiency gains
  const additionalAppointments = Math.floor(weeklySavings / 2); // 1 appointment per 2 hours saved
  const weeklyRevenueBump = additionalAppointments * avgRevenue;
  const monthlyRevenueBump = weeklyRevenueBump * 4.33;
  const annualRevenueBump = monthlyRevenueBump * 12;

  // Total savings
  const totalMonthlySavings = monthlyTimeSavings + monthlyRevenueBump;
  const totalAnnualSavings = annualTimeSavings + annualRevenueBump;

  // Software cost
  const monthlyCost = 149;
  const annualCost = monthlyCost * 12;

  // ROI calculation
  const roi = ((totalAnnualSavings - annualCost) / annualCost) * 100;
  const paybackWeeks = (monthlyCost / (totalMonthlySavings / 4.33)).toFixed(1);

  return {
    weeklySavings: weeklySavings.toFixed(1),
    monthlyTimeSavings: monthlyTimeSavings.toFixed(0),
    monthlyRevenueBump: monthlyRevenueBump.toFixed(0),
    totalMonthlySavings: totalMonthlySavings.toFixed(0),
    totalAnnualSavings: totalAnnualSavings.toFixed(0),
    roi: roi.toFixed(0),
    paybackWeeks,
    additionalAppointments
  };
} 