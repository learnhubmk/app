import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

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
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }) {
      const newSession = { ...session };
      newSession.accessToken = token.accessToken;
      newSession.user.id = token.id;
      newSession.user.email = token.email;
      newSession.user.name = token.name;
      newSession.user.role = token.role;

      return newSession;
    },
  },

  secret: process.env.AUTH_SECRET,
};
