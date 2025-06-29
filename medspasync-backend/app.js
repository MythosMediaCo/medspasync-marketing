const express = require('express');
const reconciliationRoutes = require('./routes/reconciliation');
const reportingRoutes = require('./routes/reporting');
const performanceRoutes = require('./routes/performance-optimization');
const scalabilityRoutes = require('./routes/scalability-load-balancing');
const { validateEnvironment } = require('./config/reconciliation');
const keyVaultManager = require('./config/azure-keyvault');
const monitoringAnalyticsRoutes = require('./routes/monitoring-analytics');

// Initialize Azure Key Vault before validating environment
async function initializeApp() {
  try {
    // Initialize Azure Key Vault first
    await keyVaultManager.initialize();
    
    // Then validate environment
    validateEnvironment();
    
    console.log('🚀 Backend application initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize application:', error.message);
    process.exit(1);
  }
}

// Initialize the app
initializeApp();

const app = express();
app.use(express.json({ limit: '100mb' })); // Increased limit for file uploads
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Routes
app.use('/api/reconciliation', reconciliationRoutes);
app.use('/api/reporting', reportingRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/scalability', scalabilityRoutes);
app.use('/api/monitoring', monitoringAnalyticsRoutes);
app.use('/api/analytics', monitoringAnalyticsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    services: ['reconciliation', 'reporting', 'performance', 'scalability']
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 
      'An unexpected error occurred' : error.message
  });
});

module.exports = app;
