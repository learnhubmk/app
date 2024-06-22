/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from 'react';
import style from './tableRowComponent.module.scss';

interface TableRowComponentProps<T> {
  data: T;
}

const TableRowComponent = <T,>({ data }: TableRowComponentProps<T>): React.JSX.Element => {
  const { first_name, last_name, role } = data as any;

  return (
    <tr className={style.rowComponent}>
      <td className={style.firstName}>{first_name}</td>
      <td className={style.lastName}>{last_name}</td>
      <td className={style.role}>{role}</td>
    </tr>
  );
};

export default TableRowComponent;
