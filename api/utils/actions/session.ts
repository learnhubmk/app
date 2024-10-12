import { Session, UserType } from '../../../_Types';

export const setSession = async (sessionData: Session | null): Promise<void> => {
  console.log('setSession called with:', sessionData);
  if (sessionData === null) {
    localStorage.removeItem('session');
    console.log('Session removed from localStorage');
  } else {
    localStorage.setItem('session', JSON.stringify(sessionData));
    console.log('Session saved to localStorage', localStorage.getItem('session'));
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
  console.log('setUser called with:', user);
  if (user === null) {
    localStorage.removeItem('user');
    console.log('User removed from localStorage');
  } else {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('User saved to localStorage');
  }
};

export const getUserFromStorage = async (): Promise<UserType | null> => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};
