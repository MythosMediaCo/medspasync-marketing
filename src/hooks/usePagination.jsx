import { useState, useMemo, useCallback } from 'react';

export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }

    return {
      currentItems,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      startIndex: totalItems > 0 ? startIndex + 1 : 0,
      endIndex: totalItems > 0 ? Math.min(endIndex, totalItems) : 0
    };
  }, [data, currentPage, itemsPerPage]);

  const goToPage = useCallback((page) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [data.length, itemsPerPage]);

  const goToNextPage = useCallback(() => {
    if (paginationData.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [paginationData.hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (paginationData.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginationData.hasPreviousPage]);

  const goToFirstPage = useCallback(() => setCurrentPage(1), []);

  const goToLastPage = useCallback(() => setCurrentPage(Math.ceil(data.length / itemsPerPage)), [data.length, itemsPerPage]);

  return {
    ...paginationData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage
  };
};