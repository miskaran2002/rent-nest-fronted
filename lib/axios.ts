import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://rent-nest-brown.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('rentnest_token');
      if (token) {
        config.headers.Authorization = token; // backend expects the token value directly
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;