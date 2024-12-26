import { MetaData } from '../../../Types';

export interface Author {
  first_name: string;
  last_name: string;
}

export interface Tag {
  name: string;
}

export interface RawBlogPost {
  id: string;
  status: string;
  slug: string;
  title: string;
  tags: Tag[];
  author: Author;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  status: string;
  author: string;
}

export interface BlogsResponse {
  data: RawBlogPost[];
  meta: MetaData;
}
