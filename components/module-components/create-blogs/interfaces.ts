import { MetaData } from '../../../Types';

export interface Author {
  first_name: string;
  last_name: string;
}

export interface Tag {
  name: string;
}

export interface BlogPostAPI {
  slug: string;
  title: string;
  tags: Tag[];
  author: Author;
}

export interface BlogPost {
  id: string;
  title: string;
  tags: Tag[];
  author: string;
}

export interface BlogsResponse {
  data: BlogPostAPI[];
  meta: MetaData;
}
