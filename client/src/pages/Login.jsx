import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../commons/PrimaryButton';

const loginSchema = z.object( {
  email: z.string().email( { message: 'Invalid email address' } ),
  password: z.string().min( 8, 'Password must be at least 8 characters' ).max( 32, 'Password must be at most 32 characters' ),
} );

const Login = () => {

  const { login: loginUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, } = useForm( {
    resolver: zodResolver( loginSchema ),
    defaultValues: {
      email: 'guestuser@gmail.com',
      password: 'guest@123'
    },
    resetOptions: {
      keepDefaultValues: false,
    }
  } );

  const loginMutation = useMutation( {
    mutationFn: login,
    onSuccess: ( data ) => {
      loginUser( data );
      toast.success( 'Logged in successfully', { autoClose: 4000 } );
      navigate( '/', { replace: true } );
    },
    onError: ( error ) => {
      toast.error( error.response?.data?.message || 'Login failed' );
    },
  } );

  const onSubmit = ( data ) => {
    loginMutation.mutate( data );
  };

  return (
    <div className='flex-1 flex flex-col p-4 bg-slate-100'>
      <form onSubmit={ handleSubmit( onSubmit ) } className='w-full lg:w-1/2 md:w-2/3 m-auto'>
        <fieldset className='border border-black/15 shadow-lg shadow-black/35 p-4 rounded-2xl bg-white'>
          <legend className='text-2xl font-bold mb-3 text-blue-800'>Login</legend>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1 font-bold'>
              Email
            </label>
            <input
              { ...register( 'email' ) }
              type='email'
              placeholder='Enter your email'
              autoComplete='email'
              className='w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:invalid:ring-red-500 border border-slate-300 rounded invalid:border-red-500 invalid:text-red-500'
            />
            <p className='mt-1 text-red-500 text-xs'>{ errors?.email?.message }</p>
          </div>
          <div className='mb-7'>
            <label htmlFor='password' className='block mb-1 font-bold'>
              Password
            </label>
            <input
              { ...register( 'password' ) }
              type='password'
              placeholder='Enter your password'
              autoComplete='current-password'
              className='w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:invalid:ring-red-500 border border-slate-300 rounded invalid:border-red-500 invalid:text-red-500'
            />
            <p className='mt-1 text-red-500 text-xs'>{ errors?.password?.message }</p>
          </div>

          <PrimaryButton
            disabled={ loginMutation.isPending }
            btnText={ loginMutation.isPending ? 'Logging in...' : 'Login' }
          />

          <p className='text-center text-sm mt-6 text-gray-500'>
            { `Don't have an account? ` }
            <Link to='/register' className='text-blue-600 active:bg-blue-200 hover:underline'>
              Register
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;