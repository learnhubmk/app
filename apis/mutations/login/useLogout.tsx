import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type ErrorResponse = {
  message: string;
  statusCode?: number;
};
const useLogout = (redirectUrl: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error?.response?.data?.message || 'Одјавувањето не успеа.');
    },
    onSuccess: () => {
      router.push(redirectUrl);
      toast.success('Одјавувањето беше успешно.');
    },
  });
};

export default useLogout;
