import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object( {
  username: z.string().min( 3, 'Username must be at least 3 characters' ),
  password: z.string().min( 6, 'Password must be at least 6 characters' ),
} );

const Register = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm( {
    resolver: zodResolver( registerSchema ),
  } );



  const onSubmit = ( data ) => {

  };

  return (
    <div className='flex-1 p-4 w-full md:w-1/2 mx-auto flex flex-col justify-center'>
      <h2 className='text-2xl font-bold mb-4'>Register</h2>
      <form onSubmit={ handleSubmit( onSubmit ) } className='flex flex-col gap-y-4'>
        <div>
          <label htmlFor='username' className='block mb-1'>
            Username
          </label>
          <input
            { ...register( 'username' ) }
            className='w-full px-3 py-2 border rounded'
          />
          { errors.username && (
            <p className='text-red-500'>{ errors.username.message }</p>
          ) }
        </div>
        <div>
          <label htmlFor='password' className='block mb-1'>
            Password
          </label>
          <input
            type='password'
            { ...register( 'password' ) }
            className='w-full px-3 py-2 border rounded'
          />
          { errors.password && (
            <p className='text-red-500'>{ errors.password.message }</p>
          ) }
        </div>
        <button
          type='submit'
          className='mt-6 min-w-[40%] flex justify-center mx-auto bg-blue-900 text-white py-2 rounded hover:bg-blue-950'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;