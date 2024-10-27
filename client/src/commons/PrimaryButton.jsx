import React from 'react';

const PrimaryButton = React.memo( ( { type, disabled, btnText, children, ...props } ) => {
  return (
    <button
      type={ type ?? 'submit' }
      className={ `min-w-[40%] flex justify-center mx-auto bg-gradient-blue enabled:hover:bg-gradient-blue-hover text-white py-2 px-4 rounded-lg enabled:active:scale-105 disabled:cursor-not-allowed disabled:opacity-60` }
      disabled={ disabled ?? false }
      { ...props }
    >
      { btnText ?? children }
    </button>
  );
} );

export default PrimaryButton;