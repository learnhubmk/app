'use client';

import React from 'react';
import ReusableTable from '../../../components/reusable-components/reusable-table/ReusableTable';
import Button from '../../../components/reusable-components/button/Button';

interface Tag {
  id: string;
  name: string;
}

interface TagTableProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const TagTable: React.FC<TagTableProps> = ({ tags, setTags }) => {
  const headers: (keyof Tag)[] = ['name'];
  const displayNames: { [key in keyof Tag]?: string } = { name: 'Tag Name' };

  const handleEdit = (id: string) => {
    console.log('Edit tag', id);
  };

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
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
