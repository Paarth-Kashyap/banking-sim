// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/authService';
import '../assets/TransactionList.css';

function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions();
                
                if (response.error) {
                    throw new Error(response.error);
                } else {
                    setTransactions(response); 
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setError(err.message); // Set error message to state
            }
        };
        fetchTransactions();
    }, []);

    // Formatter for currency
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
        minimumFractionDigits: 2,
    });

    return (
        <div className="card mt-3">
            <div className="card-header">
                <h5>Recent Transactions</h5>
            </div>
            <ul className="list-group list-group-flush">
                {error && <li className="list-group-item text-danger">{error}</li>} {/* Display error message */}
                {transactions.map((transaction, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{new Date(transaction.date).toLocaleDateString()}
                            &nbsp;&nbsp; | &nbsp;&nbsp;
                            {transaction.amount < 0 
                                ? `Sent from Account Number ${transaction.fromAccountId}`
                                : `Recieved in Account Number ${transaction.toAccountId}`}
                        </span>
                        <span className={transaction.amount < 0 ? "text-danger" : "text-success"}>
                            {transaction.amount < 0 ? '-' : ''}{currencyFormatter.format(Math.abs(transaction.amount))}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionList;
