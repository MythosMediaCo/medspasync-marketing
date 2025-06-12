import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api.js';
import { useAuth } from '../services/AuthContext.jsx';

const SubscriptionPlan = () => {
  const { subscriptionTier, refreshUser } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('session_id')) {
      (async () => {
        try {
          await refreshUser();
          setShowBanner(true);
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [location.search, refreshUser]);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await api.post('/checkout/create-session', { tier: 'professional' });
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {showBanner && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800" data-testid="success-banner">
          Plan upgraded successfully!
        </div>
      )}
      <p className="mb-4">
        Current Plan: <span className="font-semibold capitalize">{subscriptionTier}</span>
      </p>
      <button
        onClick={handleUpgrade}
        disabled={loading || subscriptionTier === 'professional'}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Upgrade to Professional'}
      </button>
    </div>
  );
};

export default SubscriptionPlan;
