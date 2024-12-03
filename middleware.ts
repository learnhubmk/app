import { NextRequest, NextResponse } from 'next/server';

const authorizedRoles = new Map<string, string[]>();
authorizedRoles.set('/admin-dashboard', ['admin']);
authorizedRoles.set('/content-panel', ['admin', 'content-manager']);
authorizedRoles.set('/platform', ['member']);

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  console.log(`Middleware triggered for path: ${pathname}`);

  const response = NextResponse.next();

  if (
    pathname === '/' ||
    pathname.startsWith('/public') ||
    pathname.startsWith('/admin-dashboard/login') ||
    pathname.startsWith('/content-panel/login') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/static')
  ) {
    console.log('Public or static path, allowing access.');
    return response;
  }

  const sessionCookie = request.cookies.get('session');
  if (!sessionCookie) {
    console.log('No session cookie found.');
    if (pathname.startsWith('/admin-dashboard')) {
      console.log('Redirecting to admin login.');
      return NextResponse.redirect(new URL('/admin-dashboard/login', request.url));
    }
    if (pathname.startsWith('/content-panel')) {
      console.log('Redirecting to content panel login.');
      return NextResponse.redirect(new URL('/content-panel/login', request.url));
    }
    console.log('Redirecting to general login page.');
    return NextResponse.redirect(new URL('/content-panel', request.url));
  }

  const session = JSON.parse(sessionCookie.value);
  console.log(`Session found: ${JSON.stringify(session)}`);

  let isAuthorized = false;
  authorizedRoles.forEach((roles, path) => {
    if (pathname.startsWith(path) && roles.includes(session.role)) {
      isAuthorized = true;
    }
  });

  if (!isAuthorized) {
    console.log('User not authorized, redirecting to /error.');
    return NextResponse.redirect(new URL('/error', request.url));
  }

  console.log('User authorized, allowing access.');
  return response;
}
