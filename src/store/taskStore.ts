import { create } from "zustand";
import toast from "react-hot-toast";
import taskService from "@/services/taskService";
import { Task, TaskFromAPI } from "@/types/taskTypes";

// Define the expected types for toast and set
interface Toast {
    error: (message: string) => void;
}

interface SetState {
    (update: Partial<Pick<TaskState, "loading" | "error">>): void;
}

// Define a reusable function to handle errors with proper types
function handleError(error: unknown, toast: Toast, set: SetState) {
    let errorMessage = "Something went wrong.";

    if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
    }

    toast.error(errorMessage);
    set({ loading: false, error: errorMessage });
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>
    addTask: (task: Omit<Task, "id">) => Promise<void>;
    updateTask: (taskId: string, task: Partial<Task>) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
}

const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    loading: false,
    error: null,

    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const tasksFromAPI: TaskFromAPI[] = await taskService.getTasks();

            const normalizedTasks = tasksFromAPI.map((task) => ({
                //...task,
                id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                dueDate: task.dueDate,
                status: task.status,
                assignedTo: task.assignedTo,
            }));
            set({ tasks: normalizedTasks, loading: false });
        } catch (error) {
            handleError(error, toast, set)
        }
    },

    addTask: async (task) => {
        try {
            const newTaskFromAPI = await taskService.createTask(task);
            const normalizedTask: Task = {
                ...newTaskFromAPI,
                id: newTaskFromAPI._id,
            }
            set((state) => ({ tasks: [...state.tasks, normalizedTask], error: null }));
            toast.success("Task added successfully!");
        } catch (error) {
            handleError(error, toast, set);
        }
    },

    updateTask: async (taskId: string, taskData: Partial<Task>) => {
        try {
            const updatedTaskFromAPI = await taskService.updateTask(taskId, taskData);

            console.log("✅ Updated Task returned from API:", updatedTaskFromAPI);

            // Normalize _id to id
            const normalizedTask: Task = {
                //...updatedTaskFromAPI,
                id: updatedTaskFromAPI._id,
                title: updatedTaskFromAPI.title,
                description: updatedTaskFromAPI.description,
                priority: updatedTaskFromAPI.priority,
                dueDate: updatedTaskFromAPI.dueDate,
                status: updatedTaskFromAPI.status,
                assignedTo: updatedTaskFromAPI.assignedTo,
            };

            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === taskId ? normalizedTask: t)),
                error: null,
            }));
            toast.success("Task updated successfully");
        } catch (error) {
            throw error; // Let your component catch it
            //handleError(error, toast, set)
        }
    },

    deleteTask: async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== taskId),
                //error: null,
            }));
            toast.success("Task deleted successfully!");
        } catch (error) {
            handleError(error, toast, set);
        }
    },
}));

export default useTaskStore;