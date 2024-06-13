'use client';

import React from 'react';
import ReusableModal from '../../components/reusable-components/reusable-modal/ReusableModal';
import {
  ModalProvider,
  useModal,
} from '../../components/reusable-components/reusable-modal/ModalContext';

const AdminDashboard = () => {
  const { isModalOpen, showModal, closeModal } = useModal();

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

const AdminDashboardPage = () => {
  return (
    <ModalProvider>
      <AdminDashboard />
    </ModalProvider>
  );
};

export default AdminDashboardPage;
