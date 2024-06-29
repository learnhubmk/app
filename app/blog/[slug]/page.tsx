import IndividualBlogPost from '../../../components/reusable-components/individual-blog-post/IndividualBlogPost';

interface PostInfo {
  author: string;
  category: string;
  postedOn: string;
}

const PostInfoData: PostInfo = {
  author: 'Автор',
  category: 'Категорија',
  postedOn: 'Постирано на',
};

const BlogPost = () => {
  return (
    <IndividualBlogPost
      title="Наслов"
      postInfo={PostInfoData}
      paragraph="Project descrpiscing elit, sed do boredipiscing elit, sed dmpor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreProject description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreProject description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreProject description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Project description consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Project description consectetur adipiscing elit, sed do eiusmo"
      tags={['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7']}
    />
  );
};

export default BlogPost;
