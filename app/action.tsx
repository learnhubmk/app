'use server';

const fetchBlogPosts = async (nextPosts: number, pageTitle: string, blogCardsNumber: number) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${blogCardsNumber}&skip=${nextPosts}`
    );

    const data = await response.json();

    return data?.posts;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default fetchBlogPosts;
