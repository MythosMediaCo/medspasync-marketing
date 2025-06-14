import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Loader, 
  X,
  Eye,
  Settings,
  ArrowRight,
  MapPin,
  Wand2
} from 'lucide-react';

// Smart Column Mapper (inline for now, should be separate file)
class SmartColumnMapper {
  constructor() {
    this.fieldMappings = {
      customer_name: {
        patterns: [
          'patient name', 'customer name', 'client name', 'name',
          'patient', 'customer', 'client', 'patient_name', 'customer_name',
          'client_name', 'full name', 'fullname', 'member name', 'member_name'
        ],
        required: true,
        type: 'string'
      },
      
      service: {
        patterns: [
          'service', 'treatment', 'procedure', 'product name', 'product_name',
          'service type', 'service_type', 'treatment type', 'treatment_type',
          'description', 'service description', 'treatment description',
          'product', 'item', 'service_description', 'reward description',
          'reward_description', 'treatment areas', 'treatment_areas'
        ],
        required: true,
        type: 'string'
      },
      
      amount: {
        patterns: [
          'amount', 'total', 'price', 'cost', 'charge', 'fee', 'value',
          'reward value', 'reward_value', 'points earned', 'points_earned',
          'total amount', 'total_amount', 'transaction amount', 'payment amount',
          'disbursement amount', 'disbursement_amount'
        ],
        required: true,
        type: 'currency'
      },
      
      date: {
        patterns: [
          'date', 'transaction date', 'treatment date', 'service date',
          'appointment date', 'visit date', 'date issued', 'created date',
          'transaction_date', 'treatment_date', 'service_date', 'date_issued',
          'disbursement date', 'disbursement_date'
        ],
        required: true,
        type: 'date'
      },
      
      phone: {
        patterns: [
          'phone', 'phone number', 'patient phone', 'customer phone',
          'phone_number', 'patient_phone_number', 'customer_phone_number',
          'mobile', 'cell', 'telephone'
        ],
        required: false,
        type: 'phone'
      },
      
      email: {
        patterns: [
          'email', 'email address', 'patient email', 'customer email',
          'email_address', 'patient_email', 'customer_email'
        ],
        required: false,
        type: 'email'
      }
    };
  }

  findBestMatch(standardField, availableColumns) {
    const field = this.fieldMappings[standardField];
    if (!field) return null;

    const normalizedColumns = availableColumns.map(col => ({
      original: col,
      normalized: col.toLowerCase().trim().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ')
    }));

    for (const pattern of field.patterns) {
      const normalizedPattern = pattern.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ');
      
      const exactMatch = normalizedColumns.find(col => 
        col.normalized === normalizedPattern ||
        col.normalized.includes(normalizedPattern) ||
        normalizedPattern.includes(col.normalized)
      );
      
      if (exactMatch) {
        return exactMatch.original;
      }
    }

    for (const pattern of field.patterns) {
      const words = pattern.toLowerCase().split(' ');
      
      const fuzzyMatch = normalizedColumns.find(col => {
        const colWords = col.normalized.split(' ');
        return words.some(word => colWords.some(colWord => 
          word.includes(colWord) || colWord.includes(word)
        ));
      });
      
      if (fuzzyMatch) {
        return fuzzyMatch.original;
      }
    }

    return null;
  }

  mapColumns(csvHeaders) {
    const mapping = {};
    const unmapped = [];
    const missing = [];

    Object.keys(this.fieldMappings).forEach(standardField => {
      const match = this.findBestMatch(standardField, csvHeaders);
      
      if (match) {
        mapping[standardField] = match;
      } else if (this.fieldMappings[standardField].required) {
        missing.push(standardField);
      }
    });

    csvHeaders.forEach(header => {
      if (!Object.values(mapping).includes(header)) {
        unmapped.push(header);
      }
    });

    return {
      mapping,
      unmapped,
      missing,
      isValid: missing.length === 0,
      confidence: Object.keys(mapping).length / csvHeaders.length
    };
  }

  detectFileType(headers) {
    const headerStr = headers.join(' ').toLowerCase();
    
    if (headerStr.includes('patient name') && 
        (headerStr.includes('product name') || headerStr.includes('points earned'))) {
      return 'alle_rewards';
    }
    
    if (headerStr.includes('certificate') || 
        (headerStr.includes('treatment date') && headerStr.includes('payout'))) {
      return 'aspire_rewards';
    }
    
    if (headerStr.includes('amount') && 
        (headerStr.includes('payment') || headerStr.includes('transaction'))) {
      return 'pos_transactions';
    }
    
    return 'unknown';
  }
}

const EnhancedTransactionUploader = ({ onFilesProcessed, isProcessing = false }) => {
  const [files, setFiles] = useState({});
  const [validations, setValidations] = useState({});
  const [columnMappings, setColumnMappings] = useState({});
  const [showMapping, setShowMapping] = useState(null);
  const [showPreview, setShowPreview] = useState(null);
  const [processingStep, setProcessingStep] = useState('');
  const [mapper] = useState(new SmartColumnMapper());

  const validateFile = useCallback(async (file) => {
    if (file.size > 10 * 1024 * 1024) {
      return { isValid: false, error: 'File size must be less than 10MB' };
    }

    if (!file.name.toLowerCase().match(/\.(csv|xlsx|xls)$/)) {
      return { isValid: false, error: 'Please upload CSV or Excel files only' };
    }

    try {
      let data = [];
      let headers = [];

      if (file.name.toLowerCase().endsWith('.csv')) {
        return new Promise((resolve) => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            encoding: 'UTF-8',
            complete: (results) => {
              if (results.errors.length > 0) {
                resolve({
                  isValid: false,
                  error: `CSV parsing error: ${results.errors[0].message}`
                });
                return;
              }

              data = results.data;
              headers = results.meta.fields || [];

              // Apply smart column mapping
              const columnMapping = mapper.mapColumns(headers);
              const fileType = mapper.detectFileType(headers);

              const preview = [headers, ...data.slice(0, 5).map(row => 
                headers.map(header => row[header] || '')
              )];

              resolve({
                isValid: columnMapping.isValid,
                needsMapping: !columnMapping.isValid,
                preview,
                rowCount: data.length,
                headers,
                columnMapping,
                fileType,
                data,
                error: columnMapping.isValid ? null : `Missing required fields: ${columnMapping.missing.join(', ')}`
              });
            },
            error: (error) => {
              resolve({
                isValid: false,
                error: `File parsing failed: ${error.message}`
              });
            }
          });
        });
      } else {
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        if (jsonData.length < 2) {
          return { isValid: false, error: 'File must contain headers and at least one data row' };
        }

        headers = jsonData[0].map(h => String(h || '').trim());
        data = jsonData.slice(1);

        const columnMapping = mapper.mapColumns(headers);
        const fileType = mapper.detectFileType(headers);

        const preview = [headers, ...data.slice(0, 5)];

        return {
          isValid: columnMapping.isValid,
          needsMapping: !columnMapping.isValid,
          preview,
          rowCount: data.length,
          headers,
          columnMapping,
          fileType,
          data,
          error: columnMapping.isValid ? null : `Missing required fields: ${columnMapping.missing.join(', ')}`
        };
      }
    } catch (error) {
      return {
        isValid: false,
        error: `File processing failed: ${error.message || 'Unknown error'}`
      };
    }
  }, [mapper]);

  const handleFileSelect = useCallback(async (fileType, file) => {
    setProcessingStep(`Analyzing ${fileType}...`);
    const validation = await validateFile(file);
    setFiles(prev => ({ ...prev, [fileType]: file }));
    setValidations(prev => ({ ...prev, [fileType]: validation }));
    
    if (validation.columnMapping) {
      setColumnMappings(prev => ({ ...prev, [fileType]: validation.columnMapping }));
    }
    
    setProcessingStep('');
  }, [validateFile]);

  const handleColumnMappingUpdate = (fileType, newMapping) => {
    setColumnMappings(prev => ({
      ...prev,
      [fileType]: {
        ...prev[fileType],
        mapping: newMapping,
        isValid: true,
        missing: []
      }
    }));
    
    setValidations(prev => ({
      ...prev,
      [fileType]: {
        ...prev[fileType],
        isValid: true,
        error: null
      }
    }));
  };

  const removeFile = useCallback((fileType) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[fileType];
      return newFiles;
    });
    setValidations(prev => {
      const newValidations = { ...prev };
      delete newValidations[fileType];
      return newValidations;
    });
    setColumnMappings(prev => {
      const newMappings = { ...prev };
      delete newMappings[fileType];
      return newMappings;
    });
  }, []);

  const handleProcessReconciliation = useCallback(async () => {
    if (!files.posTransactions) {
      alert('POS transactions file is required');
      return;
    }

    try {
      setProcessingStep('Processing reconciliation...');
      
      // Transform data using column mappings
      const processedData = {};
      
      Object.entries(files).forEach(([fileType, file]) => {
        const validation = validations[fileType];
        const mapping = columnMappings[fileType];
        
        if (validation && validation.data && mapping) {
          processedData[fileType] = validation.data.map(row => {
            const transformedRow = {};
            Object.entries(mapping.mapping).forEach(([standardField, csvColumn]) => {
              transformedRow[standardField] = row[csvColumn];
            });
            return transformedRow;
          });
        }
      });

      // Create sample transaction pairs for AI processing
      const samplePairs = [];
      
      if (processedData.posTransactions) {
        const rewardData = processedData.alleTransactions || processedData.aspireTransactions || [];
        
        // Create pairs from processed data
        for (let i = 0; i < Math.min(3, processedData.posTransactions.length); i++) {
          const posTransaction = processedData.posTransactions[i];
          const rewardTransaction = rewardData[i % rewardData.length] || {
            customer_name: 'Sample Customer',
            service: 'Sample Service',
            amount: 35.0,
            date: '2024-08-15'
          };
          
          samplePairs.push({
            reward_transaction: {
              customer_name: rewardTransaction.customer_name || 'Unknown',
              service: rewardTransaction.service || 'Unknown Service',
              amount: parseFloat(rewardTransaction.amount) || 0,
              date: rewardTransaction.date || '2024-08-15'
            },
            pos_transaction: {
              customer_name: posTransaction.customer_name || 'Unknown',
              service: posTransaction.service || 'Unknown Service',
              amount: parseFloat(posTransaction.amount) || 0,
              date: posTransaction.date || '2024-08-15 12:00:00'
            }
          });
        }
      }

      const response = await fetch('https://aapii-production.up.railway.app/batch-predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_pairs: samplePairs,
          threshold: 0.95
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const results = await response.json();
      
      // Add metadata about processed files
      results.metadata = {
        filesProcessed: Object.keys(files).length,
        totalRows: Object.values(validations).reduce((sum, v) => sum + (v.rowCount || 0), 0),
        fileTypes: Object.entries(validations).map(([type, validation]) => ({
          type,
          fileType: validation.fileType,
          rows: validation.rowCount
        }))
      };
      
      onFilesProcessed(results);
      
    } catch (error) {
      console.error('Reconciliation error:', error);
      alert(`Reconciliation failed: ${error.message || 'Unknown error'}`);
    } finally {
      setProcessingStep('');
    }
  }, [files, validations, columnMappings, onFilesProcessed]);

  const ColumnMappingModal = ({ fileType }) => {
    const validation = validations[fileType];
    const mapping = columnMappings[fileType];
    if (!validation || !mapping) return null;

    const [localMapping, setLocalMapping] = useState({ ...mapping.mapping });

    const handleSaveMapping = () => {
      handleColumnMappingUpdate(fileType, localMapping);
      setShowMapping(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">Column Mapping - {fileType}</h3>
              <p className="text-sm text-gray-600">
                Map your CSV columns to standard fields
              </p>
            </div>
            <button
              onClick={() => setShowMapping(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 overflow-auto max-h-96">
            <div className="space-y-4">
              {Object.keys(mapper.fieldMappings).map(standardField => (
                <div key={standardField} className="grid grid-cols-3 gap-4 items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900 capitalize">
                      {standardField.replace('_', ' ')}
                      {mapper.fieldMappings[standardField].required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {mapper.fieldMappings[standardField].type}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <div>
                    <select
                      value={localMapping[standardField] || ''}
                      onChange={(e) => setLocalMapping(prev => ({
                        ...prev,
                        [standardField]: e.target.value
                      }))}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="">Select column...</option>
                      {validation.headers.map(header => (
                        <option key={header} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                    {mapping.missing.includes(standardField) && (
                      <div className="text-xs text-red-600 mt-1">Required field</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {mapping.unmapped.length > 0 && (
              <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Unmapped Columns</h4>
                <div className="text-sm text-gray-600">
                  {mapping.unmapped.join(', ')}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
            <button
              onClick={() => setShowMapping(null)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveMapping}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Mapping
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FileDropZone = ({ fileType, title, description, required = false }) => {
    const file = files[fileType];
    const validation = validations[fileType];
    const mapping = columnMappings[fileType];

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        'text/csv': ['.csv'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-excel': ['.xls']
      },
      maxSize: 10 * 1024 * 1024,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          handleFileSelect(fileType, acceptedFiles[0]);
        }
      }
    });

    const getStatusColor = () => {
      if (!validation) return 'border-gray-300';
      if (validation.isValid) return 'border-green-500 bg-green-50';
      if (validation.needsMapping) return 'border-yellow-500 bg-yellow-50';
      return 'border-red-500 bg-red-50';
    };

    const getStatusIcon = () => {
      if (!validation) return null;
      if (validation.isValid) return <CheckCircle className="w-6 h-6 text-green-600" />;
      if (validation.needsMapping) return <Settings className="w-6 h-6 text-yellow-600" />;
      return <AlertCircle className="w-6 h-6 text-red-600" />;
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {required && (
              <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full">
                Required
              </span>
            )}
            {validation?.fileType && (
              <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                {validation.fileType.replace('_', ' ')}
              </span>
            )}
          </div>
          {file && (
            <button
              onClick={() => removeFile(fileType)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
            ${isDragActive ? 'border-blue-500 bg-blue-50' : getStatusColor()}
          `}
        >
          <input {...getInputProps()} />
          
          {file ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {getStatusIcon()}
              </div>
              
              {validation?.error && (
                <p className="text-sm text-red-600 font-medium">{validation.error}</p>
              )}
              
              {validation?.needsMapping && (
                <div className="space-y-2">
                  <p className="text-sm text-yellow-700 font-medium">
                    Column mapping required
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMapping(fileType);
                    }}
                    className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 flex items-center gap-1 mx-auto"
                  >
                    <Settings className="w-3 h-3" />
                    Configure Mapping
                  </button>
                </div>
              )}
              
              {validation?.isValid && (
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>{validation.rowCount} rows</span>
                  <span>Confidence: {Math.round((mapping?.confidence || 0) * 100)}%</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPreview(fileType);
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  {validation.needsMapping === false && mapping && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMapping(fileType);
                      }}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <Settings className="w-4 h-4" />
                      Edit Mapping
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop {title.toLowerCase()} file here
                </p>
                <p className="text-gray-500 text-sm mt-1">{description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Supports CSV, Excel files up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const PreviewModal = ({ fileType }) => {
    const validation = validations[fileType];
    if (!validation?.preview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">File Preview - {fileType}</h3>
            <button
              onClick={() => setShowPreview(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 overflow-auto max-h-96">
            <div className="text-sm text-gray-600 mb-3">
              Showing first 5 rows of {validation.rowCount} total rows
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {validation.preview[0]?.map((header, i) => (
                      <th key={i} className="border border-gray-200 px-3 py-2 text-left font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {validation.preview.slice(1).map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, j) => (
                        <td key={j} className="border border-gray-200 px-3 py-2">
                          {cell?.toString() || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const canProcess = files.posTransactions && 
    validations.posTransactions?.isValid && 
    !isProcessing && 
    !processingStep;

  const allFilesValid = Object.entries(files).every(([fileType, file]) => 
    validations[fileType]?.isValid
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Upload Transaction Files
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your reward program and POS transaction files. Our AI will automatically 
          detect column formats and handle any CSV configuration.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-blue-600 bg-blue-50 rounded-lg p-3">
          <Wand2 className="w-4 h-4" />
          Smart column mapping detects fields automatically
        </div>
      </div>

      <div className="grid gap-8">
        <FileDropZone
          fileType="posTransactions"
          title="POS Transactions"
          description="Upload your Point of Sale transaction export (CSV or Excel)"
          required
        />

        <FileDropZone
          fileType="alleTransactions"
          title="Allé Rewards Transactions"
          description="Upload your Allé rewards transaction export (CSV or Excel)"
        />

        <FileDropZone
          fileType="aspireTransactions"
          title="Aspire Rewards Transactions"
          description="Upload your Aspire rewards transaction export (CSV or Excel)"
        />
      </div>

      {processingStep && (
        <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg">
          <Loader className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-blue-800 font-medium">{processingStep}</span>
        </div>
      )}

      {Object.keys(files).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">File Status Summary</h3>
          <div className="space-y-2">
            {Object.entries(files).map(([fileType, file]) => {
              const validation = validations[fileType];
              return (
                <div key={fileType} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{fileType}</span>
                    {validation?.fileType && (
                      <span className="text-xs text-gray-500">({validation.fileType})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {validation?.isValid ? (
                      <span className="text-green-600 text-sm">✓ Ready</span>
                    ) : validation?.needsMapping ? (
                      <span className="text-yellow-600 text-sm">⚠ Needs mapping</span>
                    ) : (
                      <span className="text-red-600 text-sm">✗ Invalid</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleProcessReconciliation}
          disabled={!canProcess}
          className={`
            px-8 py-3 rounded-lg font-semibold text-white transition-all
            ${canProcess 
              ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl' 
              : 'bg-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isProcessing || processingStep ? (
            <div className="flex items-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Processing AI Reconciliation...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              Start AI Reconciliation
            </div>
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>POS transactions file is required. Reward program files are optional.</p>
        <p>✨ Smart mapping automatically detects column formats from any CSV structure</p>
        <p>Supported formats: CSV, Excel (.xlsx, .xls) • Maximum file size: 10MB</p>
      </div>

      {showPreview && <PreviewModal fileType={showPreview} />}
      {showMapping && <ColumnMappingModal fileType={showMapping} />}
    </div>
  );
};

export default EnhancedTransactionUploader;