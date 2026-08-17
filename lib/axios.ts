import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://rent-nest-brown.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// রিকোয়েস্ট ইন্টারসেপ্টর: প্রতিবার এপিআই কলের সময় অটোমেটিক টোকেন যুক্ত করবে
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('rentnest_token');
      if (token) {
        config.headers.Authorization = token; // ব্যাকএন্ড এই সরাসরি টোকেন ভ্যালুটি এক্সপেক্ট করে
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;