import React from 'react';
import { AIProvider } from '../../services/AIContext.jsx';
import ReviewDashboard from './ReviewDashboard.jsx';

const ReconciliationAI = () => (
  <AIProvider>
    <ReviewDashboard />
  </AIProvider>
);

export default ReconciliationAI;
