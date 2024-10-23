import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/authService';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

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
      toast.success( 'Logged in successfully' );
      navigate( '/quizzes' );
    },
    onError: ( error ) => {
      toast.error( error.response?.data?.message || 'Login failed' );
    },
  } );

  const onSubmit = ( data ) => {
    loginMutation.mutate( data );
  };

  return (
    <div className='flex-1 p-4 flex flex-col bg-slate-100'>
      <form onSubmit={ handleSubmit( onSubmit ) } className='flex flex-col gap-y-4 w-full lg:w-1/2 md:w-2/3 m-auto'>
        <fieldset className='border border-black/15 shadow-lg shadow-black/35 p-4 rounded-2xl bg-white'>
          <legend className='text-2xl font-bold mb-3 text-blue-800'>LOGIN</legend>
          <div className='mb-5'>
            <label htmlFor='email' className='block mb-1 font-bold'>
              Email
            </label>
            <input
              { ...register( 'email' ) }
              type='email'
              placeholder='Enter your email'
              className='w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:invalid:ring-red-500 border border-slate-300 rounded invalid:border-red-500 invalid:text-red-500'
            />
            <p className='mt-1 text-red-500 text-sm'>{ errors?.email?.message }</p>
          </div>
          <div className='mb-5'>
            <label htmlFor='password' className='block mb-1 font-bold'>
              Password
            </label>
            <input
              { ...register( 'password' ) }
              type='password'
              placeholder='Enter your password'
              className='w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:invalid:ring-red-500 border border-slate-300 rounded invalid:border-red-500 invalid:text-red-500'
            />
            <p className='mt-1 text-red-500 text-sm'>{ errors?.password?.message }</p>
          </div>
          <button
            type='submit'
            className='mt-8 min-w-[40%] flex justify-center mx-auto bg-blue-900 text-white py-2 px-4 rounded-lg enabled:hover:bg-blue-950 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
            disabled={ loginMutation.isPending }
          >
            { loginMutation.isPending ? 'Logging in...' : 'Login' }
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;