import { create } from "zustand";
import toast from "react-hot-toast";
import taskService from "@/services/taskService";
import { Task } from "@/types/taskTypes";

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
        } catch (error: any) {
            toast.error("Failed to fetch tasks.");
            set({ loading: false });
        }
    },

    addTask: async (task) => {
        try {
            const newTask = await taskService.createTask(task);
            set((state) => ({ tasks: [...state.tasks, newTask] }));
            toast.success("Task added successfully!");
        } catch (error: any) {
            toast.error("Failed to update task.");
        }
    },

    updateTask: async (taskId, task) => {
        try {
            const updatedTask = await taskService.updateTask(taskId, task);
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === taskId ? updatedTask: t)),
            }));
            toast.success("Task updated successfully");
        } catch (error: any) {
            toast.error("Failed to update task.");
        }
    },

    deleteTask: async (taskId) => {
        try {
            await taskService.deleteTask(taskId);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== taskId),
            }));
            toast.success("Task deleted successfully!");
        } catch (error: any) {
            toast.error("Failed to delete task.");
        }
    },
}));

export default useTaskStore;