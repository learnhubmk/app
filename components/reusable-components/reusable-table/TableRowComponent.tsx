import React from 'react';
import style from './tableRowComponent.module.scss';
import ActionDropdown from './ActionDropdown';

interface UserData {
  first_name: string;
  last_name: string;
  role: string;
}

interface TableRowComponentProps {
  data: UserData;
}

const TableRowComponent = ({ data }: TableRowComponentProps) => {
  return (
    <tr className={style.rowComponent}>
      <td className={style.firstName}>{data.first_name}</td>
      <td className={style.lastName}>{data.last_name}</td>
      <td className={style.role}>{data.role}</td>
      <ActionDropdown />
    </tr>
  );
};

export default TableRowComponent;
