'use client';

import React from 'react';
import ReusableModal from '../../components/reusable-components/reusable-modal/ReusableModal';
import {
  ModalProvider,
  useModal,
} from '../../components/reusable-components/reusable-modal/ModalContext';

import SearchAndFilter from '../../components/module-components/SearchAndFilter/SearchAndFilter';

const AdminDashboard = () => {
  const { isModalOpen, showModal, closeModal } = useModal();

  return (
    <>
      <SearchAndFilter />
      <div>
        <button type="button" onClick={showModal}>
          Open Modal
        </button>
        <ReusableModal
          title="Modal Title"
          description="This is an optional description for the modal."
          isOpen={isModalOpen}
          onClose={closeModal}
          primaryButtonLabel="Deactivate"
        />
      </div>
    </>
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
