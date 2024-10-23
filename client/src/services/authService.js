import axiosInstance from '../utils/axiosInstance';

export const register = ( userData ) => axiosInstance.post( '/auth/register', userData );

export const login = ( userData ) => axiosInstance.post( '/auth/login', userData );

// API call to restore user session using the stored token
export const restoreUser = async () => {
  const response = await axiosInstance.get( '/auth/restore' );
  return response.data;
};