import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <nav className='bg-blue-600 px-4 py-3 md:py-4 shadow-md shadow-black/35 drop-shadow'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='text-white font-bold text-2xl'>QuizApp</Link>
        <div className='flex gap-x-5 items-center'>
          <Link to='/login' className='text-white flex items-center justify-center ring-inset ring-1 ring-white hover:scale-105 active:scale-95 rounded-md px-4 py-1'><FaSignInAlt className='mr-1' />Login</Link>
          <Link to='/register' className='text-white flex items-center justify-center ring-inset ring-1 ring-white hover:scale-105 active:scale-95 rounded-md px-4 py-1'>Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;