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
  editingTagId: string | null;
  onEdit: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  renderEditInput: (tag: Tag) => React.ReactNode;
  isLoading: boolean;
}

const TagTable: React.FC<TagTableProps> = ({
  isLoading,
  tags,
  editingTagId,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  renderEditInput,
}) => {
  const [deleteTagId, setDeleteTagId] = useState<string>('');
  const headers: (keyof Tag)[] = ['name'];
  const displayNames: { [key in keyof Tag]?: string } = { name: 'Име' };

  const renderActions = (item: Tag) => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {editingTagId === item.id ? (
        <>
          <Button
            type="button"
            buttonText="Зачувај"
            buttonClass={['saveButton']}
            onClick={onSave}
            aria-label={`Зачувај промени за ${item.name}`}
          />
          <Button
            type="button"
            buttonText="Откажи"
            buttonClass={['deleteButton']}
            onClick={onCancel}
            aria-label={`Откажи изменување на ${item.name}`}
          />
        </>
      ) : (
        <>
          <Button
            type="button"
            buttonText="Измени"
            buttonClass={['editButton']}
            onClick={() => onEdit(item.id)}
            aria-label={`Измени го ${item.name}`}
          />
          <Button
            type="button"
            buttonText="Избриши"
            buttonClass={['deleteButton']}
            onClick={() => setDeleteTagId(item.id)}
            aria-label={`Избриши го ${item.name}`}
          />
        </>
      )}
    </>
  );

  return (
    <>
      <ReusableTable<Tag>
        isLoading={isLoading}
        headers={headers}
        displayNames={displayNames}
        data={tags}
        renderActions={renderActions}
        editingTagId={editingTagId}
        renderEditInput={renderEditInput}
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
