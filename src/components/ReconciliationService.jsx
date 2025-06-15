// services/reconciliationService.js
// Integration layer between React frontend and backend APIs

class ReconciliationService {
  constructor() {
    // Use environment variables for API endpoints
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    this.aiApiURL = process.env.REACT_APP_AI_API_URL || 'http://localhost:5000';
  }

  /**
   * Upload and process transaction files
   * @param {FileList} files - CSV/Excel files from user
   * @returns {Promise<Object>} Processing results
   */
  async processTransactionFiles(files) {
    const formData = new FormData();
    
    // Add files to form data with descriptive names
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`${this.baseURL}/api/reconciliation/upload`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type - let browser set it with boundary
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('File upload error:', error);
      throw new Error(`Failed to upload files: ${error.message}`);
    }
  }

  /**
   * Get reconciliation job status
   * @param {string} jobId - Processing job ID
   * @returns {Promise<Object>} Job status and results
   */
  async getReconciliationStatus(jobId) {
    try {
      const response = await fetch(`${this.baseURL}/api/reconciliation/status/${jobId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Status check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Status check error:', error);
      throw new Error(`Failed to get job status: ${error.message}`);
    }
  }

  /**
   * Submit manual review decision
   * @param {string} matchId - Match ID to review
   * @param {string} decision - 'approve' or 'reject'
   * @param {string} notes - Optional notes
   * @returns {Promise<Object>} Review result
   */
  async submitManualReview(matchId, decision, notes = '') {
    try {
      const response = await fetch(`${this.baseURL}/api/reconciliation/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId,
          decision,
          notes,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Review submission failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Manual review error:', error);
      throw new Error(`Failed to submit review: ${error.message}`);
    }
  }

  /**
   * Export reconciliation results
   * @param {string} jobId - Job ID
   * @param {string} format - 'csv' or 'excel'
   * @returns {Promise<Blob>} Downloadable file
   */
  async exportResults(jobId, format = 'csv') {
    try {
      const response = await fetch(`${this.baseURL}/api/reconciliation/export/${jobId}?format=${format}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Export failed: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Export error:', error);
      throw new Error(`Failed to export results: ${error.message}`);
    }
  }

  /**
   * Test AI prediction directly (for testing)
   * @param {Object} rewardTransaction - Reward transaction data
   * @param {Object} posTransaction - POS transaction data
   * @returns {Promise<Object>} Prediction result
   */
  async testAIPrediction(rewardTransaction, posTransaction) {
    try {
      const response = await fetch(`${this.baseURL}/api/test/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reward_transaction: rewardTransaction,
          pos_transaction: posTransaction,
          threshold: 0.95
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `AI prediction failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AI prediction error:', error);
      throw new Error(`Failed to get AI prediction: ${error.message}`);
    }
  }

  /**
   * Parse CSV file for preview
   * @param {File} file - CSV file
   * @returns {Promise<Array>} Parsed data rows
   */
  async parseCSVPreview(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const csvText = event.target.result;
          const lines = csvText.split('\n').filter(line => line.trim());
          
          if (lines.length === 0) {
            throw new Error('File appears to be empty');
          }

          // Parse headers
          const headers = this.parseCSVLine(lines[0]);
          
          // Parse first 5 rows for preview
          const previewRows = lines.slice(1, 6).map(line => {
            const values = this.parseCSVLine(line);
            const row = {};
            headers.forEach((header, index) => {
              row[header] = values[index] || '';
            });
            return row;
          }).filter(row => Object.values(row).some(val => val !== ''));

          resolve({
            headers,
            preview: previewRows,
            totalRows: lines.length - 1,
            fileName: file.name,
            fileSize: file.size
          });
        } catch (error) {
          reject(new Error(`Failed to parse CSV: ${error.message}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  /**
   * Parse a single CSV line, handling quoted fields
   * @param {string} line - CSV line
   * @returns {Array<string>} Parsed values
   */
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          current += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add final field
    result.push(current.trim());
    
    return result.map(field => field.replace(/^"|"$/g, '')); // Remove surrounding quotes
  }

  /**
   * Validate file format and size
   * @param {File} file - File to validate
   * @returns {Object} Validation result
   */
  validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    const result = {
      isValid: true,
      errors: []
    };

    // Check if file exists
    if (!file) {
      result.isValid = false;
      result.errors.push('No file provided');
      return result;
    }

    // Check file size
    if (file.size === 0) {
      result.isValid = false;
      result.errors.push('File is empty');
    } else if (file.size > maxSize) {
      result.isValid = false;
      result.errors.push(`File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds 10MB limit`);
    }

    // Check file type
    const fileName = file.name.toLowerCase();
    const isValidType = allowedTypes.includes(file.type) || 
                       fileName.endsWith('.csv') ||
                       fileName.endsWith('.xlsx') ||
                       fileName.endsWith('.xls');

    if (!isValidType) {
      result.isValid = false;
      result.errors.push('File must be CSV, XLS, or XLSX format');
    }

    // Check for required file patterns
    const hasValidName = fileName.includes('alle') || 
                        fileName.includes('aspire') || 
                        fileName.includes('pos') ||
                        fileName.includes('demo') ||
                        fileName.includes('transaction');

    if (!hasValidName) {
      result.errors.push('Warning: File name doesn\'t indicate transaction type (Alle, Aspire, or POS)');
      // This is a warning, not a validation failure
    }

    return result;
  }

  /**
   * Get health status of the API
   * @returns {Promise<Object>} Health status
   */
  async getHealthStatus() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  /**
   * Ping the AI API to check if it's running
   * @returns {Promise<boolean>} Whether AI API is available
   */
  async pingAIAPI() {
    try {
      const response = await fetch(`${this.aiApiURL}/health`, {
        method: 'GET',
        timeout: 5000
      });
      return response.ok;
    } catch (error) {
      console.warn('AI API ping failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const reconciliationService = new ReconciliationService();

// Export class for testing
export { ReconciliationService };