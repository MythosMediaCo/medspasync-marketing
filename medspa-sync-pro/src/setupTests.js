// Enhanced Jest setup for MedSpaSync Pro testing
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock Web APIs that might not be available in Jest environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver for components that use lazy loading
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver for responsive components
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock File API for upload testing
global.File = class File {
  constructor(chunks, filename, options = {}) {
    this.chunks = chunks;
    this.name = filename;
    this.size = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
    this.type = options.type || '';
    this.lastModified = options.lastModified || Date.now();
  }
};

global.FileReader = class FileReader {
  constructor() {
    this.readyState = 0;
    this.result = null;
    this.error = null;
  }
  
  readAsText(file) {
    this.readyState = 2;
    this.result = 'mock,csv,content\ntest,data,here';
    setTimeout(() => this.onload && this.onload(), 0);
  }
  
  readAsDataURL(file) {
    this.readyState = 2;
    this.result = 'data:text/csv;base64,bW9jayxjc3YsY29udGVudA==';
    setTimeout(() => this.onload && this.onload(), 0);
  }
};

// Mock performance API for web vitals testing
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    mark: jest.fn(),
    measure: jest.fn(),
    now: jest.fn(() => Date.now()),
    getEntriesByType: jest.fn(() => []),
    getEntriesByName: jest.fn(() => []),
    clearMarks: jest.fn(),
    clearMeasures: jest.fn(),
  },
});

// Mock fetch for API testing
global.fetch = jest.fn();

// Medical Spa Testing Utilities
export const medSpaTestUtils = {
  // Create mock transaction data
  createMockAlleTransaction: (overrides = {}) => ({
    id: 'AL-2024-' + Math.random().toString(36).substr(2, 9),
    customerName: 'Test Patient',
    service: 'Botox Treatment',
    amount: 35.00,
    date: '2024-12-15',
    source: 'Allé',
    certificateId: 'AL-CERT-123',
    pointsUsed: 350,
    ...overrides
  }),

  createMockAspireTransaction: (overrides = {}) => ({
    id: 'ASP-2024-' + Math.random().toString(36).substr(2, 9),
    customerName: 'Test Patient',
    service: 'CoolSculpting',
    amount: 75.00,
    date: '2024-12-15',
    source: 'Aspire',
    certificateId: 'ASP-CERT-456',
    ...overrides
  }),

  createMockPOSTransaction: (overrides = {}) => ({
    id: 'POS-2024-' + Math.random().toString(36).substr(2, 9),
    customerName: 'Patient, Test',
    service: 'Neurotoxin Injection',
    amount: 650.00,
    date: '2024-12-15 14:30:00',
    provider: 'Dr. Smith',
    paymentMethod: 'Allé Rewards + Cash',
    locationId: 'LOC001',
    ...overrides
  }),

  // Create mock reconciliation results
  createMockReconciliationResults: (overrides = {}) => ({
    summary: {
      totalTransactions: 100,
      autoMatched: 85,
      needsReview: 12,
      unmatched: 3,
      confidenceRate: 94.8,
      timeSaved: 18.5,
      alleTransactions: 45,
      aspireTransactions: 25,
      posTransactions: 100,
      processingTime: '2.3 minutes',
      costSavings: '$3,200'
    },
    autoMatched: [],
    needsReview: [],
    unmatched: [],
    ...overrides
  }),

  // Create mock AI match with confidence scores
  createMockAIMatch: (confidence = 0.95, overrides = {}) => ({
    id: Math.floor(Math.random() * 1000),
    rewardTransaction: medSpaTestUtils.createMockAlleTransaction(),
    posTransaction: medSpaTestUtils.createMockPOSTransaction(),
    confidence,
    matchType: confidence >= 0.95 ? 'High Confidence' : confidence >= 0.80 ? 'Medium Confidence' : 'Low Confidence',
    aiFeatures: {
      nameMatch: 0.96,
      serviceMatch: 0.94,
      dateProximity: 1.0,
      amountRatio: 0.92
    },
    ...overrides
  }),

  // Create mock CSV file
  createMockCSVFile: (filename = 'test.csv', content = 'header1,header2,header3\nvalue1,value2,value3') => {
    return new File([content], filename, { type: 'text/csv' });
  },

  // Mock file upload event
  mockFileUpload: (file, inputElement) => {
    Object.defineProperty(inputElement, 'files', {
      value: [file],
      writable: false,
    });
    
    const event = new Event('change', { bubbles: true });
    inputElement.dispatchEvent(event);
  },

  // Mock drag and drop event
  mockDragAndDrop: (file, dropZone) => {
    const dragEvent = new Event('drop', { bubbles: true });
    Object.defineProperty(dragEvent, 'dataTransfer', {
      value: {
        files: [file],
        types: ['Files']
      }
    });
    dropZone.dispatchEvent(dragEvent);
  },

  // Wait for async operations
  waitForProcessing: async (timeout = 5000) => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const checkProcessing = () => {
        if (Date.now() - startTime > timeout) {
          resolve(false);
          return;
        }
        
        // Check if processing is complete (customize based on your component)
        const processingElement = document.querySelector('[data-testid="processing"]');
        if (!processingElement) {
          resolve(true);
        } else {
          setTimeout(checkProcessing, 100);
        }
      };
      checkProcessing();
    });
  },

  // Mock API responses
  mockSuccessfulReconciliation: () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => medSpaTestUtils.createMockReconciliationResults()
    });
  },

  mockFailedReconciliation: (error = 'Processing failed') => {
    global.fetch.mockRejectedValueOnce(new Error(error));
  },

  // Mock confidence threshold settings
  mockConfidenceSettings: (threshold = 95) => {
    localStorage.setItem('medSpaConfidenceThreshold', threshold.toString());
  },

  // Clear all mocks
  clearAllMocks: () => {
    jest.clearAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  }
};

// Custom Jest matchers for medical spa testing
expect.extend({
  toHaveConfidenceLevel(received, expectedLevel) {
    const confidence = received.confidence || received.match_probability || 0;
    const level = confidence >= 0.95 ? 'high' : confidence >= 0.80 ? 'medium' : 'low';
    
    const pass = level === expectedLevel;
    
    return {
      message: () => `expected confidence level to be ${expectedLevel}, but got ${level} (${(confidence * 100).toFixed(1)}%)`,
      pass
    };
  },

  toBeValidMedSpaTransaction(received) {
    const requiredFields = ['customerName', 'service', 'amount', 'date'];
    const missingFields = requiredFields.filter(field => !received[field]);
    
    const pass = missingFields.length === 0;
    
    return {
      message: () => `expected transaction to have all required fields, missing: ${missingFields.join(', ')}`,
      pass
    };
  },

  toHaveValidCSVFormat(received) {
    const lines = received.split('\n');
    const hasHeader = lines.length > 0;
    const hasData = lines.length > 1;
    const consistentColumns = lines.every(line => 
      line.split(',').length === lines[0].split(',').length
    );
    
    const pass = hasHeader && hasData && consistentColumns;
    
    return {
      message: () => `expected valid CSV format with consistent columns`,
      pass
    };
  }
});

// Global test configuration
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
  
  // Reset fetch mock
  global.fetch.mockClear();
  
  // Clear browser storage
  localStorage.clear();
  sessionStorage.clear();
  
  // Reset performance mocks
  window.performance.mark.mockClear();
  window.performance.measure.mockClear();
  
  // Reset any global state
  delete window.medSpaUploadStart;
  delete window.medSpaAiStart;
  delete window.medSpaReconciliationStart;
});

afterEach(() => {
  // Clean up any remaining timers
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

// Console error handling for tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Export utilities for use in test files
export default medSpaTestUtils;