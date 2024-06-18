


import React, { useEffect, useState } from 'react';

const DropdownModal = ({ isOpen, onClose, buttonRef, options }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (buttonRef.current && isOpen) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        }
    }, [isOpen, buttonRef]);

    if (!isOpen) return null;

    return (
        <div
            className="drop bg-white border border-gray-300 rounded-lg shadow-lg w-32 z-50"
            style={{ marginLeft: '210px' }}
        >
            <div className="p-4">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onClose(option)}
                        className="block w-full text-left mb-2">
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DropdownModal;

