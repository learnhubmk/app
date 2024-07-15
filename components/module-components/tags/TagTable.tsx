'use client';

import React from 'react';
import Button from '../../reusable-components/button/Button';
import ReusableTable from '../../reusable-components/reusable-table/ReusableTable';

interface Tag {
  id: string;
  name: string;
}

interface TagTableProps {
  tags: Tag[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

const TagTable: React.FC<TagTableProps> = ({ tags, handleEdit, handleDelete }) => {
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
