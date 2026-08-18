import axiosInstance from '../lib/axios';

const createReview = async (payload: { propertyId: string; rating: number; comment: string }) => {
  const response = await axiosInstance.post('/api/reviews', payload);
  return response.data;
};

export const ReviewService = {
  createReview,
};