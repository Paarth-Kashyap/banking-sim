// login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure icons are imported
import '../assets/App.css';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await login(email, password);
        if (response.error) {
            setError(response.error); // Display error from authService
        } else {
            localStorage.setItem("authToken", response.token);
            localStorage.setItem("name", response.user.firstName);
            localStorage.setItem("email", response.user.email);
            setError('');
            navigate('/Homepage');
        }
    }


    // The HTML/CSS for the login page
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-danger position-relative'>
            <div className='container'>
                <div className='row'>
                    <div className='col-10 col-md-6 col-lg-4 mx-auto text-center'>
                        {/* Title */}
                        <h1 className='text-black position-relative' style={{ fontSize: '3rem', zIndex: 1, fontFamily: '"Garamond", Times, serif', top: '-10%' }}>
                            Welcome to
                        </h1>
                        <h1 className='text-white position-relative' style={{ fontSize: '5rem', zIndex: 1, fontFamily: '"Garamond", Times, monospace', top: '-15%' }}>
                            KashBank.
                        </h1>
                        {/* Form Container */}
                        <div className='p-5 bg-white mt-5'>
                            <form onSubmit={handleSubmit}>
                                {/* Email input */}
                                <div className='mb-3'>
                                    <div className="input-group">
                                        <span className="input-group-text bg-darkgrey">
                                            <i className="bi bi-envelope icon-color"></i> {/* Bootstrap Icon */}
                                        </span>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder='Enter Email'
                                            className='form-control'
                                            style={{ fontSize: '1.25rem' }}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Password input */}
                                <div className='mb-3'>
                                    <div className="input-group">
                                        <span className="input-group-text bg-darkgrey">
                                            <i className="bi bi-lock icon-color"></i> {/* Bootstrap Icon for Password */}
                                        </span>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            required
                                            placeholder='Enter Password'
                                            className='form-control'
                                            style={{ fontSize: '1.25rem' }}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Login button */}
                                <button type="submit" className='btn btn-success w-100' style={{ fontSize: '1.25rem' }}>Login</button>
                                {error && <p className='text-danger mt-3'>{error}</p>}
                                {/* Sign up section */}
                                <p className='mt-3'>
                                    Don't have an account? <Link to='/Signup' className='text-decoration-none'>Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
