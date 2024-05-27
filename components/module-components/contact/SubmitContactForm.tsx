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
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};
export default submitContactForm;
