import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='text-center'>
      <h1 className='text-4xl font-bold mb-4'>Welcome to the Quiz App</h1>
      <p className='mb-8'>Test your knowledge with our quizzes!</p>
      <Link to='/quizzes' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
        Start a Quiz
      </Link>
    </div>
  );
};

export default Home;