'use client';

import useGetMemberDetails from '../../../apis/queries/members/getMemberDetails';
import Loading from '../../../app/loading';
import { TransformedMember } from '../../../apis/queries/members/types';

const MemberDetailsClient = ({
  initialData,
  userId,
}: {
  initialData: TransformedMember;
  userId: string;
}) => {
  const { data, isLoading, isError } = useGetMemberDetails(userId, initialData);

  if (isLoading) return <Loading />;

  if (isError) return <div>Настана грешка</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default MemberDetailsClient;
