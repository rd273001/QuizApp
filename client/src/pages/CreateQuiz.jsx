import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm, useFieldArray } from 'react-hook-form';
import { createQuiz } from '../services/quizService';
import { FaTrashAlt } from 'react-icons/fa';
import PrimaryButton from '../commons/PrimaryButton';

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
    <div className='flex flex-1 flex-col p-4 max-w-3xl mx-auto w-full'>
      <h2 className='text-2xl font-bold mb-4'>Create New Quiz</h2>
      <form onSubmit={ handleSubmit( onSubmit ) } className='flex flex-col gap-y-4 w-full'>
        {/* Quiz Title */ }
        <div className='-mb-4'>
          <label htmlFor='title' className='block font-bold text-lg mb-1'>Quiz Title</label>
          <input
            { ...register( 'title', { required: 'Title is required' } ) }
            className='w-full px-3 py-2 border-2 outline-none focus:border-blue-400 rounded'
          />
          { errors.title && <p className='text-red-500 text-xs'>{ errors.title.message }</p> }
        </div>

        {/* Dynamic Questions */ }
        <div className='flex flex-col divide-y-4 gap-y-10 rounded-lg mb-8'>
          { fields.map( ( field, index ) => (
            <div key={ field.id } className='flex flex-col gap-y-4'>
              <div className='mt-6'>
                <h3 className='font-medium mb-1 underline'>Question { index + 1 }</h3>
                {/* Question Text */ }
                <input
                  { ...register( `questions.${ index }.question`, { required: 'Question is required' } ) }
                  className='w-full px-3 py-2 outline-none border-2 focus:border-blue-400 rounded'
                  placeholder='Enter question'
                />
                { errors.questions?.[index]?.question && <p className='text-red-500 text-xs'>{ errors.questions[index].question.message }</p> }
              </div>
              {/* Options */ }
              <div className='flex flex-col gap-y-4'>
                { [0, 1, 2, 3].map( ( optionIndex ) => (
                  <div key={ optionIndex }>
                    <input
                      { ...register( `questions.${ index }.options.${ optionIndex }`, { required: 'Option is required' } ) }
                      className='w-full px-3 py-2 outline-none border-2 focus:border-blue-400 rounded'
                      placeholder={ `Option ${ optionIndex + 1 }` }
                    />
                    { errors.questions?.[index]?.options?.[optionIndex] && <p className='text-red-500 text-xs'>{ errors.questions[index].options[optionIndex].message }</p> }
                  </div>
                ) ) }
              </div>

              {/* Correct Answer */ }
              <div>
                <h3 className='font-medium mb-1 underline'>Answer</h3>
                <select
                  { ...register( `questions.${ index }.correctAnswer`, { required: 'Correct answer is required' } ) }
                  className='w-full px-3 py-2 outline-none border-2 focus:border-blue-400 rounded'
                >
                  <option value=''>Select correct answer</option>
                  <option value='0'>Option 1</option>
                  <option value='1'>Option 2</option>
                  <option value='2'>Option 3</option>
                  <option value='3'>Option 4</option>
                </select>
                { errors.questions?.[index]?.correctAnswer && <p className='text-red-500 text-xs'>{ errors.questions[index].correctAnswer.message }</p> }
              </div>

              { index > 0 && (
                <button type='button' onClick={ () => remove( index ) } className='flex items-center mr-auto bg-red-500 text-white px-2 py-1 rounded'>
                  <FaTrashAlt className='mr-1' /> Remove Question
                </button>
              ) }
            </div>
          ) ) }
        </div>

        <PrimaryButton
          type='button'
          onClick={ () => append( { question: '', options: ['', '', '', ''], correctAnswer: 0 } ) }
          btnText='Add Question'
        />

        <PrimaryButton
          onClick={ () => append( { question: '', options: ['', '', '', ''], correctAnswer: 0 } ) }
          btnText='Create Quiz'
        />

      </form>
    </div>
  );
};

export default CreateQuiz;