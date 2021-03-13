const API = process.env.API;

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    console.log(data[0])
    return data[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;