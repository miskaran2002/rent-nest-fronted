import axiosInstance from '../lib/axios';

const loginUser = async (payload: any) => {
  const response = await axiosInstance.post('/api/auth/login', payload);
  return response.data;
};

const registerUser = async (payload: any) => {
  const response = await axiosInstance.post('/api/auth/register', payload);
  return response.data;
};

export const AuthService = {
  loginUser,
  registerUser,
};