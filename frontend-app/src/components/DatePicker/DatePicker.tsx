import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy-MM-dd';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outlined' | 'filled';
  showToday?: boolean;
  showClear?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * DatePicker component for MedSpaSync Pro
 * Provides date selection with calendar dropdown interface
 * Built with TypeScript and Framer Motion for smooth animations
 * Includes accessibility features and keyboard navigation
 */
const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  minDate,
  maxDate,
  format = 'MM/dd/yyyy',
  size = 'md',
  variant = 'default',
  showToday = true,
  showClear = true,
  className = '',
  'data-testid': dataTestId = 'date-picker',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    switch (format) {
      case 'dd/MM/yyyy':
        return `${day}/${month}/${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'MM/dd/yyyy':
      default:
        return `${month}/${day}/${year}`;
    }
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    let day, month, year;
    const parts = dateString.split(/[/-]/);
    
    if (parts.length !== 3) return null;
    
    switch (format) {
      case 'dd/MM/yyyy':
        [day, month, year] = parts;
        break;
      case 'yyyy-MM-dd':
        [year, month, day] = parts;
        break;
      case 'MM/dd/yyyy':
      default:
        [month, day, year] = parts;
        break;
    }
    
    const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    
    // Go back to Sunday
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days: Date[] = [];
    const current = new Date(startDate);
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange?.(null);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    handleDateSelect(today);
    setCurrentMonth(today);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseDate(e.target.value);
    if (parsed && !isDateDisabled(parsed)) {
      setSelectedDate(parsed);
      onChange?.(parsed);
      setCurrentMonth(parsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    default: 'border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
    outlined: 'border-2 border-gray-300 bg-transparent focus:border-blue-500',
    filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-200',
  };

  const inputClasses = clsx(
    'w-full rounded-lg transition-all duration-200 outline-none',
    sizeClasses[size],
    variantClasses[variant],
    {
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    },
    className
  );

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div ref={containerRef} className="relative" data-testid={dataTestId}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={formatDate(selectedDate)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          readOnly
          data-testid={`${dataTestId}-input`}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-full"
            data-testid={`${dataTestId}-calendar`}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                type="button"
                onClick={() => navigateMonth('prev')}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                data-testid={`${dataTestId}-prev-month`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-lg font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button
                type="button"
                onClick={() => navigateMonth('next')}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                data-testid={`${dataTestId}-next-month`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Date grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                  const isToday = isSameDay(day, new Date());
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isDisabled = isDateDisabled(day);

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={clsx(
                        'w-8 h-8 text-sm rounded-lg transition-all duration-150 hover:bg-blue-50',
                        {
                          'text-gray-400': !isCurrentMonth,
                          'text-gray-900': isCurrentMonth && !isSelected,
                          'bg-blue-600 text-white hover:bg-blue-700': isSelected,
                          'bg-blue-100 text-blue-600': isToday && !isSelected,
                          'opacity-50 cursor-not-allowed hover:bg-transparent': isDisabled,
                        }
                      )}
                      data-testid={`${dataTestId}-day-${day.getDate()}`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar Footer */}
            {(showToday || showClear) && (
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                {showToday && (
                  <button
                    type="button"
                    onClick={handleToday}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    data-testid={`${dataTestId}-today`}
                  >
                    Today
                  </button>
                )}
                {showClear && selectedDate && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-sm text-gray-500 hover:text-gray-700"
                    data-testid={`${dataTestId}-clear`}
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;