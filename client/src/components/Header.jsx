import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();  // values from Auth Context

  return (
    <nav className='bg-blue-950 px-4 py-3 md:py-4 shadow-md shadow-black/35 drop-shadow'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='text-white font-bold text-2xl tracking-wider'>QuizApp</Link>
        <div className='flex gap-x-5 items-center'>
          { user
            ? <>
              <button className='text-white tracking-tight flex items-center border border-white/55 bg-blue-900 hover:bg-blue-950 active:scale-105 rounded-md px-4 py-1'><FaUserCircle className='text-gray-300 text-lg mr-2' />{ user.name }</button>
              <button onClick={ logout } className='text-white flex items-center border border-white/55 bg-red-500 hover:bg-red-600 active:scale-105 rounded-md sm:px-4 px-2 py-1'><FaSignOutAlt className='text-white sm:mr-2 sm:text-lg text-2xl' /><span className='sm:block hidden'>Logout</span></button>
            </>
            : <>
              <Link to='/login' className='text-white flex items-center border border-white/55 bg-blue-900 hover:bg-blue-950 active:scale-105 rounded-md sm:px-4 px-2 py-1'><FaSignInAlt className='mr-2' />Login</Link>
              <Link to='/register' className='text-white flex items-center border border-white/55 bg-blue-900 hover:bg-blue-950 active:scale-105 rounded-md sm:px-4 px-2 py-1'><FaUserPlus className='mr-2' />Register</Link>
            </>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;