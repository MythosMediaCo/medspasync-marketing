#!/usr/bin/env node
/**
 * MedSpaSync Ecosystem Test Script
 * Tests all services: Backend, AI API, and Frontend
 */

const http = require('http');
const https = require('https');

// Configuration
const SERVICES = {
    backend: {
        name: 'Backend Server',
        url: 'http://localhost:5000',
        endpoints: ['/health', '/api/status', '/api/clients']
    },
    aiApi: {
        name: 'AI API Server',
        url: 'http://localhost:8000',
        endpoints: ['/health', '/api/status', '/api/analytics']
    },
    frontend: {
        name: 'Frontend Server',
        url: 'http://localhost:3000',
        endpoints: ['/']
    }
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, endpoint = '') {
    return new Promise((resolve, reject) => {
        const fullUrl = `${url}${endpoint}`;
        const client = url.startsWith('https') ? https : http;
        
        const req = client.get(fullUrl, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({
                        status: res.statusCode,
                        data: jsonData,
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: data,
                        headers: res.headers,
                        isText: true
                    });
                }
            });
        });
        
        req.on('error', (err) => {
            reject(err);
        });
        
        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

async function testService(serviceName, serviceConfig) {
    log(`\n🔍 Testing ${serviceName}...`, 'cyan');
    log(`📍 URL: ${serviceConfig.url}`, 'blue');
    
    const results = {
        service: serviceName,
        url: serviceConfig.url,
        status: 'unknown',
        endpoints: [],
        errors: []
    };
    
    // Test each endpoint
    for (const endpoint of serviceConfig.endpoints) {
        try {
            log(`  Testing ${endpoint}...`, 'yellow');
            const response = await makeRequest(serviceConfig.url, endpoint);
            
            const endpointResult = {
                endpoint: endpoint,
                status: response.status,
                success: response.status >= 200 && response.status < 300,
                response: response.data
            };
            
            results.endpoints.push(endpointResult);
            
            if (endpointResult.success) {
                log(`    ✅ ${endpoint} - ${response.status}`, 'green');
            } else {
                log(`    ⚠️  ${endpoint} - ${response.status}`, 'yellow');
            }
            
        } catch (error) {
            log(`    ❌ ${endpoint} - ${error.message}`, 'red');
            results.endpoints.push({
                endpoint: endpoint,
                status: 'error',
                success: false,
                error: error.message
            });
            results.errors.push(`${endpoint}: ${error.message}`);
        }
    }
    
    // Determine overall service status
    const successfulEndpoints = results.endpoints.filter(ep => ep.success).length;
    const totalEndpoints = results.endpoints.length;
    
    if (successfulEndpoints === totalEndpoints) {
        results.status = 'healthy';
        log(`✅ ${serviceName} is HEALTHY (${successfulEndpoints}/${totalEndpoints} endpoints)`, 'green');
    } else if (successfulEndpoints > 0) {
        results.status = 'partial';
        log(`⚠️  ${serviceName} is PARTIALLY HEALTHY (${successfulEndpoints}/${totalEndpoints} endpoints)`, 'yellow');
    } else {
        results.status = 'unhealthy';
        log(`❌ ${serviceName} is UNHEALTHY (0/${totalEndpoints} endpoints)`, 'red');
    }
    
    return results;
}

async function testIntegration() {
    log(`\n🧪 Testing Integration Between Services...`, 'magenta');
    
    try {
        // Test backend to AI API integration
        log(`  Testing Backend → AI API integration...`, 'yellow');
        const backendResponse = await makeRequest(SERVICES.backend.url, '/api/status');
        
        if (backendResponse.status === 200) {
            log(`    ✅ Backend is responding`, 'green');
            
            // Test AI API
            const aiResponse = await makeRequest(SERVICES.aiApi.url, '/api/status');
            if (aiResponse.status === 200) {
                log(`    ✅ AI API is responding`, 'green');
                log(`    ✅ Integration test passed`, 'green');
            } else {
                log(`    ❌ AI API integration failed`, 'red');
            }
        } else {
            log(`    ❌ Backend integration test failed`, 'red');
        }
        
    } catch (error) {
        log(`    ❌ Integration test error: ${error.message}`, 'red');
    }
}

async function runPerformanceTest() {
    log(`\n⚡ Running Performance Tests...`, 'magenta');
    
    const performanceResults = {};
    
    for (const [serviceName, serviceConfig] of Object.entries(SERVICES)) {
        log(`  Testing ${serviceName} performance...`, 'yellow');
        
        const startTime = Date.now();
        const responseTimes = [];
        
        // Run 5 requests to measure average response time
        for (let i = 0; i < 5; i++) {
            try {
                const requestStart = Date.now();
                await makeRequest(serviceConfig.url, '/health');
                const requestTime = Date.now() - requestStart;
                responseTimes.push(requestTime);
            } catch (error) {
                responseTimes.push(-1); // Error
            }
        }
        
        const totalTime = Date.now() - startTime;
        const avgResponseTime = responseTimes.filter(t => t > 0).reduce((a, b) => a + b, 0) / responseTimes.filter(t => t > 0).length;
        const successRate = (responseTimes.filter(t => t > 0).length / responseTimes.length) * 100;
        
        performanceResults[serviceName] = {
            averageResponseTime: avgResponseTime || 0,
            successRate: successRate,
            totalTime: totalTime,
            requests: responseTimes.length
        };
        
        log(`    Average response time: ${avgResponseTime.toFixed(2)}ms`, 'blue');
        log(`    Success rate: ${successRate.toFixed(1)}%`, 'blue');
    }
    
    return performanceResults;
}

async function main() {
    log(`🚀 MedSpaSync Ecosystem Test Suite`, 'bright');
    log(`=====================================`, 'bright');
    log(`Testing all services for health and functionality`, 'blue');
    
    const startTime = Date.now();
    const results = [];
    
    // Test each service
    for (const [serviceName, serviceConfig] of Object.entries(SERVICES)) {
        const result = await testService(serviceName, serviceConfig);
        results.push(result);
    }
    
    // Test integration
    await testIntegration();
    
    // Run performance tests
    const performanceResults = await runPerformanceTest();
    
    // Generate summary
    const totalTime = Date.now() - startTime;
    
    log(`\n📊 Test Summary`, 'bright');
    log(`===============`, 'bright');
    
    let healthyServices = 0;
    let totalEndpoints = 0;
    let successfulEndpoints = 0;
    
    for (const result of results) {
        const serviceEndpoints = result.endpoints.filter(ep => ep.success).length;
        const totalServiceEndpoints = result.endpoints.length;
        
        if (result.status === 'healthy') healthyServices++;
        successfulEndpoints += serviceEndpoints;
        totalEndpoints += totalServiceEndpoints;
        
        log(`${result.status === 'healthy' ? '✅' : result.status === 'partial' ? '⚠️' : '❌'} ${result.service}: ${serviceEndpoints}/${totalServiceEndpoints} endpoints`, 
             result.status === 'healthy' ? 'green' : result.status === 'partial' ? 'yellow' : 'red');
    }
    
    log(`\n📈 Performance Summary:`, 'bright');
    for (const [serviceName, perf] of Object.entries(performanceResults)) {
        log(`  ${serviceName}: ${perf.averageResponseTime.toFixed(2)}ms avg, ${perf.successRate.toFixed(1)}% success`, 'blue');
    }
    
    log(`\n🎯 Overall Results:`, 'bright');
    log(`  Services: ${healthyServices}/${results.length} healthy`, healthyServices === results.length ? 'green' : 'yellow');
    log(`  Endpoints: ${successfulEndpoints}/${totalEndpoints} successful`, successfulEndpoints === totalEndpoints ? 'green' : 'yellow');
    log(`  Test duration: ${totalTime}ms`, 'blue');
    
    // Save results to file
    const testResults = {
        timestamp: new Date().toISOString(),
        duration: totalTime,
        services: results,
        performance: performanceResults,
        summary: {
            healthyServices,
            totalServices: results.length,
            successfulEndpoints,
            totalEndpoints
        }
    };
    
    require('fs').writeFileSync('test-results.json', JSON.stringify(testResults, null, 2));
    log(`\n💾 Test results saved to test-results.json`, 'blue');
    
    // Exit with appropriate code
    if (healthyServices === results.length && successfulEndpoints === totalEndpoints) {
        log(`\n🎉 All tests passed!`, 'green');
        process.exit(0);
    } else {
        log(`\n⚠️  Some tests failed. Check the results above.`, 'yellow');
        process.exit(1);
    }
}

// Handle errors
process.on('unhandledRejection', (reason, promise) => {
    log(`\n❌ Unhandled Rejection at: ${promise}, reason: ${reason}`, 'red');
    process.exit(1);
});

// Run the tests
main().catch(error => {
    log(`\n❌ Test suite failed: ${error.message}`, 'red');
    process.exit(1);
}); 