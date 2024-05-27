export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  cfTurnstileResponse: string;
}

type ContactFormResponse = any;

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactFormResponse> => {
  const url = new URL('https://staging-api.learnhub.mk/contact');

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

export default submitContactForm;
