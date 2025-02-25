import React from 'react';
import { TagObject } from '../../module-components/blog/TagInput';

export interface IAuthFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Tag {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface IPasswordValidation {
  uppercase: boolean;
  specialChar: boolean;
  minLength: boolean;
}
export interface Author {
  first_name: string;
  last_name: string;
}
export interface BlogDetailsCardProps {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  author: Author;
  publishDate: string;
  tags: TagObject[];
  status: string;
  onImageChange: (files: File[]) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => void;
  onDeleteClick: (id: string) => void;
  onCancelClick: () => void;
  imageError: string | null;
  onValidationError: (error: string) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface BlogDetailsData {
  title: string;
  image: string;
  content: string;
  author: Author;
  publishDate: string;
  tags: TagObject[];
  status: string;
  id: string;
}
