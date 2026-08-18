import axiosInstance from '../lib/axios';

const getAdminOverview = async () => {
  const response = await axiosInstance.get('/api/admin/overview');
  return response.data;
};

const getAdminUsers = async () => {
  const response = await axiosInstance.get('/api/users/admin/users');
  return response.data;
};

const toggleUserBanStatus = async (id: string, isBanned: boolean) => {
  const response = await axiosInstance.patch(`/api/users/admin/users/${id}`, { isBanned });
  return response.data;
};

export const AdminService = {
  getAdminOverview,
  getAdminUsers,
  toggleUserBanStatus,
};