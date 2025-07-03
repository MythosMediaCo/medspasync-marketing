import React from 'react';
import Modal from './Ui/Modal.jsx'; // Explicit .jsx extension
import LoadingSpinner from './Ui/LoadingSpinner.jsx'; // Explicit .jsx extension

// Generic Delete Confirmation Modal with customizable title and message
const DeleteConfirmModal = React.memo(({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item? This action cannot be undone.'
}) => {
  if (!isOpen) return null; // Render nothing if not open

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Deletion" showCloseButton={true}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
          Delete
        </button>
      </div>
    </Modal>
  );
});

export default DeleteConfirmModal;