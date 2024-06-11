const url = 'http://localhost:3001/users';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const fetchData = async (): Promise<any> => {
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

const fetchUserById = async (id: string): Promise<any> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

const updateData = async (id: string, data: any): Promise<any> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

// Delete user
const deleteData = async (id: string): Promise<void> => {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
};

export { fetchUserById, updateData, deleteData };
export default fetchData;
