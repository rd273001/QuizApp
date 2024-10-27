import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizList from './pages/QuizList';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import QuizDetails from './pages/QuizDetails';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={ queryClient }>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={ <Layout /> }>
              <Route index element={ <Home /> } />
              <Route path='/login' element={ <Login /> } />
              <Route path='/register' element={ <Register /> } />
              <Route path='/quizzes' element={ <QuizList /> } />
              <Route path='/quiz/:id' element={ <ProtectedRoute children={ <QuizDetails /> } /> } />
            </Route>
          </Routes>
          <ToastContainer position='bottom-right' limit={ 3 } toastClassName='sm:bottom-3 bottom-[6svh] sm:mb-4 sm:mx-0 mx-2 mb-3 shadow-md shadow-black/60 backdrop-shadow rounded-lg' theme='colored' />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;