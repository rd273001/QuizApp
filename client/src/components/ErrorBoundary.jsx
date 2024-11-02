import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center h-screen w-full font-light text-balance text-center'>
          <FaExclamationTriangle className='text-red-600 text-4xl' />
          <h1 className='sm:text-3xl text-2xl font-medium mb-4 text-red-500 mx-auto'>Oops! Something went wrong.</h1>
          <p className='sm:text-xl text-lg mx-auto'>Sorry for the inconvenience. Please try refreshing the page or try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;