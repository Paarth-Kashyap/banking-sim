import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/App.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import { signup } from '../api/authService';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const response = await signup({ firstName, lastName, email, password });
        if (response.error) {
            setError(response.error);
        } else {
            localStorage.setItem("authToken", response.token);
            localStorage.setItem("firstName", response.firstName);
            localStorage.setItem("lastName", response.lastName);
            localStorage.setItem("email", response.email);
            setError('');
            navigate('/HomePage');
        }
    }

    // The HTML and CSS for the signup page
    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-danger position-relative'>
            <div className='container'>
                <div className='row'>
                    <div className='col-10 col-md-6 col-lg-4 mx-auto text-center'>
                        {/* Title */}
                        <h1 className='text-black position-relative' style={{ fontSize: '3rem', zIndex: 1, fontFamily: '"Garamond", Times, serif', top: '-12%' }}>
                            Join
                        </h1>
                        <h1 className='text-white position-relative' style={{ fontSize: '5rem', zIndex: 1, fontFamily: '"Garamond", Times, monospace', top: '-15%' }}>
                            KashBank.
                        </h1>
                        {/* Form Container */}
                        <div className='p-5 bg-white mt-5'>
                            <form onSubmit={handleSubmit}>
                                {/* First Name input */}
                                <div className='mb-3'>
                                    <div className="input-group">
                                        <span className="input-group-text bg-darkgrey">
                                            <i className="bi bi-person icon-color"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            required
                                            placeholder='Enter First Name'
                                            className='form-control'
                                            style={{ fontSize: '1.25rem' }}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Last Name input */}
                                <div className='mb-3'>
                                    <div className="input-group">
                                        <span className="input-group-text bg-darkgrey">
                                            <i className="bi bi-person-fill icon-color"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            required
                                            placeholder='Enter Last Name'
                                            className='form-control'
                                            style={{ fontSize: '1.25rem' }}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Email input */}
                                <div className='mb-3'>
                                    <div className="input-group">
                                        <span className="input-group-text bg-darkgrey">
                                            <i className="bi bi-envelope icon-color "></i> {/* Bootstrap Icon */}
                                        </span>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            placeholder='Enter Email'
                                            className='form-control'
                                            style={{ fontSize: '1.25rem' }}
                                            onChange={(e) => setEmail(e.target.value)}  // Store the value
                                        />
                                    </div>
                                </div>
                                {/* Password input */}
                                <div className='mb-3'>
                                    <div className="input-group">
                                        <span className="input-group-text bg-darkgrey">
                                            <i className="bi bi-lock icon-color"></i>
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
                                {/* Confirm Password input */}
                                <div className='mb-3'>
                                    <div className="input-group">
                                        <span className="input-group-text bg-darkgrey">
                                            <i className="bi bi-lock-fill icon-color"></i>
                                        </span>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            placeholder='Confirm Password'
                                            className='form-control'
                                            style={{ fontSize: '1.25rem' }}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Error Message */}
                                {error && <p className="text-danger">{error}</p>}
                                {/* Signup button */}
                                <button type="submit" className='btn btn-success w-100' style={{ fontSize: '1.25rem' }}>Sign Up</button>
                                {/* Login section */}
                                <p className='mt-3'>
                                    Already have an account? <Link to='/' className='text-decoration-none'>Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
