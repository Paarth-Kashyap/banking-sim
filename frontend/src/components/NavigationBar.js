import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillHome, AiOutlineLogout, AiOutlineSwap } from 'react-icons/ai';
import '../assets/NavigationBar.css';

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current path

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/Login');
    };

    return (
        <nav className="navbar fixed-bottom navbar-light bg-light border-top">
            <div className="container-fluid d-flex justify-content-around">
                {/* Home */}
                <Link
                    to="/HomePage"
                    className={`nav-link text-center d-flex flex-column align-items-center ${location.pathname === '/HomePage' ? 'active' : ''}`}
                >
                    <AiFillHome size={24} />
                    <span className="small mt-1">Home</span>
                </Link>
                {/* Transfers */}
                <Link
                    to="/Transfer"
                    className={`nav-link text-center d-flex flex-column align-items-center ${location.pathname === '/Transfer' ? 'active' : ''}`}
                >
                    <AiOutlineSwap size={24} />
                    <span className="small mt-1">Transfers</span>
                </Link>
                {/* Logout */}
                <button
                    onClick={logout}
                    className="nav-link btn text-center d-flex flex-column align-items-center"
                    style={{ background: 'none', border: 'none' }}
                >
                    <AiOutlineLogout size={24} />
                    <span className="small mt-1">Logout</span>
                </button>
            </div>
        </nav>
    );
}

export default NavigationBar;
