import React from 'react';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Correct import statement


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
