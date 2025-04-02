// Import the axios library, which is used to make HTTP requests
import axios from "axios";

// Define the base URL for the API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Create an instance of axios with a base URL and default headers
export const api = axios.create({
    baseURL: API_URL, // The base URL for all requests made with this instance
    headers: {
        "Content-Type": "application/json", // Set the default content type to JSON
    }
})

// Function to set the Authorization header for the axios instance
export const setAuthToken = (token: string | null) => {
    if (token) {
        // If a token is provided, set the Authorization header with the token
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("authToken", token);
    } else {
        // If no token is provided, remove the Authorization header
        delete api.defaults.headers.common["Authorization"];
        localStorage.removeItem("authToken");
    }
};