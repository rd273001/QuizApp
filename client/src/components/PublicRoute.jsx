import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  if ( isAuthenticated ) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default PublicRoute;