import axios from "axios";
import { Task, TaskFromAPI } from "@/types/taskTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/tasks";

// Helper function to attach the auth token to headers
const getAuthHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }
}

const taskService = {
    getTasks: async (): Promise<TaskFromAPI[]> => {
        const response = await axios.get(`${API_URL}/tasks/`, getAuthHeaders());
        return response.data;
    },

    getTaskById: async (taskId: string): Promise<TaskFromAPI> => {
        const response = await axios.get(`${API_URL}/tasks/${taskId}`, getAuthHeaders());
        return response.data;
    },

    createTask: async (taskData: Omit<Task, "id">): Promise<TaskFromAPI> => {
        const response = await axios.post(`${API_URL}/tasks`, taskData, getAuthHeaders());
        return response.data;
    },

    updateTask: async (
        taskId: string, 
        taskData: Partial<Task>): Promise<TaskFromAPI> => {
            const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, getAuthHeaders());
            return response.data.task;
    },

    deleteTask: async (taskId: string): Promise<{message: string}> => {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`, getAuthHeaders());
        return response.data;
    }
};

export default taskService;