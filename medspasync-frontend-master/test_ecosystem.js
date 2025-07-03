const axios = require('axios');

// Test configuration
const config = {
  backend: 'http://localhost:3001',
  frontend: 'http://localhost:3000',
  aiApi: 'http://localhost:8000'
};

// Test results
const results = {
  backend: { status: 'unknown', tests: [] },
  frontend: { status: 'unknown', tests: [] },
  aiApi: { status: 'unknown', tests: [] }
};

// Utility function to add test result
function addResult(service, testName, success, details = '') {
  results[service].tests.push({
    name: testName,
    success,
    details,
    timestamp: new Date().toISOString()
  });
}

// Test backend health
async function testBackendHealth() {
  try {
    console.log('🔍 Testing Backend Health...');
    const response = await axios.get(`${config.backend}/health`, { timeout: 5000 });
    
    if (response.status === 200) {
      addResult('backend', 'Health Check', true, `Status: ${response.data.status}`);
      console.log('✅ Backend health check passed');
      return true;
    } else {
      addResult('backend', 'Health Check', false, `Status: ${response.status}`);
      console.log('❌ Backend health check failed');
      return false;
    }
  } catch (error) {
    addResult('backend', 'Health Check', false, error.message);
    console.log('❌ Backend health check failed:', error.message);
    return false;
  }
}

// Test backend authentication endpoints
async function testBackendAuth() {
  try {
    console.log('🔍 Testing Backend Authentication...');
    
    // Test registration endpoint
    const registerData = {
      email: 'test@medspa.com',
      password: 'TestPassword123!',
      spaName: 'Test Medical Spa',
      spaType: 'medical-spa'
    };
    
    const registerResponse = await axios.post(`${config.backend}/api/auth/register`, registerData, { timeout: 5000 });
    addResult('backend', 'Registration', true, 'User registration successful');
    console.log('✅ Registration test passed');
    
    // Test login endpoint
    const loginData = {
      email: 'test@medspa.com',
      password: 'TestPassword123!'
    };
    
    const loginResponse = await axios.post(`${config.backend}/api/auth/login`, loginData, { timeout: 5000 });
    addResult('backend', 'Login', true, 'User login successful');
    console.log('✅ Login test passed');
    
    return true;
  } catch (error) {
    addResult('backend', 'Authentication', false, error.message);
    console.log('❌ Authentication test failed:', error.message);
    return false;
  }
}

// Test AI API endpoints
async function testAiApi() {
  try {
    console.log('🔍 Testing AI API...');
    
    // Test health endpoint
    const healthResponse = await axios.get(`${config.aiApi}/health`, { timeout: 5000 });
    addResult('aiApi', 'Health Check', true, `Status: ${healthResponse.status}`);
    console.log('✅ AI API health check passed');
    
    // Test reconciliation endpoint
    const reconciliationData = {
      client_data: [
        { name: 'John Doe', service: 'Botox', amount: 500 },
        { name: 'Jane Smith', service: 'Facial', amount: 200 }
      ],
      payment_data: [
        { name: 'John Doe', payment: 500, date: '2024-01-15' },
        { name: 'Jane Smith', payment: 200, date: '2024-01-16' }
      ]
    };
    
    const reconciliationResponse = await axios.post(`${config.aiApi}/reconcile`, reconciliationData, { timeout: 10000 });
    addResult('aiApi', 'Reconciliation', true, 'AI reconciliation successful');
    console.log('✅ AI reconciliation test passed');
    
    return true;
  } catch (error) {
    addResult('aiApi', 'API Tests', false, error.message);
    console.log('❌ AI API test failed:', error.message);
    return false;
  }
}

// Test frontend accessibility
async function testFrontend() {
  try {
    console.log('🔍 Testing Frontend...');
    
    // Test main page
    const response = await axios.get(config.frontend, { timeout: 5000 });
    
    if (response.status === 200) {
      addResult('frontend', 'Main Page', true, 'Frontend accessible');
      console.log('✅ Frontend main page accessible');
      
      // Check if it's a Next.js app
      if (response.data.includes('MedSpaSync') || response.data.includes('Next.js')) {
        addResult('frontend', 'Next.js App', true, 'Next.js application detected');
        console.log('✅ Next.js application detected');
      } else {
        addResult('frontend', 'Next.js App', false, 'Next.js application not detected');
        console.log('⚠️ Next.js application not detected');
      }
      
      return true;
    } else {
      addResult('frontend', 'Main Page', false, `Status: ${response.status}`);
      console.log('❌ Frontend main page failed');
      return false;
    }
  } catch (error) {
    addResult('frontend', 'Accessibility', false, error.message);
    console.log('❌ Frontend test failed:', error.message);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting MedSpaSync Pro Ecosystem Test...\n');
  
  // Wait a bit for servers to start
  console.log('⏳ Waiting for servers to start...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Test each service
  const backendHealth = await testBackendHealth();
  const backendAuth = await testBackendAuth();
  const aiApi = await testAiApi();
  const frontend = await testFrontend();
  
  // Calculate overall status
  results.backend.status = (backendHealth && backendAuth) ? 'healthy' : 'unhealthy';
  results.aiApi.status = aiApi ? 'healthy' : 'unhealthy';
  results.frontend.status = frontend ? 'healthy' : 'unhealthy';
  
  // Print summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`Backend: ${results.backend.status.toUpperCase()}`);
  console.log(`AI API: ${results.aiApi.status.toUpperCase()}`);
  console.log(`Frontend: ${results.frontend.status.toUpperCase()}`);
  
  // Print detailed results
  console.log('\n📋 Detailed Results:');
  console.log('===================');
  
  Object.keys(results).forEach(service => {
    console.log(`\n${service.toUpperCase()}:`);
    results[service].tests.forEach(test => {
      const icon = test.success ? '✅' : '❌';
      console.log(`  ${icon} ${test.name}: ${test.details}`);
    });
  });
  
  // Overall ecosystem status
  const allHealthy = Object.values(results).every(r => r.status === 'healthy');
  console.log(`\n🎯 Overall Ecosystem Status: ${allHealthy ? 'HEALTHY' : 'ISSUES DETECTED'}`);
  
  if (allHealthy) {
    console.log('🎉 All systems are operational! MedSpaSync Pro is ready for use.');
  } else {
    console.log('⚠️ Some systems have issues. Check the detailed results above.');
  }
  
  return results;
}

// Run the tests
runAllTests().catch(console.error); 