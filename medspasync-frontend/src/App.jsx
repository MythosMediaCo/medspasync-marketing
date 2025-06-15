import React from 'react';
import './App.css';
import TransactionUploader from './components/TransactionUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-2xl font-bold text-center mb-6">MedSpa Transaction Uploader</h1>
      <TransactionUploader />
    </div>
  );
}

export default App;
