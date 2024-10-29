import './assets/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';
import { BrowserRouter as Router ,Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage'; // Adjust the path as necessary
import Signup from './pages/SignupPage'; // Adjust the path as necessary

function App() {
    return (

      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Un-commented this line */}
      </Routes>

    );
}

export default App;
