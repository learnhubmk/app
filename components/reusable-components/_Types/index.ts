import React from 'react';

export interface BlogDetailsCardProps {
  title: string;
  imageUrl: string;
  content: string;
  publishDate: string;
  tags: string[];
  onImageChange: (files: File[]) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => void;
  onDeleteClick: () => void;
  onCancelClick: () => void;
  imageError: string | null;
  onValidationError: (error: string) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Author {
  firstName: string;
  lastName: string;
}

export interface BlogDetailsData {
  title: string;
  image: string;
  content: string;
  author: Author;
  publishDate: string;
  tags: string[];
}
