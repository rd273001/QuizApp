import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <div className='flex flex-1 flex-col items-center justify-center font-light text-balance text-center'>
      <FaExclamationTriangle className='text-red-600 text-4xl' />
      <h1 className='sm:text-3xl text-2xl font-medium mb-4 text-red-500 mx-auto'>Page Not Found!</h1>
    </div>
  );
};

export default PageNotFound;