import { useState } from 'react';

interface Tag {
  id: string;
  name: string;
}
const useTagManagement = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'NextJS' },
  ]);
  const [showAddTag, setShowAddTag] = useState(false);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const addTag = (newTag: string) => {
    if (tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
      return false; // Tag already exists
    }

    const newId = tags.length > 0 ? (parseInt(tags[tags.length - 1].id, 10) + 1).toString() : '1';
    setTags([...tags, { id: newId, name: newTag }]);
    return true;
  };

  const handleDelete = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleChange = (id: string, field: keyof Tag, value: string) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, [field]: value } : tag)));
  };

  const handleEdit = (id: string) => {
    setEditingTagId(id);
  };

  const handleSave = (id: string, newName: string) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, name: newName } : tag)));
    setEditingTagId(null);
  };

  const handleCancel = () => {
    setEditingTagId(null);
  };

  return {
    tags,
    showAddTag,
    editingTagId,
    addTag,
    handleDelete,
    handleChange,
    handleEdit,
    handleSave,
    handleCancel,
    setShowAddTag,
  };
};

export default useTagManagement;
