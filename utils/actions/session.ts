'use server';

import { cookies } from 'next/headers';
import { Role } from '../../app/context/authContext';

type Session = {
  token: string;
  role: Role;
};

export async function setSession(session: Session): Promise<void> {
  const cookie = JSON.stringify(session);
  cookies().set('session', cookie, {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
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
