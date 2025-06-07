// src/components/CustomModal.js
import React from 'react';
import ReactDOM from 'react-dom';

const CustomModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'confirm' // 'confirm' or 'alert'
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose(); // Allow closing by clicking outside
        }
    };

    return ReactDOM.createPortal(
        <div
            id="modal-overlay"
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-auto p-6 animate-scaleIn">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm">{message}</p>
                </div>
                <div className="flex flex-col space-y-3">
                    {type === 'confirm' && (
                        <button
                            onClick={onConfirm}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            {confirmText}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className={`w-full ${type === 'confirm' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'} py-3 px-4 rounded-lg font-medium transition-colors`}
                    >
                        {type === 'confirm' ? cancelText : 'Close'}
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') // You'll need to add <div id="modal-root"></div> to your public/index.html
    );
};

export default CustomModal;

/*
// Add this to your public/index.html body section (e.g., right after <div id="root"></div>)
<div id="modal-root"></div>

// How to use in a component:
import CustomModal from '../components/CustomModal';
const [showModal, setShowModal] = useState(false);
const [modalConfig, setModalConfig] = useState({});

const handleLogout = () => {
    setModalConfig({
        title: 'Confirm Logout',
        message: 'Are you sure you want to sign out?',
        confirmText: 'Yes, Sign Out',
        cancelText: 'No, Stay Logged In',
        onConfirm: () => {
            onLogout(); // Call the actual logout function
            setShowModal(false);
        },
        onClose: () => setShowModal(false),
        type: 'confirm'
    });
    setShowModal(true);
};

// ... in JSX:
<CustomModal {...modalConfig} isOpen={showModal} />

// For an alert:
setModalConfig({
    title: 'Feature Coming Soon!',
    message: 'Password reset functionality is under development.',
    onClose: () => setShowModal(false),
    type: 'alert'
});
setShowModal(true);
*/