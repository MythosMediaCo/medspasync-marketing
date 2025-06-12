import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAI } from '../../services/AIContext.jsx';
import MatchCard from '../../components/AIPipeline/MatchCard.jsx';
import TierGuard from '../../components/auth/TierGuard.jsx';

const ReviewDashboard = () => {
  const { matches, loading } = useAI();
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-6">Loading matches...</div>;
  }

  return (
    <TierGuard allowedTiers={['professional']}>
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">AI Matches Needing Review</h1>
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} onClick={() => navigate(`/ai-review/${m.id}`)} />
        ))}
      </div>
    </TierGuard>
  );
};

export default ReviewDashboard;
