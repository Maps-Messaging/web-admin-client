import axios from 'axios';

axios.defaults.baseURL = process.env.API_BASE_URL;

axios.interceptors.request.use(req => {
  return req;
});
