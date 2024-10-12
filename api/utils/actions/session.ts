import { Session, UserType } from '../../../_Types';

export const setSession = async (sessionData: Session | null): Promise<void> => {
  if (sessionData === null) {
    localStorage.removeItem('session');
  } else {
    localStorage.setItem('session', JSON.stringify(sessionData));
  }
};

export const getSession = async (): Promise<Session | null> => {
  const sessionData = localStorage.getItem('session');
  return sessionData ? JSON.parse(sessionData) : null;
};

export const clearSession = async (): Promise<void> => {
  localStorage.removeItem('session');
  localStorage.removeItem('user');
};

export const setUser = async (user: UserType | null): Promise<void> => {
  if (user === null) {
    localStorage.removeItem('user');
  } else {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUserFromStorage = async (): Promise<UserType | null> => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};
