import { LoginParams, LoginResponse, Role, UserType } from '../_Types';
import { getSession, setSession, clearSession } from '../utils/actions/session';
import { setUser } from './utils/actions/session';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const USE_MOCK_API = false;

const mockLogin = async ({ email, password }: LoginParams): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'test@example.com' && password === 'password123') {
    const mockUser: UserType = {
      id: '1',
      email: 'test@example.com',
      is_verified: true,
      role: Role.content,
    };

    const mockResponse: LoginResponse = {
      data: {
        user: mockUser,
        access_token: 'mock_access_token_' + Math.random().toString(36).substr(2, 9),
      },
    };

    return mockResponse;
  } else {
    throw {
      status: 422,
      message: 'The provided credentials are incorrect.',
      errors: {
        email: ['These credentials do not match our records.'],
      },
    };
  }
};

export const getUser = async (): Promise<UserType | null> => {
  const session = await getSession();
  if (!session?.token) return null;

  try {
    const response = await fetch(`${baseUrl}/content/user`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        await clearSession();
      }
      throw new Error(response.statusText || 'An error occurred while fetching the user');
    }

    const data = await response.json();
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
  if (USE_MOCK_API) {
    return mockLogin({ email, password, cfTurnstileResponse });
  }

  // Real API login
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

  if (data.data && data.data.access_token && data.data.user) {
    await setSession({
      token: data.data.access_token,
      role: Role.content,
    });
    await setUser(data.data.user);
  }

  return data;
};

export const logout = async (): Promise<void> => {
  const session = await getSession();
  if (!session?.token) throw new Error('No session found');

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
  } finally {
    await clearSession();
  }
};
