import { notFound } from 'next/navigation';
import axiosInstance from '../../../../apis/axiosInstance';
import ENDPOINTS from '../../../../apis/endpoints';
import MemberDetailsClient from '../../../../components/module-components/member-details/MemberDetailsClient';
import { MemberDetailsResponse, TransformedMember } from '../../../../apis/queries/members/types';
import transformedMemberData from '../../../../apis/queries/members/transformMemberDetailsResponse';

const MemberProfile = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  try {
    const response = await axiosInstance.get<MemberDetailsResponse>(
      `${ENDPOINTS.MEMBERS.GET_ONE}/${userId}`
    );
    const transformedData: TransformedMember = transformedMemberData(response.data.data);

    return <MemberDetailsClient initialData={transformedData} userId={userId} />;
  } catch (error: any) {
    if (error.response?.status === 404) {
      notFound();
    }

    throw error;
  }
};
export default MemberProfile;
