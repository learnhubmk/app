import { MutationStatus, QueryStatus } from '@tanstack/react-query';

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

export enum Role {
  admin = 'admin',
  content_manager = 'content_manager',
  content = 'content',
  member = 'member',
}

export enum AuthMiddleware {
  auth = 'auth',
  guest = 'guest',
}

export type UserType = {
  id: number | string;
  is_verified: boolean;
  email: string;
  role: Role;
};

export interface AuthContextType {
  user?: UserType | null;
  login: (params: LoginParams) => void;
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

export interface LoginParams {
  email: string;
  password: string;
  cfTurnstileResponse: string;
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
