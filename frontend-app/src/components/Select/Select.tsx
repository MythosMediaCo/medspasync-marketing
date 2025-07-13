import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { clsx } from 'clsx';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  clearable?: boolean;
  loading?: boolean;
  maxHeight?: number;
  className?: string;
  'data-testid'?: string;
}

/**
 * Enhanced Select component for MedSpaSync Pro
 * Supports single/multi-select, search, async loading, and keyboard navigation
 * Built with TypeScript for comprehensive type safety
 * Includes accessibility features and mobile-friendly design
 */
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  multiple = false,
  searchable = false,
  disabled = false,
  error,
  label,
  required = false,
  clearable = false,
  loading = false,
  maxHeight = 200,
  className = '',
  'data-testid': dataTestId = 'select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Group options if they have groups
  const groupedOptions = filteredOptions.reduce((groups, option) => {
    const group = option.group || 'default';
    if (!groups[group]) groups[group] = [];
    groups[group].push(option);
    return groups;
  }, {} as Record<string, SelectOption[]>);

  // Get selected options
  const selectedOptions = multiple
    ? options.filter(option => Array.isArray(value) && value.includes(option.value))
    : options.filter(option => option.value === value);

  // Handle option selection
  const handleOptionSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearchTerm('');
    setFocusedIndex(-1);
  };

  // Handle clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiple ? [] : '');
    setSearchTerm('');
  };

  // Handle remove individual selection (multiple mode)
  const handleRemoveSelection = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      const newValues = value.filter(v => v !== optionValue);
      onChange(newValues);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0) {
          handleOptionSelect(filteredOptions[focusedIndex].value);
        }
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        e.preventDefault();
        break;
      case 'ArrowUp':
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        e.preventDefault();
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const renderValue = () => {
    if (multiple && selectedOptions.length > 0) {
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map(option => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
            >
              {option.label}
              <button
                onClick={(e) => handleRemoveSelection(option.value, e)}
                className="hover:bg-blue-200 rounded-full p-0.5"
                data-testid={`${dataTestId}-remove-${option.value}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      );
    }

    if (!multiple && selectedOptions.length > 0) {
      return <span className="truncate">{selectedOptions[0].label}</span>;
    }

    return <span className="text-gray-500">{placeholder}</span>;
  };

  return (
    <div className={clsx('relative', className)} ref={selectRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div
        className={clsx(
          'relative w-full min-h-[2.5rem] px-3 py-2 bg-white border rounded-lg cursor-pointer transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          {
            'border-gray-300': !error && !isOpen,
            'border-blue-500': isOpen && !error,
            'border-red-500': error,
            'bg-gray-50 cursor-not-allowed': disabled,
          }
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label || 'Select option'}
        data-testid={dataTestId}
      >
        <div className="flex items-center justify-between min-h-[1.5rem]">
          <div className="flex-1 min-w-0">
            {renderValue()}
          </div>
          
          <div className="flex items-center gap-2 ml-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
            
            {clearable && (selectedOptions.length > 0) && !disabled && (
              <button
                onClick={handleClear}
                className="hover:bg-gray-100 rounded-full p-1"
                data-testid={`${dataTestId}-clear`}
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            
            <ChevronDown 
              className={clsx('w-4 h-4 text-gray-400 transition-transform', {
                'rotate-180': isOpen
              })} 
            />
          </div>
        </div>
      </div>

      {/* Options Dropdown */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
          style={{ maxHeight }}
          data-testid={`${dataTestId}-dropdown`}
        >
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid={`${dataTestId}-search`}
                />
              </div>
            </div>
          )}
          
          <div 
            className="overflow-auto" 
            style={{ maxHeight: maxHeight - (searchable ? 60 : 0) }}
            ref={optionsRef}
          >
            {Object.keys(groupedOptions).length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-center">
                No options found
              </div>
            ) : (
              Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                <div key={groupName}>
                  {groupName !== 'default' && (
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase bg-gray-50">
                      {groupName}
                    </div>
                  )}
                  {groupOptions.map((option, index) => {
                    const globalIndex = filteredOptions.indexOf(option);
                    const isSelected = multiple 
                      ? Array.isArray(value) && value.includes(option.value)
                      : value === option.value;
                    const isFocused = globalIndex === focusedIndex;
                    
                    return (
                      <div
                        key={option.value}
                        className={clsx(
                          'px-3 py-2 cursor-pointer flex items-center justify-between',
                          'hover:bg-blue-50 transition-colors',
                          {
                            'bg-blue-50': isFocused,
                            'bg-blue-100': isSelected,
                            'opacity-50 cursor-not-allowed': option.disabled,
                          }
                        )}
                        onClick={() => !option.disabled && handleOptionSelect(option.value)}
                        data-testid={`${dataTestId}-option-${option.value}`}
                      >
                        <span className={clsx({ 'font-medium': isSelected })}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600" data-testid={`${dataTestId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;