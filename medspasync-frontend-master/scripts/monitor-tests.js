const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestMonitor {
  constructor() {
    this.testResults = [];
    this.coverageData = [];
    this.startTime = Date.now();
  }

  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }

  async runTestSuite(suiteName, testCommand) {
    const startTime = Date.now();
    
    try {
      this.log(`Starting ${suiteName} tests: ${testCommand}`);
      
      const result = execSync(testCommand, { 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const testResult = {
        suite: suiteName,
        command: testCommand,
        duration,
        success: true,
        timestamp: new Date().toISOString(),
        output: result
      };
      
      this.testResults.push(testResult);
      this.log(`${suiteName} tests completed in ${duration}ms`);
      
      return testResult;
      
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const testResult = {
        suite: suiteName,
        command: testCommand,
        duration,
        success: false,
        timestamp: new Date().toISOString(),
        error: error.message,
        output: error.stdout || error.stderr || ''
      };
      
      this.testResults.push(testResult);
      this.log(`${suiteName} tests failed after ${duration}ms: ${error.message}`);
      
      return testResult;
    }
  }

  async runAllTests() {
    const testSuites = [
      {
        name: 'Frontend',
        command: 'cd Z:\\medspasync-frontend && npm run test:fast'
      },
      {
        name: 'Backend',
        command: 'cd Z:\\medspasync-backend && npm run test:fast'
      }
    ];
    
    this.log('Running all test suites...');
    
    for (const suite of testSuites) {
      await this.runTestSuite(suite.name, suite.command);
    }
  }

  collectCoverageData() {
    const coveragePaths = [
      'Z:\\medspasync-frontend\\coverage\\coverage-summary.json',
      'Z:\\medspasync-backend\\coverage\\coverage-summary.json'
    ];
    
    this.log('Collecting coverage data...');
    
    for (const coveragePath of coveragePaths) {
      try {
        if (fs.existsSync(coveragePath)) {
          const coverageData = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
          this.coverageData.push({
            path: coveragePath,
            data: coverageData,
            timestamp: new Date().toISOString()
          });
          this.log(`Coverage data collected from ${coveragePath}`);
        }
      } catch (error) {
        this.log(`Error reading coverage from ${coveragePath}: ${error.message}`);
      }
    }
  }

  analyzeTestPerformance() {
    if (this.testResults.length === 0) {
      return { message: 'No test results available' };
    }
    
    const successfulTests = this.testResults.filter(t => t.success);
    const failedTests = this.testResults.filter(t => !t.success);
    
    if (successfulTests.length === 0) {
      return { message: 'No successful tests recorded' };
    }
    
    const durations = successfulTests.map(t => t.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);
    
    return {
      totalTests: this.testResults.length,
      successfulTests: successfulTests.length,
      failedTests: failedTests.length,
      successRate: (successfulTests.length / this.testResults.length) * 100,
      averageDuration: Math.round(avgDuration),
      minDuration: Math.round(minDuration),
      maxDuration: Math.round(maxDuration),
      totalDuration: Math.round(durations.reduce((a, b) => a + b, 0)),
      recentTests: this.testResults.slice(-5)
    };
  }

  analyzeCoverage() {
    if (this.coverageData.length === 0) {
      return { message: 'No coverage data available' };
    }
    
    const coverageSummary = {
      totalFiles: 0,
      totalLines: 0,
      totalFunctions: 0,
      totalBranches: 0,
      totalStatements: 0,
      coveredLines: 0,
      coveredFunctions: 0,
      coveredBranches: 0,
      coveredStatements: 0
    };
    
    for (const coverage of this.coverageData) {
      if (coverage.data && coverage.data.total) {
        const total = coverage.data.total;
        coverageSummary.totalLines += total.lines.total || 0;
        coverageSummary.totalFunctions += total.functions.total || 0;
        coverageSummary.totalBranches += total.branches.total || 0;
        coverageSummary.totalStatements += total.statements.total || 0;
        coverageSummary.coveredLines += total.lines.covered || 0;
        coverageSummary.coveredFunctions += total.functions.covered || 0;
        coverageSummary.coveredBranches += total.branches.covered || 0;
        coverageSummary.coveredStatements += total.statements.covered || 0;
        coverageSummary.totalFiles += Object.keys(coverage.data).filter(key => key !== 'total').length;
      }
    }
    
    return {
      files: coverageSummary.totalFiles,
      lineCoverage: coverageSummary.totalLines > 0 ? 
        Math.round((coverageSummary.coveredLines / coverageSummary.totalLines) * 100) : 0,
      functionCoverage: coverageSummary.totalFunctions > 0 ? 
        Math.round((coverageSummary.coveredFunctions / coverageSummary.totalFunctions) * 100) : 0,
      branchCoverage: coverageSummary.totalBranches > 0 ? 
        Math.round((coverageSummary.coveredBranches / coverageSummary.totalBranches) * 100) : 0,
      statementCoverage: coverageSummary.totalStatements > 0 ? 
        Math.round((coverageSummary.coveredStatements / coverageSummary.totalStatements) * 100) : 0,
      totalLines: coverageSummary.totalLines,
      totalFunctions: coverageSummary.totalFunctions,
      totalBranches: coverageSummary.totalBranches,
      totalStatements: coverageSummary.totalStatements
    };
  }

  generateRecommendations() {
    const recommendations = [];
    const performance = this.analyzeTestPerformance();
    const coverage = this.analyzeCoverage();
    
    // Performance recommendations
    if (performance.averageDuration > 10000) {
      recommendations.push('Test execution is slow - consider parallel execution');
    }
    
    if (performance.successRate < 95) {
      recommendations.push('Test success rate is low - investigate failing tests');
    }
    
    // Coverage recommendations
    if (coverage.lineCoverage < 90) {
      recommendations.push('Line coverage below 90% - add more tests');
    }
    
    if (coverage.branchCoverage < 90) {
      recommendations.push('Branch coverage below 90% - add edge case tests');
    }
    
    if (coverage.functionCoverage < 90) {
      recommendations.push('Function coverage below 90% - test all functions');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Test performance and coverage look good');
    }
    
    return recommendations;
  }

  generateTestReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalRuntime: Date.now() - this.startTime,
      testPerformance: this.analyzeTestPerformance(),
      coverage: this.analyzeCoverage(),
      recommendations: this.generateRecommendations(),
      rawData: {
        testResults: this.testResults,
        coverageData: this.coverageData
      }
    };
    
    const reportPath = path.join(process.cwd(), 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log(`Test report saved to ${reportPath}`);
    
    return report;
  }

  async runTestMonitoring() {
    this.log('Starting test monitoring...');
    
    try {
      // Run all test suites
      await this.runAllTests();
      
      // Collect coverage data
      this.collectCoverageData();
      
      // Generate report
      const report = this.generateTestReport();
      
      this.log('Test monitoring completed');
      return report;
      
    } catch (error) {
      this.log(`Error during test monitoring: ${error.message}`);
      throw error;
    }
  }
}

// Run monitoring if called directly
if (require.main === module) {
  const monitor = new TestMonitor();
  monitor.runTestMonitoring()
    .then(report => {
      console.log('Test monitoring completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Test monitoring failed:', error);
      process.exit(1);
    });
}

module.exports = TestMonitor; 