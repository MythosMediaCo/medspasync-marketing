import React, { useState } from 'react';
import Modal from '../Ui/Modal.jsx';

const TrainModelModal = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Correction">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Confirm that the displayed records match or provide corrections below.</p>
        <textarea
          className="w-full border rounded p-2"
          rows="4"
          value={text}
          placeholder="Provide feedback or corrections here..."
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => onSubmit(text)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default TrainModelModal;
