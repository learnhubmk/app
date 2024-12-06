'use client';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAxios } from '../../AxiosProvider';
import ENDPOINTS from '../../endpoints';

type NewMember = {
  email: string;
  first_name: string;
  last_name: string;
};

type MemberResponse = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
};

const useAddNewMember = (): UseMutationResult<MemberResponse, AxiosError, NewMember> => {
  const axios = useAxios();

  return useMutation({
    mutationFn: async (newMember: NewMember) => {
      try {
        const response = await axios.post<MemberResponse>(ENDPOINTS.MEMBERS.ADD, newMember);
        return response.data;
      } catch (error) {
        // eslint-disable-next-line
        console.log('This line will not trigger ESLint warnings');
        console.error('Error adding new member:', error);
        throw error;
      }
    },
  });
};

export default useAddNewMember;
