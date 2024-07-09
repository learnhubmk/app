'use client';

/* eslint-disable no-unused-vars */

import React from 'react';
import ReusableModal from '../../components/reusable-components/reusable-modal/ReusableModal';
import {
  ModalProvider,
  useModal,
} from '../../components/reusable-components/reusable-modal/ModalContext';
import ReusableTable, {
  UserData,
} from '../../components/reusable-components/reusable-table/ReusableTable';

const headers: (keyof UserData)[] = ['first_name', 'last_name', 'role'];
const displayNames: { [key in keyof UserData]?: string } = {
  first_name: 'First Name',
  last_name: 'Last Name',
  role: 'Role',
};

/* eslint-disable-next-line no-unused-vars */
const AdminDashboard = () => {
  const { isModalOpen, showModal, closeModal } = useModal();

  return (
    <ReusableModal
      title="Modal Title"
      description="This is an optional description for the modal."
      isOpen={isModalOpen}
      onClose={closeModal}
    />
  );
};

const AdminDashboardPage = () => {
  return (
    <ModalProvider>
      <AdminDashboard />
      <ReusableTable<UserData> headers={headers} displayNames={displayNames} />
    </ModalProvider>
  );
};

export default AdminDashboardPage;
