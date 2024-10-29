import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillHome, AiOutlineLogout, AiOutlineRobot, AiOutlineSwap } from 'react-icons/ai';
import '../assets/NavigationBar.css'; // Import custom CSS for additional styling

function NavigationBar() {
    const navigate = useNavigate();

    const logout = () => {
        // Remove the authentication token
        localStorage.removeItem('authToken'); // Adjust the key as needed
        // Redirect to login page
        navigate('/Login');
    };

    return (
        <nav className="navbar fixed-bottom navbar-light bg-light border-top">
            <div className="container-fluid d-flex justify-content-around">
                {/* Home */}
                <Link to="/HomePage" className="nav-link text-center d-flex flex-column align-items-center">
                    <AiFillHome size={24} />
                    <span className="small mt-1">Home</span>
                </Link>
                {/* Transfers */}
                <Link to="/Transfers" className="nav-link text-center d-flex flex-column align-items-center">
                    <AiOutlineSwap size={24} />
                    <span className="small mt-1">Transfers</span>
                </Link>
                {/* Chatbot */}
                <Link to="/Chatbot" className="nav-link text-center d-flex flex-column align-items-center">
                    <AiOutlineRobot size={24} />
                    <span className="small mt-1">Chatbot</span>
                </Link>
                {/* Logout */}
                <button onClick={logout} className="nav-link btn text-center d-flex flex-column align-items-center" style={{ background: 'none', border: 'none' }}>
                    <AiOutlineLogout size={24} />
                    <span className="small mt-1">Logout</span>
                </button>
            </div>
        </nav>
    );
}

export default NavigationBar;
