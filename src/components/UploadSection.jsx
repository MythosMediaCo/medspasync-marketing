import React from 'react';
import { useDropzone } from 'react-dropzone';
import './VibrantDesignSystem.css';

export default function UploadSection({ files, setFiles, onProcessFiles, isLoading }) {
  const onDrop = (accepted) => {
    setFiles(accepted);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
  });

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
      <div className="card">
        <h2 className="section-title" style={{ fontSize: '32px', marginBottom: '32px' }}>Upload Your Data</h2>
        
        <div
          {...getRootProps()}
          style={{
            border: '2px dashed',
            borderColor: isDragActive ? '#4ECDC4' : '#E2E8F0',
            borderRadius: '16px',
            padding: '48px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: isDragActive ? 'rgba(78, 205, 196, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s',
            marginBottom: '24px'
          }}
        >
          <input {...getInputProps()} />
          <p style={{ color: '#4A5568', fontSize: '16px' }}>
            {isDragActive ? 'Drop the files here...' : 'Drag & drop files here, or click to select'}
          </p>
        </div>
        
        {files.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#2D3748' }}>Selected Files:</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {files.map((f) => (
                <li key={f.name} style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  color: '#2D3748',
                  fontSize: '14px'
                }}>
                  {f.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          onClick={() => onProcessFiles(files)}
          disabled={isLoading || files.length === 0}
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '24px' }}
        >
          {isLoading ? 'Processing...' : 'Start AI Reconciliation'}
        </button>
        
        <div className="card" style={{ background: 'rgba(168, 230, 207, 0.1)', border: '1px solid rgba(168, 230, 207, 0.3)' }}>
          <h4 style={{ fontWeight: '600', marginBottom: '12px', color: '#2D3748' }}>Tips for Best Results</h4>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: '#4A5568', fontSize: '14px', lineHeight: '1.6' }}>
            <li>Include customer names, service types, and dates</li>
            <li>CSV format works best for processing</li>
            <li>Files up to 10MB are supported</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
