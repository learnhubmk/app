import { useMutation } from '@tanstack/react-query';
import ENDPOINTS from '../../endpoints';
import { useAxios } from '../../AxiosProvider';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  cfTurnstileResponse: string;
}

export const useSubmitContactForm = () => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const response = await axios.post(ENDPOINTS.CONTACT.SUBMIT, formData);
      return response.data.message;
    },
  });
};
