import axios from "axios";

const baseURL = process.env.REACT_APP_PROXY_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const api = (resource, id = null) => {
  const fullURL = id === null ? baseURL + resource : baseURL + resource + id;

  return axios(fullURL, { headers: { "X-Auth-Token": apiKey } });
};

export default api;
