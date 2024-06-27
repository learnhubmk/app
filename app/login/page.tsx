import IndividualBlogPost from '../../components/reusable-components/individual-blog-post/IndividualBlogPost';
import { paragraphsData } from '../../data/BlogData';

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

const Login = () => {
  return (
    <IndividualBlogPost
      title="Наслов"
      postInfo={PostInfoData}
      paragraphs={paragraphsData.map((paragraph) => paragraph.content)}
      tags={['Tag 1', 'Tag 2', 'Tag 3']}
    />
  );
};

export default Login;
