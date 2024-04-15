import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// Set the base URL directly in the default configuration
axios.defaults.baseURL = API_BASE_URL;


axios.interceptors.request.use(req => {
  return req;
});
