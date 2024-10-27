import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getQuizDetails, submitQuiz } from '../services/quizService';

const answerSchema = z.array(z.number().nullable());

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm( {
    resolver: zodResolver( answerSchema ),
  } );

  const { data: quiz, isLoading } = useQuery( {
    queryKey: ['quiz', id],
    queryFn: () => getQuizDetails( id ),
    onError: ( error ) => {
      toast.error( error.response?.data?.message || 'Failed to fetch quiz details' );
    },
  } );

  const submitMutation = useMutation( {
    mutationFn: submitQuiz,
    onSuccess: ( results ) => {
      navigate( `/quiz/${ id }/results`, { state: { results } } );
    },
    onError: ( error ) => {
      toast.error( error.response?.data?.message || 'Failed to submit quiz' );
    },
  } );

  const onSubmit = ( data ) => {
    submitMutation.mutate( { id, answers: Object.values( data ) } );
  };

  return (
    <div className='flex flex-1 flex-col p-4'>
      <h2 className='text-2xl font-bold mb-4'>{ quiz.title }</h2>
      <form onSubmit={ handleSubmit( onSubmit ) }>
        { quiz.questions.map( ( question, qIndex ) => (
          <div key={ qIndex } className='mb-6 bg-white p-4 rounded shadow'>
            <p className='font-semibold mb-2'>{ question.question }</p>
            <div className='space-y-2'>
              { question.options.map( ( option, oIndex ) => (
                <label key={ oIndex } className='flex items-center'>
                  <input
                    type='radio'
                    value={ oIndex }
                    { ...register( `${ qIndex }` ) }
                    className='mr-2'
                  />
                  { option }
                </label>
              ) ) }
            </div>
          </div>
        ) ) }
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          disabled={ submitMutation.isPending }
        >
          { submitMutation.isPending ? 'Submitting...' : 'Submit Quiz' }
        </button>
      </form>

      { isLoading && <LoadingIndicator /> }
    </div>
  );
};

export default QuizDetails;