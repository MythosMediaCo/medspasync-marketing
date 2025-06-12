import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JsonViewer from '../../components/AIPipeline/JsonViewer.jsx';
import ConfidenceScore from '../../components/AIPipeline/ConfidenceScore.jsx';
import CorrectionForm from './CorrectionForm.jsx';
import TierGuard from '../../components/auth/TierGuard.jsx';

const MatchDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = new URL(`../../mock/aiMatchDetails.js`, import.meta.url);
    import(url).then((module) => {
      setData(module.aiMatchDetails[id]);
    });
  }, [id]);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <TierGuard allowedTiers={['professional']}>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">Match #{id}</h1>
        <ConfidenceScore score={data.confidence} />
        <JsonViewer data={data.posRecord} label="POS Record" />
        <JsonViewer data={data.alleRecord} label="Alle Record" />
        <JsonViewer data={data.aspireRecord} label="Aspire Record" />
        <JsonViewer data={data.audit} label="Audit Trail" />
        <CorrectionForm matchId={id} />
      </div>
    </TierGuard>
  );
};

export default MatchDetails;
