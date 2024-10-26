import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ( { children } ) => {
  const { isAuthenticated } = useAuth();
  
  if ( !isAuthenticated() ) {
    toast.info( 'Please Login first', { autoClose: 3000 } );
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;