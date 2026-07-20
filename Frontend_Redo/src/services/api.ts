import axios from 'axios'; // Wait, let's just use axios properly: import axios from 'axios';
import axiosLib from 'axios';

// Ensure the base URL always ends with /api to prevent 404/500 errors on Vercel
let envUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
if (envUrl.endsWith('/')) {
  envUrl = envUrl.slice(0, -1);
}
if (!envUrl.endsWith('/api')) {
  envUrl += '/api';
}

const api = axiosLib.create({
  baseURL: envUrl,
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
