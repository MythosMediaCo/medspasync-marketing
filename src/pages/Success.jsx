import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Subscription Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        You're all set. Your Core Reconciliation dashboard is now unlocked.
      </p>
      <button
        onClick={() => navigate('/login')}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
      >
        Go to Login
      </button>
    </div>
  );
};

export default SuccessPage;
