import { MiddlewareConfig, NextRequest } from 'next/server';
import updateSession from './utils/middlewares/updateSession';

export default async function middleware(request: NextRequest) {
  // eslint-disable-next-line no-return-await
  return await updateSession(request);
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
