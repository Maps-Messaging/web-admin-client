// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL
});

// Interceptor for handling 403 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('custom-auth-token');
      localStorage.removeItem('user');
      axiosInstance.defaults.headers.common['Authorization'] = '';
      window.location.href = '/admin/auth/sign-in';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
