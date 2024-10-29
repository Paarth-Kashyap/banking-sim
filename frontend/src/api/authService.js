// src/api/authService.js

const API_BASE_URL = "http://localhost:5266/api"; // backend URL

export async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

export async function signup(userData) {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
}

// Fetch user accounts
export async function getAccounts() {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        }
    });
    return response.json();
}

// Fetch user transactions
export async function getTransactions() {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`
        }
    });
    return response.json();
}
