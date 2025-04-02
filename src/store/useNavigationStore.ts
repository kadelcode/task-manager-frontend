// Import the 'create' function from the 'zustand' library.
// 'zustand' is a small, fast, and scalable state-management library for React.
import { create } from "zustand";

// Define a TypeScript type for the state and actions of the navigation store.
type NavigationState = {
    isNavigating: boolean; // A boolean state to track whether navigation is happening.
    setNavigating: (value: boolean) => void; // An action to update the 'isNavigating' state.
}

// Create a Zustand store for managing navigation state.
export const useNavigationStore = create<NavigationState>((set) => ({
    isNavigating: false, // Initialize the 'isNavigating' state to false.
    setNavigating: (value) => set({ isNavigating: value }), // Define the 'setNavigating' action to update the state.
}))