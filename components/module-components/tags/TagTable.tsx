'use client';

import React, { useState } from 'react';
import Button from '../../reusable-components/button/Button';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';

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

  const handleEdit = (_id: string) => {
    // Implement edit functionality here
    // For example: openEditModal(_id) or navigate(`/edit-tag/${_id}`)
  };

  const handleDelete = (_id: string) => {
    // Implement delete functionality here
    // For example: showDeleteConfirmation(_id) or deleteTag(_id)
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
        onClick={() => handleDelete(item.id)}
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
