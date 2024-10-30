const API_BASE_URL = "http://localhost:5266/api";

// Helper function to retrieve the auth token
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Login function with error handling
export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        
        // Check for non-OK responses
        if (!response.ok) {
            console.log(response.statusText);
            if (response.statusText === "Unauthorized") {
                throw new Error("Incorrect Username/Password, please try again!");
            }
            throw new Error("An unexpected error occurred during login.");
        }

        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}

// Signup function with error handling and validation
export async function signup(userData) {
    try {
        if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
            throw new Error("All fields are required.");
        }

        const response = await fetch(`${API_BASE_URL}/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        // Check for non-OK responses
        if (!response.ok) {
            if (response.statusText === "Conflict") {
                throw new Error("User already exists with that email, please login!");
            }
            throw new Error("An unexpected error occurred during signup.");
        }

        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}

// Fetch user accounts with error handling
export async function getAccounts() {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found.");
        }

        const response = await fetch(`${API_BASE_URL}/account/user`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch accounts: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}

// Fetch user transactions with error handling
export async function getTransactions() {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found.");
        }

        const response = await fetch(`${API_BASE_URL}/transactions`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}
