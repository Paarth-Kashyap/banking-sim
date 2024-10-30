// src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api/authService';

function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await getTransactions();
                setTransactions(response);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="card mt-3">
            <div className="card-header">
                <h5>Recent Transactions</h5>
            </div>
            {/* <ul className="list-group list-group-flush">
                {transactions.map((transaction, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{transaction.date} - {transaction.description}</span>
                        <span className={transaction.amount < 0 ? "text-danger" : "text-success"}>
                            {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}

export default TransactionList;
