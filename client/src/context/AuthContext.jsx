import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { restoreUser } from '../services/authService';


const AuthContext = createContext();

export const useAuth = () => useContext( AuthContext );

export const AuthProvider = ( { children } ) => {
  const [user, setUser] = useState( null );

  // Attempt to restore user session if a token exists
  const { refetch } = useQuery( {
    queryKey: ['restoreUser'],
    queryFn: restoreUser,
    enabled: false, // disable automatic execution, we will refetch manually
    onSuccess: ( data ) => {
      setUser( data.user );
    },
    onError: () => {
      localStorage.removeItem( 'token' ); // Clear token if restore fails
    }
  } );

  useEffect( () => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
      refetch(); // Fetch user details if token exists
    }
  }, [refetch] );

  const login = useCallback( ( userData ) => {
    setUser( userData.user );
    localStorage.setItem( 'token', userData.token ); // store token in localStorage
  }, [] );

  const logout = useCallback( () => {
    setUser( null );
    localStorage.removeItem( 'token' );
  }, [] );

  // Truthy/falsy value for user is authenticated or not
  const isAuthenticated = useMemo( () => !!user, [user] );

  return (
    <AuthContext.Provider value={ { user, login, logout, isAuthenticated } }>
      { children }
    </AuthContext.Provider>
  );
};