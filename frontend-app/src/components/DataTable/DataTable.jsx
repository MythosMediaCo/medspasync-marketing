import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * DataTable component for MedSpaSync Pro
 * Aligned to design system specifications from UI/UX Canvas
 * Supports sorting, loading states, and responsive design
 * Accessible by default with proper ARIA attributes
 */

const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  sortable = true,
  onSort,
  className = '',
  'data-testid': dataTestId = 'data-table',
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    onSort && onSort({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div 
        className={clsx(
          'bg-background border border-border rounded-lg p-8',
          'flex items-center justify-center',
          className
        )}
        data-testid={`${dataTestId}-loading`}
      >
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent"></div>
          <span className="text-text-secondary">Loading data...</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        'bg-background border border-border rounded-lg overflow-hidden',
        className
      )}
      data-testid={dataTestId}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-secondary">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-6 py-3 text-left text-xs font-semibold text-text-primary uppercase tracking-wider',
                    sortable && column.sortable !== false && 'cursor-pointer hover:bg-border'
                  )}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                  data-testid={`${dataTestId}-header-${column.key}`}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-text-secondary"
                  data-testid={`${dataTestId}-no-data`}
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr 
                  key={row.id || index}
                  className="hover:bg-secondary transition-colors"
                  data-testid={`${dataTestId}-row-${index}`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-text-primary"
                      data-testid={`${dataTestId}-cell-${index}-${column.key}`}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  sortable: PropTypes.bool,
  onSort: PropTypes.func,
  className: PropTypes.string,
  'data-testid': PropTypes.string,
};

export default DataTable;