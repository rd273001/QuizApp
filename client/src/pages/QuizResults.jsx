import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const QuizResults = () => {
  const location = useLocation();
  const { results } = location.state;

  return (
    <div className='flex flex-1 flex-col p-4'>
      <h2 className='text-xl font-bold mb-4'>Quiz Results</h2>
      <p className='mb-4'>Your score: { results.score } out of { results.total }</p>
      <div className='space-y-4'>
        { results.results.map( ( result, index ) => (
          <div key={ index } className={ `p-4 rounded ${ result.correct ? 'bg-green-100' : 'bg-red-100' }` }>
            <p className='font-medium'>{ result.question }</p>
            <p>{ result.correct ? 'Correct' : 'Incorrect' }</p>
          </div>
        ) ) }
      </div>
      <Link to='/quizzes' className='mt-4 bg-gradient-blue text-white px-4 py-2 rounded hover:bg-gradient-blue-hover'>
        Back to Quizzes
      </Link>
    </div>
  );
};

export default QuizResults;