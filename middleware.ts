import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const path = req.nextUrl.pathname;

  const isContentPanelRoute = path.startsWith('/content-panel');
  const isAdminPanelRoute = path.startsWith('/admin-panel');
  const isLoginRoute = path.endsWith('/login');

  // If not authenticated and trying to access protected routes
  if (!token) {
    if (isContentPanelRoute && !isLoginRoute) {
      return NextResponse.redirect(new URL('/content-panel/login', req.url));
    }
    if (isAdminPanelRoute && !isLoginRoute) {
      return NextResponse.redirect(new URL('/admin-panel/login', req.url));
    }
    return NextResponse.next();
  }

  const userRole = token.role as string;

  // Content Panel access
  if (isContentPanelRoute && !isLoginRoute) {
    if (userRole !== 'admin' && userRole !== 'content_manager') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Admin Panel access
  if (isAdminPanelRoute && !isLoginRoute) {
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Login routes should redirect to respective panels if already logged in
  if (isLoginRoute) {
    if (
      path.startsWith('/content-panel/login') &&
      (userRole === 'admin' || userRole === 'content-manager')
    ) {
      return NextResponse.redirect(new URL('/content-panel', req.url));
    }
    if (path.startsWith('/admin-panel/login') && userRole === 'admin') {
      return NextResponse.redirect(new URL('/admin-panel', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/content-panel/:path*',
    '/admin-panel/:path*',
    '/content-panel/login',
    '/admin-panel/login',
  ],
};
