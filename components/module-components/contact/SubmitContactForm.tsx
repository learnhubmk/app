import { useMutation } from '@tanstack/react-query';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  cfTurnstileResponse: string;
}

type ContactFormResponse = any;

export const submitContactFormFn = async (
  formData: ContactFormData
): Promise<ContactFormResponse> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/contact'!;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers,
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData.message;
};

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: submitContactFormFn,
  });
};

export default useSubmitContactForm;
