import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { register as registerUser } from '../services/authService';
import { toast } from 'react-toastify';

const registerSchema = z.object( {
  name: z.string().min( 3, 'Name must be at least 3 characters' ),
  email: z.string().min( 1, 'Email is required' ).email( 'Invalid Email address' ),
  password: z.string().min( 8, 'Password must be at least 8 characters' ).max( 32, 'Password must be at most 32 characters' ),
} );

const Register = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, } = useForm( {
    resolver: zodResolver( registerSchema ),
  } );

  const registerMutation = useMutation( {
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success( 'Registered successfully' );
      navigate( '/login' );
    },
    onError: ( error ) => {
      toast.error( error.response?.data?.message || 'Registration failed' );
    },
  } );

  const onSubmit = ( data ) => {
    registerMutation.mutate( data );
  };

  return (
    <div className='flex-1 p-4 flex flex-col bg-slate-100'>
      <form onSubmit={ handleSubmit( onSubmit ) } className='flex flex-col gap-y-4 w-full lg:w-1/2 md:w-2/3 m-auto'>
        <fieldset className='border border-black/15 shadow-lg shadow-black/35 p-4 rounded-2xl bg-white'>
          <legend className='text-2xl font-bold mb-3 text-blue-800'>Create an account</legend>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-1 font-bold'>
              Name
            </label>
            <input
              { ...register( 'name' ) }
              type='text'
              placeholder='Enter your name'
              autoComplete='name'
              className='w-full px-3 py-2 outline-none focus:ring-2 ring-blue-400 focus:invalid:ring-red-500 invalid:border-red-500 invalid:text-red-500 border border-slate-300 rounded'
            />
            <p className='text-red-500 text-sm mt-1'>{ errors?.name?.message }</p>
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1 font-bold'>
              Email
            </label>
            <input
              { ...register( 'email' ) }
              type='email'
              placeholder='Enter email'
              autoComplete='email'
              className='w-full px-3 py-2 outline-none focus:ring-2 ring-blue-400 focus:invalid:ring-red-500 invalid:border-red-500 invalid:text-red-500 border border-slate-300 rounded'
            />
            <p className='text-red-500 text-sm mt-1'>{ errors?.email?.message }</p>
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block mb-1 font-bold'>
              Password
            </label>
            <input
              { ...register( 'password' ) }
              type='password'
              placeholder='Enter password'
              autoComplete='new-password'
              className='w-full px-3 py-2 outline-none focus:ring-2 ring-blue-400 focus:invalid:ring-red-500 invalid:border-red-500 invalid:text-red-500 border border-slate-300 rounded'
            />
            <p className='text-red-500 text-sm mt-1'>{ errors?.password?.message }</p>
          </div>
          <button
            type='submit'
            className='mt-8 min-w-[40%] flex justify-center mx-auto bg-blue-900 text-white py-2 px-4 rounded-lg enabled:hover:bg-blue-950 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
            disabled={ registerMutation.isPending }
          >
            { registerMutation.isPending ? 'Registering...' : 'Register' }
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;