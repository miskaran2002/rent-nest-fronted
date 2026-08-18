import axiosInstance from '../lib/axios';

const getMyRentals = async () => {
  const response = await axiosInstance.get('/api/rentals');
  return response.data;
};

export const RentalService = {
  getMyRentals,
};