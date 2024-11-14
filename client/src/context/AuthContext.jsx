import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { restoreUser } from '../services/authService';
import { toast } from 'react-toastify';
import LoadingIndicator from '../components/LoadingIndicator';

const AuthContext = createContext();

export const useAuth = () => useContext( AuthContext );

export const AuthProvider = ( { children } ) => {
  const [user, setUser] = useState( null );
  const token = localStorage.getItem( 'token' );

  // Attempt to restore user session if a token exists
  const { data, refetch, isSuccess, isError, isLoading, error } = useQuery( {
    queryKey: ['restoreUser'],
    queryFn: restoreUser,
    enabled: Boolean( token ), // disable automatic execution, we will refetch manually
    retry: false,
    refetchOnWindowFocus: false,
  } );

  // Restore user session if a token exists
  useEffect( () => {
    token && refetch();
  }, [] );

  // Update user state if restore is successful
  useEffect( () => {
    isSuccess && setUser( data.user );
    isError && toast.error( error.response?.data?.message || 'Session restore failed' );
  }, [isSuccess, isError] );

  const login = useCallback( ( userData ) => {
    setUser( userData.user );
    localStorage.setItem( 'token', userData.token ); // store token in localStorage
  }, [] );

  const logout = useCallback( () => {
    setUser( null );
    localStorage.removeItem( 'token' );
    toast.success( 'Logged out successfully', { autoClose: 4000 } );
  }, [] );

  const isAuthenticated = useMemo( () => !!token, [token] );

  return (
    <AuthContext.Provider value={ { user, login, logout, isAuthenticated } }>
      { children }
      { isLoading && <LoadingIndicator /> }
    </AuthContext.Provider>
  );
};