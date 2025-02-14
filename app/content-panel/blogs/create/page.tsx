import PublishArticleForm from '../../../../components/module-components/blog/PublishArticleForm';
import TitleContentLayout from '../../../../components/reusable-components/title-content-layout/TitleContentLayout';

const PostArticle = () => {
  return (
    <TitleContentLayout title="Објави статија">
      <PublishArticleForm />
    </TitleContentLayout>
  );
};

export default PostArticle;
