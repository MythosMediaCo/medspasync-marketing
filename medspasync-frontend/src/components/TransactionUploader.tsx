import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { UploadCloud } from 'lucide-react';
import medSpaAPI, { TransactionData, BatchResponse } from '../services/medSpaAPI';

interface FileData {
  file: File;
  data: TransactionData[];
}

const parseFile = (file: File): Promise<TransactionData[]> => {
  const ext = file.name.split('.').pop()?.toLowerCase();
  return new Promise((resolve, reject) => {
    if (ext === 'csv') {
      Papa.parse<TransactionData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => resolve(res.data as TransactionData[]),
        error: reject,
      });
    } else if (ext === 'xlsx' || ext === 'xls') {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const wb = XLSX.read(data, { type: 'array' });
          const sheet = wb.Sheets[wb.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json<TransactionData>(sheet);
          resolve(json);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file type'));
    }
  });
};

const DropZone = ({ onFiles, label, file }: { onFiles: (files: File[]) => void; label: string; file?: File }) => {
  const onDrop = useCallback((accepted: File[]) => onFiles(accepted), [onFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="border-2 border-dashed rounded p-6 text-center cursor-pointer hover:bg-gray-50">
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-8 w-8 text-blue-600" />
      <p className="mt-2 text-sm text-gray-600">
        {file ? file.name : (isDragActive ? 'Drop the file here ...' : label)}
      </p>
    </div>
  );
};

const TransactionUploader = () => {
  const [pos, setPos] = useState<FileData | null>(null);
  const [rewards, setRewards] = useState<FileData | null>(null);
  const [results, setResults] = useState<BatchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePos = async (files: File[]) => {
    if (!files[0]) return;
    const data = await parseFile(files[0]);
    setPos({ file: files[0], data });
  };

  const handleRewards = async (files: File[]) => {
    if (!files[0]) return;
    const data = await parseFile(files[0]);
    setRewards({ file: files[0], data });
  };

  const handleSubmit = async () => {
    if (!pos?.data || !rewards?.data) return;
    setLoading(true);
    try {
      const len = Math.min(pos.data.length, rewards.data.length);
      const pairs = [] as Array<{ reward_transaction: TransactionData; pos_transaction: TransactionData }>;
      for (let i = 0; i < len; i++) {
        pairs.push({ reward_transaction: rewards.data[i], pos_transaction: pos.data[i] });
      }
      const res = await medSpaAPI.batchPredict(pairs);
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <DropZone onFiles={handlePos} label="Upload POS Transactions" file={pos?.file} />
        <DropZone onFiles={handleRewards} label="Upload Rewards Transactions" file={rewards?.file} />
      </div>
      <button onClick={handleSubmit} disabled={loading || !pos || !rewards} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50">
        {loading ? 'Processing...' : 'Reconcile'}
      </button>
      {results && (
        <div className="bg-white p-4 rounded shadow">
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(results.summary ?? results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TransactionUploader;
