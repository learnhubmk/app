import NextAuth from 'next-auth';
import { authOptions } from '../../../../utils/authOptions';

const handler = NextAuth(authOptions);

// Export the handler as both GET and POST to handle NextAuth requests.
export { handler as GET, handler as POST };
