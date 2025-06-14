const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

console.log('🚀 Starting MedSpaSync Pro Frontend...');
console.log(`📍 Port: ${port}`);
console.log(`🔗 VITE_API_URL: ${process.env.VITE_API_URL || 'not set'}`);
console.log(`🔗 REACT_APP_API_BASE: ${process.env.REACT_APP_API_BASE || 'not set'}`);

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    frontend: 'MedSpaSync Pro',
    viteApiUrl: process.env.VITE_API_URL,
    reactApiBase: process.env.REACT_APP_API_BASE,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Catch-all handler: send back React app (MUST be last)
app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Server Error');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Something broke!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ MedSpaSync Pro Frontend running on port ${port}`);
  console.log(`🌐 Health check: http://localhost:${port}/health`);
});
