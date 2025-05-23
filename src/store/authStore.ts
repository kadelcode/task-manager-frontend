import { create } from "zustand";
import toast from "react-hot-toast";
import authService from "@/services/authService"; // Ensure this exists

interface AuthState {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>; // ✅ Added register
  logout: () => void;
}

const getInitialUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const useAuthStore = create<AuthState>((set) => ({
  user: getInitialUser(), // Persist user
  token: getInitialToken(),
  isAuthenticated: !!getInitialUser(),
  loading: false, // Add loading state

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { user, token } = await authService.login(email, password); // Ensure `authService` returns token
      set({ user, token, isAuthenticated: true, loading: false });
      
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
        localStorage.setItem("token", token); // Store JWT token
      }
      toast.success("Login successful!");
      return true; // Success
    } catch (error: unknown) {
      // Initialize a default error message
      let errorMessage = "Something went wrong.";

      // Check if the error is an object and not null
      if (typeof error === "object" && error !== null && "response" in error) {
        // Type assertion: treat the error as an object with an optional 'response' property
        const err = error as { response?: { data?: { message?: string } } };

        // Update the error message if a more specific one is available in the response
        errorMessage = err.response?.data?.message || errorMessage;
      }

      // Update the state to indicate that loading has finished
      set({ loading: false });

      // Display the error message using a toast nofication
      toast.error(errorMessage);
      return false; // Failure
    }
  },

  register: async (name, email, password) => { // ✅ Ensure register is implemented
    set({ loading: true });
    try {
      await authService.register(name, email, password);
      set({ loading: false });
      toast.success("Registration successful! Please login.");
      return true;
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      set({ loading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  logout: () => {
    authService.logout();
    if (typeof window !== "undefined") {
      localStorage.removeItem("user"); // Remove user from localStorage
      localStorage.removeItem("token");
    }
    set({ user: null, token: null, isAuthenticated: false });
    toast.success("Logged out successfully!");
  },
}));

export default useAuthStore;
