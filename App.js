import React, { useState } from 'react';
import BookingForm from './BookingForm';
import Modal from './Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pitchInfo, setPitchInfo] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = (selectedPitch) => {
    setPitchInfo(selectedPitch);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <button onClick={openModal} className="p-4 bg-blue-500 text-white rounded">Open Booking Form</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BookingForm
          onPitchInfoClick={openDropdown}
          isDropdownOpen={isDropdownOpen}
          closeDropdown={closeDropdown}
        />
      </Modal>
    </div>
  );
}

export default App;
