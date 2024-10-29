// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import '../assets/HomePage.css'; // Import custom CSS for additional styling

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/Login');
        }
    }, [navigate]);

    const userName = localStorage.getItem('firstName');
    const userEmail = localStorage.getItem('email');

    return (
        <div className="home-page">
            {/* Header with Greeting */}
            <div className="header-banner p-4 mb-4">
                <h1 className="welcome-title">Hello, {userName}!</h1>
                <p className="email-text">{userEmail}</p>
            </div>

            {/* Account Balance Section */}
            <div className="container balance-section mb-4">
                <h2 className="section-title">My Accounts</h2>
                <BalanceCard />
            </div>

            {/* Transaction List Section */}
            <div className="container transactions-section mb-5">
                <h2 className="section-title">Recent Transactions</h2>
                <TransactionList />
            </div>

            {/* Bottom Navigation */}
            <NavigationBar />
        </div>
    );
}

export default HomePage;
