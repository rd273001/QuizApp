import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Home /> } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;