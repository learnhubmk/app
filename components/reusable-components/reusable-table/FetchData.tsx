/* eslint-disable no-unused-vars */

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const dummyDataPosts = [
  { id: 1, first_name: 'Aohn', last_name: 'Bmith', role: ' role 2' },
  { id: 2, first_name: 'Cike', last_name: 'Aowland', role: ' role 1' },
  { id: 3, first_name: 'Bablo', last_name: 'Cooney', role: ' role 3' },
];

const fetchData = async (): Promise<any[]> => {
  return dummyDataPosts;
};

const fetchPostById = async (id: number): Promise<any> => {
  const foundPost = dummyDataPosts.find((post) => post.id === id);
  if (!foundPost) {
    throw new Error(`Blog post with ID ${id} not found.`);
  }
  return foundPost;
};

const updateData = async (id: string, data: any): Promise<any> => {
  throw new Error('Update functionality not implemented yet.');
};

const deleteData = async (id: string): Promise<void> => {
  throw new Error('Delete functionality not implemented yet.');
};

export { fetchData, fetchPostById, updateData, deleteData };

// This is the old lines of code from Mario

// export interface User {
//   id: string;
//   first_name: string;
//   last_name: string;
//   role: string;
// }

// const url = 'http://localhost:3001/users';

// const headers = {
//   'Content-Type': 'application/json',
//   Accept: 'application/json',
// };

// const fetchData = async (): Promise<any[]> => {
//   const response = await fetch(url, {
//     method: 'GET',
//     headers,
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//   }

//   const responseData = await response.json();
//   return responseData;
// };

// const fetchUserById = async (id: string): Promise<any> => {
//   const response = await fetch(`${url}/${id}`, {
//     method: 'GET',
//     headers,
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//   }

//   const responseData = await response.json();
//   return responseData;
// };

// const updateData = async (id: string, data: any): Promise<any> => {
//   const response = await fetch(`${url}/${id}`, {
//     method: 'PATCH',
//     headers,
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//   }

//   const responseData = await response.json();
//   return responseData;
// };

// const deleteData = async (id: string): Promise<void> => {
//   const response = await fetch(`${url}/${id}`, {
//     method: 'DELETE',
//     headers,
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//   }
// };

// export { fetchData, fetchUserById, updateData, deleteData };
