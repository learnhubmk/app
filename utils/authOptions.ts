/* eslint-disable no-console */
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import refreshAccessToken from './refreshAccessToken';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const TOKEN_EXPIRATION_TIME = 10000; // 1 minute for testing purposes

/* eslint-disable import/prefer-default-export */

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        cfTurnstileResponse: { label: 'Token', type: 'text' },
        remember: { label: 'Remember me', type: 'checkbox' },
        userType: { label: 'User Type', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.userType) {
          console.error('User type is missing');
          return null;
        }

        let endpoint = '';
        switch (credentials.userType) {
          case 'content-manager':
            endpoint = `${apiUrl}/content/login`;
            break;
          case 'admin':
            endpoint = `${apiUrl}/admin/login`;
            break;
          case 'member':
            endpoint = `${apiUrl}/login`;
            break;
          default:
            console.error('Invalid user type');
            return null;
        }

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            cfTurnstileResponse: credentials?.cfTurnstileResponse,
            remember: credentials?.remember,
          }),
        });

        if (!res.ok) {
          // eslint-disable-next-line no-console
          console.error(`Failed to authenticate: ${res.status} ${res.statusText}`);
          return null;
        }

        const data = await res.json();

        // If login is successful, return the user object.
        if (res.ok) {
          const rememberUser = credentials?.remember === 'true';
          const { user } = data.data;

          return {
            id: user.id,
            email: user.email,
            role: user.role,
            remember: rememberUser,
            accessToken: data.data.access_token,
            accessTokenExpires: TOKEN_EXPIRATION_TIME + Date.now(),
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback - Token:', token);

      if (user) {
        return {
          ...token,
          ...user,
          accessTokenExpires: TOKEN_EXPIRATION_TIME + Date.now(),
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      console.log('Access token expired. Refreshing...');
      const refreshedToken = await refreshAccessToken(token, TOKEN_EXPIRATION_TIME);
      return refreshedToken;
    },

    async session({ session, token }) {
      if (token.error) return session;

      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          id: token.id,
          email: token.email,
          role: token.role,
        },
      };
    },
  },

  secret: process.env.AUTH_SECRET,
};
