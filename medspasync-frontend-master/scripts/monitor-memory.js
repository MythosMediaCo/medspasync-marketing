const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class MemoryMonitor {
  constructor() {
    this.memoryLog = [];
    this.monitoringInterval = null;
    this.startTime = Date.now();
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  getMemoryUsage() {
    const memUsage = process.memoryUsage();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    
    return {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024),
      total: Math.round(totalMem / 1024 / 1024),
      free: Math.round(freeMem / 1024 / 1024),
      usagePercent: Math.round(((totalMem - freeMem) / totalMem) * 100)
    };
  }

  startMonitoring(intervalMs = 5000) {
    this.log(`Starting memory monitoring every ${intervalMs}ms`);
    
    this.monitoringInterval = setInterval(() => {
      const memory = this.getMemoryUsage();
      this.memoryLog.push({
        ...memory,
        timestamp: new Date().toISOString()
      });
      
      this.log(`Memory: ${memory.usagePercent}% used (${memory.heapUsed}MB heap, ${memory.rss}MB RSS)`);
      
      // Alert if memory usage is high
      if (memory.usagePercent > 80) {
        this.log(`⚠️  HIGH MEMORY USAGE: ${memory.usagePercent}%`);
      }
      
      if (memory.heapUsed > 1000) {
        this.log(`⚠️  HIGH HEAP USAGE: ${memory.heapUsed}MB`);
      }
      
    }, intervalMs);
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
      this.log('Memory monitoring stopped');
    }
  }

  generateMemoryReport() {
    if (this.memoryLog.length === 0) {
      return { message: 'No memory data collected' };
    }
    
    const usagePercentages = this.memoryLog.map(m => m.usagePercent);
    const heapUsage = this.memoryLog.map(m => m.heapUsed);
    const rssUsage = this.memoryLog.map(m => m.rss);
    
    return {
      timestamp: new Date().toISOString(),
      totalRuntime: Date.now() - this.startTime,
      samples: this.memoryLog.length,
      averageMemoryUsage: Math.round(usagePercentages.reduce((a, b) => a + b, 0) / usagePercentages.length),
      maxMemoryUsage: Math.max(...usagePercentages),
      minMemoryUsage: Math.min(...usagePercentages),
      averageHeapUsage: Math.round(heapUsage.reduce((a, b) => a + b, 0) / heapUsage.length),
      maxHeapUsage: Math.max(...heapUsage),
      averageRssUsage: Math.round(rssUsage.reduce((a, b) => a + b, 0) / rssUsage.length),
      maxRssUsage: Math.max(...rssUsage),
      memoryTrend: this.calculateTrend(usagePercentages),
      recommendations: this.generateRecommendations(usagePercentages, heapUsage)
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

  generateRecommendations(usagePercentages, heapUsage) {
    const recommendations = [];
    const avgUsage = usagePercentages.reduce((a, b) => a + b, 0) / usagePercentages.length;
    const avgHeap = heapUsage.reduce((a, b) => a + b, 0) / heapUsage.length;
    
    if (avgUsage > 80) {
      recommendations.push('High memory usage detected - consider memory optimization');
    }
    
    if (avgHeap > 1000) {
      recommendations.push('High heap usage detected - investigate for memory leaks');
    }
    
    if (this.calculateTrend(usagePercentages) === 'increasing') {
      recommendations.push('Memory usage is trending upward - check for memory leaks');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Memory usage is within normal ranges');
    }
    
    return recommendations;
  }

  async runMemoryMonitoring() {
    this.log('Starting memory monitoring...');
    
    try {
      this.startMonitoring();
      
      // Monitor for 30 seconds
      await new Promise(resolve => setTimeout(resolve, 30000));
      
      this.stopMonitoring();
      const report = this.generateMemoryReport();
      
      const reportPath = path.join(process.cwd(), 'memory-report.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      this.log(`Memory report saved to ${reportPath}`);
      
      return report;
      
    } catch (error) {
      this.log(`Error during memory monitoring: ${error.message}`);
      this.stopMonitoring();
      throw error;
    }
  }
}

// Run monitoring if called directly
if (require.main === module) {
  const monitor = new MemoryMonitor();
  monitor.runMemoryMonitoring()
    .then(report => {
      console.log('Memory monitoring completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Memory monitoring failed:', error);
      process.exit(1);
    });
}

module.exports = MemoryMonitor; 