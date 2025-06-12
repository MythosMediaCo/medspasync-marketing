import React from 'react';
import ConfidenceScore from './ConfidenceScore.jsx';

const MatchCard = ({ match, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-lg shadow border p-4 hover:bg-gray-50 cursor-pointer"
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="font-semibold text-gray-800">POS: {match.pos}</p>
        <p className="text-sm text-gray-500">Alle: {match.alle}</p>
        <p className="text-sm text-gray-500">Aspire: {match.aspire}</p>
      </div>
      <ConfidenceScore score={match.confidence} />
    </div>
  </div>
);

export default MatchCard;
