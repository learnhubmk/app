import React from 'react';
import style from './tableRowComponent.module.scss';
import ActionDropdown from './ActionDropdown';

interface TableRowComponentProps {
  data: any;
}

const TableRowComponent = ({ data }: TableRowComponentProps) => {
  return (
    <tr>
      <td className={style.name}>{data.first_name}</td>
      <td className={style.name}>{data.last_name}</td>
      <td className={style.role}>{data.role}</td>
      <ActionDropdown />
    </tr>
  );
};

export default TableRowComponent;
