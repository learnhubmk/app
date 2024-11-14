import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// example....NOT final

export function middleware(reg: NextRequest) {
  const url = reg.nextUrl.clone();
  const token = reg.cookies.get('authToken')?.value; // Auth token to check if user is logged in
  const userRole = reg.cookies.get('userRole')?.value; // Role stored in cookie

  // Redirect unauthenticated users to login
  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Role-based access control
  const path = url.pathname;

  // Admin Panel - restricted to 'admin' only
  if (path.startsWith('/admin-dashboard') && userRole !== 'admin-dashboard') {
    url.pathname = '/forbidden';
    return NextResponse.rewrite(url); // or redirect to error page
  }

  // Content Panel - accessible by 'admin' and 'content-manager'
  if (
    path.startsWith('/content-panel') &&
    !(userRole && ['admin', 'content-manager'].includes(userRole))
  ) {
    url.pathname = '/forbidden';
    return NextResponse.rewrite(url);
  }

  // Platform -accessible by 'member' role
  if (path.startsWith('/platform') && userRole !== 'member') {
    url.pathname = '/forbidden';
    return NextResponse.rewrite(url);
  }

  // Allow access if role is correct
  return NextResponse.next();
}

// Configure middleware to apply only to specified routes
export const config = {
  matcher: ['admin/:path*', 'content-panel:path*', 'platform/:path*'],
};

export default middleware;
