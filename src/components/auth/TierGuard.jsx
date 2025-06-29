// components/auth/TierGuard.jsx
import React from 'react';
import { useAuth } from '../../services/AuthContext';
import UpsellBanner from '../Ui/UpsellBanner';

const TierGuard = ({ allowedTiers = [], fallback = null, children }) => {
  const { user } = useAuth();

  if (!user?.subscriptionTier) return null; // Still loading or unauthenticated

  if (allowedTiers.includes(user.subscriptionTier)) {
    return <>{children}</>;
  }

  return fallback || <UpsellBanner requiredTiers={allowedTiers} currentTier={user.subscriptionTier} />;
};

export default TierGuard;
