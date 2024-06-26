export interface NewsletterFormData {
  first_name: string;
  email: string;
  'cf-turnstile-response': string;
}

export const submitNewsletterForm = async (formData: NewsletterFormData): Promise<string> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/newsletter-subscribers'!;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const response = await fetch(url, {
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

export default submitNewsletterForm;
