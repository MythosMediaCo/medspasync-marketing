import React, { useState } from 'react';
import toast from 'react-hot-toast';
import TrainModelModal from '../../components/AIPipeline/TrainModelModal.jsx';

const CorrectionForm = ({ matchId }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (text) => {
    setOpen(false);
    await fetch('/api/ai/train', { method: 'POST', body: JSON.stringify({ id: matchId, feedback: text }) });
    toast.success('Feedback submitted');
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Submit Correction
      </button>
      <TrainModelModal isOpen={open} onClose={() => setOpen(false)} onSubmit={handleSubmit} />
    </div>
  );
};

export default CorrectionForm;
