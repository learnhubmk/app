'use client';

import React, { useEffect, useState } from 'react';
import fetchData, { updateData, deleteData } from './FetchData';
import TableRowComponent, { UserData } from './TableRowComponent';
import style from './reusableTable.module.scss';
import ConfirmationModal from './ConfirmationModal';

const ReusableTable = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [editingItem, setEditingItem] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', role: '' });
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [deletingItemId, setDeletingItemId] = useState<string>('');

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetchData();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataFromApi();
  }, []);

  const handleView = (user: UserData) => console.log('View action:', user);
  const handleEdit = (user: UserData) => {
    setEditingItem(user);
    setFormData({ first_name: user.first_name, last_name: user.last_name, role: user.role });
  };

  const handleDelete = (id: string) => {
    setDeletingItemId(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(deletingItemId);
      console.log('Delete successful');
      setData((prevData) => prevData.filter((item) => item.id !== deletingItemId));
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const cancelDelete = () => setShowConfirmationModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      try {
        const updatedData = await updateData(editingItem.id, formData);
        console.log('Edit successful:', updatedData);
        setData((prevData) =>
          prevData.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item))
        );
      } catch (error) {
        console.error('Edit error:', error);
      } finally {
        setEditingItem(null);
      }
    }
  };

  return (
    <div className={style.tableWrapper}>
      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      {editingItem ? (
        <form onSubmit={handleSubmit} className={style.editForm}>
          <h2>Edit User</h2>
          <label htmlFor="first_name">
            First Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="last_name">
            Last Name:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="role">
            Role:
            <select name="role" value={formData.role} onChange={handleRoleChange}>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
              <option value="Content Manager">Content Manager</option>
            </select>
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingItem(null)}>
            Cancel
          </button>
        </form>
      ) : (
        <table className={style.reusableTable}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <TableRowComponent
                key={item.id}
                data={item}
                onView={() => handleView(item)}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReusableTable;
