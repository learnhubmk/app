import { decodeJwt } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { getNewToken } from '../actions/session';

//   the COOLDOWN_PERIOD is used to prevent the middleware from running too frequently which causes the the function "getNewToken" to be called too frequently which leads to token being null
let lastUpdateTime = 0;
const COOLDOWN_PERIOD = 60 * 1000; // 1 minute cooldown

export default async function updateSession(request: NextRequest): Promise<NextResponse | unknown> {
  const response = NextResponse.next();
  const currentTime = Date.now();

  try {
    if (currentTime - lastUpdateTime < COOLDOWN_PERIOD) {
      return response;
    }
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) return response;
    const session = JSON.parse(sessionCookie.value);

    if (!session.token || !session.role) return response;
    const parsedSession = decodeJwt(session.token);

    if (!parsedSession.exp) return response;

    const timeUntilExpiry = parsedSession.exp - Math.floor(currentTime / 1000);
    if (timeUntilExpiry > 600) return response; // If the token is not expiring in the next 10 minutes, do not update it
    const newToken = await getNewToken({ role: session.role, existingToken: session.token });
    if (!newToken) {
      response.cookies.delete('session');
      return response;
    }

    const newSession = JSON.stringify({ role: session.role, token: newToken });
    response.cookies.set('session', newSession, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: false,
    });
    lastUpdateTime = currentTime;
    return response;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error({ msg: 'Error from updateSession', error });
    return response;
  }
}
