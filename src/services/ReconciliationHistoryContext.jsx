import React, { createContext, useContext } from 'react';

const ReconciliationHistoryContext = createContext([]);

export const ReconciliationHistoryProvider = ({ history = [], children }) => (
  <ReconciliationHistoryContext.Provider value={history}>
    {children}
  </ReconciliationHistoryContext.Provider>
);

export const useReconciliationHistory = () => useContext(ReconciliationHistoryContext);

export default ReconciliationHistoryContext;
