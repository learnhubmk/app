import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// example....NOT final

export function middleware(reg: NextRequest) {
  const url = reg.nextUrl.clone();
  const token = reg.cookies.get('authToken'); // Auth token to check if user is logged in
  // const userRole = reg.cookies.get('userRole'); // Role stored in cookie

  // Redirect unauthenticated users to login
  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Allow access if role is correct
  return NextResponse.next();
}

export default middleware;
