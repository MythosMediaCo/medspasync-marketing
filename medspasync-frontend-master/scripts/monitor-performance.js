const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      buildTimes: [],
      testTimes: [],
      memoryUsage: [],
      cpuUsage: [],
      diskUsage: []
    };
    this.startTime = Date.now();
    this.monitoringInterval = null;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  getSystemMetrics() {
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    
    return {
      memory: {
        rss: Math.round(memUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024),
        total: Math.round(totalMem / 1024 / 1024),
        free: Math.round(freeMem / 1024 / 1024),
        usagePercent: Math.round(((totalMem - freeMem) / totalMem) * 100)
      },
      cpu: {
        user: Math.round(cpuUsage.user / 1000),
        system: Math.round(cpuUsage.system / 1000),
        loadAverage: os.loadavg()
      },
      uptime: process.uptime(),
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version
    };
  }

  measureBuildTime(buildCommand) {
    const startTime = Date.now();
    
    try {
      this.log(`Starting build: ${buildCommand}`);
      execSync(buildCommand, { stdio: 'inherit' });
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      this.metrics.buildTimes.push({
        command: buildCommand,
        duration,
        timestamp: new Date().toISOString(),
        success: true
      });
      
      this.log(`Build completed in ${duration}ms`);
      return duration;
      
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      this.metrics.buildTimes.push({
        command: buildCommand,
        duration,
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message
      });
      
      this.log(`Build failed after ${duration}ms: ${error.message}`);
      throw error;
    }
  }

  measureTestTime(testCommand) {
    const startTime = Date.now();
    
    try {
      this.log(`Starting tests: ${testCommand}`);
      execSync(testCommand, { stdio: 'inherit' });
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      this.metrics.testTimes.push({
        command: testCommand,
        duration,
        timestamp: new Date().toISOString(),
        success: true
      });
      
      this.log(`Tests completed in ${duration}ms`);
      return duration;
      
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      this.metrics.testTimes.push({
        command: testCommand,
        duration,
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message
      });
      
      this.log(`Tests failed after ${duration}ms: ${error.message}`);
      throw error;
    }
  }

  startContinuousMonitoring(intervalMs = 5000) {
    this.log(`Starting continuous monitoring every ${intervalMs}ms`);
    
    this.monitoringInterval = setInterval(() => {
      const metrics = this.getSystemMetrics();
      this.metrics.memoryUsage.push({
        ...metrics.memory,
        timestamp: new Date().toISOString()
      });
      
      this.metrics.cpuUsage.push({
        ...metrics.cpu,
        timestamp: new Date().toISOString()
      });
      
      // Log current metrics
      this.log(`Memory: ${metrics.memory.usagePercent}% used (${metrics.memory.heapUsed}MB heap)`);
      this.log(`CPU Load: ${metrics.cpu.loadAverage.map(l => l.toFixed(2)).join(', ')}`);
      
    }, intervalMs);
  }

  stopContinuousMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      this.log('Continuous monitoring stopped');
    }
  }

  analyzePerformance() {
    const analysis = {
      timestamp: new Date().toISOString(),
      totalRuntime: Date.now() - this.startTime,
      buildAnalysis: this.analyzeBuildTimes(),
      testAnalysis: this.analyzeTestTimes(),
      memoryAnalysis: this.analyzeMemoryUsage(),
      cpuAnalysis: this.analyzeCpuUsage(),
      recommendations: this.generateRecommendations()
    };
    
    return analysis;
  }

  analyzeBuildTimes() {
    if (this.metrics.buildTimes.length === 0) {
      return { message: 'No build metrics available' };
    }
    
    const successfulBuilds = this.metrics.buildTimes.filter(b => b.success);
    const failedBuilds = this.metrics.buildTimes.filter(b => !b.success);
    
    if (successfulBuilds.length === 0) {
      return { message: 'No successful builds recorded' };
    }
    
    const durations = successfulBuilds.map(b => b.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    
    return {
      totalBuilds: this.metrics.buildTimes.length,
      successfulBuilds: successfulBuilds.length,
      failedBuilds: failedBuilds.length,
      successRate: (successfulBuilds.length / this.metrics.buildTimes.length) * 100,
      averageDuration: Math.round(avgDuration),
      minDuration: Math.round(minDuration),
      maxDuration: Math.round(maxDuration),
      recentBuilds: this.metrics.buildTimes.slice(-5)
    };
  }

  analyzeTestTimes() {
    if (this.metrics.testTimes.length === 0) {
      return { message: 'No test metrics available' };
    }
    
    const successfulTests = this.metrics.testTimes.filter(t => t.success);
    const failedTests = this.metrics.testTimes.filter(t => !t.success);
    
    if (successfulTests.length === 0) {
      return { message: 'No successful tests recorded' };
    }
    
    const durations = successfulTests.map(t => t.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    
    return {
      totalTests: this.metrics.testTimes.length,
      successfulTests: successfulTests.length,
      failedTests: failedTests.length,
      successRate: (successfulTests.length / this.metrics.testTimes.length) * 100,
      averageDuration: Math.round(avgDuration),
      minDuration: Math.round(minDuration),
      maxDuration: Math.round(maxDuration),
      recentTests: this.metrics.testTimes.slice(-5)
    };
  }

  analyzeMemoryUsage() {
    if (this.metrics.memoryUsage.length === 0) {
      return { message: 'No memory metrics available' };
    }
    
    const usagePercentages = this.metrics.memoryUsage.map(m => m.usagePercent);
    const heapUsage = this.metrics.memoryUsage.map(m => m.heapUsed);
    
    return {
      samples: this.metrics.memoryUsage.length,
      averageMemoryUsage: Math.round(usagePercentages.reduce((a, b) => a + b, 0) / usagePercentages.length),
      maxMemoryUsage: Math.max(...usagePercentages),
      minMemoryUsage: Math.min(...usagePercentages),
      averageHeapUsage: Math.round(heapUsage.reduce((a, b) => a + b, 0) / heapUsage.length),
      maxHeapUsage: Math.max(...heapUsage),
      memoryTrend: this.calculateTrend(usagePercentages)
    };
  }

  analyzeCpuUsage() {
    if (this.metrics.cpuUsage.length === 0) {
      return { message: 'No CPU metrics available' };
    }
    
    const loadAverages = this.metrics.cpuUsage.map(c => c.loadAverage[0]); // 1-minute load average
    
    return {
      samples: this.metrics.cpuUsage.length,
      averageLoad: Math.round(loadAverages.reduce((a, b) => a + b, 0) / loadAverages.length * 100) / 100,
      maxLoad: Math.max(...loadAverages),
      minLoad: Math.min(...loadAverages),
      loadTrend: this.calculateTrend(loadAverages)
    };
  }

  calculateTrend(values) {
    if (values.length < 2) return 'insufficient_data';
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const change = ((secondAvg - firstAvg) / firstAvg) * 100;
    
    if (change > 5) return 'increasing';
    if (change < -5) return 'decreasing';
    return 'stable';
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Build performance recommendations
    const buildAnalysis = this.analyzeBuildTimes();
    if (buildAnalysis.averageDuration > 30000) {
      recommendations.push('Consider implementing incremental builds to reduce build time');
    }
    if (buildAnalysis.successRate < 90) {
      recommendations.push('Investigate build failures to improve success rate');
    }
    
    // Test performance recommendations
    const testAnalysis = this.analyzeTestTimes();
    if (testAnalysis.averageDuration > 10000) {
      recommendations.push('Consider parallel test execution to reduce test time');
    }
    if (testAnalysis.successRate < 95) {
      recommendations.push('Fix failing tests to improve test reliability');
    }
    
    // Memory recommendations
    const memoryAnalysis = this.analyzeMemoryUsage();
    if (memoryAnalysis.averageMemoryUsage > 80) {
      recommendations.push('High memory usage detected - consider memory optimization');
    }
    if (memoryAnalysis.memoryTrend === 'increasing') {
      recommendations.push('Memory usage is trending upward - investigate for memory leaks');
    }
    
    // CPU recommendations
    const cpuAnalysis = this.analyzeCpuUsage();
    if (cpuAnalysis.averageLoad > 2) {
      recommendations.push('High CPU load detected - consider using more CPU cores');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Performance metrics look good - continue monitoring');
    }
    
    return recommendations;
  }

  generateReport() {
    const analysis = this.analyzePerformance();
    const report = {
      ...analysis,
      rawMetrics: this.metrics
    };
    
    const reportPath = path.join(process.cwd(), 'performance-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log(`Performance report saved to ${reportPath}`);
    
    return report;
  }

  async runPerformanceMonitoring() {
    this.log('Starting performance monitoring...');
    
    try {
      // Start continuous monitoring
      this.startContinuousMonitoring();
      
      // Run some performance tests
      await this.runPerformanceTests();
      
      // Stop monitoring and generate report
      this.stopContinuousMonitoring();
      const report = this.generateReport();
      
      this.log('Performance monitoring completed');
      return report;
      
    } catch (error) {
      this.log(`Error during performance monitoring: ${error.message}`);
      this.stopContinuousMonitoring();
      throw error;
    }
  }

  async runPerformanceTests() {
    this.log('Running performance tests...');
    
    // Test build performance
    try {
      this.measureBuildTime('npm run build:incremental');
    } catch (error) {
      this.log('Build test failed, skipping...');
    }
    
    // Test test performance
    try {
      this.measureTestTime('npm run test:fast');
    } catch (error) {
      this.log('Test performance test failed, skipping...');
    }
    
    // Wait for some monitoring data
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
}

// Run monitoring if called directly
if (require.main === module) {
  const monitor = new PerformanceMonitor();
  monitor.runPerformanceMonitoring()
    .then(report => {
      console.log('Performance monitoring completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Performance monitoring failed:', error);
      process.exit(1);
    });
}

module.exports = PerformanceMonitor; 