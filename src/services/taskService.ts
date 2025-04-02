import axios from "axios";
import { Task } from "@/types/taskTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/tasks";

const taskService = {
    getTasks: async (): Promise<Task[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getTaskById: async (taskId: string): Promise<Task> => {
        const response = await axios.get(`${API_URL}/tasks/${taskId}`)
        return response.data;
    },

    createTask: async (taskData: Omit<Task, "id">): Promise<Task> => {
        const response = await axios.post(`${API_URL}/tasks`, taskData);
        return response.data;
    },

    updateTask: async (
        taskId: string, 
        taskData: Partial<Task>): Promise<Task> => {
            const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData);
            return response.data;
    },

    deleteTask: async (taskId: string): Promise<{message: string}> => {
        const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
        return response.data;
    }
};

export default taskService;