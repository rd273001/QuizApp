import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getQuizzes } from '../services/quizService';
import LoadingIndicator from '../components/LoadingIndicator';

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
      <h2 className='text-2xl font-medium mb-4'>Available Quizzes</h2>
      <ul className='space-y-2'>
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