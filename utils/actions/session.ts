'use server';

import { cookies } from 'next/headers';
import { Role } from '../../Types';
import getAuthUrl from '../getAuthUrl';

type Session = {
  token: string;
  role: Role;
};

type RefreshTokenResponse = { message: string; new_token: string };

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function setSession(session: Session): Promise<void> {
  const cookie = JSON.stringify(session);
  cookies().set('session', cookie, {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
    httpOnly: false,
  });
}

export async function getSession(): Promise<Session | null> {
  const session = cookies().get('session');
  return session ? JSON.parse(session.value) : null;
}

export async function clearSession(): Promise<void> {
  cookies().delete('session');
}

export async function getNewToken({
  role,
  existingToken,
}: {
  role: Role;
  existingToken: string;
}): Promise<string | null> {
  try {
    const response = await fetch(`${getAuthUrl(baseUrl, role)}/refresh`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${existingToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) throw new Error(response.statusText);
    const data: RefreshTokenResponse = await response.json();
    return data.new_token;
  } catch (error: any) {
    console.error({ msg: 'Error from getNewToken', error });
    return null;
  }
}
