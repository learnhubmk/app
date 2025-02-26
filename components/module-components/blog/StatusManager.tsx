import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { UserRole } from '../../../Types';
import styles from './PublishArticleForm.module.scss';
import capitalizeAndFormatString from '../../../api/utils/blogStatusUtils';

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'in_review', label: 'In Review' },
  { value: 'published', label: 'Published' },
] as const;
interface StatusManagerProps {
  currentStatus: string;
  handleStatusChange: (newValue: string) => void;
}

const StatusManager: React.FC<StatusManagerProps> = ({ currentStatus, handleStatusChange }) => {
  const { data: session } = useSession();
  const userRole = session?.user.role;

  const currentStatusOptions =
    userRole === UserRole.admin
      ? statusOptions
      : statusOptions.filter((option) => option.value !== 'published');

  useEffect(() => {
    if (currentStatus === 'published' && userRole !== UserRole.admin) {
      handleStatusChange(currentStatusOptions[0].value);
    }
  }, [currentStatus, userRole, handleStatusChange, currentStatusOptions]);

  return (
    <select
      name="status"
      className={styles.dropdown}
      value={currentStatus}
      onChange={(event) => {
        handleStatusChange(event.target.value);
      }}
    >
      {currentStatusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {capitalizeAndFormatString(option.value)}
        </option>
      ))}
    </select>
  );
};

export default StatusManager;
