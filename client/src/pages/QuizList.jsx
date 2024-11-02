import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getQuizzes } from '../services/quizService';
import LoadingIndicator from '../components/LoadingIndicator';
import { FaPlus } from 'react-icons/fa';

const QuizList = () => {
  const { data: quizzes, isLoading } = useQuery( {
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
    throwOnError: ( error ) => {
      toast.error( error.response?.data?.message || 'Failed to fetch quizzes' );
    },
  } );

  return (
    <div className='flex flex-1 flex-col p-4'>

      <div className='flex items-center justify-between'>
        <h2 className='text-xl font-bold'>Available Quizzes</h2>
        <Link to='/quiz/create' className='flex items-center bg-gradient-blue hover:bg-gradient-blue-hover active:scale-105 text-white px-2 py-1 rounded-lg'>
          <FaPlus className='mr-1' />Create New Quiz
        </Link>
      </div>

      <hr className='mt-1 border-gray-300' />

      <ul className='space-y-2 mt-3'>
        { quizzes?.length > 0 ? quizzes?.map( ( quiz ) => (
          <li key={ quiz._id } className='bg-white p-4 rounded shadow'>
            <Link to={ `/quiz/${ quiz._id }` } className='text-blue-600 hover:underline'>
              { quiz.title }
            </Link>
          </li>
        ) ) : <p className='text-black text-xl'>No quiz is available currently.</p> }
      </ul>

      { isLoading && <LoadingIndicator /> }
    </div>
  );
};

export default QuizList;