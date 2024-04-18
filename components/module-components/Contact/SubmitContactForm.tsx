import axios, { AxiosResponse } from 'axios';

export interface ContactFormData {
  first_name: string;
  last_name?: string;
  email: string;
  subject?: string;
  message: string;
  'cf-turnstile-response'?: string;
}

type ContactFormResponse = AxiosResponse<any>;

export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactFormResponse> => {
  try {
    const response = await axios.post('https://api.learnhub.mk/contact', formData);
    return response;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export default submitContactForm;
