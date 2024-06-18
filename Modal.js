import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg max-h-screen overflow-y-auto ">
                <button onClick={onClose} className="text-red-500 mb-4">Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
