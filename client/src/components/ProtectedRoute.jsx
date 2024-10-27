import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ( { children } ) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect( () => {
    if ( !isAuthenticated ) {
      toast.info( 'Please Login first', { autoClose: 3000 } );
      navigate( '/login', { replace: true } );  // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate] );

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;