import axios from 'axios';

const axiosInstance = axios.create( {
  baseURL: process.env.BASE_URL || 'http://localhost:5000',
} );

// Request interceptor to include token in headers
axiosInstance.interceptors.request.use( ( config ) => {
  const token = localStorage.getItem( 'token' );
  // If a token exists, add it to the Authorization header
  if ( token ) {
    config.headers.Authorization = `Bearer ${ token }`;
  }
  return config;
}, ( error ) => {
  return Promise.reject( error );
} );

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  ( response ) => response,
  ( error ) => {
    // Handle token expiry, redirects, etc.
    if ( error.response && error.response.status === 401 ) {
      localStorage.removeItem( 'token' ); // Clear token if unauthorized
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject( error );
  }
);

export default axiosInstance;