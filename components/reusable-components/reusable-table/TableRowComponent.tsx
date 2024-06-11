import React from 'react';
import style from './tableRowComponent.module.scss';
import ActionDropdown from './ActionDropdown';

export interface UserData {
  first_name: string;
  last_name: string;
  role: string;
  id: string;
}

interface TableRowComponentProps {
  data: UserData;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TableRowComponent = ({ data, onView, onEdit, onDelete }: TableRowComponentProps) => {
  return (
    <tr className={style.rowComponent}>
      <td aria-label="Checkbox">
        <input type="checkbox" />
      </td>
      <td
        onClick={onView}
        className={style.clickable}
        aria-label={`View details for ${data.first_name}`}
      >
        {data.first_name}
      </td>
      <td className={style.lastName}>{data.last_name}</td>
      <td className={style.role}>{data.role}</td>
      <td className={style.actionCell} aria-label="Actions">
        <ActionDropdown onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default TableRowComponent;
