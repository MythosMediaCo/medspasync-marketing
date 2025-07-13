import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
  animated?: boolean;
  className?: string;
  'data-testid'?: string;
}

/**
 * Tabs component for MedSpaSync Pro
 * Supports controlled and uncontrolled modes with smooth animations
 * Built with TypeScript and Framer Motion for comprehensive functionality
 * Includes accessibility features and keyboard navigation
 */
const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  animated = true,
  className = '',
  'data-testid': dataTestId = 'tabs',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.id || '');
  const [focusedTab, setFocusedTab] = useState<string>('');
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement>>({});

  const currentActiveTab = activeTab || internalActiveTab;
  const activeTabData = tabs.find(tab => tab.id === currentActiveTab);

  const handleTabChange = (tabId: string) => {
    if (tabs.find(tab => tab.id === tabId)?.disabled) return;
    
    if (onChange) {
      onChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        do {
          nextIndex = nextIndex > 0 ? nextIndex - 1 : tabs.length - 1;
        } while (tabs[nextIndex]?.disabled && nextIndex !== currentIndex);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        do {
          nextIndex = nextIndex < tabs.length - 1 ? nextIndex + 1 : 0;
        } while (tabs[nextIndex]?.disabled && nextIndex !== currentIndex);
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        while (tabs[nextIndex]?.disabled && nextIndex < tabs.length - 1) {
          nextIndex++;
        }
        break;
      case 'End':
        e.preventDefault();
        nextIndex = tabs.length - 1;
        while (tabs[nextIndex]?.disabled && nextIndex > 0) {
          nextIndex--;
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleTabChange(tabId);
        return;
      default:
        return;
    }

    if (nextIndex !== currentIndex && !tabs[nextIndex]?.disabled) {
      const nextTabId = tabs[nextIndex].id;
      setFocusedTab(nextTabId);
      tabRefs.current[nextTabId]?.focus();
    }
  };

  const sizeClasses = {
    sm: {
      tab: 'px-3 py-2 text-sm',
      icon: 'w-4 h-4',
    },
    md: {
      tab: 'px-4 py-2.5 text-base',
      icon: 'w-5 h-5',
    },
    lg: {
      tab: 'px-6 py-3 text-lg',
      icon: 'w-6 h-6',
    },
  };

  const variantClasses = {
    default: {
      tabList: 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700',
      activeTab: 'border-blue-600 text-blue-600',
      inactiveTab: 'text-gray-500',
    },
    pills: {
      tabList: 'bg-gray-100 p-1 rounded-lg',
      tab: 'rounded-md hover:bg-white hover:shadow-sm',
      activeTab: 'bg-white shadow-sm text-gray-900',
      inactiveTab: 'text-gray-600',
    },
    underline: {
      tabList: 'border-b border-gray-200',
      tab: 'border-b-2 border-transparent hover:border-blue-300',
      activeTab: 'border-blue-600 text-blue-600',
      inactiveTab: 'text-gray-500',
    },
    cards: {
      tabList: 'border-b border-gray-200',
      tab: 'border border-transparent rounded-t-lg hover:border-gray-300',
      activeTab: 'border-gray-300 border-b-white bg-white text-gray-900 -mb-px',
      inactiveTab: 'text-gray-500',
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  useEffect(() => {
    if (focusedTab && tabRefs.current[focusedTab]) {
      tabRefs.current[focusedTab].focus();
    }
  }, [focusedTab]);

  const TabButton: React.FC<{ tab: TabItem; isActive: boolean }> = ({ tab, isActive }) => (
    <button
      ref={(el) => {
        if (el) tabRefs.current[tab.id] = el;
      }}
      type="button"
      className={clsx(
        currentSize.tab,
        currentVariant.tab,
        'relative font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        {
          [currentVariant.activeTab]: isActive,
          [currentVariant.inactiveTab]: !isActive,
          'opacity-50 cursor-not-allowed': tab.disabled,
          'cursor-pointer': !tab.disabled,
          'flex-1': fullWidth && orientation === 'horizontal',
        }
      )}
      onClick={() => handleTabChange(tab.id)}
      onKeyDown={(e) => handleKeyDown(e, tab.id)}
      disabled={tab.disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${dataTestId}-panel-${tab.id}`}
      id={`${dataTestId}-tab-${tab.id}`}
      tabIndex={isActive ? 0 : -1}
      data-testid={`${dataTestId}-tab-${tab.id}`}
    >
      <div className="flex items-center gap-2">
        {tab.icon && (
          <span className={clsx(currentSize.icon, 'flex-shrink-0')}>
            {tab.icon}
          </span>
        )}
        <span className="truncate">{tab.label}</span>
        {tab.badge && (
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {tab.badge}
          </span>
        )}
      </div>
    </button>
  );

  return (
    <div
      className={clsx(
        'w-full',
        {
          'flex': orientation === 'vertical',
          'flex-col': orientation === 'horizontal',
        },
        className
      )}
      data-testid={dataTestId}
    >
      {/* Tab List */}
      <div
        ref={tabListRef}
        className={clsx(
          currentVariant.tabList,
          'flex',
          {
            'flex-row': orientation === 'horizontal',
            'flex-col space-y-1': orientation === 'vertical',
            'w-full': orientation === 'horizontal',
            'w-64 flex-shrink-0': orientation === 'vertical',
          }
        )}
        role="tablist"
        aria-orientation={orientation}
        data-testid={`${dataTestId}-list`}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={currentActiveTab === tab.id}
          />
        ))}
      </div>

      {/* Tab Panels */}
      <div
        className={clsx(
          'relative',
          {
            'mt-4': orientation === 'horizontal',
            'ml-4 flex-1': orientation === 'vertical',
          }
        )}
      >
        <AnimatePresence mode="wait">
          {activeTabData && (
            <motion.div
              key={currentActiveTab}
              initial={animated ? { opacity: 0, y: 10 } : false}
              animate={animated ? { opacity: 1, y: 0 } : false}
              exit={animated ? { opacity: 0, y: -10 } : false}
              transition={{ duration: 0.2 }}
              role="tabpanel"
              id={`${dataTestId}-panel-${currentActiveTab}`}
              aria-labelledby={`${dataTestId}-tab-${currentActiveTab}`}
              tabIndex={0}
              data-testid={`${dataTestId}-panel-${currentActiveTab}`}
            >
              {activeTabData.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Tabs;