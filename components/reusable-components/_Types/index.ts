import React from 'react';

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

export interface Author {
  firstName: string;
  lastName: string;
  authorId?: string;
}

export interface BlogDetailsData {
  title: string;
  image: string;
  content: string;
  author: Author;
  publishDate: string;
  tags: string[];
  excerpt?: string;
  slug?: string;
  authorId?: string;
}

export interface IBlogCardState {
  showModal: boolean;
  modalType: 'back' | 'cancel';
  hasUnsavedChanges: boolean;
}

export interface BlogDetailsCardProps {
  postId: string;
  blogContent: BlogDetailsData;
  states: {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  };
  actions: {
    onImageChange: (files: File[]) => void;
    onChange: (
      event: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
    ) => void;
    onDeleteClick: () => void;
    onCancelClick: () => void;
  };
  errors: {
    imageError: string | null;
    onValidationError: (error: string) => void;
  };
}

export interface UpdatePostParams {
  id: string;
  updatedPost: Partial<BlogDetailsData>;
}
