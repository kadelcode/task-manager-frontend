// Import the 'create' function from the 'zustand' library.
// `zustand` is a small, fast, and scalable state-management library for React.
import { create } from "zustand";


// Import the 'setAuthToken' function from a local module.
// This function is likely used to set an authentication token in the API client.
import { setAuthToken } from "@/lib/api";


// Define an interface for the authentication state.
// This interface specifies the shape of the state and the methods that will be available.
interface AuthState {
    token: string | null; // The authentication token, which can be a string or null
    setToken: (token: string | null) => void; // A method to set the authentication token.
}


// Create a zustand store for managing authentication state.
// The 'create' function takes a function that returns the initial state and any methods to update the state.
export const useAuthStore = create<AuthState>((set) => ({
    token: null, // Initialize the token as null

    // Define the 'setToken' method to update the token in the state.
    setToken: (token) => {
        setAuthToken(token); // Call the 'setAuthToken' function to set the token in the API client
        set({ token }); // Update the state with the new token.
    },
}))