const transformedMemberData = (rawMember: any) => ({
  id: rawMember.id,
  updated_at: rawMember.updated_at,
  first_name: rawMember.profile.first_name,
  last_name: rawMember.profile.last_name,
  image: rawMember.profile.image,
  email: rawMember.email,
  status: rawMember.status,
  role: rawMember.role,
  profile: {
    id: rawMember.profile.id,
    created_at: rawMember.profile.created_at,
    updated_at: rawMember.profile.updated_at,
  },
  created_at: rawMember.created_at,
});

export default transformedMemberData;
