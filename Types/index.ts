/* eslint-disable no-unused-vars */

import { MutationStatus, QueryStatus } from '@tanstack/react-query';
import { HTMLProps } from 'react';

export enum UserRole {
  admin = 'admin',
  content_manager = 'content_manager',
  member = 'member',
}

export type UserType = {
  id: number | string;
  is_verified: boolean;
  email: string;
  role: UserRole;
};

export interface LoginParams {
  email: string;
  password: string;
  cfTurnstileResponse: string;
  role?: string;
  remember: boolean;
}

export interface AuthContextType {
  user: UserType | null;
  login: (params: LoginParams & { userType: string; redirectUrl: string }) => void;
  logout: () => void;
  userQuery: {
    status: QueryStatus;
    error: Error | null;
    isLoading: boolean;
  };
  loginMutation: {
    isLoading: boolean;
    status: MutationStatus;
    error: Error | null;
  };
  logoutMutation: {
    isLoading: boolean;
    status: MutationStatus;
    error: Error | null;
  };
  loginStatus: MutationStatus;
}

export interface LoginResponse {
  data: {
    user: UserType;
    access_token: string;
  };
}

export interface Session {
  token: string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface MetaData {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface LoginFormProps {
  isError: boolean;
  onSubmit: (values: LoginParams) => Promise<void>;
  isLoading?: boolean;
  turnstileToken?: string | null;
  setTurnstileToken?: (token: string) => void;
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  url: string;
  alt: string;
}

export interface ReusableFormProps {
  title: string;
  fields: FormField[];
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: any) => Promise<void>;
  submitButtonText: string;
  socialLinks?: SocialLink[];
  alternativeActionText?: string;
  alternativeActionLink?: string;
  alternativeActionLinkText?: string;
}

export interface InputProps extends HTMLProps<HTMLInputElement> {
  placeholder: string;
  label: string;
  name: string;
  type: string;
  field: string;
  formik: any;
  isRequired?: boolean;
  isFooter?: boolean;
  inputClass?: string[];
}
