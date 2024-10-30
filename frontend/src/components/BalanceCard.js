// src/components/BalanceCard.js
import React, { useEffect, useState } from 'react';
import { getAccounts } from '../api/authService';
import {jwtDecode} from "jwt-decode"; // Correct import

function BalanceCard() {
    const [accounts, setAccounts] = useState([]);

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
                const user_id = decodedToken.UserId; // Use the appropriate field from the decoded token
                
                // Fetch accounts for the user
                const response = await getAccounts(user_id);
                
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
        currencyDisplay: 'symbol',
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
        </div>
    );
}

export default BalanceCard;
