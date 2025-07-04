import { api } from './api.js';

class DemoDataManager {
  constructor() {
    this.demoDataCache = new Map();
    this.practiceSizes = {
      small: { locations: 1, monthlyRevenue: 75000, staffCount: 3, transactions: 150 },
      medium: { locations: 3, monthlyRevenue: 250000, staffCount: 8, transactions: 500 },
      large: { locations: 6, monthlyRevenue: 750000, staffCount: 15, transactions: 1200 }
    };
  }

  /**
   * Generate realistic demo data based on practice size
   */
  async generateDemoData(practiceSize = 'medium') {
    const cacheKey = `demo_${practiceSize}`;
    
    if (this.demoDataCache.has(cacheKey)) {
      return this.demoDataCache.get(cacheKey);
    }

    const config = this.practiceSizes[practiceSize];
    const demoData = {
      summary: {
        practiceSize,
        locations: config.locations,
        monthlyRevenue: config.monthlyRevenue,
        staffCount: config.staffCount,
        transactions: config.transactions,
        generatedAt: new Date().toISOString()
      },
      sampleData: this.generateSampleTransactions(config),
      reconciliationHistory: this.generateReconciliationHistory(config),
      performanceMetrics: this.generatePerformanceMetrics(config)
    };

    this.demoDataCache.set(cacheKey, demoData);
    return demoData;
  }

  /**
   * Generate sample transaction data
   */
  generateSampleTransactions(config) {
    const services = [
      'Botox Treatment', 'Dermal Fillers', 'Chemical Peel', 'Microdermabrasion',
      'Laser Hair Removal', 'IPL Treatment', 'HydraFacial', 'Microneedling',
      'CoolSculpting', 'Ultherapy', 'Consultation', 'Follow-up'
    ];

    const statuses = ['completed', 'pending', 'cancelled', 'no-show'];
    const locations = Array.from({ length: config.locations }, (_, i) => `Location ${i + 1}`);

    const transactions = [];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    for (let i = 0; i < Math.min(config.transactions, 50); i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + Math.floor(Math.random() * 30));
      
      const service = services[Math.floor(Math.random() * services.length)];
      const amount = this.generateServiceAmount(service);
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];

      transactions.push({
        id: `TXN-${String(i + 1).padStart(4, '0')}`,
        date: date.toISOString().split('T')[0],
        service,
        amount: amount.toFixed(2),
        status,
        location,
        clientId: `CLIENT-${Math.floor(Math.random() * 1000) + 1}`,
        provider: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]}`
      });
    }

    return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * Generate service amounts based on service type
   */
  generateServiceAmount(service) {
    const servicePricing = {
      'Botox Treatment': { min: 300, max: 800 },
      'Dermal Fillers': { min: 500, max: 1500 },
      'Chemical Peel': { min: 150, max: 400 },
      'Microdermabrasion': { min: 100, max: 250 },
      'Laser Hair Removal': { min: 200, max: 600 },
      'IPL Treatment': { min: 250, max: 700 },
      'HydraFacial': { min: 150, max: 350 },
      'Microneedling': { min: 300, max: 800 },
      'CoolSculpting': { min: 1000, max: 3000 },
      'Ultherapy': { min: 2000, max: 5000 },
      'Consultation': { min: 50, max: 150 },
      'Follow-up': { min: 25, max: 100 }
    };

    const pricing = servicePricing[service] || { min: 100, max: 500 };
    return Math.floor(Math.random() * (pricing.max - pricing.min + 1)) + pricing.min;
  }

  /**
   * Generate reconciliation history
   */
  generateReconciliationHistory(config) {
    const history = [];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);

    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + (i * 7));
      
      const baseDiscrepancies = Math.floor(config.transactions * 0.05); // 5% base discrepancy rate
      const discrepancies = Math.floor(baseDiscrepancies * (0.8 + Math.random() * 0.4)); // ±20% variance
      const accuracy = Math.max(85, 100 - (discrepancies / config.transactions * 100));
      
      history.push({
        date: date.toISOString().split('T')[0],
        transactionsProcessed: config.transactions,
        discrepanciesFound: discrepancies,
        accuracyRate: accuracy.toFixed(1),
        timeSaved: Math.floor(config.staffCount * 2 * (0.8 + Math.random() * 0.4)),
        revenueRecovered: Math.floor(discrepancies * 50 * (0.8 + Math.random() * 0.4))
      });
    }

    return history.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * Generate performance metrics
   */
  generatePerformanceMetrics(config) {
    const avgTransactionValue = config.monthlyRevenue / config.transactions;
    const monthlySavings = config.staffCount * 25 * 10; // 10 hours saved per staff member at $25/hr
    
    return {
      averageTransactionValue: avgTransactionValue.toFixed(2),
      monthlySavings: monthlySavings,
      annualSavings: monthlySavings * 12,
      timeSavedPerMonth: config.staffCount * 10,
      accuracyImprovement: 15.3,
      revenueRecoveryRate: 2.1,
      customerSatisfaction: 4.8,
      processingSpeed: '2.3x faster'
    };
  }

  /**
   * Process uploaded file and generate reconciliation results
   */
  async processUploadedFile(file, practiceSize) {
    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, this would parse the actual file
      // For demo purposes, we'll generate mock results based on practice size
      const config = this.practiceSizes[practiceSize];
      
      return this.generateReconciliationResults(config, file.name);
    } catch (error) {
      console.error('Error processing uploaded file:', error);
      throw new Error('Failed to process uploaded file');
    }
  }

  /**
   * Process demo data and generate reconciliation results
   */
  async processDemoData(demoData) {
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const config = this.practiceSizes[demoData.summary.practiceSize];
      return this.generateReconciliationResults(config);
    } catch (error) {
      console.error('Error processing demo data:', error);
      throw new Error('Failed to process demo data');
    }
  }

  /**
   * Generate reconciliation results
   */
  generateReconciliationResults(config, fileName = null) {
    const baseDiscrepancies = Math.floor(config.transactions * 0.08); // 8% discrepancy rate
    const discrepancies = Math.floor(baseDiscrepancies * (0.7 + Math.random() * 0.6)); // ±30% variance
    const accuracy = Math.max(90, 100 - (discrepancies / config.transactions * 100));
    
    const discrepancyTypes = [
      { type: 'Duplicate Transactions', count: Math.floor(discrepancies * 0.3), value: 1200, impact: 'medium' },
      { type: 'Missing Payments', count: Math.floor(discrepancies * 0.25), value: 1800, impact: 'high' },
      { type: 'Incorrect Amounts', count: Math.floor(discrepancies * 0.2), value: 900, impact: 'medium' },
      { type: 'Wrong Service Codes', count: Math.floor(discrepancies * 0.15), value: 600, impact: 'low' },
      { type: 'Date Mismatches', count: Math.floor(discrepancies * 0.1), value: 300, impact: 'low' }
    ];

    const totalValue = discrepancyTypes.reduce((sum, type) => sum + type.value, 0);
    const timeSaved = Math.floor(config.staffCount * 12 * (0.8 + Math.random() * 0.4)); // 12 hours per staff member

    return {
      accuracy: accuracy.toFixed(1),
      discrepancies: discrepancies,
      potentialSavings: totalValue,
      timeSaved: timeSaved,
      processedAt: new Date().toISOString(),
      fileName: fileName,
      discrepancyDetails: discrepancyTypes,
      processingTime: '1.8 seconds',
      confidence: '94.7%',
      recommendations: this.generateRecommendations(discrepancies, totalValue)
    };
  }

  /**
   * Generate insights based on reconciliation results
   */
  async generateInsights(results) {
    const insights = [];

    if (results.discrepancies > 10) {
      insights.push({
        title: 'High Discrepancy Rate Detected',
        description: `Found ${results.discrepancies} discrepancies in your data. This suggests potential issues with your current reconciliation process.`,
        priority: 'high',
        action: 'Review reconciliation procedures'
      });
    }

    if (results.potentialSavings > 2000) {
      insights.push({
        title: 'Significant Revenue Recovery Opportunity',
        description: `Potential to recover $${results.potentialSavings.toLocaleString()} in lost revenue through improved reconciliation.`,
        priority: 'high',
        action: 'Implement automated reconciliation'
      });
    }

    if (results.timeSaved > 20) {
      insights.push({
        title: 'Major Time Savings Available',
        description: `Could save ${results.timeSaved} hours per month by automating reconciliation processes.`,
        priority: 'medium',
        action: 'Automate manual processes'
      });
    }

    insights.push({
      title: 'Data Quality Improvement Needed',
      description: 'Several data quality issues detected that could be resolved with better input validation.',
      priority: 'medium',
      action: 'Implement data validation'
    });

    insights.push({
      title: 'Process Optimization Opportunity',
      description: 'Current reconciliation process can be optimized for better accuracy and efficiency.',
      priority: 'low',
      action: 'Review workflow optimization'
    });

    return insights;
  }

  /**
   * Calculate ROI based on reconciliation results and practice size
   */
  async calculateROI(results, practiceSize) {
    const config = this.practiceSizes[practiceSize];
    const monthlyCost = 150 * config.locations; // $150 per location
    
    // Calculate value components
    const timeSavings = results.timeSaved * 25; // $25 per hour
    const revenueRecovery = results.potentialSavings;
    const efficiencyGains = config.monthlyRevenue * 0.02; // 2% efficiency improvement
    
    const totalValue = timeSavings + revenueRecovery + efficiencyGains;
    const netBenefit = totalValue - monthlyCost;
    const roi = (netBenefit / monthlyCost) * 100;
    const paybackPeriod = monthlyCost > 0 ? (monthlyCost / netBenefit) * 12 : 0;

    return {
      monthlyCost,
      monthlySavings: totalValue,
      netBenefit,
      roi: roi.toFixed(0),
      paybackPeriod: paybackPeriod > 0 ? paybackPeriod.toFixed(1) : 'Immediate',
      timeSavings,
      revenueRecovery,
      efficiencyGains,
      totalValue
    };
  }

  /**
   * Generate recommendations based on results
   */
  generateRecommendations(discrepancies, potentialSavings) {
    const recommendations = [];

    if (discrepancies > 15) {
      recommendations.push({
        type: 'immediate',
        title: 'Implement Automated Reconciliation',
        description: 'High discrepancy rate indicates need for automated reconciliation system.',
        impact: 'high',
        effort: 'medium'
      });
    }

    if (potentialSavings > 1500) {
      recommendations.push({
        type: 'high-priority',
        title: 'Review Payment Processing',
        description: 'Significant revenue recovery opportunity suggests payment processing issues.',
        impact: 'high',
        effort: 'low'
      });
    }

    recommendations.push({
      type: 'ongoing',
      title: 'Regular Data Quality Audits',
      description: 'Implement regular audits to maintain data quality and prevent future discrepancies.',
      impact: 'medium',
      effort: 'low'
    });

    return recommendations;
  }

  /**
   * Get demo data statistics
   */
  getDemoStats(practiceSize) {
    const config = this.practiceSizes[practiceSize];
    return {
      totalTransactions: config.transactions,
      averageRevenue: config.monthlyRevenue,
      staffCount: config.staffCount,
      locations: config.locations,
      typicalDiscrepancies: Math.floor(config.transactions * 0.08),
      typicalSavings: config.staffCount * 25 * 10
    };
  }

  /**
   * Clear demo data cache
   */
  clearCache() {
    this.demoDataCache.clear();
  }

  /**
   * Export demo data for testing
   */
  exportDemoData(practiceSize) {
    const data = this.generateDemoData(practiceSize);
    const csvContent = this.convertToCSV(data.sampleData);
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medspasync-demo-${practiceSize}-data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Convert data to CSV format
   */
  convertToCSV(data) {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }
}

// Create singleton instance
const demoDataManager = new DemoDataManager();

export default demoDataManager; 