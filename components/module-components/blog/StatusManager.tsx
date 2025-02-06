import { useSession } from 'next-auth/react';
import React from 'react';
import { UserRole } from '../../../Types';
import styles from './PublishArticleForm.module.scss';

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ');
};

export const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'in_review', label: 'In Review' },
];

interface StatusManagerProps {
  currentStatus: string;
  handleStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StatusManager: React.FC<StatusManagerProps> = ({ currentStatus, handleStatusChange }) => {
  const { data: session } = useSession();
  const userRole = session?.user.role;

  const currentStatusOptions = [...statusOptions];

  if (userRole === UserRole.admin) {
    currentStatusOptions.push({ value: 'published', label: 'Published' });
  }

  return (
    <select
      name="status"
      className={styles.dropdown}
      value={currentStatus}
      onChange={handleStatusChange}
    >
      {currentStatusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {capitalizeFirstLetter(option.value)}
        </option>
      ))}
    </select>
  );
};

export default StatusManager;
