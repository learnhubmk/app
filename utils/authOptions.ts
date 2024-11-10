import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

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
      // This provider allows users to log in with an email and password.
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        cfTurnstileResponse: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        // Replace this with your actual login API call or database check.
        const res = await fetch(`${baseUrl}/content/login`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            cfTurnstileResponse: credentials?.cfTurnstileResponse,
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
          const { user } = data.data;
          // If we get here, we have a successful login
          // Return the user object that will be saved in the token
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            accessToken: data.data.access_token, // If your API returns a token
          };
        }
        // Return null if login failed.
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.accessToken = user.accessToken;
  //       token.id = user.id;
  //       token.name = user.name;
  //       token.email = user.email;
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     // Add the access token and user ID to the session

  //     session.user.id = token.id as string;
  //     session.accessToken = token.accessToken as string;
  //     session.user.email = token.email as string;
  //     session.user.name = token.name as string;

  //     return session;
  //   },
  // },
  callbacks: {
    async jwt({ token, user }) {
      const newToken = { ...token };
      if (user) {
        newToken.accessToken = user.accessToken;
        newToken.id = user.id;
        newToken.name = user.name;
        newToken.email = user.email;
      }
      return newToken;
    },

    async session({ session, token }) {
      const newSession = { ...session };
      newSession.accessToken = token.accessToken;
      newSession.user.id = token.id;
      newSession.user.email = token.email;
      newSession.user.name = token.name;
      return newSession;
    },
  },
  pages: {
    signIn: '/control-panel/login', // Custom login page path
  },
  secret: process.env.AUTH_SECRET,
};
