import POSTS_DATA from '../../../data/posts/Posts';

const GET = () => {
  return Response.json(POSTS_DATA);
};

// eslint-disable-next-line import/prefer-default-export
export { GET };
