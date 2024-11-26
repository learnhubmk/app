export type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  image: string | null;
  created_at: string;
  updated_at: string;
};

export type TransformedMember = {
  id: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  image: string | null;
  email: string;
  status: string;
  role: string;
  profile: {
    id: string;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
};

export type Member = {
  id: string;
  email: string;
  status: string;
  role: string;
  profile: Profile;
  created_at: string;
  updated_at: string;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type Links = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type MemberResponse = {
  data: Member[];
  links: Links;
  meta: Meta;
};

export type MemberDetailsResponse = {
  data: {
    data: Member;
  };
};
