import React, { useEffect, useState } from 'react';
import Modal from './Ui/Modal.jsx';
import { CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'medspasync_onboarding';
const defaultState = {
  uploadReport: false,
  viewHistory: false,
  exportPDF: false,
  dismissed: false
};

const WelcomeOnboardingModal = ({ isOpen, onClose }) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) setState({ ...defaultState, ...saved });
    } catch {
      // ignore parse errors
    }
  }, []);

  const update = (key, value) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const handleClose = () => {
    update('dismissed', true);
    onClose();
  };

  const toggle = (key) => update(key, !state[key]);
  const allDone = state.uploadReport && state.viewHistory && state.exportPDF;

  useEffect(() => {
    if (allDone) {
      update('dismissed', true);
    }
  }, [allDone]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Welcome to MedSpaSync">
      <p className="mb-4 text-gray-600">Get started by completing the steps below.</p>
      <ul className="space-y-3">
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={state.uploadReport}
              onChange={() => toggle('uploadReport')}
            />
            <span>Upload your first report</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={state.viewHistory}
              onChange={() => toggle('viewHistory')}
            />
            <span>View your reconciliation history</span>
          </label>
        </li>
        <li>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={state.exportPDF}
              onChange={() => toggle('exportPDF')}
            />
            <span>Export a PDF report</span>
          </label>
        </li>
      </ul>
      {allDone && (
        <div className="mt-4 flex items-center text-green-600">
          <CheckCircle className="w-5 h-5 mr-1" />
          <span>All steps completed!</span>
        </div>
      )}
    </Modal>
  );
};

export default WelcomeOnboardingModal;
