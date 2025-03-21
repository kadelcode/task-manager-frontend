// Importing necessary functions and modules from the "./api" file
import { api, setAuthToken } from "./api";

// Defining an interface for the User object
export interface User {
    id: string; // Unique identifier for the user
    name: string; // Name of the user
    email: string; // Email address of the user
    token: string; // Authentication token for the user
};

// Function to register a new user
export const registerUser = async (data: { name: string; email: string; passwrod: string }): Promise<User> => {
    // Sending a POST request to the "/auth/register" endpoint with user data
    const response = await api.post("/auth/register", data);

    // Setting the received token in the authentication header for future requests
    setAuthToken(response.data.token);

    // Returning the user data received from the server
    return response.data;
};

// Function to log in an existing user
export const loginUser = async (data: { email: string; password: string}): Promise<User> => {
    // Sending a POST request to the "/auth/login" endpoint with user credentials
    const response = await api.post("/auth/login", data);

    // Setting the received token in the authentication header for future requests
    setAuthToken(response.data.token);

    // Returning the user data received from the server
    return response.data;
};

// Function to log out the current user
export const logoutUser = () => {
    // Removing the authentication token from the header
    setAuthToken(null);
};