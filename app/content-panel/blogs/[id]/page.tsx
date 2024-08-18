const BlogDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Blog Details Page</h1>
      <p>blog page id: {params.id} </p>
    </div>
  );
};

export default BlogDetailsPage;
