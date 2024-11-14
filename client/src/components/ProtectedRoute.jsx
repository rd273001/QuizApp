import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // Get current location for redirect after login

  if ( !isAuthenticated ) {
    toast.info( 'Please Login first', { autoClose: 3000 } );
    return <Navigate to='/login' replace state={ { redirectTo: location.pathname } } />;
  }

  return <Outlet />;
};

export default ProtectedRoute;