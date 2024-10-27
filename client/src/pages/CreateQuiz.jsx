import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm, useFieldArray } from 'react-hook-form';
import { createQuiz } from '../services/quizService';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors } } = useForm( {
    defaultValues: {
      title: '',
      questions: [{ question: '', options: ['', '', '', ''], correctAnswer: 0 }]
    }
  } );

  const { fields, append, remove } = useFieldArray( {
    control,
    name: 'questions'
  } );

  const createQuizMutation = useMutation( {
    mutationFn: createQuiz,
    onSuccess: () => {
      toast.success( 'Quiz created successfully' );
      navigate( '/quizzes' ); // Navigate to quiz list after creation
    },
    onError: ( error ) => {
      toast.error( error.response?.data?.message || 'Failed to create quiz' );
    },
  } );

  const onSubmit = ( data ) => {
    createQuizMutation.mutate( data );
  };

  return (
    <div className='flex flex-1 flex-col p-4 max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Create New Quiz</h2>
      <form onSubmit={ handleSubmit( onSubmit ) } className='flex flex-col gap-y-4'>
        {/* Quiz Title */ }
        <div>
          <label htmlFor='title' className='block mb-1'>Quiz Title</label>
          <input
            { ...register( 'title', { required: 'Title is required' } ) }
            className='w-full px-3 py-2 border rounded'
          />
          { errors.title && <p className='text-red-500'>{ errors.title.message }</p> }
        </div>

        {/* Dynamic Questions */ }
        { fields.map( ( field, index ) => (
          <div key={ field.id } className='border p-4 rounded mb-2'>
            <h3 className='font-bold mb-2'>Question { index + 1 }</h3>
            {/* Question Text */ }
            <input
              { ...register( `questions.${ index }.question`, { required: 'Question is required' } ) }
              className='w-full px-3 py-2 border rounded mb-2'
              placeholder='Enter question'
            />
            { errors.questions?.[index]?.question && <p className='text-red-500'>{ errors.questions[index].question.message }</p> }

            {/* Options */ }
            { [0, 1, 2, 3].map( ( optionIndex ) => (
              <div key={ optionIndex }>
                <input
                  { ...register( `questions.${ index }.options.${ optionIndex }`, { required: 'Option is required' } ) }
                  className='w-full px-3 py-2 border rounded mb-2'
                  placeholder={ `Option ${ optionIndex + 1 }` }
                />
                { errors.questions?.[index]?.options?.[optionIndex] && <p className='text-red-500'>{ errors.questions[index].options[optionIndex].message }</p> }
              </div>
            ) ) }

            {/* Correct Answer */ }
            <select
              { ...register( `questions.${ index }.correctAnswer`, { required: 'Correct answer is required' } ) }
              className='w-full px-3 py-2 border rounded mb-2'
            >
              <option value=''>Select correct answer</option>
              <option value='0'>Option 1</option>
              <option value='1'>Option 2</option>
              <option value='2'>Option 3</option>
              <option value='3'>Option 4</option>
            </select>
            { errors.questions?.[index]?.correctAnswer && <p className='text-red-500'>{ errors.questions[index].correctAnswer.message }</p> }

            { index > 0 && (
              <button type='button' onClick={ () => remove( index ) } className='bg-red-500 text-white px-2 py-1 rounded'>
                Remove Question
              </button>
            ) }
          </div>
        ) ) }

        <button type='button' onClick={ () => append( { question: '', options: ['', '', '', ''], correctAnswer: 0 } ) }
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Add Question
        </button>

        <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded'>
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;