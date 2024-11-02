import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
  const { token } = useAuth();

  if ( !token ) {
    toast.info( 'Please Login first', { autoClose: 3000 } );
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;