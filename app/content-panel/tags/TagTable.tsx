'use client';

import React, { useState } from 'react';
import ReusableTable from '../../../components/reusable-components/reusable-table/ReusableTable';
import Button from '../../../components/reusable-components/button/Button';

interface Tag {
  id: string;
  name: string;
}

const TagTable: React.FC = () => {
  const [tags] = useState<Tag[]>([
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'NextJS' },
  ]);

  const headers: (keyof Tag)[] = ['name'];
  const displayNames: { [key in keyof Tag]?: string } = { name: 'Tag Name' };

  const handleEdit = (id: string) => {
    console.log('Edit tag', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete tag', id);
  };

  const renderActions = (item: Tag) => (
    <>
      <Button
        type="button"
        buttonText="Edit"
        buttonClass={['editButton']}
        onClick={() => handleEdit(item.id)}
      />

      <Button
        type="button"
        buttonText="Delete"
        buttonClass={['deleteButton']}
        onClick={() => {
          handleDelete(item.id);
        }}
      />
    </>
  );

  return (
    <ReusableTable<Tag>
      headers={headers}
      displayNames={displayNames}
      data={tags}
      renderActions={renderActions}
    />
  );
};

export default TagTable;
