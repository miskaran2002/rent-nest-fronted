import axiosInstance from '../lib/axios';

const createPaymentSession = async (rentalRequestId: string) => {
  const response = await axiosInstance.post('/api/payments/create', { rentalRequestId });
  return response.data;
};

const getMyPayments = async () => {
  const response = await axiosInstance.get('/api/payments');
  return response.data;
};

export const PaymentService = {
  createPaymentSession,
  getMyPayments,
};