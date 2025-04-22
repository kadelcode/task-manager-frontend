import { create } from "zustand";
import toast from "react-hot-toast";
import taskService from "@/services/taskService";
import { Task } from "@/types/taskTypes";

// Define the expected types for toast and set
interface Toast {
    error: (message: string) => void;
}

interface SetState {
    (update: { loading: boolean }): void;
}

// Define a reusable function to handle errors with proper types
function handleError(error: unknown, toast: Toast, set: SetState) {
    let errorMessage = "Something went wrong.";

    if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
    }

    toast.error(errorMessage);
    set({ loading: false });
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    fetchTasks: () => Promise<void>
    addTask: (task: Omit<Task, "id">) => Promise<void>;
    updateTask: (taskId: string, task: Partial<Task>) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
}

const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    loading: false,

    fetchTasks: async () => {
        set({ loading: true });
        try {
            const tasks = await taskService.getTasks();
            set({ tasks, loading: false });
        } catch (error) {
            handleError(error, toast, set)
        }
    },

    addTask: async (task) => {
        try {
            const newTask = await taskService.createTask(task);
            set((state) => ({ tasks: [...state.tasks, newTask] }));
            toast.success("Task added successfully!");
        } catch (error) {
            handleError(error, toast, set);
        }
    },

    updateTask: async (taskId, task) => {
        try {
            const updatedTask = await taskService.updateTask(taskId, task);
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === taskId ? updatedTask: t)),
            }));
            toast.success("Task updated successfully");
        } catch (error) {
            handleError(error, toast, set)
        }
    },

    deleteTask: async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== taskId),
            }));
            toast.success("Task deleted successfully!");
        } catch (error) {
            handleError(error, toast, set);
        }
    },
}));

export default useTaskStore;