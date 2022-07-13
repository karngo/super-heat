import axios from "axios";

const makeRequest = async (inputs = {}) => {
  let { url, type } = inputs || {};
  type = type.toLowerCase();

  const axiosConfiguration = {
    method: type || "get",
    url,
  };

  const response = await axios(axiosConfiguration).catch((err) => {
    console.error("Error occured while fetching data", err);
  });

  return response?.data || {};
};

export { makeRequest };
