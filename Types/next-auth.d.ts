/* eslint-disable */
/* tslint:disable */
/* eslint-disable @typescript-eslint/no-unused-vars */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { UserRole} from '../Types';

declare module 'next-auth' {
  interface Session {
    accessToken: string | unknown;
    expires: string;
    user: {
      id: string | unknown;
      name?: string | unknown;
      email?: string | unknown;
      image?: string | unknown;
      role: string | UserRole;
    };
  }
}

declare module 'next-auth' {
  interface JWT {
    accessToken?: string;
    id: string;
    name?: string;
    email?: string;
    exp?: number;
    role?: string | UserRole;
  }
}
declare module 'next-auth' {
  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    accessToken?: string;
    remember?: boolean;
    role?: string | UserRole;
  }
}
