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

// Check if account exists
export async function checkAccount(accountNumber) {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found.");
        }

        const response = await fetch(`${API_BASE_URL}/account/${accountNumber}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`Failed to fetch account: ${response.status} ${response.statusText}`);
        }
        return true;
    } catch (error) {
        return { error: error.message };
    }
}

// Get account balance
export async function getAccountBalance(accountNumber) {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found.");
        }

        // Use the updated endpoint for fetching account balance
        const response = await fetch(`${API_BASE_URL}/account/balance/${accountNumber}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch account balance: ${response.status} ${response.statusText}`);
        }

        return await response.json(); // Return the account balance
    } catch (error) {
        return { error: error.message }; // Handle error
    }
}

// Fetch user transactions with error handling
export async function getTransactions() {
    try {
        const token = getAuthToken();
        
        // Check if token exists
        if (!token) {
            throw new Error("No authentication token found.");
        }

        const response = await fetch(`${API_BASE_URL}/transaction/user`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" // Ensures the server knows the data type
            }
        });

        // Check if response status is OK (status code 200)
        if (!response.ok) {
            if (response.status === 400) {
                const errorData = await response.json();
                if (errorData.message.includes("Insufficient funds")) {
                    throw new Error("Insufficient funds to complete the transaction.");
                } else {
                    throw new Error("Bad Request: Invalid data provided.");
                }
            } else if (response.status === 404) {
                throw new Error("One or more accounts were not found.");
            } else {
                throw new Error(`Failed to fetch transactions: ${response.status} ${response.statusText}`);
            }
        }

        // Parse and return JSON if request was successful
        return await response.json();
        
    } catch (error) {
        console.error("Error in getTransactions:", error);
        return { error: error.message };
    }
}

export async function transferFunds(fromAccount, toAccount, amount, userId) {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error("No authentication token found.");
        }

        const transactionData = {
            FromAccountId: fromAccount,
            ToAccountId: toAccount,
            Amount: amount,
            UserId: userId
        };


        const response = await fetch(`${API_BASE_URL}/transaction`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transactionData)
        });

        const responseBody = await response.json(); 
        
        if (!response.ok) {
            throw new Error(`Failed to transfer funds: ${response.status} ${response.statusText}`);
        }

        return responseBody;
    } catch (error) {
        console.error("Error in transferFunds:", error); // Log the error
        return { error: error.message };
    }
}
