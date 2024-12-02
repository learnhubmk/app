import { LoginParams, LoginResponse, Role, UserType } from '../Types';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from './utils/localStorageUtils';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export const getUser = async (): Promise<UserType | null> => {
  const session = getFromLocalStorage('session');
  if (!session?.token) {
    console.log('No session token found, user is not authenticated');
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}/content/user`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log('Unauthorized access, clearing session');
        removeFromLocalStorage('session');
        removeFromLocalStorage('user');
      }
      throw new Error(response.statusText || 'An error occurred while fetching the user');
    }

    const data = await response.json();
    console.log('User data fetched successfully:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const login = async ({
  email,
  password,
  cfTurnstileResponse,
}: LoginParams): Promise<LoginResponse> => {
  console.log('Login attempt for email:', email);

  try {
    const response = await fetch(`${baseUrl}/content/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, cfTurnstileResponse }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Login error:', data);
      if (response.status === 422) {
        const errorMessage = data.message || 'Validation failed';
        const errors = data.errors || {};
        throw new Error(JSON.stringify({ message: errorMessage, errors }));
      }
      throw new Error(data.message || 'An error occurred while logging in');
    }

    console.log('Login successful');

    if (data.data && data.data.access_token && data.data.user) {
      console.log('Setting session and user data');
      saveToLocalStorage('session', {
        token: data.data.access_token,
        role: Role.content,
      });
      saveToLocalStorage('user', data.data.user);
    } else {
      console.error('Login response is missing expected data');
      throw new Error('Invalid login response data');
    }

    return data;
  } catch (error) {
    console.error('Login process failed:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  const session = getFromLocalStorage('session');
  if (!session?.token) {
    console.log('No session found, user is already logged out');
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/content/logout`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred while logging out');
    }

    console.log('Logout successful');
  } catch (error) {
    console.error('Logout process failed:', error);
    throw error;
  } finally {
    console.log('Clearing session');
    removeFromLocalStorage('session');
    removeFromLocalStorage('user');
  }
};
