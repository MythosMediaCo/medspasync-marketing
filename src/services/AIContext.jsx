import React, { createContext, useContext, useEffect, useState } from 'react';

const AIContext = createContext({ matches: [] });

export const AIProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL('../mock/aiMatches.json', import.meta.url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    setLoading(true);
    const url = new URL('../mock/aiMatches.json', import.meta.url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .finally(() => setLoading(false));
  };

  return (
    <AIContext.Provider value={{ matches, loading, refresh }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);
