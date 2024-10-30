// src/components/BalanceCard.js
import React, { useEffect, useState } from 'react';
import { getAccounts } from '../api/authService';
import { jwtDecode } from "jwt-decode"; // Correct import

function BalanceCard() {
    const [accounts, setAccounts] = useState([]);

    // Calculate total balance
    const totalBalance = accounts.reduce((total, account) => total + account.balance, 0);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                // Get JWT token
                const token = localStorage.getItem('authToken');
                
                if (!token) {
                    throw new Error("No token found. User is not authenticated.");
                }

                // Decode the JWT token to extract user information
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.UserId; // Use the appropriate field from the decoded token
                
                // Fetch accounts for the user
                const response = await getAccounts(userId);
                
                // Sort the accounts based on account number
                const sortedAccounts = response.sort((a, b) => a.accountNumber - b.accountNumber);
                setAccounts(sortedAccounts);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);

    // Formatter for currency with negative balances
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    return (
        <div className="card mt-3">
            <div className="card-header">
                <h5>My Accounts</h5>
            </div>
            <ul className="list-group list-group-flush">
                {accounts.map((account, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>Account Number: {account.accountNumber}</span>
                        <span>{currencyFormatter.format(account.balance)}</span>
                    </li>
                ))}
            </ul>
            {/* Display Total Balance */}
            <div className="card-footer d-flex justify-content-between align-items-center">
                <strong>Total Balance:</strong>
                <strong>{currencyFormatter.format(totalBalance)}</strong>
            </div>
        </div>
    );
}

export default BalanceCard;
