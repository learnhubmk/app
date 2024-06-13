'use client';

import React, { useState } from 'react';
import ReusableModal from '../../components/reusable-components/reusable-modal/ReusableModal';

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={showModal}>
        Open Modal
      </button>
      <ReusableModal
        title="Modal Title"
        description="This is an optional description for the modal."
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default AdminDashboard;
