'use client';

import React, { useState } from 'react';
import ReusableTable from '../../../components/reusable-components/reusable-table/ReusableTable';
import Button from '../../../components/reusable-components/button/Button';
import ReusableModal from '../../../components/reusable-components/reusable-modal/ReusableModal';

interface Tag {
  id: string;
  name: string;
}

interface TagTableProps {
  tags: Tag[];
  onDelete: (id: string) => void;
}

const TagTable: React.FC<TagTableProps> = ({ tags, onDelete }) => {
  const [deleteTagId, setDeleteTagId] = useState<string>('');
  const headers: (keyof Tag)[] = ['name'];
  const displayNames: { [key in keyof Tag]?: string } = { name: 'Tag Name' };

  const handleEdit = (id: string) => {
    console.log('Edit tag', id);
  };

  const renderActions = (item: Tag) => (
    <>
      <Button
        type="button"
        buttonText="Edit"
        buttonClass={['editButton']}
        onClick={() => handleEdit(item.id)}
        aria-label={`Edit ${item.name}`}
      />
      <Button
        type="button"
        buttonText="Delete"
        buttonClass={['deleteButton']}
        onClick={() => setDeleteTagId(item.id)}
        aria-label={`Delete ${item.name}`}
      />
    </>
  );

  return (
    <>
      <ReusableTable<Tag>
        headers={headers}
        displayNames={displayNames}
        data={tags}
        renderActions={renderActions}
      />

      <ReusableModal
        isOpen={!!deleteTagId}
        title="Delete Tag"
        description="Are you sure you want to delete this tag?"
        onClose={() => setDeleteTagId('')}
        onPrimaryButtonClick={() => {
          onDelete(deleteTagId);
          setDeleteTagId('');
        }}
      />
    </>
  );
};

export default TagTable;
