// medspasync-pro/src/hooks/usePagination.js
import { useState, useMemo, useCallback } from 'react'; // Corrected import syntax and added useCallback for consistency

/**
 * Custom hook for client-side pagination logic.
 * Manages current page, calculates pagination data, and provides navigation functions.
 *
 * @param {Array} data - The array of all items to be paginated.
 * @param {number} itemsPerPage - The number of items to display per page.
 * @returns {object} Pagination data and control functions.
 */
export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize pagination calculations for performance
  const paginationData = useMemo(() => {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    // Adjust currentPage if data shrinks (e.g., items are deleted from the data array)
    // or if itemsPerPage changes, potentially pushing current page out of bounds.
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages); // Go to the last valid page
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1); // If no data, reset to page 1
    }

    return {
      currentItems,
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
      // Adjust startIndex/endIndex for display purposes (e.g., "Showing X to Y of Z items")
      startIndex: totalItems > 0 ? startIndex + 1 : 0,
      endIndex: totalItems > 0 ? Math.min(endIndex, totalItems) : 0,
    };
  }, [data, currentPage, itemsPerPage]); // Dependencies for re-calculation

  // --- Pagination Control Functions ---

  /**
   * Navigates to a specific page number.
   * Ensures the page number is within valid bounds.
   * @param {number} page - The target page number.
   */
  const goToPage = useCallback((page) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else if (page < 1) {
      setCurrentPage(1); // Go to first page if trying to go before first
    } else if (page > totalPages && totalPages > 0) {
      setCurrentPage(totalPages); // Go to last page if trying to go beyond last
    }
  }, [data.length, itemsPerPage]); // Recalculate if data length or itemsPerPage changes

  /**
   * Navigates to the next page, if available.
   */
  const goToNextPage = useCallback(() => {
    if (paginationData.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [paginationData.hasNextPage]); // Dependency on hasNextPage

  /**
   * Navigates to the previous page, if available.
   */
  const goToPreviousPage = useCallback(() => {
    if (paginationData.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  }, [paginationData.hasPreviousPage]); // Dependency on hasPreviousPage

  /**
   * Navigates to the very first page.
   */
  const goToFirstPage = useCallback(() => setCurrentPage(1), []); // No dependencies as 1 is constant

  /**
   * Navigates to the very last page.
   */
  const goToLastPage = useCallback(() => setCurrentPage(Math.ceil(data.length / itemsPerPage)), [data.length, itemsPerPage]); // Recalculate if data length or itemsPerPage changes

  return {
    ...paginationData,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage
  };
};