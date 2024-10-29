import './assets/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './pages/LoginPage'; 
import Signup from './pages/SignupPage'; 
import HomePage from './pages/HomePage'; 

function App() {
    return (

      <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Navigate replace to="/Login" />}  />
          <Route path="/SignUp" element={<Signup />} /> 
          <Route path="/HomePage" element={<HomePage />} />
      </Routes>

    );
}

export default App;
