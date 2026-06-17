import axios from 'axios'; // Wait, let's just use axios properly: import axios from 'axios';
import axiosLib from 'axios';

const api = axiosLib.create({
  baseURL: 'http://localhost:5000/api',
});

// This "Interceptor" runs before every single request we make!
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // If we have a token saved, slap it onto the Authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
