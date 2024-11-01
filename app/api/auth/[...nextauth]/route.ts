import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
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
      },
      async authorize(credentials) {
        // Replace this with your actual login API call or database check.
        const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        // If login is successful, return the user object.
        if (res.ok && user) {
          return user;
        }
        // Return null if login failed.
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});

// Export the handler as both GET and POST to handle NextAuth requests.
export { handler as GET, handler as POST };
