const API_BASE_URL = "http://localhost:5266/api"; // backend URL

export async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    });
    return response.json(); // Adjust based on your backend's response
}

export async function signup(userData) {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
}