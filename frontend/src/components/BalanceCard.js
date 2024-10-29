// src/components/BalanceCard.js
import React, { useEffect, useState } from 'react';
import { getAccounts } from '../api/authService';

function BalanceCard() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAccounts();
                setAccounts(response);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        };
        fetchAccounts();
    }, []);

    return (
        <div className="card mt-3">
            <div className="card-header">
                <h5>My Accounts</h5>
            </div>
            <ul className="list-group list-group-flush">
                {accounts.map((account, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{account.name} ({account.number})</span>
                        <span>${account.balance.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BalanceCard;
