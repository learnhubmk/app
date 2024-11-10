/* eslint-disable */
/* tslint:disable */
/* eslint-disable @typescript-eslint/no-unused-vars */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string | unknown;
    expires: string;
    user: {
      id: string | unknown;
      name?: string | unknown;
      email?: string | unknown;
      image?: string | unknown;
    };
  }

  interface User extends DefaultUser {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
    id: string;
    name?: string;
    email?: string;
  }
}
