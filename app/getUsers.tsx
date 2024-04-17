async function getData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export default async function getUsers() {
  const data = await getData();
  return data;
}
