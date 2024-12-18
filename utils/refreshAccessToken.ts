/* eslint-disable no-console */
import { JWT } from 'next-auth/jwt';

export default async function refreshAccessToken(token: JWT, TOKEN_EXPIRATION_TIME: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

  try {
    console.log('Refreshing access token for:', token);

    const res = await fetch(`${apiUrl}/content/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await res.json();
    console.log('New token:', data.new_token);

    return {
      ...token,
      accessToken: data.new_token,
      accessTokenExpires: TOKEN_EXPIRATION_TIME + Date.now(),
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
