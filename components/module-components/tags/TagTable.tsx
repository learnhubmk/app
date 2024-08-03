'use client';

import React, { useState } from 'react';
import Button from '../../reusable-components/button/Button';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import ReusableModal from '../../reusable-components/reusable-modal/ReusableModal';

interface Tag {
  id: string;
  name: string;
}

interface TagTableProps {
  tags: Tag[];
  handleEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TagTable: React.FC<TagTableProps> = ({ tags, handleEdit, onDelete }) => {
  const [deleteTagId, setDeleteTagId] = useState<string>('');
  const headers: (keyof Tag)[] = ['name'];
  const displayNames: { [key in keyof Tag]?: string } = { name: 'Име на таг' };

  const renderActions = (item: Tag) => (
    <>
      <Button
        type="button"
        buttonText="Измени"
        buttonClass={['editButton']}
        onClick={() => handleEdit(item.id)}
      />
      <Button
        type="button"
        buttonText="Избриши"
        buttonClass={['deleteButton']}
        onClick={() => setDeleteTagId(item.id)}
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
        title="Бришење на таг"
        description="Дали си сигурен дека сакаш да го избришеш тагот?"
        onClose={() => setDeleteTagId('')}
        primaryButtonLabel="Избриши"
        secondaryButtonLabel="Откажи"
        onPrimaryButtonClick={() => {
          onDelete(deleteTagId);
          setDeleteTagId('');
        }}
      />
    </>
  );
};

export default TagTable;
