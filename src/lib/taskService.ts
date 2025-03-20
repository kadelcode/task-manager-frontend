// Import the API module which is assumed to handle HTTP requests
import { api } from "./api";

// Define the Task interface to specify the structure of a task object
export interface Task {
    id: string; // Unique identifier for the task
    title: string; // Title of the task
    description: string; // Description of the task
    status: "todo" | "in-progress" | "done"; // Status of the task
    priority: "low" | "medium" | "high"; // Priority level of the task
    dueDate: string; // Due date of the task
    assignedTo: string; // Person assigned to the task
};

// Function to fetch all tasks from the server
export const getTasks = async (): Promise<Task[]> => {
    // Send a GET request to the /tasks endpoint
    const response = await api.get("/tasks");

    // Return the data from the response, which is expected to be an array of Task objects
    return response.data;
};

// Function to create a new task on the server
export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
    // Send a POST request to the /tasks endpoint with the task data
    const response = await api.post("/tasks", taskData);

    // Return the data from the response, which is expected to be the created Task object
    return response.data;
};

// Function to update an existing task on the server
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
    // Send a PUT request to the /tasks/{id}  endpoint with the task data
    const response = await api.put(`/tasks/${id}`, taskData);

    // Return the data from the response, which is expected to be the updated Task object
    return response.data;
};

// Function to delete a task from the server
export const deleteTask = async (id: string): Promise<void> => {
    // Send a DELETE request to the /tasks/{id} endpoint
    await api.delete(`/tasks/${id}`);
}