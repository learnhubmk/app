const FetchData = async (): Promise<any> => {
  const url = 'https://mocki.io/v1/ed331a85-c472-40e5-97eb-c15aedd6b8f2';

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(url, {
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

export default FetchData;
