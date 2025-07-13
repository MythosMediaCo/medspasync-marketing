import React, { createContext, useContext } from 'react';

// Ensure React is available before creating context
const ReconciliationHistoryContext = React.createContext([]);

export const ReconciliationHistoryProvider = ({ history = [], children }) => (
  <ReconciliationHistoryContext.Provider value={history}>
    {children}
  </ReconciliationHistoryContext.Provider>
);

export const useReconciliationHistory = () => useContext(ReconciliationHistoryContext);

export default ReconciliationHistoryContext;
