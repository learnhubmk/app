'use client';

import React from 'react';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';
import Button from '../../reusable-components/button/Button';

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
  renderEditInput: (tag: Tag) => React.ReactNode;
}

const TagTable: React.FC<TagTableProps> = ({
  tags,
  editingTagId,
  onEdit,
  onSave,
  onCancel,
  renderEditInput,
}) => {
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
            onClick={() => {}}
            aria-label={`Избриши го ${item.name}`}
          />
        </>
      )}
    </>
  );

  return (
    <ReusableTable<Tag>
      headers={headers}
      displayNames={displayNames}
      data={tags}
      renderActions={renderActions}
      editingTagId={editingTagId}
      renderEditInput={renderEditInput}
    />
  );
};

export default TagTable;
