export interface NewsletterFormData {
  first_name: string;
  email: string;
  'cf-turnstile-response': string;
}

type NewsletterFormResponse = any;

export const submitNewsletterForm = async (
  formData: NewsletterFormData
): Promise<NewsletterFormResponse> => {
  const url = new URL('https://staging-api.learnhub.mk/newsletter-subscribers');

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

export default submitNewsletterForm;
