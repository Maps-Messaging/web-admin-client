export const clearUserCredentials = () => {
  // Clear stored user credentials (e.g., from localStorage, cookies, or context)
  localStorage.removeItem('userCredentials');
  // Optionally, you can clear the Axios default headers
  delete axiosInstance.defaults.headers.common['Authorization'];
};
