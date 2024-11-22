'use client';

import React, { useState } from 'react';
import Loading from '../../../app/loading';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import useGetMembers from '../../../apis/queries/members/getMembers';
import { MemberResponse, TransformedMember } from '../../../apis/queries/members/types';
import styles from './MemberManagementClient.module.scss';
import Pagination from '../../reusable-components/pagination/Pagination';

const MemberManagementClient = ({ initialData }: { initialData: MemberResponse }) => {
  const [paginationPage, setPaginationPage] = useState(1);
  const { data, isLoading, isError } = useGetMembers({ initialData }, paginationPage);
  const headers: (keyof TransformedMember)[] = [
    'first_name',
    'last_name',
    'email',
    'status',
    'role',
  ];
  const displayNames = {
    first_name: 'Име',
    last_name: 'Презиме',
    email: 'Email',
    status: 'Статус',
    role: 'Улога',
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Sorry, There was an Error</div>;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.table}>
        <ReusableTable<TransformedMember>
          isLoading={isLoading}
          headers={headers}
          displayNames={displayNames}
          data={data.data}
        />

        <Pagination meta={data.meta} setPage={setPaginationPage} />
      </div>
    </div>
  );
};

export default MemberManagementClient;
