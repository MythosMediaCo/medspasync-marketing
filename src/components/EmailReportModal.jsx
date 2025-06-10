import React, { useState } from 'react';
import Modal from './Ui/Modal.jsx';
import api from '../services/api.js';
import toast from 'react-hot-toast';
import LoadingSpinner from './Ui/LoadingSpinner.jsx';

const EmailReportModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      await api.post('/analytics/pdf/email', { email });
      toast.success('Report emailed successfully');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Email Report">
      <div className="space-y-4">
        <input
          type="email"
          className="w-full border rounded-lg p-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSend}
          disabled={loading || !email}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          Send Report
        </button>
      </div>
    </Modal>
  );
};

export default EmailReportModal;
