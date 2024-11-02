import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className='flex flex-col items-center justify-center fixed z-30 inset-0 m-auto bg-black/45 shadow-lg shadow-black/65 drop-shadow backdrop-blur-[1px]'>
      <div className='flex p-2 bg-[conic-gradient(#fff,navy,blue,#aaa,#fff)] rounded-full animate-[spin_350ms_linear_infinite] duration-1000'>
        <div
          className='rounded-full p-5 bg-[radial-gradient(navy,#bbb)] animate-[spin_300ms_linear_infinite_reverse]'
        >
          <div className='size-3.5 -m-4 rounded-full bg-[radial-gradient(navy,#fff)]'></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;