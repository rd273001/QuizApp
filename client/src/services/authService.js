import axiosInstance from '../utils/axiosInstance';

export const register = async ( userData ) => {
  const { data } = axiosInstance.post( '/auth/register', userData );
  return data;
};

export const login = async ( userData ) => {
  const { data } = await axiosInstance.post( '/auth/login', userData );
  return data;
};

// API call to restore user session using the stored token
export const restoreUser = async () => {
  const { data } = await axiosInstance.get( '/auth/restore' );
  return data;
};