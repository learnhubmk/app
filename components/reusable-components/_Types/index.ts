import React from 'react';

// Authentication related interfaces
export interface IAuthFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IPasswordValidation {
  uppercase: boolean;
  specialChar: boolean;
  minLength: boolean;
}

// Blog related interfaces


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