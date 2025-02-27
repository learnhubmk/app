import { useMutation } from '@tanstack/react-query';
import ENDPOINTS from '../../endpoints';
import { useAxios } from '../../AxiosProvider';

export interface NewsletterFormData {
  first_name: string;
  email: string;
  'cf-turnstile-response': string;
}

export const useSubmitNewsletterForm = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async (formData: NewsletterFormData) => {
      const response = await axios.post(ENDPOINTS.NEWSLETTER.SUBSCRIBE, formData);
      return response.data.message;
    },
  });
};
