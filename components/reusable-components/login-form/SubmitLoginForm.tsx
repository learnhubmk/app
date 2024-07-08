export interface LoginFormData {
  email: string;
  password: string;
  cfTurnstileResponse: string;
}

type LoginFormResponse = any;

export const submitLoginForm = async (formValues: LoginFormData): Promise<LoginFormResponse> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/login'!;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers,
    body: JSON.stringify(formValues),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData.message;
};

export default submitLoginForm;
