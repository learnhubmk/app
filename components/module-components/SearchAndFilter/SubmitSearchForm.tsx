const submitSearchForm = async (): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/blog-posts'!;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  // console.log(responseData)
  return responseData;
};

export default submitSearchForm;
