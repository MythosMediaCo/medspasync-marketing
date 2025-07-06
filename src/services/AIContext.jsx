import React, { createContext, useContext, useEffect, useState } from 'react';

const AIContext = createContext({ matches: [] });

export const AIProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAIMatches = async (pageParam = page) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ai/matches?page=${pageParam}&limit=50`);
      const data = await res.json();
      if (data.success) {
        setMatches(data.results);
        setTotalPages(data.totalPages || 1);
      } else {
        setMatches([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load matches');
      setMatches([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAIMatches(page);
  }, [page]);

  const refresh = () => getAIMatches(page);

  return (
    <AIContext.Provider value={{ matches, loading, error, refresh, page, totalPages, setPage }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);
