import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccounts, getAccountBalance, checkAccount, transferFunds } from '../api/authService';
import {jwtDecode} from 'jwt-decode'; 
import NavigationBar from '../components/NavigationBar';
import '../assets/TransferPage.css';

function TransferPage() {
    const [amount, setAmount] = useState('');
    const [fromAccount, setFromAccount] = useState('');
    const [toAccount, setToAccount] = useState('');
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    // Fetch accounts of logged-in user
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error("No token found. User is not authenticated.");
                }

                // Decode the token to get user ID
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.UserId;
                
                // Fetch accounts associated with the user
                const response = await getAccounts(userId);
                setAccounts(response.map(account => account.accountNumber));
                
                // Set default "from account" as the first account in the list
                if (response.length > 0) {
                    setFromAccount(response[0].accountNumber);
                }
            } catch (err) {
                console.error("Error fetching accounts:", err);
            }
        };
        fetchAccounts();
    }, []);

    // Handle transfer submission
    const handleTransfer = async () => {
        if (!fromAccount || !toAccount || !amount) {
            alert("Please fill out all fields before transferring.");
            return;
        }
        //check if from account is the same as to account
        if (fromAccount === toAccount) {
            alert("Cannot transfer money to the same account.");
            return;
        }

        //get account balance
        const fromAccountBalance = await getAccountBalance(fromAccount);
    
        //check if account has enough money
        if (amount > fromAccountBalance) {
            alert("Insufficient funds in the account.");
            return
        }

        //check if to account exists
        const toAccountExists = await checkAccount(toAccount);

        if (toAccountExists.error) {
            alert("The account you are trying to transfer to does not exist.");
            return;
        }

        //get user id
        const token = localStorage.getItem('authToken');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.nameid;
        // Transfer money
        const response = await transferFunds(fromAccount, toAccount, amount, userId);
        if (response.error) {
            alert("An error occurred while transferring money.");
            return;
        }
        alert("Money transferred successfully");

        // Clear the form
        setAmount('');
        setToAccount('');
        navigate('/Homepage');
    };

    return (
        <div className="transfer-page-container">
            <div className="transfer-page">
                <h1>KashBank Money Transfer</h1>
                
                <div className="form-group">
                    <label htmlFor="from-account">From Account:</label>
                    <select 
                        id="from-account"
                        value={fromAccount} 
                        onChange={(e) => setFromAccount(e.target.value)}
                    >
                        {accounts.length > 0 ? (
                            accounts.map(account => (
                                <option key={account} value={account}>
                                    {account}
                                </option>
                            ))
                        ) : (
                            <option value="">No accounts available</option>
                        )}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="to-account">To Account:</label>
                    <input 
                        type="text" 
                        id="to-account"
                        value={toAccount} 
                        onChange={(e) => setToAccount(e.target.value)} 
                        placeholder="Enter Account Number" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount $:</label>
                    <input 
                        type="text" // Change to text to allow manual input
                        id="amount"
                        value={amount} 
                        onChange={(e) => {
                            const value = e.target.value;
                            // Regular expression to match valid dollar amounts with up to two decimal places
                            const regex = /^\d*\.?\d{0,2}$/;
                            // Validate the input
                            if (value === '' || regex.test(value)) {
                                setAmount(value); // Update state if valid
                            }
                        }} 
                        placeholder="Enter amount" 
                    />
                </div>

                <button onClick={handleTransfer} className="transfer-button">Send Money</button>
                
                <NavigationBar />
            </div>
        </div>
    );
}

export default TransferPage;
