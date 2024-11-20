import React from 'react';
import MemberManagementClient from '../../../components/module-components/admin-panel/MemberManagementClient';
import axiosInstance from '../../../apis/axiosInstance';
import { transformMembersResponse } from '../../../apis/queries/members/transformMembersResponse';
import ENDPOINTS from '../../../apis/endpoints';

const page = async () => {
  const response = await axiosInstance.get(ENDPOINTS.MEMBERS.GET_ALL);
  const transformedData = transformMembersResponse(response.data);

  return <MemberManagementClient initialData={transformedData} />;
};

export default page;
