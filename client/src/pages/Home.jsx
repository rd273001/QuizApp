import React from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex-1 text-center items-center justify-center flex flex-col'>
      <h1 className='text-[clamp(24px,3vw,34px)] font-bold mb-4'>Welcome to the Quiz App</h1>
      <p className='mb-8'>Test your knowledge with our quizzes!</p>
      <Link to='/quizzes' className='flex  items-center bg-blue-900 text-white px-4 py-1.5 rounded hover:bg-blue-950 hover:scale-105 active:scale-95'>
        Take a Quiz <FaArrowRightLong className='text-yellow-400 mx-2 animate-slide text-2xl' />
      </Link>
    </div>
  );
};

export default Home;