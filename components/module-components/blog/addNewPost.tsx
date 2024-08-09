'use client';

import useAddNewPost from '../../../api/mutations/blogs/useAddNewPost';

const AddNewPost = () => {
  const addNewPostMutation = useAddNewPost();

  const handleAddPost = () => {
    addNewPostMutation.mutate({ userId: 1, title: 'Kire', body: 'test' });
  };

  return (
    <div>
      {addNewPostMutation.isPending ? (
        'Adding post...'
      ) : (
        <>
          {addNewPostMutation.isError ? (
            <div>An error occurred: {addNewPostMutation.error.message}</div>
          ) : null}

          {addNewPostMutation.isSuccess ? <div>Added new post</div> : null}

          <button type="button" onClick={handleAddPost}>
            Add New Post
          </button>
        </>
      )}
    </div>
  );
};

export default AddNewPost;
