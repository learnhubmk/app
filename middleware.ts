import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const { pathname } = req.nextUrl;

      if (pathname.startsWith('/admin-dashboard') && token?.role === 'admin') {
        return true;
      }

      if (
        pathname.startsWith('/content-panel') &&
        (token?.role === 'admin' || token?.role === 'content-manager')
      ) {
        return true;
      }

      return false;
    },
  },
  pages: {
    signIn: '/content-panel/login',
  },
});

export const config = {
  matcher: ['/admin-dashboard/dashboard', '/content-panel/blogs'],
};
