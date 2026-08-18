import axiosInstance from '../lib/axios';

const updateMyProfile = async (name: string) => {
  const response = await axiosInstance.patch('/api/users/updateProfile', { name });
  return response.data;
};

export const UserService = {
  updateMyProfile,
};