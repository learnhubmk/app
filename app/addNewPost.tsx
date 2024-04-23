'use client';

import { useMutation } from '@tanstack/react-query';

type User = {
  title: string;
  body: string;
  userId: number;
};

const AddNewPost = () => {
  const mutation = useMutation({
    mutationFn: async (newUser: User) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          newUser,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await response.json();
      return data;
    },
  });

  return (
    <div>
      {mutation.isPending ? (
        'Adding post...'
      ) : (
        <>
          {mutation.isError ? <div>An error occurred: {mutation.error.message}</div> : null}

          {mutation.isSuccess ? <div>Added new post</div> : null}

          <button
            type="button"
            onClick={() => {
              mutation.mutate({ userId: 1, title: 'Kire', body: 'test' });
            }}
          >
            Add New Post
          </button>
        </>
      )}
    </div>
  );
};

export default AddNewPost;
