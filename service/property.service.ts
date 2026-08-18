import axiosInstance from '../lib/axios';

const getProperties = async () => {
  const response = await axiosInstance.get('/api/properties');
  return response.data;
};

const createProperty = async (payload: any) => {
  const response = await axiosInstance.post('/api/properties', payload);
  return response.data;
};

const updateProperty = async (id: string, payload: any) => {
  const response = await axiosInstance.patch(`/api/properties/${id}`, payload);
  return response.data;
};

const deleteProperty = async (id: string) => {
  const response = await axiosInstance.delete(`/api/properties/${id}`);
  return response.data;
};

export const PropertyService = {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
};